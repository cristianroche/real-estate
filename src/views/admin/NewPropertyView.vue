<script setup>
import { useForm, useField } from 'vee-validate'
import { validationSchema, imageSchema } from '@/validation/propertySchema'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import useImage from '@/composables/useImage'
import useLocationMap from '@/composables/useLocationMap'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

const items = [1, 2, 3, 4, 5]

const db = useFirestore()

const router = useRouter()

const { uploadImage, uploadedImage, url } = useImage()

const { zoom, center, setPin } = useLocationMap()

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const rooms = useField('rooms')
const bathrooms = useField('bathrooms')
const parkingSpaces = useField('parkingSpaces')
const description = useField('description')
const swimmingPool = useField('swimmingPool', null, {
  initialValue: false,
})

const submit = handleSubmit(async (values) => {
  const docRef = await addDoc(collection(db, 'properties'), {
    ...values,
    image: url.value,
    location: center.value,
  })

  if (docRef.id) {
    router.push({ name: 'admin-properties' })
  }
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h4"> Add New Property </v-card-title>
    <v-card-subtitle class="text-h5 py-5"
      >Create a new property by filling out the following form
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        label="Property Title"
        class="mb-5"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />
      <v-file-input
        label="Image"
        class="mb-5"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        @change="uploadImage"
      />

      <div v-if="uploadedImage" class="my-5">
        <p class="font-weight-bold">Image Preview</p>
        <img :src="uploadedImage" alt="Property Image" class="w-50" />
      </div>

      <v-text-field
        label="Price"
        class="mb-5"
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
            :items="items"
            v-model="parkingSpaces.value.value"
            :error-messages="parkingSpaces.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        label="Description"
        class="mb-5"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      />

      <v-checkbox label="Swimming Pool" class="mb-5" v-model="swimmingPool.value.value" />

      <h2 class="text-center font-weight-bold my-5">Location</h2>

      <div class="pb-10">
        <div style="height: 600px">
          <l-map v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="setPin" />
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </l-map>
        </div>
      </div>

      <v-btn color="primary" block @click="submit">Save Property</v-btn>
    </v-form>
  </v-card>
</template>
