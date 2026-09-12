#!/usr/bin/env python3
"""Bake the authored finite Tiled courtyard. Requires Python 3 and Pillow 9.4+."""
import hashlib
import json
import math
import argparse
import subprocess
import sys
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'art/little-world'
OUT = ROOT / 'assets/world'
VENDOR = ROOT / 'vendor/little-world'
SIZE = (512, 320)

# A shared remap keeps the two compatible Kenney packs in one quieter palette.
PALETTE = {
    '#3f2631':'#403547', '#3d212d':'#403547', '#262b44':'#403547',
    '#84c669':'#c4dcb4', '#4e974c':'#85ad91', '#479f4a':'#85ad91',
    '#65a556':'#aac99b', '#c6e58d':'#e0e9ba', '#8bd87d':'#d8e6bf',
    '#eaa56c':'#edceb1', '#bd6c4a':'#bb917e', '#763b36':'#856578',
    '#cf8254':'#cba28b', '#b86542':'#b79386', '#fec99c':'#f5e1c6',
    '#c34b35':'#bd9fb9', '#aa2c23':'#947a9e', '#f28462':'#e7c3ce',
    '#fdbe53':'#ecd292', '#e38628':'#c1a476', '#c0cbdc':'#d9ddea',
    '#8b9bb4':'#a9abc7', '#5a6988':'#7b7a9b', '#52607c':'#74718f',
    '#009adc':'#39c5bb', '#76e4ff':'#ddf5f2', '#ffffff':'#f7f9fc',
}

def rgba(hexvalue):
    return tuple(bytes.fromhex(hexvalue.removeprefix('#'))) + (255,)

def recolor(im):
    table = {rgba(k): rgba(v) for k,v in PALETTE.items()}
    result = im.convert('RGBA')
    result.putdata([table.get(p,p) for p in result.getdata()])
    return result

def save(im, name):
    im.save(OUT / name, optimize=True)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--model-root', type=Path, default=ROOT, help='Integrated model/trace checkout; defaults to this repository.')
    args=parser.parse_args()
    subprocess.run([sys.executable,str(ROOT/'scripts/world-sources.py')],check=True)
    OUT.mkdir(parents=True,exist_ok=True)
    world = json.loads((ART/'courtyard.tmj').read_text())
    assert (world['width']*world['tilewidth'], world['height']*world['tileheight']) == SIZE
    assert world['orientation']=='orthogonal' and world['infinite'] is False
    sheets = {}
    for item in world['tilesets']:
        ts = json.loads((ART/item['source']).read_text())
        source = recolor(Image.open(ART / ts['image']))
        assert source.size == (ts['imagewidth'],ts['imageheight'])
        for tile in range(ts['tilecount']):
            x,y = (tile % ts['columns'])*16, (tile//ts['columns'])*16
            sheets[item['firstgid']+tile] = source.crop((x,y,x+16,y+16))
    base = Image.new('RGBA',SIZE,'#e7eff7')
    front = Image.new('RGBA',SIZE)
    for layer in world['layers']:
        if layer['type']=='tilelayer':
            dst = front if layer['name']=='foreground' else base
            for idx,gid in enumerate(layer['data']):
                if gid:
                    assert gid in sheets, (layer['name'],gid)
                    tile=sheets[gid]
                    if layer['name']=='ground-texture':
                        tile=tile.copy()
                        tile.putdata([(0,0,0,0) if p==rgba('#c4dcb4') else p for p in tile.getdata()])
                    dst.alpha_composite(tile,((idx%world['width'])*16,(idx//world['width'])*16))
        elif layer['name'] in ('landscape','details'):
            draw=ImageDraw.Draw(base)
            for obj in layer['objects']:
                props={p['name']:p['value'] for p in obj.get('properties',[])}
                color=props.get('fill','#c4dcb4')
                if 'polygon' in obj:
                    draw.polygon([(obj['x']+p['x'],obj['y']+p['y']) for p in obj['polygon']],fill=color)
                elif props.get('shape')=='line':
                    draw.line((obj['x'],obj['y'],obj['x']+obj['width'],obj['y']+obj['height']), fill=color,width=props.get('strokeWidth',1))
                elif obj.get('ellipse'):
                    draw.ellipse((obj['x'],obj['y'],obj['x']+obj['width'],obj['y']+obj['height']),fill=color)
                else:
                    draw.rectangle((obj['x'],obj['y'],obj['x']+obj['width']-1,obj['y']+obj['height']-1),fill=color)
    anchors={o['name']:{'x':o['x'],'y':o['y']} for l in world['layers'] if l['name']=='anchors' for o in l['objects']}
    # Source occupied bounding box is 14×13 within 32×32. No combat frames.
    raw = Image.open(VENDOR/'puny/Character-Base.png').convert('RGBA')
    sprites={}
    frames=[]
    for actor,shirt,hair,skin in [('gardener','#39c5bb','#5b4957','#ecc4a5'),('maker','#b3a4d2','#4e4256','#bf9077'),('cook','#f4dec1','#776076','#f0c8a6')]:
        for index,kind in enumerate(['idle','walk']):
            im=raw.crop((index*32,0,index*32+32,32))
            pixels=im.load()
            for y in range(32):
                for x in range(32):
                    r,g,b,a=pixels[x,y]
                    if not a: continue
                    if r<20: pixels[x,y]=rgba('#403547')
                    elif y>=18 and r>130: pixels[x,y]=rgba(shirt)
                    elif y<=11: pixels[x,y]=rgba(hair)
                    elif r>210 and y<18: pixels[x,y]=rgba(skin)
            d=ImageDraw.Draw(im)
            if actor=='gardener':
                d.line((12,10,20,10), fill='#ecd292',width=2)
                d.line((10,12,22,12),fill='#b99d70')
            elif actor=='maker':
                d.line((13,17,19,17),fill='#776076')
                d.point((20,14), fill='#403547')
            else:
                d.rectangle((13,9,18,10),fill='#f7f9fc')
                d.line((14,18,17,18),fill='#d0c1aa')
            frames.append((f'{actor}-{kind}',im,16,23))
    # Original tiny overlays: kettle steam, water, stool and a served herb bowl.
    def overlay(name,commands,anchor=(16,24)):
        im=Image.new('RGBA',(32,32));d=ImageDraw.Draw(im)
        for shape,coords,color in commands:
            if shape=='line': d.line(coords, fill=color, width=1)
            else: getattr(d,shape)(coords,fill=color)
        frames.append((name,im,*anchor))
    overlay('water',[('line',(8,13,20,19),'#39c5bb'),('rectangle',(16,17,17,18),'#f7f9fc'),('rectangle',(21,20,22,21),'#39c5bb'),('rectangle',(18,22,19,23),'#39c5bb')])
    overlay('steam',[('line',(13,17,11,14,13,11),'#f7f9fc'),('line',(19,17,21,14,19,11),'#f7f9fc')])
    overlay('stool',[('rectangle',(10,14,22,17),'#403547'),('rectangle',(11,14,21,15),'#edceb1'),('rectangle',(11,18,13,23),'#856578'),('rectangle',(20,18,22,23),'#856578')])
    overlay('meal',[('ellipse',(8,14,24,22),'#403547'),('ellipse',(9,13,23,19),'#f7f9fc'),('ellipse',(12,14,20,18),'#85ad91'),('rectangle',(14,13,16,16),'#ecd292')])
    overlay('herbs',[('rectangle',(11,17,22,22),'#bb917e'),('rectangle',(12,18,21,20),'#edceb1'),('ellipse',(12,12,16,18),'#85ad91'),('ellipse',(17,11,22,18),'#c4dcb4')])
    for name,harvested in [('bed-watered',False),('bed-harvested',True)]:
        im=Image.new('RGBA',(32,32))
        for x,soil in [(0,48),(16,50)]:
            bed=sheets[133+soil].copy()
            bed.putdata([rgba('#ab8f85') if p==rgba('#edceb1') else p for p in bed.getdata()])
            im.alpha_composite(bed,(x,8))
            im.alpha_composite(sheets[133+(52 if harvested else 54)],(x,8))
        frames.append((name,im,16,24))
    for name,index in [('empty-can',72),('full-can',73)]:
        im=Image.new('RGBA',(32,32));im.alpha_composite(sheets[133+index].resize((10,10),Image.Resampling.NEAREST),(11,14))
        d=ImageDraw.Draw(im)
        d.line((12,19,9,16,7,16),fill='#403547',width=3)
        d.line((12,18,9,15,7,15),fill='#a9abc7',width=1)
        frames.append((name,im,16,24))
    # Bake small carried variants once: browser nearest sampling differs from
    # Pillow at half-scale boundaries, so runtime always draws native pixels.
    held_sprites={name:'held-'+name for name in ['empty-can','full-can','stool','herbs','meal']}
    held_frames=[]
    for name,im,ax,ay in frames:
        if name in held_sprites:
            held_frames.append((held_sprites[name],im.resize((16,16),Image.Resampling.NEAREST),ax//2,ay//2))
    frames=[frame for frame in frames if frame[0] not in ['empty-can','full-can','herbs']]+held_frames
    atlas=Image.new('RGBA',(32*len(frames),32))
    for i,(name,im,ax,ay) in enumerate(frames):
        atlas.alpha_composite(im,(32*i,0))
        sprites[name]={'x':32*i,'y':0,'w':im.width,'h':im.height,'anchorX':ax,'anchorY':ay}
    scene={'schemaVersion':1,'id':'workshop-courtyard','width':512,'height':320,'tileSize':16,
           'provenance':'Illustration — authored setting and routes, not simulation telemetry.',
           'images':{'base':'map-base.png','front':'map-front.png','sprites':'sprites.png','poster':'poster.png'},
           'mobileView':{'x':128,'y':48,'width':256,'height':256},
           'carryScale':0.5,
           'heldSprites':held_sprites,
           'anchors':anchors,'sprites':sprites,
           'actors':{a:{'idle':f'{a}-idle','walk':f'{a}-walk'} for a in ['gardener','maker','cook']},
           'stateProps':{'water':{'x':240,'y':160},'bed':{'x':240,'y':160},'stool':{'x':280,'y':239},'stoolWorkshop':{'x':198,'y':152},'meal':{'x':305,'y':229},'herbs':{'x':320,'y':164},'steam':{'x':350,'y':141}},
           'posterActors':{'gardener':'table-gardener','maker':'table-maker','cook':'table'}}
    def sprite(dst,key,x,y):
        r=sprites[key];im=atlas.crop((r['x'],r['y'],r['x']+r['w'],r['y']+r['h']))
        dst.alpha_composite(im,(math.floor(x-r['anchorX']+0.5),math.floor(y-r['anchorY']+0.5)))
    (OUT/'scene.json').write_text(json.dumps(scene,ensure_ascii=False,indent=2)+'\n')
    # The page and bake consume the same state reader, never a second timeline.
    js="""
    import fs from 'node:fs'; import {pathToFileURL} from 'node:url';
    const root=process.argv[1], scenePath=process.argv[2];
    const {createWorldModel}=await import(pathToFileURL(root+'/assets/js/world-model.js'));
    const trace=JSON.parse(fs.readFileSync(root+'/assets/world/trace.json'));
    const model=createWorldModel(trace,JSON.parse(fs.readFileSync(scenePath)));
    console.log(JSON.stringify(trace.stills.map(still=>({event:still.event,state:model.stateAt(trace.events.find(e=>e.id===still.event).at)}))));
    """
    states=json.loads(subprocess.check_output(['node','--input-type=module','-e',js,str(args.model_root.resolve()),str(OUT/'scene.json')],text=True))
    def render(state):
        result=base.copy();entities=state['entities']
        def prop(key,frame=None):
            p=scene['stateProps'][key];sprite(result,frame or key,p['x'],p['y'])
        if entities['bed-01']['watered']:
            prop('bed','bed-watered' if entities['bed-01']['herbs'] else 'bed-harvested')
        if entities['stool']['placed']:prop('stool')
        if not entities['stool']['repaired']:prop('stoolWorkshop','stool')
        if entities['table']['served']:prop('meal')
        if entities['kitchen']['meal']:prop('steam')
        for actor,data in sorted(state['actors'].items(),key=lambda pair:pair[1]['position']['y']):
            p=data['position']
            walking=data['moving'] and math.floor(state['time']/240)%2
            sprite(result,actor+('-walk' if walking else '-idle'),p['x'],p['y'])
            carry=data['carrying']
            if carry in held_sprites:
                sprite(result,held_sprites[carry],p['x']+11,p['y']+3)
        result.alpha_composite(front)
        return result
    for number,item in enumerate(states,1):save(render(item['state']),f'still-{number}.png')
    poster=render(states[-1]['state'])
    assert states[-1]['state']['entities']['table']['gathered'], 'Last still must be completed state.'
    save(base,'map-base.png');save(front,'map-front.png');save(atlas,'sprites.png');save(poster,'poster.png')
    # Review artifacts live in authored-art directory, not page download payload.
    poster.resize((1536,960),Image.Resampling.NEAREST).save(ART/'poster-review.png',optimize=True)
    atlas.resize((atlas.width*3,96),Image.Resampling.NEAREST).save(ART/'sprite-contact-sheet.png',optimize=True)
    for name in ['map-base.png','map-front.png','sprites.png','poster.png','scene.json','still-1.png','still-2.png','still-3.png']:
        p=OUT/name;print(f'{name}: {p.stat().st_size:,} bytes {hashlib.sha256(p.read_bytes()).hexdigest()}')

if __name__=='__main__':
    main()
