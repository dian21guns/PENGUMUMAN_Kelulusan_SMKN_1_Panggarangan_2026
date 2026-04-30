async function cekKelulusan() {
    const nisnInput = document.getElementById("nisn").value.trim();

    if (!nisnInput) {
        alert("Silakan masukkan NISN!");
        return;
    }

    try {
        const response = await fetch("data.json");
        const data = await response.json();

        const siswa = data.find(s => s.nisn === nisnInput);

        if (siswa) {
            // PINDAH HALAMAN (INI KUNCI NYA)
            window.location.href = `hasil.html?nama=${encodeURIComponent(siswa.nama)}&nisn=${siswa.nisn}&status=${siswa.status}`;
        } else {
            alert("Data tidak ditemukan!");
        }

    } catch (error) {
        alert("Terjadi kesalahan!");
        console.error(error);
    }
}

