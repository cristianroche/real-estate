<script setup>
import { useForm, useField } from 'vee-validate'

import { loginSchema as validationSchema } from '@/validation/loginSchema'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const submit = handleSubmit((values) => {
  authStore.login(values)
})

const email = useField('email')
const password = useField('password')
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h4"> Login </v-card-title>
    <v-card-subtitle class="text-h5"> Please enter your credentials </v-card-subtitle>

    <v-alert v-if="authStore.hasError" type="error" title="Error" dismissible class="mt-5">
      {{ authStore.errorMessage }}
    </v-alert>

    <v-form class="mt-5">
      <v-text-field
        v-model="email.value.value"
        type="email"
        label="Email"
        required
        :error-messages="email.errorMessage.value"
        class="mb-3"
      ></v-text-field>
      <v-text-field
        v-model="password.value.value"
        label="Password"
        type="password"
        required
        :error-messages="password.errorMessage.value"
        class="mb-3"
      ></v-text-field>

      <v-btn color="primary" block @click="submit">Login</v-btn>
    </v-form>
  </v-card>
</template>
