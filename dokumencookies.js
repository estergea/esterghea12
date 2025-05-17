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

// Soal acak
let angka1 = Math.floor(Math.random() * 10) + 1;
let angka2 = Math.floor(Math.random() * 10) + 1;
let hasil = angka1 + angka2;

// Tampilkan soal verifikasi
function tampilkanSoal() {
    document.getElementById("verifikasi").style.display = "block";
    document.getElementById("soal").innerText = `Berapakah ${angka1} + ${angka2}?`;
}

// Verifikasi jawaban user
function verifikasi() {
    const jawaban = parseInt(document.getElementById("jawaban").value);
    if (jawaban === hasil) {
        setCookie("manusia", "ya", 7);
        document.getElementById("pesan").innerText = "Verifikasi berhasil! Anda manusia.";
        document.getElementById("verifikasi").style.display = "none";
        document.getElementById("kontenUtama").style.display = "block";
        document.getElementById("error").innerText = "";
    } else {
        document.getElementById("error").innerText = "Jawaban salah. Coba lagi.";
    }
}

// Cek apakah sudah ada cookie
function inisialisasiVerifikasi() {
    if (getCookie("manusia") === "ya") {
        document.getElementById("pesan").innerText = "Anda sudah terverifikasi sebagai manusia.";
        document.getElementById("kontenUtama").style.display = "block";
    } else {
        tampilkanSoal();
    }
}

