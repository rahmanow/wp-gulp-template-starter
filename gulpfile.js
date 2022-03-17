/**
*   Gulp Starter Pack
*   Author: Azat Rahmanov
*   URL : blog.rahmanow.com
*   Twitter : @Azadik
 *  Instagram: @Azadik
**/

/*
  npm install   //To install all dev dependencies of package
  gulp          //To start development and server for live preview
  gulp gitter   // To add, commit and push to repository
  gulp prod     //To generate minifed files for live server
  gulp deploy   //To deploy your static website to surge.sh


*/

const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del'); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));//For Compiling SASS files
const postcss = require('gulp-postcss'); //For Compiling tailwind utilities with tailwind config
const concat = require('gulp-concat'); //For Concatinating js,scss, css files
const uglify = require('gulp-terser');//To Minify JS files
const imagemin = require('gulp-imagemin'); //To Optimize Images
const cleanCSS = require('gulp-clean-css');//To Minify CSS files
const purgecss = require('gulp-purgecss');// Remove Unused CSS from Styles

//Note : Webp still not supported in major browsers including firefox
// const webp = require('gulp-webp'); //For converting images to WebP format
// const replace = require('gulp-replace'); //For Replacing img formats to webp in html
const logSymbols = require('log-symbols'); //For Symbolic Console logs :) :P
const fileInclude = require('gulp-file-include'); // Include header and footer files to work faster :)
const surge = require('gulp-surge'); // Surge deployment
const git = require('gulp-git'); // Execute command line shell for git push
const babel = require('gulp-babel');
const open = require('gulp-open'); // Opens a URL in a web browser
const tailwindcss = require('tailwindcss');

//Development Tasks
const devHTML = async () =>
  {
    src([`${options.paths.src.base}/**/*.php`
        ])
    .pipe(dest(options.paths.dist.base));
  }

const devStyles = async () =>
  {
    src(`${options.paths.src.scss}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(options.paths.src.scss))
    .pipe(postcss([
          tailwindcss(options.config.tailwindjs),
          require('autoprefixer'),
          ]))
    .pipe(concat({ path: 'style.css'}))
    .pipe(dest(options.paths.dist.base));
  }

const devScripts = async () =>
  {
    src([
        `${options.paths.src.js}/libs/**/*.js`,
        `${options.paths.src.js}/*.js`,
        `!${options.paths.src.js}/**/external/*`
    ])
    .pipe(babel({ignore: [`${options.paths.src.js}/libs/**/*.js`] }))
    .pipe(concat({ path: 'main.js'}))
    .pipe(uglify())
    .pipe(dest(options.paths.dist.js));
  }

const devImages = async () =>
  {
    src(`${options.paths.src.img}/**/*`)
    .pipe(dest(options.paths.dist.img));
  }

function watchFiles(){
  watch(`${options.paths.src.base}/**/*.php`,series(devHTML, devStyles));
  watch([options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],series(devStyles));
  watch(`${options.paths.src.js}/**/*.js`,series(devScripts));
  watch(`${options.paths.src.img}/**/*`,series(devImages));
  console.log("\n\t" + logSymbols.info,"Watching for Changes..\n");
}

function devClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning dist folder for fresh start.\n");
  return del([options.paths.dist.base]);
}

const errorFunction = (err) => {
  if (err) throw err;
}

// Default gulp command - gulp
exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, devScripts, devImages, devHTML), //Run All tasks in parallel
  watchFiles // Watch for Live Changes
);