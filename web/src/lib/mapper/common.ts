//@ts-nocheck
import { Request } from "~/types";
import type { QueryParams } from "../types";

export function getQuery(request: Request): QueryParams {
  if (!request.url) return {};
  const url = new URL(request.url, `https://${request.headers.host}`);
  return Object.fromEntries(url.searchParams.entries());
}
