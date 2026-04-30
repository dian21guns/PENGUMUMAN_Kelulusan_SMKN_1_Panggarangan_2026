function normalisasiNisn(nisn = "") {
  return String(nisn).replace(/\D/g, "").trim();
}

function normalisasiTanggal(tanggal = "") {
  const raw = String(tanggal).trim();
  if (!raw) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  const dmy = raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (dmy) {
    const dd = dmy[1].padStart(2, "0");
    const mm = dmy[2].padStart(2, "0");
    const yyyy = dmy[3];
    return `${yyyy}-${mm}-${dd}`;
  }

  return raw;
}

async function cekKelulusan() {
  const nisnInput = normalisasiNisn(document.getElementById("nisn").value);
  const tglInput = normalisasiTanggal(document.getElementById("tanggalLahir").value);

  if (!nisnInput || !tglInput) {
    alert("Silakan isi NISN dan Tanggal Lahir terlebih dahulu.");
    return;
  }

  try {
    const response = await fetch("data.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Gagal membaca data.json");

    const data = await response.json();
    const siswa = data.find((item) => {
      const nisnData = normalisasiNisn(item.nisn);
      const tglData = normalisasiTanggal(item.tanggal_lahir);
      return nisnData === nisnInput && tglData === tglInput;
    });

    if (!siswa) {
      alert("Data siswa tidak ditemukan. Periksa lagi NISN dan Tanggal Lahir.");
      return;
    }

    sessionStorage.setItem("hasil_kelulusan", JSON.stringify(siswa));
    window.location.href = "hasil.html";
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengambil data kelulusan.");
  }
}
