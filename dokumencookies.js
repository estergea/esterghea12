// Fungsi cookie
function setCookie(nama, nilai, hari) {
  const d = new Date();
  d.setTime(d.getTime() + (hari * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = nama + "=" + nilai + ";" + expires + ";path=/";
}

function getCookie(nama) {
  const cname = nama + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// Soal verifikasi (acak)
let angka1 = Math.floor(Math.random() * 10) + 1;
let angka2 = Math.floor(Math.random() * 10) + 1;
let hasil = angka1 + angka2;

// Fungsi untuk memunculkan soal
function tampilkanSoal() {
  document.getElementById("verifikasi").style.display = "block";
  document.getElementById("soal").innerText = Berapakah ${angka1} + ${angka2}?;
}

// Fungsi verifikasi jawaban
function verifikasi() {
  const jawaban = parseInt(document.getElementById("jawaban").value);
  if (jawaban === hasil) {
    setCookie("manusia", "ya", 7); // Simpan selama 7 hari
    document.getElementById("pesan").innerText = "Verifikasi berhasil! Anda manusia.";
    document.getElementById("verifikasi").style.display = "none";
    document.getElementById("error").innerText = "";
  } else {
    document.getElementById("error").innerText = "Jawaban salah. Coba lagi.";
  }
}

// Fungsi utama ketika halaman dimuat
function inisialisasiVerifikasi() {
  if (getCookie("manusia") === "ya") {
    document.getElementById("pesan").innerText = "Anda sudah terverifikasi sebagai manusia.";
  } else {
    tampilkanSoal();
  }
}
