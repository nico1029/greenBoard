export interface Vehicle {
  id: number;
  type: string;
}

export interface VehicleStorage extends Vehicle {
  brand: string;
  createdAt: string;
  model: string;
  modifiedAt: string;
}
export interface BasicDevice extends Vehicle {
  latLong: [number, number];
  date: string;
  lastUpdate: string;
  address: string;
  status?: string;
  isRunOutOfBattery?: string;
  lastLatLong: [number, number];
  operation: string;
}

export interface Devices extends BasicDevice {
  batteryLevel: number;
}
