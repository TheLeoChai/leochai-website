// TODO(LEO): Supply the approved public PDF before enabling its download.
// Source assets/assets/leo-chai-resume.pdf emits /assets/leo-chai-resume.pdf.
export default {
  available: false,
  url: null,
  requestUrl: 'mailto:contact@leochai.com?subject=R%C3%A9sum%C3%A9%20request',
  labels: {
    en: { status: 'Résumé download is not available yet.', request: 'Request résumé' },
    zh: { status: '简历暂未提供下载。', request: '索取简历' }
  }
};
