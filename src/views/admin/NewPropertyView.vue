<script setup>
const items = [1, 2, 3, 4, 5]
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
      />

      <v-file-input 
        class="mb-5"
        accept="image/jpeg"
        label="Photo"
        prepend-icon="mdi-camera"
      />

      <v-text-field 
        class="mb-5"
        label="Price"
      />
      
      <v-row>
        <v-col cols="12" md="4">
          <v-select 
          label="Rooms"
          class="mb-5"
          :items="items"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select 
          label="Bathrooms"
          class="mb-5"
          :items="items"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select 
          label="Parking spaces"
          class="mb-5"
          :items="[0, 1, 2, 3, 4, 5]"
          />
        </v-col>
      </v-row>

      <v-textarea 
        class="mb-5"
        label="Description"
      />

      <v-checkbox 
        label="Pool"
      />

      <v-btn color="pink-accent-3" block>
        Add property
      </v-btn>
    </v-form>
  </v-card>
</template>
