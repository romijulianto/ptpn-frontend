<script setup lang="ts">
import Feature from "ol/Feature"
import Map from "ol/Map"
import View from "ol/View"
import { Point } from "ol/geom"
import { Circle, Fill, Stroke, Style } from "ol/style"
import { Tile as TileLayer } from "ol/layer"
import { XYZ } from "ol/source"
import VectorSource from "ol/source/Vector"
import VectorLayer from "ol/layer/Vector"
import { TrackingApi } from "~/services/api/service"

const map = ref<Map>()
const mapRef = ref<HTMLElement>()

const FULL_VIEW = {
  center: [117.25620141667574, -0.31222948067971146],
  zoom: 5,
  projection: "EPSG:4326"
}

/* TODO: get realtime position */
const trackingApi = new TrackingApi()
const listTrackers: number[] = []
const pointLayer = ref()
async function plotRealtime() {
  const listDevice = await trackingApi.getList()
  listTrackers.push(...listDevice.list.map((item: any) => item.id))
  const realtime = await trackingApi.getStates(listTrackers)
  const locationData = Object.keys(realtime.states).map((listTrackers: any) => {
    const tracker = realtime.states[listTrackers]
    return {
      id: listTrackers,
      updated: tracker.gps.updated,
      movement_status: tracker.movement_status,
      lat: tracker.gps.location.lat,
      lng: tracker.gps.location.lng
    }
  })

  locationData.forEach((point) => {
    const marker = new Feature({
      geometry: new Point([point.lng, point.lat])
    })

    const markerStyle = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: "#b91c22" }),
        stroke: new Stroke({ color: "white", width: 2 })
      })
    })

    marker.setStyle(markerStyle)
    const vectorSource = new VectorSource({
      features: [marker]
    })

    pointLayer.value = new VectorLayer({
      source: vectorSource
    })

    map.value!.addLayer(pointLayer.value)
  })
}

onMounted(async () => {
  map.value = new Map({
    target: mapRef.value,
    view: new View(FULL_VIEW)
  })

  const osmBasemap = new TileLayer({
    source: new XYZ({
      url: "https://tiles.supermap.id/styles/positron/{z}/{x}/{y}.png"
    }),
    preload: Number.POSITIVE_INFINITY,
    visible: true
  })
  map.value.addLayer(osmBasemap)
  await plotRealtime()
  map.value.getView().fit(pointLayer.value.getSource().getExtent(), {
    duration: 800,
    maxZoom: 6
  })
})
</script>

<template>
  <div id="map" ref="mapRef" class="absolute w-full h-full"></div>
</template>

<style>
@import "ol/ol.css";

#map {
  top: 0;
  left: 0;
}

.ol-zoom {
  left: unset;
  right: 8px;
}
</style>
