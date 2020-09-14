const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin")


// html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
}

exports.html = html;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const jsMin = () => {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
}

exports.jsMin = jsMin;

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 2 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest("build/img"))
}

exports.webp = createWebp;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
  gulp.watch("source/img/**/*.{png,jpg}", gulp.series(images, webp));
  gulp.watch("source/js", gulp.series("jsMin"));
}

const build = gulp.series(
  clean,
  copy,
  html,
  styles,
  jsMin,
  images,
  createWebp
);

exports.default = gulp.series(
  build, server, watcher
);

exports.build = build;
