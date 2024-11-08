<script setup>
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import useLocationMap from '@/composables/useLocationMap'

import { propertyPrice } from '@/helpers'
import { watch } from 'vue'

const route = useRoute()
const db = useFirestore()
const { zoom, center } = useLocationMap()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

watch(property, () => {
  center.value = property.value.location
})
</script>

<template>
  <v-card flat>
    <v-card-title class="text-h3 font-weight-bold mt-5 py-5 text-center">
      {{ property?.title }}
    </v-card-title>
    <v-img :src="property?.image" height="550" cover></v-img>
    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center">
      <v-card-text>
        Price <span class="font-weight-bold">{{ propertyPrice(property?.price) }}</span>
      </v-card-text>
      <v-card-text>
        Bathrooms <span class="font-weight-bold">{{ property?.bathrooms }}</span>
      </v-card-text>
      <v-card-text>
        Parking Spaces <span class="font-weight-bold">{{ property?.parkingSpaces }}</span>
      </v-card-text>
      <v-card-text>
        Rooms <span class="font-weight-bold">{{ property?.rooms }}</span>
      </v-card-text>
    </div>
    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-wrap py-10">
          {{ property?.description }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="py-10" style="height: 600px">
          <l-map v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center">
              <LPopup>
                {{ property?.title }}
              </LPopup>
            </LMarker>
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </l-map>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
