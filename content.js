(async function () {
    chrome.storage.local.get("jsonData", function (data) {
        if (data.jsonData) {
            const questions = document.querySelectorAll(
                'div[data-automation-id="questionItem"]'
            );
            questions.forEach((execute) => {
                const questionText = formatText(
                        execute.querySelector("span.text-format-content")
                            .textContent
                    ).trim(),
                    ans = data.jsonData.find(
                        (item) => formatText(item.question) === questionText
                    )?.answer;
                if (ans) {
                    execute
                        .querySelectorAll(
                            'div[data-automation-id="choiceItem"]'
                        )
                        .forEach((choice) => {
                            const choiceText = choice
                                .querySelector("span.text-format-content")
                                .textContent.trim();
                            if (ans.includes(formatText(choiceText))) {
                                choice.querySelector("label").click();
                            }
                        });
                }
            });
        } else {
            console.log("No JSON data found. Please upload a JSON file.");
        }
    });
})();

const formatText = (text) =>
    text
        .replace(/\s+/g, " ")
        .replace(/“|”/g, '"')
        .replace(/–/g, "-")
        .normalize("NFC");
