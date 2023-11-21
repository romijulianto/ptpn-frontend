import ky from "ky"
import type { ListDeviceProperties, RealtimeProperties } from "./model"

export class TrackingApi {
  async getList() {
    return await ky
      .post(`${import.meta.env.VITE_LACAK_URL}/tracker/list/`, {
        json: {
          hash: import.meta.env.VITE_HASH
        }
      })
      .json<ListDeviceProperties>()
  }

  async getStates(listTrackers: number[]) {
    return await ky
      .post(`${import.meta.env.VITE_LACAK_URL}/tracker/get_states/`, {
        json: {
          hash: import.meta.env.VITE_HASH,
          trackers: listTrackers
        }
      })
      .json<RealtimeProperties>()
  }
}
