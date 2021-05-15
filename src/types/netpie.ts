export interface DeviceStateDto {
  aircon: number
  capacity: number
  count: number
  light: true
}

export interface NetpieDataDto {
  deviceid: string
  data: DeviceStateDto
  rev: number
  modified: number
}
