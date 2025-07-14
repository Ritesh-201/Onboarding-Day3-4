// Password Generator class
export class PasswordGenerator {
  constructor() {
    this.charsets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,./<>?'
    };
  }

  generatePassword(options = {}) {
    const {
      length = 12,
      includeUppercase = true,
      includeLowercase = true,
      includeNumbers = true,
      includeSymbols = false
    } = options;

    let charset = '';
    if (includeUppercase) charset += this.charsets.uppercase;
    if (includeLowercase) charset += this.charsets.lowercase;
    if (includeNumbers) charset += this.charsets.numbers;
    if (includeSymbols) charset += this.charsets.symbols;

    if (charset === '') {
      throw new Error('At least one character type must be selected');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  }

  calculateStrength(password) {
    let score = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) score += 25;
    else feedback.push('Use at least 8 characters');

    // Character variety checks
    if (/[a-z]/.test(password)) score += 25;
    else feedback.push('Include lowercase letters');

    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push('Include uppercase letters');

    if (/[0-9]/.test(password)) score += 15;
    else feedback.push('Include numbers');

    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    else feedback.push('Include special characters');

    let strength = 'Weak';
    if (score >= 85) strength = 'Very Strong';
    else if (score >= 70) strength = 'Strong';
    else if (score >= 50) strength = 'Medium';

    return { score, strength, feedback };
  }

  updateDisplay(password) {
    const outputElement = document.getElementById('password-output');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');

    if (outputElement) outputElement.textContent = password;

    const { score, strength } = this.calculateStrength(password);

    if (strengthFill) {
      strengthFill.style.width = `${score}%`;
      strengthFill.style.backgroundColor = 
        score >= 85 ? '#4CAF50' : 
        score >= 70 ? '#8BC34A' : 
        score >= 50 ? '#FFC107' : '#FF5722';
    }

    if (strengthText) strengthText.textContent = strength;
  }
}