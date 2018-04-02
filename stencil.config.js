const sass = require('@stencil/sass');

exports.config = {
  namespace: 'frontall-grid',
  generateDistribution: true,
  generateWWW: true,
  serviceWorker: false,
  globalStyle: 'src/style/frontall-grid.scss',
  copy: [
    { src: 'favicon.ico'},
    { src: '*.css'}
  ],
  plugins: [
    sass({
      injectPaths: [
        'src/style'
      ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
