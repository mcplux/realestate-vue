import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'

export default function useImage() {
  const storage = useFirebaseStorage()
  const storageRefPath = storageRef(storage, `/properties/${uid()}.jpg`)

  const { url, upload } = useStorageFile(storageRefPath)

  function uploadImage(e) {
    const data = e.target.files[0]
    if(data) {
      upload(data)
    }
  }

  const imageServer = computed(() => url.value ? url.value : null)

  return {
    url,
    uploadImage,
    imageServer,
  }
}
