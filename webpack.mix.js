const mix = require('laravel-mix');
const WebpackShellPlugin = require('webpack-shell-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;
const themeInfo = require('./theme.json');

mix.webpackConfig({
  watchOptions: {
    //Not working. ignored: ['/node_modules/','./resources/scss/modules/']
  },
  plugins: [
    new WebpackMildCompile(), // See: https://github.com/webpack/watchpack/issues/25.
    new WebpackShellPlugin({onBuildEnd: ['php ../../artisan stylist:publish ' + themeInfo.name]})
  ]
});

const themePublicRelPath = 'themes/'+ themeInfo.name.toLowerCase();
mix.setPublicPath('../../public/');

//Import File Helpers
const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const fs = require('fs');

//Function to get dirs recursive
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

//Let's get all the modules installed
const modules = dirs('../../Modules/');

let jsfilestomerge = [];
let scssfilestomerge = [];

modules.forEach(function(mname) {
  let pfile = '../../Modules/'+mname+'/Resources/views/vue/components.js';
  if(fs.existsSync(pfile)) {
    jsfilestomerge.push(pfile);
  }
  
  let scssfile = '../../Modules/'+mname+'/Resources/scss/main.scss';
  if(fs.existsSync(scssfile)) {
    
    /**
     *  Copy scss directory to the module
     */
    let scssModuleThemePath = './resources/scss/modules/'+mname.toLowerCase()+'/main.scss';
    scssfilestomerge.push(scssModuleThemePath);
  
    let scssPath = '../../Modules/'+mname+'/Resources/scss/';
    mix.copy(
      scssPath,
      './resources/scss/modules/'+mname.toLowerCase()
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



/**
 * Merge main.scss of each module at the bottom of secondary.scss
 */
mix.combine([...scssfilestomerge], 'resources/scss/_modules.scss');

/**
 * Compile sass
 */
mix.sass('resources/scss/main.scss', themePublicRelPath+'/css/app.css')
    .sass('resources/scss/secondary.scss', themePublicRelPath+'/css/secondary.css');



/*mix.js(['resources/js/main.js'], 'assets/js/app.js');*/

mix.browserSync({
  //logLevel: 'debug',
  /*files: [
    mix.config.publicPath+'/'+themePublicRelPath+'/css/app.css',
    mix.config.publicPath+'/'+themePublicRelPath+'/css/secondary.css',
    mix.config.publicPath+'/'+themePublicRelPath+'/js/app.js'
  ],*/
  proxy: 'localhost'
});
