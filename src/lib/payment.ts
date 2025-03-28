interface PaymentConfig {
  amount: number;
  currency: string;
  description: string;
  customerPhone: string;
  customerName: string;
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// Configuration Wave
const waveConfig = {
  apiKey: process.env.WAVE_API_KEY,
  apiUrl: 'https://api.wave.com/v1',
};

// Configuration Orange Money
const orangeMoneyConfig = {
  apiKey: process.env.ORANGE_MONEY_API_KEY,
  apiUrl: 'https://api.orange.com/orange-money',
};

// Configuration Free Money
const freeMoneyConfig = {
  apiKey: process.env.FREE_MONEY_API_KEY,
  apiUrl: 'https://api.free-money.com/v1',
};

// Fonction pour effectuer un paiement via Wave
export async function processWavePayment(config: PaymentConfig): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${waveConfig.apiUrl}/checkout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${waveConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: config.amount,
        currency: config.currency,
        description: config.description,
        customer: {
          phone: config.customerPhone,
          name: config.customerName,
        },
      }),
    });

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
    };
  } catch (error) {
    console.error('Wave payment error:', error);
    return {
      success: false,
      error: 'Erreur lors du paiement Wave',
    };
  }
}

// Fonction pour effectuer un paiement via Orange Money
export async function processOrangeMoneyPayment(config: PaymentConfig): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${orangeMoneyConfig.apiUrl}/payment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${orangeMoneyConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: config.amount,
        currency: config.currency,
        description: config.description,
        customer: {
          phone: config.customerPhone,
          name: config.customerName,
        },
      }),
    });

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
    };
  } catch (error) {
    console.error('Orange Money payment error:', error);
    return {
      success: false,
      error: 'Erreur lors du paiement Orange Money',
    };
  }
}

// Fonction pour effectuer un paiement via Free Money
export async function processFreeMoneyPayment(config: PaymentConfig): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${freeMoneyConfig.apiUrl}/payment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${freeMoneyConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: config.amount,
        currency: config.currency,
        description: config.description,
        customer: {
          phone: config.customerPhone,
          name: config.customerName,
        },
      }),
    });

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
    };
  } catch (error) {
    console.error('Free Money payment error:', error);
    return {
      success: false,
      error: 'Erreur lors du paiement Free Money',
    };
  }
}

// Fonction principale pour effectuer un paiement
export async function processPayment(
  config: PaymentConfig,
  paymentMethod: 'wave' | 'orange' | 'free'
): Promise<PaymentResponse> {
  switch (paymentMethod) {
    case 'wave':
      return processWavePayment(config);
    case 'orange':
      return processOrangeMoneyPayment(config);
    case 'free':
      return processFreeMoneyPayment(config);
    default:
      return {
        success: false,
        error: 'Méthode de paiement non supportée',
      };
  }
} 