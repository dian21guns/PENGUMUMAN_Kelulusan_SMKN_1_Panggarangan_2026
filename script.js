function tampilkanHasil(siswa) {
    const hasilDiv = document.getElementById("hasil");
    hasilDiv.innerHTML = `
        <div class="card-hasil">
            <img src="${siswa.foto}" alt="Foto Siswa" class="foto-siswa">
            <h2>${siswa.nama}</h2>

            <p><strong>NISN:</strong> ${siswa.nisn}</p>
            <p><strong>NIS:</strong> ${siswa.nis}</p>
            <p><strong>Kelas:</strong> ${siswa.kelas}</p>

            <div class="status ${siswa.status === 'LULUS' ? 'lulus' : 'tidak-lulus'}">
                ${siswa.status}
            </div>
        </div>
    `;
}
