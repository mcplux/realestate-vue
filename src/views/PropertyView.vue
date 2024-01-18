<script setup>
import 'leaflet/dist/leaflet.css'

import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import { formatPrice } from '../helpers'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import useLocationMap from '../composables/useLocationMap'

const { zoom, center } = useLocationMap()

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

watch(property, property => {
  center.value = property.location
})
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h4 text-center font-weight-bold py-5">
      {{ property?.title }}
    </v-card-title>
    
    <v-img :src="property?.image" height="550" cover />

    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center">
      <v-card-text>
        Price: <span class="font-weight-bold">{{ formatPrice(property?.price) }}</span>
      </v-card-text>

      <v-card-text>
        Bathrooms: <span class="font-weight-bold">{{ property?.bathrooms }}</span>
      </v-card-text>

      <v-card-text>
        Parking spaces: <span class="font-weight-bold">{{ property?.parkings }}</span>
      </v-card-text>

      <v-card-text>
        Rooms: <span class="font-weight-bold">{{ property?.rooms }}</span>
      </v-card-text>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-grap py-10">
          {{ property?.description }}
        </div>  
      </v-col>

      <v-col cols="12" md="4">
        <div class="py-10" style="height: 400px;">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center">
              <LPopup>{{ property.title }}</LPopup>
            </LMarker>
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
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
