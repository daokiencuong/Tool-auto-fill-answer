document.getElementById("uploadButton").addEventListener("click", function () {
    const fileInput = document.getElementById("jsonFile");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                chrome.storage.local.set({ jsonData: jsonData }, function () {
                    alert("File has been uploaded successfully!");
                });
            } catch (error) {
                alert("Error parsing JSON!");
            }
        };
        reader.readAsText(file);
    } else {
        alert("Please select a file.");
    }
});
