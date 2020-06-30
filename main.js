const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminOptipng = require('imagemin-optipng');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');
const path = require('path');
const globby = require('globby');

(async () => {
    const files = await globby('**/*.{jpeg,jpg,png,gif,svg,JPEG,JPG,PNG,GIF,SVG}', {
        ignore: ['node_modules', 'build']
    });

    files.filter(file => {
        imagemin([file], {
            destination: 'build/' + path.dirname(file),
            plugins: [
                imageminGifsicle(),
                imageminMozjpeg({
                    quality: 75,
                    smooth: 0,
                    quantTable: 3,
                }),
                imageminPngquant({
                    quality: [0.7, 0.8] // 参数可调整，这个压缩比大，图片有损失。
                }),
                // imageminOptipng(), // 这个压缩比小，但是图片清晰度高。
                imageminSvgo({
                    plugins: [{ removeViewBox: true, }]
                })
            ]
        }).then(files => {
            console.log('压缩成功 / Successful Compression: ' + files[0].sourcePath);
        });
    });
})();
// RUN =======> [npm start] or [node main.js]