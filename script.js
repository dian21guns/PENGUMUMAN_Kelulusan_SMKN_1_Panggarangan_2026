async function cekKelulusan() {
    const nisnInput = document.getElementById("nisn").value.trim();
    const hasil = document.getElementById("hasil");

    // Validasi input kosong
    if (!nisnInput) {
        hasil.style.display = "block";
        hasil.style.background = "rgba(255,0,0,0.2)";
        hasil.innerHTML = "⚠️ Silakan masukkan NISN!";
        return;
    }

    try {
        const response = await fetch("data.json");
        const data = await response.json();

        const siswa = data.find(s => s.nisn === nisnInput);

        hasil.style.display = "block";

        if (siswa) {
            if (siswa.status.toUpperCase() === "LULUS") {
                hasil.style.background = "rgba(0,255,0,0.2)";
                hasil.innerHTML = `
                    🎉 SELAMAT! 🎉 <br><br>
                    Nama: <b>${siswa.nama}</b><br>
                    NISN: <b>${siswa.nisn}</b><br><br>
                    Anda dinyatakan <b>LULUS</b>
                `;
            } else {
                hasil.style.background = "rgba(255,0,0,0.2)";
                hasil.innerHTML = `
                    Nama: <b>${siswa.nama}</b><br>
                    NISN: <b>${siswa.nisn}</b><br><br>
                    Anda dinyatakan <b>TIDAK LULUS</b>
                `;
            }
        } else {
            hasil.style.background = "rgba(255,0,0,0.2)";
            hasil.innerHTML = "❌ Data tidak ditemukan!";
        }

    } catch (error) {
        hasil.style.display = "block";
        hasil.style.background = "rgba(255,0,0,0.2)";
        hasil.innerHTML = "⚠️ Terjadi kesalahan saat mengambil data!";
        console.error(error);
    }
}
