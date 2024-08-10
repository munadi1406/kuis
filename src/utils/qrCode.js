import QRCode from 'qrcode';

export const generateQRCodeDataURL = async (text) => {
  try {
    const url = await QRCode.toDataURL(text);
    return url;
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
};
