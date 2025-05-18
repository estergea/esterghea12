<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Verifikasi Pengunjung</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            padding: 50px;
        }
        #verifikasi, #kontenUtama, #cookieForm {
            display: none;
            margin-top: 20px;
        }
        input, button {
            padding: 10px;
            margin: 10px;
        }
        #error {
            color: red;
            margin-top: 10px;
        }
    </style>
</head>
<body onload="cekCookiePengunjung()">

    <h2 id="judul">Selamat Datang di Website</h2>

    <!-- Form Nama dan Persetujuan Cookies -->
    <div id="cookieForm">
        <p>Silakan masukkan nama Anda dan setujui cookies untuk melanjutkan.</p>
        <input type="text" id="namaPengunjung" placeholder="Nama Anda">
        <br>
        <label><input type="checkbox" id="setujuCookie"> Saya menyetujui penggunaan cookies.</label>
        <br>
        <button onclick="simpanNamaDanCookie()">Lanjut</button>
    </div>

    <!-- Soal Verifikasi -->
    <div id="verifikasi">
        <p id="soal"></p>
        <input type="number" id="jawaban" placeholder="Jawaban Anda">
        <br>
        <button onclick="verifikasi()">Verifikasi</button>
        <p id="error"></p>
    </div>

    <!-- Konten Utama Website -->
    <div id="kontenUtama">
        <h3 id="pesan"></h3>
        <p>Selamat datang di konten utama website kami. Terima kasih telah mengakses sebagai <span id="namaTampil"></span>.</p>
    </div>

    <script>
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
                document.getElementById("namaTampil").innerText = getCookie("nama");
            } else {
                document.getElementById("error").innerText = "Jawaban salah. Coba lagi.";
            }
        }

        // Cek awal: apakah nama dan persetujuan cookie sudah disimpan
        function cekCookiePengunjung() {
            const nama = getCookie("nama");
            const persetujuan = getCookie("cookieSetuju");
            if (!nama || persetujuan !== "ya") {
                document.getElementById("cookieForm").style.display = "block";
            } else {
                cekVerifikasiManusia();
            }
        }

        // Simpan nama & cookie persetujuan
        function simpanNamaDanCookie() {
            const nama = document.getElementById("namaPengunjung").value;
            const setuju = document.getElementById("setujuCookie").checked;

            if (nama === "") {
                alert("Silakan masukkan nama Anda.");
                return;
            }

            if (!setuju) {
                alert("Anda harus menyetujui penggunaan cookies untuk melanjutkan.");
                return;
            }

            setCookie("nama", nama, 7);
            setCookie("cookieSetuju", "ya", 7);
            document.getElementById("cookieForm").style.display = "none";
            cekVerifikasiManusia();
        }

        // Cek apakah pengunjung sudah terverifikasi sebagai manusia
        function cekVerifikasiManusia() {
            if (getCookie("manusia") === "ya") {
                document.getElementById("pesan").innerText = "Anda sudah terverifikasi sebagai manusia.";
                document.getElementById("kontenUtama").style.display = "block";
                document.getElementById("namaTampil").innerText = getCookie("nama");
            } else {
                tampilkanSoal();
            }
        }
    </script>

</body>
</html>



