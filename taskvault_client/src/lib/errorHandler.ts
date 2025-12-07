/**
 * Parse error and return user-friendly message
 */
export function getErrorMessage(error: any): string {
  // Server error response
  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  // Timeout or network error
  if (error.code === "ECONNABORTED" || error.message === "timeout of 120000ms exceeded") {
    return "Request timed out. The server may be starting up (Render free tier). Please try again.";
  }

  // Network error
  if (error.message === "Network Error" || !error.response) {
    return "Network error. Please check your connection and try again.";
  }

  // 5xx server error
  if (error.response?.status >= 500) {
    return "Server error. The backend may be restarting. Please try again in a moment.";
  }

  // Generic fallback
  return error.message || "An error occurred. Please try again.";
}
