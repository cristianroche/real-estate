import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const router = useRouter()

  const errorMessage = ref('')
  const authUser = ref(null)

  const errorCodes = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
    'auth/invalid-credential': 'Invalid credentials',
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return
      authUser.value = user
    })
  })

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        authUser.value = userCredentials.user
        router.push({ name: 'admin-properties' })
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code]
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({ name: 'login' })
      })
      .catch((error) => {
        errorMessage.value = error.message
      })
  }

  const hasError = computed(() => errorMessage.value !== '')
  const isAuthenticated = computed(() => !!authUser.value)

  return {
    login,
    logout,
    errorMessage,
    hasError,
    isAuthenticated,
  }
})
