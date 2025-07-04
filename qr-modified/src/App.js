import React, { useEffect, useState } from 'react';
import InputPage from './components/InputPage';
import QRCodePage from './components/QRCodePage';
import SuccessPage from './components/SuccessPage';
import { lightTheme, darkTheme } from './theme/theme';
import { otpManager } from './utils/otpManager';

const DynamicPage = () => {
  const [currentPage, setCurrentPage] = useState('input');
  const [submittedData, setSubmittedData] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [otpType, setOtpType] = useState(0);

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  useEffect(() => {
    const fetchData = async () => {
      const key = "9D941AF69FAA5E041172D29A8B459BB4";
        
      try {
        const response = await fetch('http://localhost:3001/api/check-otp-availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ secretKey: key })
        });
  
        const result = await response.json();
  
        if (result.success) {
          const otpTypeDetails = {
            otpType: result.data.otpType,
            otpDigits: result.data.otpDigits,
            remainingRequests: result.data.remainingRequests,
            canGenerateOTP: result.data.canGenerateOTP
          };

          const l=result.data.otpType;
          let ty=1;

          if(l==='numeric')
              ty=2;
          else if(l==='alphanumeric')
              ty=3;
          else if(l==='complex')
              ty=4;
          
          let ans= otpTypeDetails.otpDigits * 10+ty;
          const randomType = Math.floor(Math.random() * 5);

          ans=ans*10+randomType;
  
          console.log('OTP Type Details:', ans);
          setOtpType(ans);
        } else {
          if (response.status === 400 && result.message === 'OTP request limit exhausted') {
            alert('OTP request limit has been exhausted. Please contact support.');
          } else if (response.status === 404) {
            alert('Invalid authentication key. Please check your configuration.');
          } else if (response.status === 403) {
            alert('User account is inactive. Please contact support.');
          } else {
            alert('An error occurred: ' + result.message);
          }
        }
  
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error occurred. Please try again.');
      }
    };
  
    fetchData();
  }, []);
  

  const handleSubmit = (data) => {
    setSubmittedData(data);
    setCurrentPage('qr');
  };

  const handleBack = () => {
    setCurrentPage('input');
    setSubmittedData('');
    otpManager.clearOTP();
  };

  const handleVerificationSuccess = () => {
    setCurrentPage('success');
  };

  const handleRestart = () => {
    setCurrentPage('input');
    setSubmittedData('');
    otpManager.clearOTP();
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${currentTheme.background} 0%, ${currentTheme.surface} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      transition: 'all 0.3s ease'
    }}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: currentTheme.cardBackground,
          color: currentTheme.text,
          border: `1px solid ${currentTheme.border}`,
          padding: '12px 16px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          boxShadow: `0 4px 12px ${currentTheme.shadow}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = `0 8px 24px ${currentTheme.shadow}`;
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'none';
          e.target.style.boxShadow = `0 4px 12px ${currentTheme.shadow}`;
        }}
      >
        <span>{isDarkTheme ? '☀️' : '🌙'}</span>
        {isDarkTheme ? 'Light' : 'Dark'}
      </button>

      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: currentTheme.cardBackground,
        borderRadius: '20px',
        boxShadow: `0 20px 40px ${currentTheme.shadow}`,
        border: `1px solid ${currentTheme.border}`,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        {currentPage === 'input' && (
          <InputPage
            onSubmit={handleSubmit}
            theme={currentTheme}
            isDark={isDarkTheme}
            type1={otpType}
          />
        )}
        {currentPage === 'qr' && (
          <QRCodePage
            qrData={submittedData}
            onBack={handleBack}
            onVerificationSuccess={handleVerificationSuccess}
            theme={currentTheme}
            isDark={isDarkTheme}
            type1={otpType}
          />
        )}
        {currentPage === 'success' && (
          <SuccessPage
            onRestart={handleRestart}
            theme={currentTheme}
          />
        )}
      </div>

      {/* Footer */}
      {/* <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: currentTheme.textSecondary,
        fontSize: '12px',
        textAlign: 'center'
      }}>
        Secure OTP Verification System
      </div> */}
    </div>
  );
};

export default DynamicPage;