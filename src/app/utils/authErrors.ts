// src/app/utils/authErrors.ts
export const getAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered. Please log in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/operation-not-allowed": "Email/password sign-up is currently disabled.",
    "auth/account-exists-with-different-credential": "This email is already registered with another method.",
    "auth/popup-closed-by-user": "Sign up was cancelled. Please try again.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/too-many-requests": "Too many attempts. Please try again later."
  };

  return errorMessages[errorCode] || "Something went wrong. Please try again.";
};