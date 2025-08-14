import { httpGet, httpPost } from './httpClient'

// API endpoints
const LIST_ENDPOINT = '/api/admin/transaction-stock/list'
const CREATE_ENDPOINT = '/api/admin/transaction-stock/post'
const DELETE_ENDPOINT = '/api/admin/transaction-stock/delete'
const UPDATE_ENDPOINT = '/api/admin/transaction-stock/update'
const DETAIL_ENDPOINT = '/api/admin/transaction-stock/detail'

export async function getStockList(page = 1, search = '', sortBy = '', sortOrder = '') {
  const searchParams = new URLSearchParams()
  if (page) searchParams.set('page', String(page))
  if (search) searchParams.set('search', search)
  if (sortBy) searchParams.set('sort_by', sortBy)
  if (sortOrder) searchParams.set('sort_order', sortOrder)
  
  const qs = searchParams.toString()
  const path = qs ? `${LIST_ENDPOINT}?${qs}` : LIST_ENDPOINT
  const data = await httpGet(path)
  return data
}

export async function createStockTransaction(payload) {
  return httpPost(CREATE_ENDPOINT, payload)
}

export async function deleteStockTransactionById(transactionId) {
  return httpPost(DELETE_ENDPOINT, { id: transactionId })
}

export async function updateStockTransaction(payload) {
  return httpPost(CREATE_ENDPOINT, payload)
}

export async function getStockTransactionDetail(transactionId) {
  const path = `${DETAIL_ENDPOINT}/${transactionId}`
  const data = await httpGet(path)
  return data
}
