import { httpGet, httpPost } from './httpClient'

// API endpoints
const LIST_ENDPOINT = '/api/admin/soh/list'

export async function getSOHList(page = 1, search = '', sortBy = '', sortOrder = '') {
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
