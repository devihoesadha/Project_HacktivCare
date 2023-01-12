const QRCode = require('qrcode')

const generateQrCode = (value) => QRCode.toDataURL(value, (err, url) => {
    if (err) {
        console.log("error pada Qr Code");
    } else if (url) {
        return url
    }
})

module.exports = generateQrCode
