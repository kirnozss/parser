const config = require('../config/keys')
const download = require('image-downloader')

module.exports = async (urlPhoto, name) => {
    try {

        const options = {
            url: urlPhoto,
            dest: "public/photo/" + `${name}` + ".jpg"
        }

        await download.image(options)

    } catch (e) {
        console.log('error', e)
        throw new Error('Photo not saved')
    }
}