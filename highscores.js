function showScores () {
    let scores = JSON.parse(window.localStorage.getItem("scores")) || [];

    scores.forEach(function(score) {
        let li = document.createElement("li");
        li.textContent = score.name + "-" + score.score;

        let list = document.getElementById("scores");
        list.appendChild(li);
    });

}

function clear() {
    window.localStorage.removeItem("scores");
    window.location.reload()
}

let clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", clear);

showScores();