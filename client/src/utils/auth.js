const TOKEN_KEY = "sentra_token"
const ROLE_KEY = "sentra_role"
const NAME_KEY = "sentra_name"

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
  localStorage.removeItem(NAME_KEY)
}

export function getUserRole() {
  return localStorage.getItem(ROLE_KEY) || "user"
}

export function getUserName() {
  return localStorage.getItem(NAME_KEY)
}

export function setUserRole(role) {
  if (!role) return
  localStorage.setItem(ROLE_KEY, role)
}

export function setUserName(name) {
  if (!name) return
  localStorage.setItem(NAME_KEY, name)
}

export function logout() {
  removeToken()
  window.location.href = "/login"
}
