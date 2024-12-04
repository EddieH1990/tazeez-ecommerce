export const generateTestOrderId = () => {
  return `test-${Math.random().toString(36).substr(2, 9)}`;
};

export const validateTestCard = (cardNumber: string): boolean => {
  // Luhn algorithm for test card validation
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const getTestBankAccounts = () => {
  return [
    {
      bankName: 'Test Bank',
      accountNumber: '1234567890',
      accountName: 'Test Account',
      iban: 'SA0380000000608010167519',
    },
    {
      bankName: 'Demo Bank',
      accountNumber: '9876543210',
      accountName: 'Demo Account',
      iban: 'SA7120000002123456789940',
    }
  ];
};