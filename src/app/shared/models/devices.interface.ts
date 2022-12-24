export interface Vehicle {
  id: number;
  type: string;
}

export interface VehicleStorage extends Vehicle {
  boardReference: string;
  brand: string;
  createdAt: Date;
  serialNumber: string;
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
