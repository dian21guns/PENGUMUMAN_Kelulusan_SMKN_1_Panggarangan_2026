// Cek Kelulusan
async function cekKelulusan() {
    let nisn = document.getElementById("nisn").value.trim();
    let hasil = document.getElementById("hasil");

    if (!nisn) {
        hasil.style.display = "block";
        hasil.innerHTML = "⚠️ Masukkan NISN!";
        return;
    }

    // Ambil JSON
    let data = await fetch("data.json").then(res => res.json());

    if (data[nisn]) {
        if (data[nisn].STATUS.toUpperCase() === "LULUS") {
            hasil.style.color = "#00ff90";
            hasil.innerHTML = "🎉 SELAMAT! ANDA <b>LULUS</b>";
        } else {
            hasil.style.color = "#ff4f4f";
            hasil.innerHTML = "❌ ANDA <b>TIDAK LULUS</b>";
        }
    } else {
        hasil.style.color = "white";
        hasil.innerHTML = "❗ NISN tidak ditemukan";
    }

    hasil.style.display = "block";
}


// Upload Excel
function uploadExcel() {
    let file = document.getElementById("fileInput").files[0];
    let info = document.getElementById("info");

    if (!file) {
        info.style.display = "block";
        info.innerHTML = "⚠️ Pilih file Excel dulu!";
        return;
    }

    let reader = new FileReader();

    reader.onload = function (e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: "array" });

        let sheet = workbook.Sheets[workbook.SheetNames[0]];
        let json = XLSX.utils.sheet_to_json(sheet);

        // Konversi ke format:
        // { "12345": {NISN:..., NAMA:..., STATUS:...} }
        let hasil = {};
        json.forEach(row => {
            hasil[row.NISN] = row;
        });

        // Simpan ke file JSON
        downloadJSON(hasil);

        info.style.display = "block";
        info.innerHTML = "✔️ Data berhasil diubah menjadi data.json";
    };

    reader.readAsArrayBuffer(file);
}

// Fungsi membuat file JSON
function downloadJSON(obj) {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    let a = document.createElement("a");
    a.href = dataStr;
    a.download = "data.json";
    a.click();
}
