import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 9000,
})

export async function getProducts() {
  const { data } = await api.get('/products')
  return data.map((product, index) => ({
    ...product,
    createdAt: Date.now() - index * 86400000,
    gallery: [
      product.image,
      product.image,
      product.image,
    ],
  }))
}

export async function getCategories() {
  const { data } = await api.get('/products/categories')
  return data
}

export async function loginUser(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return data
}
