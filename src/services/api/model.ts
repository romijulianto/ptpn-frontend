export interface ListDeviceProperties {
  success: boolean
  list: List[]
}

export interface List {
  id: number
  label: string
  group_id: number
  source: Source
  tag_bindings: any[]
  clone: boolean
}

export interface Source {
  id: number
  device_id: string
  model: string
  blocked: boolean
  tariff_id: number
  phone: string
  status_listing_id?: number
  creation_date: string
  tariff_end_date: string
}

export interface RealtimeProperties {
  success: boolean
  user_time: string
  states: States[]
}

export interface States {
  source_id: number
  gps: Gps
  connection_status: string
  movement_status: string
  gsm: Gsm
  last_update: string
  battery_level: number
  battery_update: string
  inputs: boolean[]
  inputs_update: string
  outputs: boolean[]
  outputs_update: string
  additional: Additional
  actual_track_update: string
}

export interface Gps {
  updated: string
  signal_level: number
  location: Location
  heading: number
  speed: number
  alt: number
}

export interface Location {
  lat: number
  lng: number
}

export interface Gsm {
  updated: string
  signal_level: number
  network_name: string
  roaming: boolean
}

export interface Additional {
  hardware_key: HardwareKey
}

export interface HardwareKey {
  value: string
  updated: string
}

export interface HistoryTracker {
  success: boolean
  list: ListHistory[]
  limit_exceeded: boolean
}

export interface ListHistory {
  address: string
  satellites: number
  get_time: string
  mileage: number
  heading: number
  speed: number
  alt: number
  lat: number
  lng: number
}
