import cron from 'node-cron';
import { logger } from '@worldline/ctintegration-util';
import { sendNotificationForReviewPaymentsApp } from '@worldline/ctintegration-app';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
const cronScheduleTimer = process.env.NOTIFICATION_CRON_SCHEDULE || '* * * * *'; // Default to running every minute if not specified
async function sendNotificationForReviewPayments() {
  cron.schedule(cronScheduleTimer, async () => {
    try {
      await sendNotificationForReviewPaymentsApp();
    } catch (error) {
      logger().error(
        '[sendNotificationForReviewPayment] : Error in cron job:',
        JSON.stringify(error),
      );
    }
  });
}
sendNotificationForReviewPayments();

export { sendNotificationForReviewPayments };
