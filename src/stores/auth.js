import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const errorMsg = ref('')
  const authedUser = ref({})

  const errorCode = {
    'auth/invalid-credetial': 'Invalid credentials',
    'default': 'An error occurred',
  }

  const login = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user
      authedUser.value = user

      console.log(authedUser.value)
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
