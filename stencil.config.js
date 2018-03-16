const sass = require('@stencil/sass');

exports.config = {
  namespace: 'frontall-grid',
  generateDistribution: true,
  generateWWW: true,
  serviceWorker: false,
  globalStyle: 'src/global/variables.css',
  copy: [
    { src: 'favicon.ico'},
    { src: '*.css'}
  ],
  plugins: [
    sass({
      injectPaths: [
        'src'
      ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
