function normalisasiNisn(nisn = "") {
    return String(nisn).replace(/\D/g, "").trim();
}

function normalisasiTanggal(tanggal = "") {
    const raw = String(tanggal).trim();
    if (!raw) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

    const polaLain = raw.match(/^(\d{2})[\/-](\d{2})[\/-](\d{4})$/);
    if (polaLain) {
        const [, dd, mm, yyyy] = polaLain;
        return `${yyyy}-${mm}-${dd}`;
    }

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
        const yyyy = parsed.getFullYear();
        const mm = String(parsed.getMonth() + 1).padStart(2, "0");
        const dd = String(parsed.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    return raw;
}

async function cekKelulusan() {
    const nisnInput = normalisasiNisn(document.getElementById("nisn").value);
    const tanggalLahirInput = normalisasiTanggal(document.getElementById("tanggalLahir").value);

    if (!nisnInput || !tanggalLahirInput) {
        alert("Silakan masukkan NISN dan Tanggal Lahir!");
        return;
    }

    try {
        const response = await fetch("data.json");
        const data = await response.json();

        const siswa = data.find((s) => {
            const nisnData = normalisasiNisn(s.nisn);
            const tanggalData = normalisasiTanggal(s.tanggal_lahir);
            return nisnData === nisnInput && tanggalData === tanggalLahirInput;
        });

        if (!siswa) {
            const kandidatNisn = data.find((s) => normalisasiNisn(s.nisn) === nisnInput);
            if (kandidatNisn) {
                alert(`Tanggal lahir tidak cocok, tetapi NISN ditemukan. Sistem akan menampilkan data berdasarkan NISN: ${kandidatNisn.nisn}`);
                sessionStorage.setItem("hasil_kelulusan", JSON.stringify(kandidatNisn));
                window.location.href = "hasil.html";
                return;
            }

            alert("Data tidak ditemukan. Pastikan NISN benar atau hubungi admin sekolah.");
            return;
        }

        sessionStorage.setItem("hasil_kelulusan", JSON.stringify(siswa));
        window.location.href = "hasil.html";
    } catch (error) {
        alert("Terjadi kesalahan saat mengambil data!");
        console.error(error);
    }
}
