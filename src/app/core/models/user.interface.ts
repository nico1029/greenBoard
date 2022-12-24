import { AbstractControl, ValidationErrors } from '@angular/forms';
export interface UserAuth {
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

export interface LoginForm {
  email: any;
  password?: any;
}

export interface UserStorage {
  id?: string;
  email: string;
  lastLogin?: string;
  lastName: string;
  lastUpdate?: string;
  createdAt?: string;
  name: string;
  phone: string;
  picture: string;
  role: string;
}

export interface UserForm {
  autoGenerate: (
    | boolean
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  email: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  fullName: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  password: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  phone: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  phoneIndicator: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)
  )[];
  picture: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  role: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)
  )[];
}
