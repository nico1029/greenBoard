export interface Marker {
  type: string;
  data: MarkerData;
}

export interface MarkerData {
  type: string;
  features: MarkerFeatures[];
}

export interface MarkerFeatures {
  type: string;
  properties: MarkerProperties;
  geometry: MarkerGeometry;
}

export interface MarkerProperties {
  description: string;
  icon: string;
}

export interface MarkerGeometry {
  type: string;
  coordinates: [number, number];
}