<script setup>
import useProperties from '../composables/useProperties'
import Property from '../components/Property.vue'
import { formatPrice } from '../helpers'

const { pool, filteredProperties } = useProperties()
</script>

<template>
  <h1 class="text-center text-h4 font-weight-bold my-5">Our properties</h1>

  <v-card flat class="py-10">
    <v-card-title class="text-h5">
      Filter
      <v-checkbox 
        label="Pool"
        v-model="pool"
      />
    </v-card-title>

    <v-row>
      <Property 
        v-for="property in filteredProperties"
        :key="property.id"
        :property="property"
        :formatPrice="formatPrice"
      />
    </v-row>
  </v-card>
</template>
