let mix = require('laravel-mix');
const WebpackShellPlugin = require('webpack-shell-plugin');
const themeInfo = require('./theme.json');
//Module Imports
const { readdirSync, statSync } = require('fs')
const { join } = require('path')
var fs = require('fs')

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())

var modules = dirs('../../Modules/')

var jsfilestomerge = []

modules.forEach(function(mname,i) {
  let pfile = '../../Modules/'+mname+'/Resources/views/vue/components.js'
  if(fs.existsSync(pfile)) {
    jsfilestomerge.push(pfile)
  }
});

/**
 * Compile sass
 */
mix.sass('resources/scss/main.scss', 'assets/css/app.css')
  .sass('resources/scss/secondary.scss', 'assets/css/secondary.css')
  .sass('node_modules/toastr/toastr.scss','assets/css/toastr.css');

/**
 * Unified secondary.css
 */
mix.styles([
  'assets/css/toastr.css',
  'assets/css/secondary.css'
], 'assets/css/secondary.css');

/**
 * Concat scripts
 */
mix.scripts([
  'node_modules/popper.js/dist/umd/popper.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/owl.carousel/dist/owl.carousel.min.js',
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
], 'assets/js/secondary.js')
  .scripts([
    'resources/js/app.js',
    'resources/js/imagina.js',
    ...jsfilestomerge,
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


/*
 * Copy Modules Source Resources
 */

modules.forEach(function(mname,i) {
  
  let path = '../../Modules/'+mname+'/Resources/views/vue/components/'
  
  if(fs.existsSync(path)) {
    mix.copy(
      path,
      './resources/js/components/'+mname.toLowerCase()
    );
  }
  
  
});


/*
Overwrite files from components
 */
mix.copy(
  'overwrites/',
  './'
);


mix.js(['resources/js/main.js'], 'assets/js/app.js');

/**
 * Publishing the assets
 */
mix.webpackConfig({
  plugins: [
    new WebpackShellPlugin({onBuildEnd: ['php ../../artisan stylist:publish ' + themeInfo.name]})
  ]
});



