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

    let v=type1;
    const getType = v%10;
    v= Math.floor(v / 10);
    const type=v%10;
    v= Math.floor(v / 10);
    const digits = v;

    console.log("Got :",digits);

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

    if(digits===4)
    {
      otp=otp.slice(0,-1);
    }
    else if (digits === 6) {
      const lastDigit = parseInt(otp[otp.length - 1]);
      const shifted = lastDigit >> 1;
      otp += shifted.toString();
    }
    else if(digits === 7)
    {
      const lastDigit = parseInt(otp[otp.length - 1]);
      let shifted = lastDigit >> 1;
      otp += shifted.toString();
      shifted=shifted>>1;
      otp+=shifted.toString();
    }

    console.log("otp digit:",otp);

    if (type === 1) {
      otp = otp.split('').map(d => String.fromCharCode('A'.charCodeAt(0) + parseInt(d))).join('');
    }

    console.log("otp complex:",otp);

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
