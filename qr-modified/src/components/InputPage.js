import React, { useState } from 'react';
import { otpManager } from '../utils/otpManager';

const InputPage = ({ onSubmit, theme, isDark, type1 }) => {
  const [inputData, setInputData] = useState('');

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) {
      setInputData(input);
    }
  };

  const handleSubmit = () => {
    if (inputData.length === 10) {
      const key="9D941AF69FAA5E041172D29A8B459BB4";
      otpManager.generateOTP(inputData, type1);
      onSubmit(inputData);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputData.length === 10) {
      handleSubmit();
    }
  };

  return (
    <div style={{ padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: theme.primary,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          boxShadow: `0 8px 24px ${theme.primary}40`
        }}>
          <span style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>🔐</span>
        </div>

        <h1 style={{
          color: theme.text,
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 8px 0',
          letterSpacing: '-0.5px'
        }}>
          Secure Authentication
        </h1>

        <p style={{
          color: theme.textSecondary,
          fontSize: '16px',
          margin: '0',
          lineHeight: '1.5'
        }}>
          Enter your 10-digit number to generate a secure OTP
        </p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <input
          type="text"
          value={inputData}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          maxLength={10}
          placeholder="Enter 10 digits"
          style={{
            width: '100%',
            maxWidth: '300px',
            padding: '16px 20px',
            fontSize: '18px',
            border: `2px solid ${inputData ? theme.borderActive : theme.border}`,
            borderRadius: '12px',
            textAlign: 'center',
            background: theme.cardBackground,
            color: theme.text,
            outline: 'none',
            letterSpacing: '2px',
            fontWeight: '500'
          }}
        />

        <div style={{
          marginTop: '12px',
          fontSize: '14px',
          color: theme.textSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: inputData.length === 10 ? theme.success : theme.border
          }} />
          {inputData.length}/10 digits entered
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={inputData.length !== 10}
        style={{
          width: '100%',
          maxWidth: '300px',
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: '600',
          backgroundColor: inputData.length === 10 ? theme.primary : theme.textSecondary,
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: inputData.length === 10 ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          transform: inputData.length === 10 ? 'none' : 'scale(0.98)',
          boxShadow: inputData.length === 10 ? `0 4px 12px ${theme.primary}40` : 'none'
        }}
        onMouseEnter={(e) => {
          if (inputData.length === 10) {
            e.target.style.backgroundColor = theme.primaryDark;
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 8px 24px ${theme.primary}50`;
          }
        }}
        onMouseLeave={(e) => {
          if (inputData.length === 10) {
            e.target.style.backgroundColor = theme.primary;
            e.target.style.transform = 'none';
            e.target.style.boxShadow = `0 4px 12px ${theme.primary}40`;
          }
        }}
      >
        Generate Secure OTP →
      </button>
    </div>
  );
};

export default InputPage;