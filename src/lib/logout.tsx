export function logout() {
  localStorage.removeItem("access-token");

  document.cookie = "access-token=; path=/; max-age=0";
}
