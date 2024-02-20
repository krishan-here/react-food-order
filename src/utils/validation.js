export function isNotEmpty(value) {
  return value !== null && value.trim() !== "";
}

export function isEmail(value) {
  return value.includes("@");
}
