<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
  formatPrice: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="property.image" height="200" class="grey lighten-2"></v-img>
      <v-card-title class="text-h5 font-weight-bold">
        {{ property.title }}
      </v-card-title>
      <v-card-subtitle> {{ property.description }} </v-card-subtitle>
      <v-card-text class="font-weight-bold">
        <p>{{ formatPrice(property.price) }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          block
          variant="flat"
          :to="{ name: 'property', params: { id: property.id } }"
          >More Info</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>
