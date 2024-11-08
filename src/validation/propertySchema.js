export const validationSchema = {
  title(value) {
    if (value?.length >= 6) return true
    return 'The title of the property is mandatory or very short'
  },
  price(value) {
    if (/^[0-9]+$/.test(value)) return true
    return 'The Price should only be numbers'
  },
  rooms(value) {
    if (value) return true
    return 'Select a Quantity'
  },
  bathrooms(value) {
    if (value) return true
    return 'Select a Quantity'
  },
  parkingSpaces(value) {
    if (value) return true
    return 'Select a Quantity'
  },
  description(value) {
    if (value) return true
    return 'Add a Description'
  },
}

export const imageSchema = {
  image(value) {
    if (value) return true
    return 'The Image is Mandatory'
  },
}
