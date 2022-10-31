export interface BasicDevice {
  deviceId: number;
  type: string;
  latLong: [number, number];
  date: string;
}

export interface Devices extends BasicDevice {
  batteryLevel: number;
}

export interface ElectricBike extends BasicDevice {
  batteryLevel: number;
}
