import { reactive, toRefs } from 'vue'

// Global reactive state for the snackbar
const state = reactive({
  isVisible: false,
  message: '',
  type: 'info', // 'success' | 'error' | 'info'
  timeoutId: null,
  durationMs: 3000,
})

function hideSnackbar() {
  state.isVisible = false
  state.message = ''
  state.type = 'info'
  if (state.timeoutId) {
    clearTimeout(state.timeoutId)
    state.timeoutId = null
  }
}

function showSnackbar(message, options = {}) {
  const { type = 'info', durationMs = 3000 } = options
  state.message = String(message || '')
  state.type = type
  state.durationMs = durationMs
  state.isVisible = true

  if (state.timeoutId) clearTimeout(state.timeoutId)
  state.timeoutId = setTimeout(() => {
    hideSnackbar()
  }, state.durationMs)
}

function showSuccess(message, durationMs = 2500) {
  showSnackbar(message, { type: 'success', durationMs })
}

function showError(message, durationMs = 3500) {
  showSnackbar(message, { type: 'error', durationMs })
}

function showInfo(message, durationMs = 2500) {
  showSnackbar(message, { type: 'info', durationMs })
}

export function useSnackbarState() {
  // Expose refs for component consumption
  return toRefs(state)
}

export { showSnackbar, showSuccess, showError, showInfo, hideSnackbar }


