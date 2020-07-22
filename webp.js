const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const path = require('path');
const globby = require('globby');

(async () => {
    const files = await globby('**/*.{jpeg,jpg,png,JPEG,JPG,PNG}', {
        ignore: ['node_modules', 'build']
    });

    files.filter(file => {
        imagemin([file], {
            destination: 'build-webp/' + path.dirname(file),
            plugins: [
                imageminWebp({quality: 70}),
            ]
        }).then(files => {
            console.log('压缩成功 / Successful Compression: ' + files[0].sourcePath);
        });
    });
})();
// RUN =======> [npm run webp] or [node webp.js]