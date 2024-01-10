export type Action = {
  (): Promise<{
    isRetry: boolean;
    data?: unknown;
  }>;
};
