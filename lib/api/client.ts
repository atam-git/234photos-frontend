const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new APIError(
      response.status,
      error.code || 'UNKNOWN_ERROR',
      error.message || 'An error occurred',
      error.details
    );
  }
  
  return response.json();
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    switch (error.code) {
      case 'UNAUTHORIZED':
        return 'Please log in to continue';
      case 'RATE_LIMITED':
        return 'Too many requests. Please try again later';
      case 'INSUFFICIENT_CREDITS':
        return 'You need more credits to download this asset';
      case 'ASSET_NOT_FOUND':
        return 'This asset is no longer available';
      default:
        return error.message;
    }
  }
  return 'Something went wrong. Please try again';
};
