export enum JSendStatus {
  ERROR = "error",
  FAIL = "fail",
  SUCCESS = "success"
}

export interface JSendResponseBase<T, S extends JSendStatus = JSendStatus> {
  status: S
  data: T
  message?: string
  messages?: string[]
}

export interface JSendResponse<T> {
  status: string
  data: T
  message?: string
  messages?: string[]
}
