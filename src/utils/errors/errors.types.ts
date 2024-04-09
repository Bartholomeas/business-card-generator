import { type errorMessages } from "~/utils/errors/errors.constants";

export type ErrorCodes = keyof typeof errorMessages;

export interface ApiError {
  errors: {
    code: ErrorCodes | undefined;
    message: string | undefined;
    property?: string | null;
    properties: { key: string; value: string }[];
  }[];
}