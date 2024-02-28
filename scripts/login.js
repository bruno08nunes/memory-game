const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

input.value = localStorage.getItem("MMR_GM-player") ?? "";
if (input.value.length > 2) {
    button.removeAttribute("disabled");
} else {
    button.setAttribute("disabled", "");
}

const validateInput = (e) => {
    if (e.target.value.length > 2) {
        button.removeAttribute("disabled");
        return;
    }
    button.setAttribute("disabled", "");
};

const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("MMR_GM-player", input.value);
    window.location = "pages/game.html";
};

input.addEventListener("input", validateInput);

form.addEventListener("submit", handleSubmit);
