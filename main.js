const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');
const glob = require('glob');
const path = require('path');

glob('**/*.{jpeg,jpg,png,gif,svg,JPEG,JPG,PNG,GIF,SVG}', function (er, files) {
    files.filter(file => {
        if (file.indexOf('node_modules') === -1 && file.indexOf('build') === -1) {
            imagemin([file], 'build/' + path.dirname(file), {
                plugins: [
                    imageminMozjpeg({
                        progressive: true
                    }),
                    imageminPngquant({
                        quality: [0.6, 0.7]
                    }),
                    imageminGifsicle({ interlaced: true }),
                    imageminSvgo({
                        plugins: [
                            {
                                removeViewBox: true,
                                removeTitle: true,
                                removeDesc: true,
                            }
                        ]
                    })
                ]
            }).then(files => {
                console.log('压缩成功 ' + files[0].path);
                // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
            });
        }
    });
    console.log(er);
});
// RUN =======> [npm start] or [node main.js]