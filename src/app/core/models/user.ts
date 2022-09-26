export interface User {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: ProviderData;
  stsTokenManager: Token;
  uid: string;
}

export interface Token {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
}

export interface ProviderData {
  displayName: any;
  phoneNumber: any;
  photoUrl: string;
  providerId: string;
  uid: string;
}
