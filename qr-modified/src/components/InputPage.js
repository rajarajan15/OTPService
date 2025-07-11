// import React, { useState } from 'react';
// import { otpManager } from '../utils/otpManager';

// import SuccessPage from './SuccessPage';

// const InputPage = ({
//   onSubmit = () => {},
//   theme = {
//     primary: '#007bff',
//     primaryDark: '#0056b3',
//     text: '#333',
//     textSecondary: '#666',
//     border: '#ddd',
//     borderActive: '#007bff',
//     cardBackground: '#fff',
//     success: '#28a745'
//   },
//   isDark = false,
//   type1 = 'default'
// }) => {
//   const dynamicTheme = {
//     primary: theme.primary,
//     primaryDark: theme.primaryDark,
//     text: isDark ? '#ffffff' : theme.text,
//     textSecondary: isDark ? '#b3b3b3' : theme.textSecondary,
//     border: isDark ? '#404040' : theme.border,
//     borderActive: theme.borderActive,
//     cardBackground: isDark ? '#2d2d2d' : theme.cardBackground,
//     success: theme.success,
//     backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0'
//   };

//   const [inputData, setInputData] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [verified, setVerified] = useState(() => {
//   return localStorage.getItem("otpVerified") === "true";
// });

//   const [showSuccessPage, setShowSuccessPage] = useState(false);

//   const handleInputChange = (e) => {
//     const input = e.target.value;
//     if (/^\d*$/.test(input) && input.length <= 10) {
//       setInputData(input);
//     }
//   };

//   const handleSubmit = () => {
//     if (inputData.length === 10) {
//       const key = "9D941AF69FAA5E041172D29A8B459BB4";
//       otpManager.generateOTP(inputData, type1);
//       setShowPopup(false);
//       setShowSuccessPage(true); // trigger success popup
//       onSubmit(inputData);
//     }
//   };

//   const handleSuccessComplete = (status) => {
//   console.log("✅ handleSuccessComplete called with:", status);
//   setShowSuccessPage(false);  // ⬅️ This brings back the input page
//   setVerified(status);
//   localStorage.setItem("otpVerified", String(status));
//   setInputData('');
// };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && inputData.length === 10) {
//       handleSubmit();
//     }
//   };

//   if (showSuccessPage) {
//     console.log("👉 Rendering SuccessPage with onComplete:", typeof handleSuccessComplete);
//     return (
//       <SuccessPage 
//         onComplete={handleSuccessComplete} 
//         theme={theme} 
//       />
//     );
//   }


//   if (!showPopup) {
//     return (
//       <div className="button-container">
//       <button
//         onClick={() => setShowPopup(true)}
//         className="auth-button"
//         disabled={verified}
//       >
//         Authenticate OTP
//       </button>

//       <style>{`
//         .button-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100vw;
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background-color: ${dynamicTheme.backgroundColor};
//         }

//         .auth-button {
//           padding: 16px 32px;
//           font-size: 18px;
//           font-weight: 600;
//           background-color: ${verified ? theme.textSecondary : dynamicTheme.primary};
//           color: white;
//           border: none;
//           border-radius: 12px;
//           cursor: ${verified ? 'not-allowed' : 'pointer'};
//           box-shadow: 0 6px 20px ${dynamicTheme.primary}40;
//           transition: all 0.3s ease;
//         }

//         .auth-button:hover:enabled {
//           background-color: ${theme.primaryDark};
//           transform: translateY(-2px);
//           box-shadow: 0 8px 24px ${theme.primary}50;
//         }
//       `}</style>
//     </div>

//     );
//   }

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <button
//           onClick={() => setShowPopup(false)}
//           className="close-button"
//         >
//           ×
//         </button>

//         <div className="popup-header">
//           <div className="icon-container">
//             <span className="icon">🔐</span>
//           </div>

//           <h1 className="title">Secure Authentication</h1>
//           <p className="subtitle">Enter your 10-digit number to generate a secure OTP</p>
//         </div>

//         <div className="input-section">
//           <input
//             type="text"
//             value={inputData}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             maxLength={10}
//             placeholder="Enter 10 digits"
//             className="digit-input"
//           />

//           <div className="input-status">
//             <div className={`status-dot ${inputData.length === 10 ? 'complete' : ''}`} />
//             {inputData.length}/10 digits entered
//           </div>
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={inputData.length !== 10}
//           className={`submit-button ${inputData.length === 10 ? 'enabled' : 'disabled'}`}
//         >
//           Generate Secure OTP →
//         </button>
//       </div>

//       <style>{`
//         .popup-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100vw;
//           height: 100vh;
//           background-color: rgba(0, 0, 0, 0.4);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }

//         .popup-content {
//           background-color: ${isDark ? '#1e1e1e' : '#ffffff'};
//           border-radius: 16px;
//           padding: 48px 32px;
//           box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
//           max-width: 90%;
//           width: 400px;
//           text-align: center;
//           position: relative;
//         }

//         .close-button {
//           position: absolute;
//           top: 16px;
//           right: 16px;
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           border: none;
//           background-color: transparent;
//           color: ${dynamicTheme.textSecondary};
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//           transition: all 0.2s ease;
//         }

//         .close-button:hover {
//           background-color: ${dynamicTheme.border};
//         }

//         .popup-header {
//           margin-bottom: 32px;
//         }

//         .icon-container {
//           width: 64px;
//           height: 64px;
//           background-color: ${theme.primary};
//           border-radius: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 24px auto;
//           box-shadow: 0 8px 24px ${theme.primary}40;
//         }

//         .icon {
//           color: white;
//           font-size: 28px;
//           font-weight: bold;
//         }

//         .title {
//           color: ${dynamicTheme.text};
//           font-size: 28px;
//           font-weight: 700;
//           margin: 0 0 8px 0;
//           letter-spacing: -0.5px;
//         }

//         .subtitle {
//           color: ${dynamicTheme.textSecondary};
//           font-size: 16px;
//           margin: 0;
//           line-height: 1.5;
//         }

//         .input-section {
//           margin-bottom: 32px;
//         }

//         .digit-input {
//           width: 100%;
//           max-width: 300px;
//           padding: 16px 20px;
//           font-size: 18px;
//           border: 2px solid ${inputData ? theme.borderActive : theme.border};
//           border-radius: 12px;
//           text-align: center;
//           background: ${theme.cardBackground};
//           color: ${theme.text};
//           outline: none;
//           letter-spacing: 2px;
//           font-weight: 500;
//           box-sizing: border-box;
//         }

//         .input-status {
//           margin-top: 12px;
//           font-size: 14px;
//           color: ${dynamicTheme.textSecondary};
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//         }

//         .status-dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background-color: ${dynamicTheme.border};
//         }

//         .status-dot.complete {
//           background-color: ${dynamicTheme.success};
//         }

//         .submit-button {
//           width: 100%;
//           max-width: 300px;
//           padding: 16px 24px;
//           font-size: 16px;
//           font-weight: 600;
//           border: none;
//           border-radius: 12px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .submit-button.enabled {
//           background-color: ${theme.primary};
//           color: white;
//           box-shadow: 0 4px 12px ${theme.primary}40;
//         }

//         .submit-button.enabled:hover {
//           background-color: ${theme.primaryDark};
//           transform: translateY(-2px);
//           box-shadow: 0 8px 24px ${theme.primary}50;
//         }

//         .submit-button.disabled {
//           background-color: ${dynamicTheme.textSecondary};
//           color: white;
//           cursor: not-allowed;
//           transform: scale(0.98);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InputPage;


import React, { useState, useEffect } from 'react';
import { otpManager } from '../utils/otpManager';
import SuccessPage from './SuccessPage';

const InputPage = ({
  onSubmit = () => {},
  theme = {
    primary: '#007bff',
    primaryDark: '#0056b3',
    text: '#333',
    textSecondary: '#666',
    border: '#ddd',
    borderActive: '#007bff',
    cardBackground: '#fff',
    success: '#28a745'
  },
  isDark = false,
  type1 = 'default'
}) => {
  const dynamicTheme = {
    primary: theme.primary,
    primaryDark: theme.primaryDark,
    text: isDark ? '#ffffff' : theme.text,
    textSecondary: isDark ? '#b3b3b3' : theme.textSecondary,
    border: isDark ? '#404040' : theme.border,
    borderActive: theme.borderActive,
    cardBackground: isDark ? '#2d2d2d' : theme.cardBackground,
    success: theme.success,
    backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0'
  };

  const [inputData, setInputData] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("otpVerified") === "true";
    setVerified(stored);
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) {
      setInputData(input);
    }
  };

  const handleSubmit = () => {
    if (inputData.length === 10) {
      const key = "9D941AF69FAA5E041172D29A8B459BB4";
      otpManager.generateOTP(inputData, type1);
      setShowPopup(false);
      setShowSuccessPage(true); // trigger success popup
      onSubmit(inputData);
    }
  };

  const handleSuccessComplete = (status) => {
    console.log("✅ handleSuccessComplete called with:", status);
    setShowSuccessPage(false);
    setVerified(status);
    localStorage.setItem("otpVerified", String(status));
    setInputData('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputData.length === 10) {
      handleSubmit();
    }
  };

  // ✅ SuccessPage rendering logic (no bugs)
  if (showSuccessPage) {
    return (
      <SuccessPage
        onComplete={handleSuccessComplete}
        theme={theme}
      />
    );
  }

  // ✅ Initial Authenticate Button Screen
  if (!showPopup) {
    return (
      <div className="button-container">
        <button
          onClick={() => setShowPopup(true)}
          className="auth-button"
          disabled={verified}
        >
          Authenticate OTP
        </button>

        <style>{`
          .button-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${dynamicTheme.backgroundColor};
          }

          .auth-button {
            padding: 16px 32px;
            font-size: 18px;
            font-weight: 600;
            background-color: ${verified ? theme.textSecondary : dynamicTheme.primary};
            color: white;
            border: none;
            border-radius: 12px;
            cursor: ${verified ? 'not-allowed' : 'pointer'};
            box-shadow: 0 6px 20px ${dynamicTheme.primary}40;
            transition: all 0.3s ease;
          }

          .auth-button:hover:enabled {
            background-color: ${theme.primaryDark};
            transform: translateY(-2px);
            box-shadow: 0 8px 24px ${theme.primary}50;
          }
        `}</style>
      </div>
    );
  }

  // ✅ OTP Input Popup
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button
          onClick={() => setShowPopup(false)}
          className="close-button"
        >
          ×
        </button>

        <div className="popup-header">
          <div className="icon-container">
            <span className="icon">🔐</span>
          </div>
          <h1 className="title">Secure Authentication</h1>
          <p className="subtitle">Enter your 10-digit number to generate a secure OTP</p>
        </div>

        <div className="input-section">
          <input
            type="text"
            value={inputData}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            maxLength={10}
            placeholder="Enter 10 digits"
            className="digit-input"
          />
          <div className="input-status">
            <div className={`status-dot ${inputData.length === 10 ? 'complete' : ''}`} />
            {inputData.length}/10 digits entered
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={inputData.length !== 10}
          className={`submit-button ${inputData.length === 10 ? 'enabled' : 'disabled'}`}
        >
          Generate Secure OTP →
        </button>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup-content {
          background-color: ${isDark ? '#1e1e1e' : '#ffffff'};
          border-radius: 16px;
          padding: 48px 32px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
          max-width: 90%;
          width: 400px;
          text-align: center;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background-color: transparent;
          color: ${dynamicTheme.textSecondary};
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background-color: ${dynamicTheme.border};
        }

        .popup-header {
          margin-bottom: 32px;
        }

        .icon-container {
          width: 64px;
          height: 64px;
          background-color: ${theme.primary};
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 8px 24px ${theme.primary}40;
        }

        .icon {
          color: white;
          font-size: 28px;
          font-weight: bold;
        }

        .title {
          color: ${dynamicTheme.text};
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: ${dynamicTheme.textSecondary};
          font-size: 16px;
          margin: 0;
          line-height: 1.5;
        }

        .input-section {
          margin-bottom: 32px;
        }

        .digit-input {
          width: 100%;
          max-width: 300px;
          padding: 16px 20px;
          font-size: 18px;
          border: 2px solid ${inputData ? theme.borderActive : theme.border};
          border-radius: 12px;
          text-align: center;
          background: ${theme.cardBackground};
          color: ${theme.text};
          outline: none;
          letter-spacing: 2px;
          font-weight: 500;
          box-sizing: border-box;
        }

        .input-status {
          margin-top: 12px;
          font-size: 14px;
          color: ${dynamicTheme.textSecondary};
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${dynamicTheme.border};
        }

        .status-dot.complete {
          background-color: ${dynamicTheme.success};
        }

        .submit-button {
          width: 100%;
          max-width: 300px;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button.enabled {
          background-color: ${theme.primary};
          color: white;
          box-shadow: 0 4px 12px ${theme.primary}40;
        }

        .submit-button.enabled:hover {
          background-color: ${theme.primaryDark};
          transform: translateY(-2px);
          box-shadow: 0 8px 24px ${theme.primary}50;
        }

        .submit-button.disabled {
          background-color: ${dynamicTheme.textSecondary};
          color: white;
          cursor: not-allowed;
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default InputPage;
