export interface BasicDevice {
  id: number;
  type: string;
  latLong: [number, number];
  date: string;
  lastUpdate: string;
  address: string;
  status?: string;
  isRunOutOfBattery?: string;
}

export interface Devices extends BasicDevice {
  batteryLevel: number;
}

export interface ElectricBike extends BasicDevice {
  batteryLevel: number;
}
