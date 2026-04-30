async function cekKelulusan() {
    const nisnInput = document.getElementById("nisn").value.trim();
    const hasil = document.getElementById("hasil");

    hasil.style.display = "block";

    try {
        const response = await fetch("./data.json");

        if (!response.ok) {
            hasil.innerHTML = "File data.json tidak ditemukan!";
            return;
        }

        const data = await response.json();

        const siswa = data.find(s => s.nisn === nisnInput);

        if (siswa) {
            hasil.innerHTML = `
                Nama: ${siswa.nama}<br>
                Status: ${siswa.status}
            `;
        } else {
            hasil.innerHTML = "NISN tidak ditemukan";
        }

    } catch (error) {
        hasil.innerHTML = "Error: " + error.message;
        console.error(error);
    }
}
