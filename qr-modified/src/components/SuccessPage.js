import React from 'react';

const SuccessPage = ({ onRestart, theme }) => {
  return (
    <div style={{
      padding: '48px 32px',
      textAlign: 'center'
    }}>
      {/* Success Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: theme.success,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 32px auto',
        boxShadow: `0 8px 24px ${theme.success}40`
      }}>
        <span style={{ color: 'white', fontSize: '36px' }}>✓</span>
      </div>

      <h1 style={{
        color: theme.text,
        fontSize: '28px',
        fontWeight: '700',
        margin: '0 0 12px 0',
        letterSpacing: '-0.5px'
      }}>
        Verification Complete!
      </h1>

      <p style={{
        color: theme.textSecondary,
        fontSize: '16px',
        margin: '0 0 32px 0',
        lineHeight: '1.5'
      }}>
        Your OTP has been verified successfully. You're all set!
      </p>

      <button
        onClick={onRestart}
        style={{
          width: '100%',
          maxWidth: '300px',
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: '600',
          backgroundColor: theme.primary,
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: `0 4px 12px ${theme.primary}40`
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = theme.primaryDark;
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = `0 8px 24px ${theme.primary}50`;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = theme.primary;
          e.target.style.transform = 'none';
          e.target.style.boxShadow = `0 4px 12px ${theme.primary}40`;
        }}
      >
        Start New Verification
      </button>
    </div>
  );
};

export default SuccessPage;