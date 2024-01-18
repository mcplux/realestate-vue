<script setup>
import 'leaflet/dist/leaflet.css'

import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import useImage from '../../composables/useImage'
import useLocationMap from '../../composables/useLocationMap'
import { validationSchema, imageSchema } from '../../validation/propertySchema'

const db = useFirestore()
const router = useRouter()
const { url, uploadImage, imageServer } = useImage()
const { zoom, center, pin } = useLocationMap()

const items = [1, 2, 3, 4, 5]

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  }
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const rooms = useField('rooms')
const bathrooms = useField('bathrooms')
const parkings = useField('parkings', null, {initialValue: 0})
const description = useField('description')
const pool = useField('pool', null, {initialValue: false})

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values

  const docRef = await addDoc(collection(db, "properties"), {
    ...property,
    image: url.value,
    location: center.value,
  });
  if(docRef.id) {
    router.push({name: "admin-properties"})
  }
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

      <div v-if="imageServer" class="my-5">
        <p class="font-weight-bold">Image: </p>
        <img class="w-50" :src="imageServer" alt="Property Image">
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
        Add property
      </v-btn>
    </v-form>
  </v-card>
</template>
