<script setup>
import useProperties from '../composables/useProperties'
import Property from '../components/Property.vue'

const { propertiesCollection, formatPrice } = useProperties()
</script>

<template>
  <h1 class="text-center text-h4 font-weight-bold my-5">Our properties</h1>

  <v-card flat class="py-10">
    <v-row>
      <Property 
        v-for="property in propertiesCollection"
        :key="property.id"
        :property="property"
        :formatPrice="formatPrice"
      />
    </v-row>
  </v-card>
</template>
