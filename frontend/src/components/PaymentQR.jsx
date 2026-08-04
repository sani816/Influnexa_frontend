import { useEffect, useState } from "react";
import QRCode from "qrcode";

function PaymentQR({ amount }) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    // Replace this with YOUR actual UPI ID
    const upiUrl =
      `upi://pay?pa=saniakhatun622@okicici&pn=Influnexa&am=${amount}&cu=INR`;

    QRCode.toDataURL(upiUrl)
      .then(setQr)
      .catch(console.error);

  }, [amount]);

  return (
    <img
      src={qr}
      alt="UPI QR"
      className="w-48 h-48 mx-auto rounded-lg border-4 border-cyan-500"
    />
  );
}

export default PaymentQR;