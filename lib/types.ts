export interface TemperatureData {
  id: string;
  temperature: number;
  timestamp: string;
}

export interface TemperatureResponse {
  temperature: number;
  id: string;
  _ts: number;
}