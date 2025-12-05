<script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

<script>
document.getElementById("convertBtn").addEventListener("click", function () {
    const fileInput = document.getElementById("excelFile");
    const output = document.getElementById("jsonOutput");

    if (!fileInput.files.length) {
        output.textContent = "Silakan upload file Excel terlebih dahulu.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const json = XLSX.utils.sheet_to_json(sheet);

        output.textContent = JSON.stringify(json, null, 4);

        // Untuk download JSON
        const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "kelulusan.json";
        a.click();
    };

    reader.readAsArrayBuffer(file);
});
</script>
