async function cekKelulusan() {
    const nisnInput = document.getElementById("nisn").value.trim();
    const tanggalLahirInput = document.getElementById("tanggalLahir").value;

    if (!nisnInput || !tanggalLahirInput) {
        alert("Silakan masukkan NISN dan Tanggal Lahir!");
        return;
    }

    try {
        const response = await fetch("data.json");
        const data = await response.json();

        const siswa = data.find(
            (s) => s.nisn === nisnInput && s.tanggal_lahir === tanggalLahirInput
        );

        if (!siswa) {
            alert("Data tidak ditemukan. Pastikan NISN dan Tanggal Lahir benar.");
            return;
        }

        sessionStorage.setItem("hasil_kelulusan", JSON.stringify(siswa));
        window.location.href = "hasil.html";
    } catch (error) {
        alert("Terjadi kesalahan saat mengambil data!");
        console.error(error);
    }
}
