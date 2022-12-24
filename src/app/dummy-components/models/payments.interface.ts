import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface PaymentForm {
  amount: (
    | number
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)
  )[];
  currency: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)
  )[];
  method: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)
  )[];
  user: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)
  )[];
  vehicleBoardReference: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)
  )[];
}

export interface ServicesStorage {
  id?: string;
  endedAt: Date | string;
  initiatedAt: Date;
  payment: string;
  status: ServicesStorageStatus;
  totalTime: string;
  user: string;
  vehicleBoardReference: string;
}

export enum ServicesStorageStatus {
  Active = 'Active',
  Finished = 'Finished',
}

export interface PaymentsStorage {
  id?: string;
  amount: number;
  createdAt: Date;
  currency: string;
  method: string;
  user: string;
}
