export default function printQrCode(qrCodeUrl, size, empresa, tableNumber) { // size = 'Large' or 'Small'

  const qrWindow = window.open('', '_blank', 'width=600,height=600');
  qrWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
       <style>
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: white;
          font-family: Arial, sans-serif; /* Add a default font */
        }
        .qr-container {
          text-align: center;
        }
        .qr-text {
          font-weight: bold; 
          font-size: ${size === 'Large' ? '35px' : '18px'}; 
        }
        img {
          width: ${size === 'Large' ? '600px' : '200px'};
          height: ${size === 'Large' ? '600px' : '200px'};
        }
      </style>
      </head>
      <body>
      <div class="qr-container">
        <div class="qr-text">${empresa}</div> 
        <img src="${qrCodeUrl}" alt="QR Code" />
        <div class="qr-text">Mesa ${tableNumber}</div> 
      </div>
      </body>
    </html>
  `);

  qrWindow.document.close();
  qrWindow.focus();
  qrWindow.print();

  qrWindow.onafterprint = () => {
    qrWindow.close();
  };
}
