class SecureOTPManager {
  constructor() {
    this.otpData = null;
    this.type1 = 0;
    this.generatedAt = null;
    this.attempts = 0;
    this.maxAttempts = 3;
    this.expiryMinutes = 5;
  }

  generateOTP(digitString, type1) {
    const getType = type1;

    const pairs = [];
    for (let i = 0; i < digitString.length; i += 2) {
      pairs.push(digitString.slice(i, i + 2));
    }

    const singleDigits = pairs.map(pair => {
      let sum = parseInt(pair[0]) + parseInt(pair[1]);
      while (sum >= 10) {
        sum = Math.floor(sum / 10) + (sum % 10);
      }
      return sum;
    });

    let otp = '';

    if (getType === 0) {
      let reversed = singleDigits.slice().reverse();
      const firstTwo = reversed.slice(0, 2);
      const remaining = reversed.slice(2);
      let shifted = remaining.concat(firstTwo);
      [shifted[1], shifted[3]] = [shifted[3], shifted[1]];
      otp = shifted.join('');
    } else if (getType === 1) {
      const key = 'DECAF';
      const keyAscii = Array.from(key).map(c => c.charCodeAt(0));
      otp = singleDigits.map((digit, i) => digit & (keyAscii[i] % 10)).join('');
    } else if (getType === 2) {
      otp = singleDigits.map(d => d >> 1).join('');
    } else if (getType === 3) {
      otp = singleDigits.map((d, i) => {
        let product = d * singleDigits[(i + 1) % singleDigits.length];
        while (product >= 10) {
          product = Math.floor(product / 10) + (product % 10);
        }
        return product;
      }).join('');
    } else {
      otp = singleDigits.map((d, i) => {
        let product = d * singleDigits[(i - 1 + singleDigits.length) % singleDigits.length];
        while (product >= 10) {
          product = Math.floor(product / 10) + (product % 10);
        }
        return product;
      }).join('');
    }

    this.otpData = otp;
    this.generatedAt = new Date();
    this.attempts = 0;

    return otp;
  }

  verifyOTP(inputOTP) {
    if (!this.otpData) {
      return { success: false, message: 'No OTP generated' };
    }

    if (this.attempts >= this.maxAttempts) {
      this.clearOTP();
      return { success: false, message: 'Maximum attempts exceeded. Please generate a new OTP.' };
    }

    this.attempts++;

    if (this.otpData === inputOTP) {
      this.clearOTP();
      return { success: true, message: 'OTP verified successfully!' };
    } else {
      const remainingAttempts = this.maxAttempts - this.attempts;
      return {
        success: false,
        message: `Invalid OTP. ${remainingAttempts} attempts remaining.`
      };
    }
  }

  clearOTP() {
    this.otpData = null;
    this.generatedAt = null;
    this.attempts = 0;
  }
}

export const otpManager = new SecureOTPManager();
