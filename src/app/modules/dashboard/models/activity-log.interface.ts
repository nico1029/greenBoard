import { Devices } from 'src/app/shared/models/devices.interface';

export interface Records extends Devices {
  isRead: boolean;
  description: string;
}
