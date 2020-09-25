let mix = require('laravel-mix');
const WebpackShellPlugin = require('webpack-shell-plugin');
const themeInfo = require('./theme.json');

/**
 * Compile sass
 */
mix.sass('resources/scss/main.scss', 'assets/css/main.css')
  .sass('resources/scss/secondary.scss', 'assets/css/secondary.css');

/**
 * Concat scripts
 */
mix.scripts([
  'node_modules/jquery/dist/jquery.js',
  'node_modules/popper.js/dist/umd/popper.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/owl.carousel/dist/owl.carousel.min.js',
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
  'node_modules/prismjs/prism.js',
], 'assets/js/all.js')
  .scripts([
    'resources/js/imagina.js'
  ], 'assets/js/secondary.js')
  .scripts([
      'resources/js/app.js',
      '../../Modules/Icommerce/Resources/views/vue/components.js'
  ], 'resources/js/main.js');



/**
 *  Copy assets directory https://laravel.com/docs/5.4/mix#url-processing
 */
mix.copy(
  'assets',
  '../../../public_html/themes/'+themeInfo.name.toLowerCase()
);
/**
 * Copy Font directory https://laravel.com/docs/5.4/mix#url-processing
 */
mix.copy(
  'node_modules/font-awesome/fonts',
  '../../../public_html/fonts/vendor/font-awesome'
);

mix.copy(
  '../../Modules/Icommerce/Resources/views/vue/components/',
  './resources/js/components/icommerce'
);

/*
Overwrite files from components
 */
mix.copy(
  'overwrites/',
  './'
);


mix.js(['resources/js/main.js',], 'assets/js/app.js');

/**
 * Publishing the assets
 */
mix.webpackConfig({
  plugins: [
    new WebpackShellPlugin({onBuildEnd: ['php ../../artisan stylist:publish ' + themeInfo.name]})
  ]
});
