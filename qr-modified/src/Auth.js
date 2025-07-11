// AuthWrapper.js
import React, { useState } from 'react';
import OTPFlow from './OTPflow'

const AuthWrapper = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthComplete, setIsAuthComplete] = useState(false);

  const handleOpen = () => setShowPopup(true);
  const handleSuccess = () => {
    setShowPopup(false);
    setIsAuthComplete(true);
  };

  return (
    <div>
      <button onClick={handleOpen} disabled={isAuthComplete}>
        {isAuthComplete ? 'Authenticated ✅' : 'Authenticate OTP'}
      </button>

      {showPopup && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <OTPFlow
              secretKey="9D941AF69FAA5E041172D29A8B459BB4"
              apiEndpoint="http://localhost:3002/api/check-otp-availability"
              initialTheme="light"
              onSuccess={handleSuccess}
              containerStyle={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthWrapper;

// Optional: Styling (inline for clarity)
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '500px',
  width: '100%',
  boxShadow: '0 0 20px rgba(0,0,0,0.2)'
};
