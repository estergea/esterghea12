// dokumencookies.js

// Fungsi menyimpan cookie
function setCookie(nama, nilai, hari) {
    const d = new Date();
    d.setTime(d.getTime() + (hari * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = nama + "=" + nilai + ";" + expires + ";path=/";
}

// Fungsi membaca cookie
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

// Soal acak untuk verifikasi sederhana
let angka1 = Math.floor(Math.random() * 10) + 1;
let angka2 = Math.floor(Math.random() * 10) + 1;
let hasil = angka1 + angka2;

// Tampilkan form verifikasi dan soal
function tampilkanSoal() {
    document.getElementById("verifikasi").style.display = "block";
    document.getElementById("soal").innerText = `Halo, siapa nama Anda? Dan berapakah ${angka1} + ${angka2}?`;
    document.getElementById("kontenUtama").style.display = "none"; // sembunyikan konten utama
}

// Proses verifikasi jawaban dan nama
function verifikasi() {
    const jawaban = parseInt(document.getElementById("jawaban").value);
    const nama = document.getElementById("namaPengunjung").value.trim();

    if (!nama) {
        document.getElementById("error").innerText = "Nama harus diisi.";
        return;
    }

    if (jawaban === hasil) {
        setCookie("manusia", "ya", 7);
        setCookie("pengunjung", nama, 7);
        document.getElementById("pesan").innerText = `Selamat datang, ${nama}! Verifikasi berhasil.`;
        document.getElementById("verifikasi").style.display = "none";
        document.getElementById("kontenUtama").style.display = "block";
        document.getElementById("error").innerText = "";
    } else {
        document.getElementById("error").innerText = "Jawaban salah. Coba lagi.";
    }
}

// Inisialisasi verifikasi saat halaman load
function inisialisasiVerifikasi() {
    const status = getCookie("manusia");
    const nama = getCookie("pengunjung");

    if (status === "ya") {
        document.getElementById("pesan").innerText = `Selamat datang kembali, ${nama}!`;
        document.getElementById("verifikasi").style.display = "none";
        document.getElementById("kontenUtama").style.display = "block";
    } else {
        tampilkanSoal();
    }
}

