import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'
import { computed } from 'vue'

export default function useImage() {
  const storage = useFirebaseStorage()
  const storageRefPath = storageRef(storage, `properties/${uid()}`)

  const { url, upload } = useStorageFile(storageRefPath)

  function uploadImage(e) {
    const file = e.target.files[0]
    if (!file) return
    upload(file)
  }

  const UploadedImage = computed(() => (url.value ? url.value : null))

  return {
    uploadImage,
    UploadedImage,
    url,
  }
}
