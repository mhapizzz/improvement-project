import { httpGet, httpPost } from './httpClient'

const API_BASE = '/api/admin/user'

export const userService = {
  // Get user list with pagination and search
  async getUsers(params = {}) {
    const { page = 1, search = '', sort_by = '', sort_order = '' } = params
    return await httpGet(`${API_BASE}/list?page=${page}&search=${search}&sort_by=${sort_by}&sort_order=${sort_order}`)
  },

  // Create new user
  async createUser(userData) {
    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role
    }
    return await httpPost(`${API_BASE}/post`, payload)
  },

  // Update existing user
  async updateUser(userData) {
    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role
    }
    return await httpPost(`${API_BASE}/post`, payload)
  },

  // Delete user
  async deleteUser(userId) {
    return await httpPost(`${API_BASE}/delete`, { id: userId })
  }
}
