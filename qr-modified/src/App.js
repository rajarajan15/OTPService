import React from 'react';
import OTPFlow from './OTPflow';

function App() {
  // Your secret key - in production, this should come from environment variables
  const SECRET_KEY = "7367B12EA3890F6137BC5EF5C07E5EA1";

  // Handle errors from the OTP flow
  const handleError = (error) => {
    console.error('OTP Flow Error:', error);
    // You can add custom error handling here
    // For example, show a toast notification, send to error tracking service, etc.
  };

  // Handle successful OTP verification
  const handleSuccess = () => {
    console.log('OTP verification successful!');
    // You can add custom success handling here
    // For example, redirect to dashboard, show success message, etc.
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <OTPFlow
        secretKey={SECRET_KEY}
        apiEndpoint="http://localhost:3002/api/check-otp-availability"
        initialTheme="light" // or "dark"
        // customTheme={myCustomTheme} // optional custom theme object
        // containerStyle={{ maxWidth: '600px' }} // optional custom container styles
      />
    </div>
  );
}

export default App;