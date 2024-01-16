import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const errorMsg = ref('')
  const errorCode = {
    'auth/invalid-credetial': 'Invalid credentials',
    'default': 'An error occurred',
  }

  const login = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log(userCredentials)
    })
    .catch(error => {
      errorMsg.value = errorCode[error.code] ?? errorCode['default']
    }) 
  }

  const hasError = computed(() => errorMsg.value)

  return {
    login,
    hasError,
    errorMsg,
  }
})
