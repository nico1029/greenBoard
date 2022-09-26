export interface LocationResponse {
  devices: Device[];
}

export interface Device {
  type: string;
  latLong: [number, number];
}
