document.addEventListener("DOMContentLoaded", function () {
    function adjustImageSize() {
        const img = document.querySelector("main img");
        if (img) {
            if (window.innerWidth < 600) {
                img.style.width = "100%"; // Lebar penuh di HP
            } else {
                img.style.width = "500px"; // Ukuran default di laptop
            }
        }
    }

    // Jalankan fungsi saat halaman dimuat
    adjustImageSize();

    // Jalankan fungsi saat ukuran layar berubah
    window.addEventListener("resize", adjustImageSize);
});
function searchCollection() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let items = document.querySelectorAll("#collectionList li");

    items.forEach(item => {
        let text = item.textContent.toLowerCase();
        item.style.display = text.includes(input) ? "block" : "none";
    });
}


