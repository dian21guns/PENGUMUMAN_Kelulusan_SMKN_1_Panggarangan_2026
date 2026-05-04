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


function initCountdownPopup() {
  const popup = document.getElementById("countdownPopup");
  const timer = document.getElementById("countdownTimer");
  if (!popup || !timer) return;

  // 04 Mei 2026 17:00 WIB = 2026-05-04T10:00:00Z
  const deadlineUtc = Date.UTC(2026, 4, 4, 10, 0, 0);

  let intervalId = null;

  function updateCountdown() {
    const now = Date.now();
    const diff = deadlineUtc - now;

    if (diff <= 0) {
      popup.hidden = true;
      clearInterval(intervalId);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    timer.textContent = `${hours}:${minutes}:${seconds}`;
    popup.hidden = false;
  }

  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
}

if (document.body.classList.contains("body-index")) {
  initCountdownPopup();
}
