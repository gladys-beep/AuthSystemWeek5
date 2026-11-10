// Validasi Format Email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validasi Password Login (Minimal 6 karakter)
export const validateLoginPassword = (password) => {
  return password.length >= 6;
};

// Validasi Nama (Minimal 3 karakter, tanpa karakter spesial/angka)
export const validateName = (name) => {
  const regex = /^[A-Za-z\s]{3,}$/;
  return regex.test(name);
};

// Validasi Password Register (Minimal 8 karakter, ada uppercase, ada angka)
export const validateRegisterPassword = (password) => {
  if (password.length < 8) return 'Minimal 8 karakter';
  if (!/[A-Z]/.test(password)) return 'Harus mengandung huruf besar (uppercase)';
  if (!/[0-9]/.test(password)) return 'Harus mengandung angka';
  return '';
};