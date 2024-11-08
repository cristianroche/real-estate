<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { doc, updateDoc } from 'firebase/firestore'

import { useField, useForm } from 'vee-validate'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

import useImage from '@/composables/useImage'
import useLocationMap from '@/composables/useLocationMap'
import { validationSchema } from '@/validation/propertySchema'
import { watch } from 'vue'

const items = [1, 2, 3, 4, 5]

const { url, uploadImage, UploadedImage } = useImage()
const { zoom, center, setPin } = useLocationMap()

const { handleSubmit } = useForm({ validationSchema })

const title = useField('title')
const image = useField('image')
const price = useField('price')
const rooms = useField('rooms')
const bathrooms = useField('bathrooms')
const parkingSpaces = useField('parkingSpaces')
const description = useField('description')
const swimmingPool = useField('swimmingPool')

const route = useRoute()
const router = useRouter()

const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

watch(property, (property) => {
  title.value.value = property.title
  price.value.value = property.price
  rooms.value.value = property.rooms
  bathrooms.value.value = property.bathrooms
  parkingSpaces.value.value = property.parkingSpaces
  description.value.value = property.description
  swimmingPool.value.value = property.swimmingPool
  center.value = property.location
})

const submit = handleSubmit(async (values) => {
  // eslint-disable-next-line no-unused-vars
  const { image, ...property } = values

  if (UploadedImage.value) {
    await updateDoc(docRef, {
      ...property,
      image: url.value,
      location: center.value,
    })
  } else {
    const data = { ...property, location: center.value }
    await updateDoc(docRef, data)
  }

  router.push({ name: 'admin-properties' })
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="mt-5">
      <h1 class="text-h4 font-weight-bold">Edit Property</h1>
    </v-card-title>
    <v-card-subtitle>
      <p class="text-h5">Edit property details</p>
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
        label="Title"
        class="mb-5"
      ></v-text-field>

      <v-file-input
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        label="Image"
        class="mb-5"
        @change="uploadImage"
      ></v-file-input>

      <div class="my-5">
        <p class="font-weight-bold">Current image:</p>
        <img v-if="UploadedImage" :src="UploadedImage" alt="Property Image" width="180" />
        <img v-else :src="property?.image" alt="Property Image" width="180" />
      </div>

      <v-text-field
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
        label="Price"
        class="mb-5"
      ></v-text-field>

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
            label="Parking Spaces"
            class="mb-5"
            :items="items"
            v-model="parkingSpaces.value.value"
            :error-messages="parkingSpaces.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
        label="Description"
        class="mb-5"
      ></v-textarea>

      <v-checkbox v-model="swimmingPool.value.value" label="Swimming Pool"></v-checkbox>

      <h2 class="font-weight-bold text-center my-5">Location</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="setPin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit"> Edit Property </v-btn>
    </v-form>
  </v-card>
</template>
