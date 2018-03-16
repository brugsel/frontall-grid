const sass = require('@stencil/sass');

exports.config = {
  namespace: 'frontall',
  generateDistribution: true,
  serviceWorker: false,
  copy: [
    { src: 'favicon.ico'},
    { src: '*.css'}
  ],
  plugins: [
    sass({
      injectPaths: [
        'src/components'
      ],
      injectGlobalPaths: [
        'src/components/grid.scss'
      ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
