
export const formatPrice = price => Number(price).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})
