import cron from 'node-cron';
import { initiateCapturePaymentApp } from '@worldline/ctintegration-app';
import { logger } from '@worldline/ctintegration-util';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const cronScheduleTimer = process.env.CRON_SCHEDULE || '* * * * *'; // Default to running every minute if not specified

async function initiateCapturePayment() {
  cron.schedule(cronScheduleTimer, async () => {
    try {
      await initiateCapturePaymentApp();
    } catch (error) {
      logger().error(
        '[initiateCapture] : Error in cron job:',
        JSON.stringify(error),
      );
    }
  });
}

initiateCapturePayment();

export { initiateCapturePayment };
