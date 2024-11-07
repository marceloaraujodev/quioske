import QRCode from 'qrcode';

// generate qr code for user
const generateQRCode = async (text) => {
  try {
    // generates the qr code and prints in the terminal
    // console.log(await QRCode.toString(text))
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err)
  }
};

export default generateQRCode;
