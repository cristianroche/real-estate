<script setup>
import useProperties from '@/composables/useProperties'
import { propertyPrice } from '@/helpers'

const { propertiesCollection: properties, deleteProperty } = useProperties()
</script>

<template>
  <h2 class="text-center text-h3 font-weight-bold my-5">Admin Panel</h2>

  <v-btn color="primary mx-5" variant="flat" :to="{ name: 'new-property' }">New Property</v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item v-for="property in properties" :key="property.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img :src="property.image" alt="Property Image" width="180" />
          </v-list-item-media>
        </template>
        <v-list-item-title>{{ property.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ propertyPrice(property.price) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-list-item-action>
            <v-btn
              class="mr-2"
              color="primary"
              variant="flat"
              :to="{ name: 'edit-property', params: { id: property.id } }"
              >Edit</v-btn
            >
            <v-btn color="error" variant="flat" @click="deleteProperty(property.id, property.image)"
              >Delete</v-btn
            >
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
