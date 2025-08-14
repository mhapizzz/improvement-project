import { httpGet, httpPost } from './httpClient'

// API endpoints
const LIST_ENDPOINT = '/api/admin/item/list'
const CREATE_ENDPOINT = '/api/admin/item/post'
const DELETE_ENDPOINT = '/api/admin/item/delete'
const UPDATE_ENDPOINT = '/api/admin/item/update'

export async function getItemList(page = 1, perPage) {
  const searchParams = new URLSearchParams()
  if (page) searchParams.set('page', String(page))
  if (perPage) searchParams.set('per_page', String(perPage))
  const qs = searchParams.toString()
  const path = qs ? `${LIST_ENDPOINT}?${qs}` : LIST_ENDPOINT
  const data = await httpGet(path)
  return data
}

export async function createItem(payload) {
  // Expect payload fields: stockCode, partNumber, description
  return httpPost(CREATE_ENDPOINT, payload)
}

export async function deleteItemById(itemId) {
  // Some backends expect { id }, others use different key; align with BE as needed
  return httpPost(DELETE_ENDPOINT, { id: itemId })
}

export async function updateItem(payload) {
  // Expect payload fields: id, stock_code, part_number, description
  return httpPost(UPDATE_ENDPOINT, payload)
}


