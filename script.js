function normalizeNisn(value = "") {
  return String(value).replace(/\D/g, "").trim();
}

function normalizeDate(value = "") {
  const raw = String(value).trim();
  if (!raw) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  const m = raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (m) {
    const dd = m[1].padStart(2, "0");
    const mm = m[2].padStart(2, "0");
    const yyyy = m[3];
    return `${yyyy}-${mm}-${dd}`;
  }

  return raw;
}

async function cekKelulusan() {
  const nisnInput = normalizeNisn(document.getElementById("nisn").value);
  const tglInput = normalizeDate(document.getElementById("tanggalLahir").value);

  if (!nisnInput || !tglInput) {
    alert("Silakan masukkan NISN dan Tanggal Lahir.");
    return;
  }

  try {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal memuat data siswa");

    const siswaList = await res.json();
    const siswa = siswaList.find((s) => (
      normalizeNisn(s.nisn) === nisnInput && normalizeDate(s.tanggal_lahir) === tglInput
    ));

    if (!siswa) {
      alert("Data siswa tidak ditemukan. Pastikan NISN dan Tanggal Lahir sesuai data sekolah.");
      return;
    }

    sessionStorage.setItem("hasil_kelulusan", JSON.stringify(siswa));
    window.location.href = "hasil.html";
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan sistem saat memeriksa data.");
  }
}

