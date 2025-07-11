// // import React from 'react';

// // const SuccessPage = ({ onRestart, theme }) => {
// //   return (
// //     <div style={{
// //       padding: '48px 32px',
// //       textAlign: 'center'
// //     }}>
// //       {/* Success Icon */}
// //       <div style={{
// //         width: '80px',
// //         height: '80px',
// //         backgroundColor: theme.success,
// //         borderRadius: '50%',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         margin: '0 auto 32px auto',
// //         boxShadow: `0 8px 24px ${theme.success}40`
// //       }}>
// //         <span style={{ color: 'white', fontSize: '36px' }}>✓</span>
// //       </div>

// //       <h1 style={{
// //         color: theme.text,
// //         fontSize: '28px',
// //         fontWeight: '700',
// //         margin: '0 0 12px 0',
// //         letterSpacing: '-0.5px'
// //       }}>
// //         Verification Complete!
// //       </h1>

// //       <p style={{
// //         color: theme.textSecondary,
// //         fontSize: '16px',
// //         margin: '0 0 32px 0',
// //         lineHeight: '1.5'
// //       }}>
// //         Your OTP has been verified successfully. You're all set!
// //       </p>

// //       <button
// //         onClick={onRestart}
// //         style={{
// //           width: '100%',
// //           maxWidth: '300px',
// //           padding: '16px 24px',
// //           fontSize: '16px',
// //           fontWeight: '600',
// //           backgroundColor: theme.primary,
// //           color: 'white',
// //           border: 'none',
// //           borderRadius: '12px',
// //           cursor: 'pointer',
// //           transition: 'all 0.3s ease',
// //           boxShadow: `0 4px 12px ${theme.primary}40`
// //         }}
// //         onMouseEnter={(e) => {
// //           e.target.style.backgroundColor = theme.primaryDark;
// //           e.target.style.transform = 'translateY(-2px)';
// //           e.target.style.boxShadow = `0 8px 24px ${theme.primary}50`;
// //         }}
// //         onMouseLeave={(e) => {
// //           e.target.style.backgroundColor = theme.primary;
// //           e.target.style.transform = 'none';
// //           e.target.style.boxShadow = `0 4px 12px ${theme.primary}40`;
// //         }}
// //       >
// //         Start New Verification
// //       </button>
// //     </div>
// //   );
// // };

// // export default SuccessPage;

// // import React, { useEffect } from 'react';

// // const SuccessPage = ({ setVerified, theme }) => {
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setVerified(true); // mark as verified and auto-close
// //     }, 2000); // show for 2 seconds
// //     return () => clearTimeout(timer);
// //   }, [setVerified]);

// //   return (
// //     <div
// //       style={{
// //         position: 'fixed',
// //         top: 0,
// //         left: 0,
// //         width: '100vw',
// //         height: '100vh',
// //         backgroundColor: 'rgba(0, 0, 0, 0.4)',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         zIndex: 1000,
// //       }}
// //     >
// //       <div
// //         style={{
// //           backgroundColor: '#fff',
// //           borderRadius: '16px',
// //           padding: '48px 32px',
// //           boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
// //           textAlign: 'center',
// //           width: '400px',
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: '80px',
// //             height: '80px',
// //             backgroundColor: theme.success,
// //             borderRadius: '50%',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             margin: '0 auto 32px auto',
// //             boxShadow: `0 8px 24px ${theme.success}40`,
// //           }}
// //         >
// //           <span style={{ color: 'white', fontSize: '36px' }}>✓</span>
// //         </div>

// //         <h1
// //           style={{
// //             color: theme.text,
// //             fontSize: '28px',
// //             fontWeight: '700',
// //             margin: '0 0 12px 0',
// //             letterSpacing: '-0.5px',
// //           }}
// //         >
// //           Verification Complete!
// //         </h1>

// //         <p
// //           style={{
// //             color: theme.textSecondary,
// //             fontSize: '16px',
// //             margin: '0',
// //             lineHeight: '1.5',
// //           }}
// //         >
// //           Your OTP has been verified successfully.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SuccessPage;


// import React, { useEffect } from 'react';

// const SuccessPage = ({ onComplete, theme }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (typeof onComplete === "function") {
//         console.log("⏱️ Triggering onComplete");
//         onComplete(true);
//       } else {
//         console.error("❌ onComplete is not a function");
//       }
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [onComplete]);



//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: 'rgba(0, 0, 0, 0.4)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: '#fff',
//           borderRadius: '16px',
//           padding: '48px 32px',
//           boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
//           textAlign: 'center',
//           width: '400px',
//         }}
//       >
//         <div
//           style={{
//             width: '80px',
//             height: '80px',
//             backgroundColor: theme.success,
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '0 auto 32px auto',
//             boxShadow: `0 8px 24px ${theme.success}40`,
//           }}
//         >
//           <span style={{ color: 'white', fontSize: '36px' }}>✓</span>
//         </div>

//         <h1
//           style={{
//             color: theme.text,
//             fontSize: '28px',
//             fontWeight: '700',
//             margin: '0 0 12px 0',
//             letterSpacing: '-0.5px',
//           }}
//         >
//           Verification Complete!
//         </h1>

//         <p
//           style={{
//             color: theme.textSecondary,
//             fontSize: '16px',
//             margin: '0',
//             lineHeight: '1.5',
//           }}
//         >
//           Your OTP has been verified successfully.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;


import React, { useEffect } from 'react';

const SuccessPage = ({ onComplete = () => {}, theme = {} }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("⏱️ Triggering onComplete");
      if (typeof onComplete === "function") {
        onComplete(true);
      } else {
        console.error("❌ onComplete is not a function");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: theme.cardBackground || '#fff',
          borderRadius: '16px',
          padding: '48px 32px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          textAlign: 'center',
          width: '400px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: theme.success || '#28a745',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px auto',
            boxShadow: `0 8px 24px ${(theme.success || '#28a745')}40`,
          }}
        >
          <span style={{ color: 'white', fontSize: '36px' }}>✓</span>
        </div>

        <h1
          style={{
            color: theme.text || '#000',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px',
          }}
        >
          Verification Complete!
        </h1>

        <p
          style={{
            color: theme.textSecondary || '#444',
            fontSize: '16px',
            margin: '0',
            lineHeight: '1.5',
          }}
        >
          Your OTP has been verified successfully.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
