import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface NotificationConfig {
  to: string;
  message: string;
  type: 'sms' | 'whatsapp';
}

interface NotificationResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Fonction pour envoyer un SMS
export async function sendSMS(config: NotificationConfig): Promise<NotificationResponse> {
  try {
    const message = await twilioClient.messages.create({
      body: config.message,
      to: config.to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return {
      success: true,
      messageId: message.sid,
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return {
      success: false,
      error: 'Erreur lors de l\'envoi du SMS',
    };
  }
}

// Fonction pour envoyer un message WhatsApp
export async function sendWhatsApp(config: NotificationConfig): Promise<NotificationResponse> {
  try {
    const message = await twilioClient.messages.create({
      body: config.message,
      to: `whatsapp:${config.to}`,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
    });

    return {
      success: true,
      messageId: message.sid,
    };
  } catch (error) {
    console.error('WhatsApp sending error:', error);
    return {
      success: false,
      error: 'Erreur lors de l\'envoi du message WhatsApp',
    };
  }
}

// Fonction pour envoyer une notification de confirmation de réservation
export async function sendReservationConfirmation(
  phoneNumber: string,
  reservationDetails: {
    barberName: string;
    service: string;
    date: string;
    time: string;
    price: number;
  }
): Promise<NotificationResponse> {
  const message = `
    Votre réservation a été confirmée !
    Barbier: ${reservationDetails.barberName}
    Service: ${reservationDetails.service}
    Date: ${reservationDetails.date}
    Heure: ${reservationDetails.time}
    Prix: ${reservationDetails.price} FCFA
  `;

  return sendSMS({
    to: phoneNumber,
    message,
    type: 'sms',
  });
}

// Fonction pour envoyer un rappel de rendez-vous
export async function sendAppointmentReminder(
  phoneNumber: string,
  appointmentDetails: {
    barberName: string;
    service: string;
    date: string;
    time: string;
  }
): Promise<NotificationResponse> {
  const message = `
    Rappel de votre rendez-vous !
    Barbier: ${appointmentDetails.barberName}
    Service: ${appointmentDetails.service}
    Date: ${appointmentDetails.date}
    Heure: ${appointmentDetails.time}
  `;

  return sendWhatsApp({
    to: phoneNumber,
    message,
    type: 'whatsapp',
  });
}

// Fonction principale pour envoyer une notification
export async function sendNotification(
  config: NotificationConfig
): Promise<NotificationResponse> {
  switch (config.type) {
    case 'sms':
      return sendSMS(config);
    case 'whatsapp':
      return sendWhatsApp(config);
    default:
      return {
        success: false,
        error: 'Type de notification non supporté',
      };
  }
} 