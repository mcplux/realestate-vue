import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export default function useProperties() {
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, 'properties'))

  return {
    propertiesCollection,
  }
}
