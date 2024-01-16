export const validationSchema = {
  title (value) {
    if (value?.length >= 6 ) return true
    return 'The title field is required and must be at least 6 characters'
  },
  price (value) {
    if (/^[0-9]+$/.test(value)) return true
    return 'The price field is required and must be a number'
  },
  rooms (value) {
    if (value) return true
    return 'Select an option'
  },
  bathrooms (value) {
    if (value) return true
    return 'Select an option'
  },
  description (value) {
    if (value) return true
    return 'Add a description'
  }
} 

export const imageSchema = {
image (value) {
    if (value) return true
    return 'The image field is required'
},
}
