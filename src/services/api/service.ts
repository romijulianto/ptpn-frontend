import ky from "ky"
import type { HistoryTracker, ListDeviceProperties, RealtimeProperties } from "./model"

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

  async getStatesHistory(trackerId: number, startDate: string, endDate: string) {
    return await ky
      .post(`${import.meta.env.VITE_LACAK_URL}/track/read/`, {
        json: {
          hash: import.meta.env.VITE_HASH,
          tracker_id: trackerId,
          from: startDate,
          to: endDate,
          filter: true
        }
      })
      .json<HistoryTracker>()
  }
}
