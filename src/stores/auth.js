import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const router = useRouter()

  const errorMsg = ref('')
  const authedUser = ref(null)

  const errorCode = {
    'auth/invalid-credetial': 'Invalid credentials',
    'default': 'An error occurred',
  }

  onMounted(() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        authedUser.value = user
      }
    })
  })

  const login = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user
      authedUser.value = user

      router.push({name: 'admin-properties'})
    })
    .catch(error => {
      errorMsg.value = errorCode[error.code] ?? errorCode['default']
    }) 
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        authedUser.value = null
        router.push({name: 'login'})
      })
      .catch(() => {})
  }

  const hasError = computed(() => errorMsg.value)
  const isAuth = computed(() => authedUser.value)

  return {
    errorMsg,
    login,
    logout,
    hasError,
    isAuth,
  }
})
