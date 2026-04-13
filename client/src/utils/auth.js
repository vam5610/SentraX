const TOKEN_KEY = "sentra_token"
const ROLE_KEY = "sentra_role"

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (!token) return
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ROLE_KEY)
}

export function getUserRole() {
  return localStorage.getItem(ROLE_KEY) || "user"
}

export function setUserRole(role) {
  if (!role) return
  localStorage.setItem(ROLE_KEY, role)
}

export function logout() {
  removeToken()
  window.location.href = "/login"
}
