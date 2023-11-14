import prisma from "./connection.js";
import type { Configuration } from "./types/config.js";

export async function getConfig(): Promise<Configuration> {
  const config = await prisma.configuration.findFirst({});
  if (!config) throw new Error("Config not found!");
  // Need to update this
  return config as any;
}
