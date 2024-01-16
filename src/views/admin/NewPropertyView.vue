<script setup>
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { validationSchema, imageSchema } from '../../validation/propertySchema'

const db = useFirestore()

const router = useRouter()

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
      />

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

      <v-btn color="pink-accent-3" block @click="submit">
        Add property
      </v-btn>
    </v-form>
  </v-card>
</template>
