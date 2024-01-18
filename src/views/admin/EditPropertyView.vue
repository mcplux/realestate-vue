<script setup>
import "leaflet/dist/leaflet.css"

import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { doc, updateDoc } from 'firebase/firestore'
import { useField, useForm } from 'vee-validate'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import useImage from '../../composables/useImage'
import useLocationMap from '../..//composables/useLocationMap'
import { validationSchema } from '../../validation/propertySchema'

const items = [1, 2, 3, 4, 5]

const { url, uploadImage, imageServer } = useImage()
const { zoom, center, pin } = useLocationMap()

const { handleSubmit } = useForm({ validationSchema });

const title = useField('title')
const image = useField('image')
const price = useField('price')
const rooms = useField('rooms')
const bathrooms = useField('bathrooms')
const parkings = useField('parkings')
const description = useField('description')
const pool = useField('pool')

const route = useRoute()
const router = useRouter()

const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

watch(property, property => {
  title.value.value = property.title
  price.value.value = property.price
  rooms.value.value = property.rooms
  bathrooms.value.value = property.bathrooms
  parkings.value.value = property.parkings
  description.value.value = property.description
  pool.value.value = property.pool
  center.value = property.location
})

const submit = handleSubmit(async values => {
  const { image, ...property } = values
  if(imageServer.value) {
    const data = {
      ...property,
      image: url.value,
      location: center.value,
    }

    await updateDoc(docRef, data)
  } else {
    const data = {
      ...property,
      location: center.value,
    }

    await updateDoc(docRef, data)
  }

  router.push({name: 'admin-properties'})
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      New Property
    </v-card-title>

    <v-card-subtitle>
      Create a new property by filling out the following form
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field 
        class="mb-5"
        label="Property Title"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />

      <v-file-input 
        class="mb-5"
        accept="image/jpeg"
        label="Photo"
        prepend-icon="mdi-camera"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        @change="uploadImage"
      />

      <div class="my-5">
        <p class="font-weight-bold">Current image: </p>
        <img v-if="imageServer" class="w-50" :src="imageServer" alt="Property Image">
        <img v-else class="w-50" :src="property?.image" alt="Property Image">
      </div>

      <v-text-field 
        class="mb-5"
        label="Price"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />
      
      <v-row>
        <v-col cols="12" md="4">
          <v-select 
          label="Rooms"
          class="mb-5"
          :items="items"
          v-model="rooms.value.value"
          :error-messages="rooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select 
          label="Bathrooms"
          class="mb-5"
          :items="items"
          v-model="bathrooms.value.value"
          :error-messages="bathrooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select 
          label="Parking spaces"
          class="mb-5"
          :items="[0, 1, 2, 3, 4, 5]"
          v-model="parkings.value.value"
          />
        </v-col>
      </v-row>

      <v-textarea 
        class="mb-5"
        label="Description"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      />

      <v-checkbox 
        label="Pool"
        v-model="pool.value.value"
      />

      <h2 class="font-weight-bold text-center my-5">Location</h2>

      <div class="pb-10">
        <div style="height:600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker 
              :lat-lng="center"
              draggable
              @moveend="pin"
            />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">
        Save changes
      </v-btn>
    </v-form>
  </v-card>
</template>
