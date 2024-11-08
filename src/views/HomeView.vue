<script setup>
import Property from '@/components/Property.vue'
import useProperties from '@/composables/useProperties'
import { propertyPrice } from '@/helpers'

const { filteredProperties: properties, swimmingPool } = useProperties()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Our Properties</h1>

  <v-card flat class="py-10">
    <v-card-title class="text-h5"
      >Search <v-checkbox label="Swimming Pool" v-model="swimmingPool"
    /></v-card-title>
    <v-row>
      <Property
        v-for="property in properties"
        :key="property.id"
        :property="property"
        :formatPrice="propertyPrice"
      />
    </v-row>
  </v-card>
</template>
