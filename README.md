#  AuthSystemWeek5 – Aplikasi Login dan Registrasi

## 1. Deskripsi Project

AuthSystemWeek5 merupakan aplikasi autentikasi sederhana berbasis mobile yang dibuat menggunakan React Native dan Expo.

Aplikasi ini memiliki dua halaman utama, yaitu Login dan Registrasi. Pengguna dapat memasukkan email dan password dengan validasi input untuk memastikan data yang dimasukkan sesuai dengan ketentuan.

Project ini dibuat untuk memenuhi tugas praktikum Authentication System – Week 5.

## 2. Fitur yang Diimplementasikan

- [x] Halaman Login
- [x] Halaman Registrasi
- [x] Navigasi dari Login ke Registrasi
- [x] Navigasi dari Registrasi ke Login
- [x] Input email
- [x] Input password
- [x] Validasi format email
- [x] Validasi password minimal 6 karakter
- [x] Pesan error ketika format email tidak valid
- [x] Perubahan warna border input ketika terjadi kesalahan
- [x] Tombol Login nonaktif ketika input belum memenuhi ketentuan
- [x] Notifikasi ketika Login berhasil
- [x] Notifikasi ketika Registrasi berhasil
- [x] Keyboard handling pada halaman Login dan Registrasi
- [x] Tampilan form menggunakan komponen React Native

## 3. Teknologi yang Digunakan

- React Native
- Expo
- JavaScript
- TypeScript
- React Hooks (useState)
- React Native StyleSheet
- Git dan GitHub

## 4. Struktur Folder Project

```text
Form5Demo/
├── assets/
├── components/
│   ├── LoginForm.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   └── validators.js
├── src/
│   └── app/
│       ├── _layout.tsx
│       ├── _explore.tsx
│       └── index.tsx
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 5. Cara Menjalankan Project

### Persiapan

Pastikan perangkat sudah memiliki:
- Node.js
- npm
- Visual Studio Code
- Expo Go pada smartphone

### Langkah Instalasi

**1. Clone repository GitHub**

```bash
git clone https://github.com/gladys-beep/AuthSystemWeek5.git
```

**2. Masuk ke folder project**

```bash
cd AuthSystemWeek5
```

**3. Install dependencies**

```bash
npm install
```

**4. Jalankan aplikasi**

```bash
npx expo start
```

**5. Buka aplikasi**

Scan QR Code menggunakan Expo Go pada smartphone untuk menjalankan aplikasi.

## 6. Dokumentasi Screenshot Aplikasi

### A. Halaman Login

Halaman Login digunakan untuk memasukkan email dan password. Apabila input memenuhi ketentuan aplikasi, pengguna dapat menekan tombol Masuk.

<img width="738" height="1600" alt="login" src="https://github.com/user-attachments/assets/cd1fde27-b853-4f46-af6c-5f434956b05d" />

### B. Halaman Registrasi

Halaman Registrasi digunakan untuk melakukan pendaftaran. Setelah proses registrasi dijalankan, aplikasi menampilkan notifikasi "Registrasi Berhasil!".

<img width="738" height="1600" alt="registrasi" src="https://github.com/user-attachments/assets/b42b0973-0797-484e-bf13-b98f0427e247" />

### C. Validasi Email

Validasi email dilakukan untuk memastikan format email yang dimasukkan sesuai dengan ketentuan. Jika format email tidak valid, aplikasi menampilkan pesan kesalahan dan mengubah border kolom email menjadi merah.

<img width="738" height="1600" alt="validasiemail" src="https://github.com/user-attachments/assets/d9e45bff-0c14-4865-98b9-9d7982b76cf6" />

### D. Keyboard Behavior

Pengujian keyboard behavior dilakukan untuk memastikan tampilan form tetap dapat diakses ketika keyboard smartphone muncul.

<img width="738" height="1600" alt="keyboard" src="https://github.com/user-attachments/assets/ced887c7-6e0d-4cae-9a7c-226e28fb9b1b" />

## 7. Hasil Pengujian (Test Results)

Pengujian dilakukan secara langsung pada aplikasi menggunakan smartphone melalui Expo Go.

| No. | Skenario Pengujian | Hasil Pengujian | Status |
|---|---|---|---|
| 1 | Membuka halaman Login | Halaman Login tampil | Berhasil |
| 2 | Membuka halaman Registrasi | Halaman Registrasi tampil | Berhasil |
| 3 | Navigasi Login ke Registrasi | Halaman Registrasi terbuka | Berhasil |
| 4 | Navigasi Registrasi ke Login | Halaman Login terbuka | Berhasil |
| 5 | Memasukkan email tidak valid | Pesan error muncul dan border berubah merah | Berhasil |
| 6 | Memasukkan email valid | Format email diterima oleh validasi | Berhasil |
| 7 | Mengisi form Login sesuai ketentuan | Tombol Masuk aktif | Berhasil |
| 8 | Menjalankan proses Login | Notifikasi Login Berhasil muncul | Berhasil |
| 9 | Menjalankan proses Registrasi | Notifikasi Registrasi Berhasil muncul | Berhasil |
| 10 | Membuka keyboard pada kolom Email | Form tetap terlihat ketika keyboard muncul | Berhasil |

**Bukti pengujian:**
- `<img width="738" height="1600" alt="validasiemail" src="https://github.com/user-attachments/assets/d9e45bff-0c14-4865-98b9-9d7982b76cf6" />` – Bukti validasi email tidak valid.
- `screenshots/login.png` – Bukti notifikasi Login Berhasil.
- `screenshots/register.png` – Bukti notifikasi Registrasi Berhasil.
- `screenshots/keyboard.png` – Bukti keyboard behavior.

## 8. Kendala dan Solusi (Challenges & Solutions)

### 1. Masalah Import Path

**Kendala:** Terjadi kesalahan saat memindahkan project dari VS Code ke Expo Snack karena perbedaan struktur folder dan alamat import.

**Solusi:** Menyesuaikan relative import path agar sesuai dengan struktur folder pada Expo Snack.

### 2. Navigasi Login dan Registrasi

**Kendala:** Membuat perpindahan halaman antara Login dan Registrasi.

**Solusi:** Menggunakan React Hook `useState` untuk mengatur halaman yang sedang ditampilkan.

### 3. Validasi Input Email

**Kendala:** Memastikan email yang dimasukkan pengguna memiliki format yang benar.

**Solusi:** Membuat fungsi validasi pada file `validators.js` dan menampilkan pesan error ketika format email tidak sesuai.

### 4. Keyboard Behavior

**Kendala:** Memastikan form tetap dapat digunakan ketika keyboard smartphone muncul.

**Solusi:** Menggunakan pengaturan komponen React Native untuk membantu menjaga tampilan form tetap dapat diakses saat keyboard terbuka.

## 9. Link Project

- **GitHub Repository:** https://github.com/gladys-beep/AuthSystemWeek5
- **Expo Snack:** [Masukkan link Expo Snack di sini]

## 10. Identitas Pembuat

- **Nama:** Gladys
- **Nama Project:** AuthSystemWeek5
- **Mata Kuliah/Tugas:** Authentication System – Week 5

---

**AuthSystemWeek5 – Login and Registration Application**




<img width="738" height="1600" alt="login" src="https://github.com/user-attachments/assets/cd1fde27-b853-4f46-af6c-5f434956b05d" />

<img width="738" height="1600" alt="registrasi" src="https://github.com/user-attachments/assets/b42b0973-0797-484e-bf13-b98f0427e247" />

<img width="738" height="1600" alt="validasiemail" src="https://github.com/user-attachments/assets/d9e45bff-0c14-4865-98b9-9d7982b76cf6" />

<img width="738" height="1600" alt="keyboard" src="https://github.com/user-attachments/assets/ced887c7-6e0d-4cae-9a7c-226e28fb9b1b" />


