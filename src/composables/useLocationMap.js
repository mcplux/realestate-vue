import { ref } from 'vue'

export default function useLocationMap() {
  const zoom = ref(15)
  const center = ref([1.2098563, -77.2804582])

  const pin = e => {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    pin,
  }
}
