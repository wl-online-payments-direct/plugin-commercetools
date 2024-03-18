import fs from 'fs';
import archiver from 'archiver';
import { ServerResponse } from 'http';
import { logger } from '@worldline/ctintegration-util';
import Constants from './constants';

export async function downloadLogHandler(
  response: ServerResponse,
  logPath: string,
) {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(logPath);

  // Create a zip file
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level
  });

  fileStream.on('close', () => {
    logger().info(`${archive.pointer()} total bytes`);
    logger().info(`File archive has been finalized for ${logPath}`);
  });

  fileStream.on('warning', (err) => {
    logger().warn(JSON.stringify(err));
  });

  archive.on('error', (err) => {
    logger().error(`File stream encountered an error. ${JSON.stringify(err)}`);
    throw err;
  });

  // Pipe the zip file to the response stream
  archive.pipe(response);

  // Define zip file name
  const downloadName = Constants.getDownloadFileName();

  // Add the file to the zip
  archive.append(fileStream, { name: downloadName });

  // Finalize the zip
  archive.finalize();
}
