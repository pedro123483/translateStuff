let translatedText = document.getElementById("translated-text");
let button = document.getElementById("btn");
let textArea = document.getElementById("text-area");

button.addEventListener("click", () => {
    let textToTranslate = textArea.value;

    const data = JSON.stringify([
        {
            "Text": `${textToTranslate}`
        }
    ]);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            const textTranslated = response[0].translations[0].text;
            
            if(textToTranslate == "") {
                translatedText.innerHTML = "Por favor, digite alguma coisa!";
                translatedText.style.color = "red";
            } else {
                translatedText.innerHTML = textTranslated;
                translatedText.style.color = "green";
            }
        }
    });

    xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=pt&api-version=3.0&profanityAction=NoAction&textType=plain");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("X-RapidAPI-Key", "2fcbcc0d06msh650595e2f9db483p159e2ejsnc9f9fe61f855");
    xhr.setRequestHeader("X-RapidAPI-Host", "microsoft-translator-text.p.rapidapi.com");

    xhr.send(data);
});