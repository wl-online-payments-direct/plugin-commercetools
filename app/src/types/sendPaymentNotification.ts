export interface EmailConfig {
  host: string;
  port: string;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface SendNotificationResponse {
  accepted: string[];
  rejected: string[];
  envelopeTime?: number;
  messageTime?: number;
  messageSize?: number;
  response: string;
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
}
