export interface DeviceStateDto {
  changeId: number
  capacity: number
  count: number
  airconOn: boolean
  airconTemp: number
  light1: boolean
  light2: boolean
  light3: boolean
  light4: boolean
  light5: boolean
}

export interface NetpieDataDto {
  deviceid: string
  data: DeviceStateDto
  rev: number
  modified: number
}
