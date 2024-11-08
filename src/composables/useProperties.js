import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { ref, computed } from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function useProperties() {
  const swimmingPool = ref(false)

  const db = useFirestore()
  const firebaseStorage = useFirebaseStorage()
  const propertiesCollection = useCollection(collection(db, 'properties'))

  const deleteProperty = async (id, imageUrl) => {
    if (confirm('Are you sure you want to delete this property?')) {
      const docRef = doc(db, 'properties', id)
      const imageRef = storageRef(firebaseStorage, imageUrl)

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  const filteredProperties = computed(() => {
    return swimmingPool.value
      ? propertiesCollection.value.filter((property) => {
          return property.swimmingPool === swimmingPool.value
        })
      : propertiesCollection.value
  })

  return {
    propertiesCollection,
    deleteProperty,
    swimmingPool,
    filteredProperties,
  }
}
