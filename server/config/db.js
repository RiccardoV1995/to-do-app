const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.URL_DB)

        console.log('DB connected')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = dbConnect