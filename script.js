const timerElm = document.getElementById("timer");
const txtElm = document.getElementById("text");
const inputElm = document.getElementById("input");
const nextBtn = document.getElementById("nextButton");
const API = "https://api.quotable.io/random";
let TIMER;

function getQuote() {
    return new Promise((resolve) => {
        fetch(API)
        .then(res => res.json())
        .then(data => {
            resolve({
                text: data.content,
                length: data.length
            });
        })
        .catch((e) => {
            console.error(e);
            resolve(null);
        });
    });
}

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputElm.value = null;
    timerElm.innerText = 0;
    txtElm.innerHTML = null;
    inputElm.disabled = true;
    inputElm.classList.add("dis");
    generate();
});

inputElm.addEventListener("input", () => {
    const quotes = document.querySelectorAll("span");
    if (!quotes.length) return alert("Something went wrong!");
    const inputText = inputElm.value.split("");

    let done = true;
    quotes.forEach((span, index) => {
        const character = inputText[index];
        if (!character) {
            span.classList.remove("correct");
            span.classList.remove("incorrect");
            done = false;
        } else if (character === span.innerText) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
        } else {
            span.classList.remove("correct");
            span.classList.add("incorrect");
            done = false;
        }
    });

    if (done) {
        inputElm.value = null;
        timerElm.innerText = 0;
        txtElm.innerHTML = null;
        inputElm.disabled = true;
        inputElm.classList.add("dis");
        generate();
    };
});

async function generate() {
    TIMER = Date.now();
    timerElm.innerText = 0;
    txtElm.innerHTML = null;
    inputElm.disabled = true;
    inputElm.classList.add("dis");

    const quote = await getQuote();
    if (!quote) return alert("Something went wrong!");

    quote.text.split("").forEach(char => {
        const elm = document.createElement("span");
        elm.innerText = char;
        txtElm.appendChild(elm);
    });
    inputElm.value = null;
    inputElm.maxLength = quote.length;
    inputElm.disabled = false;
    inputElm.classList.remove("dis");
    inputElm.focus();
    timer();
}

function timer() {
    if (!TIMER) return;

    setInterval(() => {
        const time = Math.floor((Date.now() - TIMER) / 1000);
        timerElm.innerText = time;
    }, 1000);
}

generate();
