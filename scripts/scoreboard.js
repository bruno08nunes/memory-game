const createRow = ({ player, currentTime }, position) => {
    const tbody = document.querySelector("tbody");

    const tr = document.createElement("tr");
    const tdPosition = document.createElement("td");
    const tdPlayer = document.createElement("td");
    const tdTime = document.createElement("td");

    tdPosition.textContent = `${position + 1}°`;
    tdPlayer.textContent = player;
    tdTime.textContent = currentTime;

    tr.appendChild(tdPosition);
    tr.appendChild(tdPlayer);
    tr.appendChild(tdTime);

    tbody.appendChild(tr);
};

(() => {
    const winners = JSON.parse(localStorage.getItem("MMR_GM-winners"));
    let totalTime;
    if (winners) {
        winners.forEach(createRow);
        totalTime = winners.reduce(
            (prevValue, { currentTime: value }) => +prevValue + +value,
            0
        );

        const tdTotalTime = document.querySelector("tfoot td");
        tdTotalTime.textContent = totalTime;
        return;
    }
    const table = document.querySelector(".div-table");
    table.style.display = "none";
    const message = document.querySelector(".message");
    message.style.display = "block";
})();

// ! Responsivdade
