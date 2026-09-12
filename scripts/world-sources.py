#!/usr/bin/env python3
"""Verify vendored CC0 files; --fetch restores them from hash-pinned archives."""
import argparse
import hashlib
import io
import json
from pathlib import Path
import urllib.request
import zipfile

ROOT=Path(__file__).resolve().parents[1]/'vendor/little-world'

def checked(raw, expected, label):
    actual=hashlib.sha256(raw).hexdigest()
    if actual != expected:
        raise ValueError(f'{label}: SHA-256 mismatch ({actual})')
    return raw

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fetch',action='store_true')
    args=parser.parse_args()
    data=json.loads((ROOT/'sources.json').read_text())
    for pack in data['packs']:
        if args.fetch:
            request=urllib.request.Request(pack['archive'],headers={'User-Agent':'LittleWorldAssetBake/1.0'})
            with urllib.request.urlopen(request, timeout=60) as response:
                archive=checked(response.read(),pack['sha256'],pack['id'])
            # Read only named members; no untrusted zip extraction paths.
            with zipfile.ZipFile(io.BytesIO(archive)) as z:
                for item in pack['files']:
                    raw=checked(z.read(item['entry']),item['sha256'],item['path'])
                    path=ROOT/item['path'];path.parent.mkdir(parents=True,exist_ok=True)
                    path.write_bytes(raw)
        for item in pack['files']:
            checked((ROOT/item['path']).read_bytes(),item['sha256'],item['path'])
        print(f"Verified {pack['name']}: {len(pack['files'])} source files")

if __name__=='__main__':main()
