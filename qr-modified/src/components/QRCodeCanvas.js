// import React, { useEffect, useState } from 'react';
// import { completeTransformation } from '../utils/transform';

// const QRCodeCanvas = ({ value, size = 100, isDark = false, theme, type1 }) => {
//   const [qrCodeUrl, setQrCodeUrl] = useState('');

//   useEffect(() => {
//     if (!value) return;

//     const { alphabetData } = completeTransformation(value, type1);
//     const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(alphabetData)}&format=png&margin=1&qzone=1&color=000000&bgcolor=ffffff`;
//     setQrCodeUrl(qrUrl);
//   }, [value, size, type1]);

//   if (!qrCodeUrl) {
//     return (
//       <div style={{
//         width: size,
//         height: size,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: theme.surface,
//         border: `2px solid ${theme.border}`,
//         borderRadius: '12px',
//         color: theme.textSecondary,
//         fontSize: '14px'
//       }}>
//         Loading QR...
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       padding: '16px',
//       backgroundColor: '#ffffff',
//       borderRadius: '12px',
//       boxShadow: `0 4px 12px ${theme.shadow}`,
//       border: `1px solid ${theme.border}`
//     }}>
//       <img
//         src={qrCodeUrl}
//         alt="QR Code"
//         style={{
//           width: size,
//           height: size,
//           display: 'block',
//           borderRadius: '8px'
//         }}
//         onError={(e) => {
//           e.target.style.display = 'none';
//           const fallback = document.createElement('div');
//           fallback.style.cssText = `
//             width: ${size}px;
//             height: ${size}px;
//             background: ${theme.surface};
//             border-radius: 8px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: ${theme.textSecondary};
//             font-size: 14px;
//             text-align: center;
//           `;
//           fallback.textContent = 'QR Code Unavailable';
//           e.target.parentNode.appendChild(fallback);
//         }}
//       />
//     </div>
//   );
// };

// export default QRCodeCanvas;


import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { completeTransformation } from '../utils/transform';

const QRCodeCanvas = ({ value, size = 100, isDark = false, theme, type1 }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (!value) return;

    const { alphabetData } = completeTransformation(value, type1);

    QRCode.toDataURL(alphabetData, {
      width: size,
      margin: 1,
      color: {
        dark: isDark ? '#ffffff' : '#000000',
        light: isDark ? '#1e293b' : '#ffffff'
      }
    })
    .then(setQrCodeUrl)
    .catch(err => {
      console.error('QR generation failed:', err);
      setQrCodeUrl(null);
    });
  }, [value, type1]); // Only runs when `value` or `type1` changes — not after

  if (!qrCodeUrl) {
    return (
      <div style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.surface,
        border: `2px solid ${theme.border}`,
        borderRadius: '12px',
        color: theme.textSecondary,
        fontSize: '14px'
      }}>
        Loading QR...
      </div>
    );
  }

  return (
    <div style={{
      padding: '16px',
      backgroundColor: theme.cardBackground,
      borderRadius: '12px',
      boxShadow: `0 4px 12px ${theme.shadow}`,
      border: `1px solid ${theme.border}`,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <img
        src={qrCodeUrl}
        alt="QR Code"
        style={{
          width: size,
          height: size,
          borderRadius: '8px'
        }}
      />
    </div>
  );
};

export default QRCodeCanvas;