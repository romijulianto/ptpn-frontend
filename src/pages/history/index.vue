<script setup lang="ts">
import Feature from "ol/Feature"
import Map from "ol/Map"
import View from "ol/View"
import { Point } from "ol/geom"
import { Circle, Fill, Style } from "ol/style"
import { Tile as TileLayer } from "ol/layer"
import { OSM } from "ol/source"
import VectorSource from "ol/source/Vector"
import VectorLayer from "ol/layer/Vector"
import GeoJSON from "ol/format/GeoJSON"
import { TrackingApi } from "~/services/api/service"
import { lineLayer } from "~/utils/layers"

const map = ref<Map>()
const mapRef = ref<HTMLElement>()

const FULL_VIEW = {
  center: [117.25620141667574, -0.31222948067971146],
  zoom: 5,
  projection: "EPSG:4326"
}

/* TODO: plot tracking history */
const trackingApi = new TrackingApi()
const listTrackers: number[] = []
const pointLayer = ref()
const coordinates = ref<number[][]>()
async function getListAvailable() {
  // get list available device
  const listDevice = await trackingApi.getList()
  listTrackers.push(...listDevice.list.map((item: any) => item.id))

  // get history position from only listTrackers[1]
  const tracking = await trackingApi.getStatesHistory(
    listTrackers[1],
    "2023-11-21 00:00:00",
    "2023-11-21 23:59:59"
  )

  // fill the coordinates to create line
  coordinates.value = Object.keys(tracking.list).map((item: any) => {
    const tracker = tracking.list[item]
    return [tracker.lng, tracker.lat]
  })

  tracking.list.forEach((point) => {
    const marker = new Feature({
      geometry: new Point([point.lng, point.lat])
    })

    const markerStyle = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: "#b91c22" })
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

async function plotLineTracking() {
  const initLine = {
    type: "LineString",
    coordinates: coordinates.value
  }
  lineLayer.getSource()!.clear()
  lineLayer.getSource()!.addFeatures(new GeoJSON().readFeatures(initLine))
  map.value!.addLayer(lineLayer)
}

onMounted(async () => {
  map.value = new Map({
    target: mapRef.value,
    view: new View(FULL_VIEW)
  })

  const osmBasemap = new TileLayer({
    source: new OSM(),
    preload: Number.POSITIVE_INFINITY,
    visible: true
  })
  map.value.addLayer(osmBasemap)
  await getListAvailable()
  map.value.getView().fit(pointLayer.value.getSource().getExtent(), {
    duration: 800,
    maxZoom: 9
  })
  await plotLineTracking()
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
