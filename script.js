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

        if (siswa) {
            window.location.href = `hasil.html?nisn=${encodeURIComponent(siswa.nisn)}`;
        } else {
            alert("Data tidak ditemukan. Pastikan NISN dan Tanggal Lahir benar.");
        }
    } catch (error) {
        alert("Terjadi kesalahan saat mengambil data!");
        console.error(error);
    }
}
