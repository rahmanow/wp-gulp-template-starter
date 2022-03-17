module.exports = {
	config: {
		tailwindjs: "./tailwind.config.js",
		port: 9050,
	},
	deploy: {
		gitURL: 'https://github.com/rahmanow/rahmanow.com.git',
		gitBranch: 'master',
		gitCommitMessage: '-Auto commit by Gulp',
		surgeUrl: 'rahmanow.com'
	},
	paths: {
		root: "./",
		src: {
			base: "./.src",
			scss: "./.src/scss",
			js: "./.src/js",
			img: "./.src/img"
		},
		dist: {
			base: "./azr",
			css: "./azr/css",
			js: "./azr/js",
			img: "./azr/img"
		},
		build: {
			base: "./build",
			css: "./build/css",
			js: "./build/js",
			img: "./build/img"
		}
	}
}