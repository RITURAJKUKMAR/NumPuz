let menuBar = document.querySelector(".manu-bar");
let menu = false;
function showMenu() {
    if (menu == false) {
        menu = true;
        menuBar.classList.remove("hide");
        menuBar.classList.add("show");
    }
    else {
        menu = false;
        menuBar.classList.remove("show");
        menuBar.classList.add("hide");
    }
}


let result = document.querySelector(".result");
let time = document.querySelector(".time");
let moves = document.querySelector(".moves");
let stBtn = document.getElementById("st-btn");
let btns = document.querySelectorAll(".btn");
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let flag = false;
let count = 0;
let sec = 0;
let min = 0;


let t = setInterval(() => {
    if (flag == true) {
        sec++;
        if (sec == 59) {
            min++;
            sec = 0;
        }

        time.innerText = `${min}:${sec}`;
    }
}, 1000);



let wonC = 0;
function checkWon() {
    for (let i = 0; i < 15; i++) {
        if (arr[i] == i + 1)
            wonC = 1;
        else {
            wonC = 0;
            break;
        }
    }
    if (wonC == 1)
        return true;
    else
        return false;
}

function won() {
    for (let i = 0; i < 16; i++) {
        if (i == 15)
            arr[i] = "";
        else
            arr[i] = i + 1;
    }
    insertElements();
    checkWon();
}

function wonSms() {
    clearTimeout(t);
    result.innerHTML = ` <div class="results">
        <h1>Congratulation you won the game! 🎉</h1>
        <br><br>
        <h2>🎖️All the time and moves you took.<br> <br><br> TIME : ${min}:${sec} and MOVES : ${count}</h2>
        <br><br>
    </div>`

}

function checkMt() {
    for (let i = 0; i < 16; i++) {
        if (arr[i] == "") {

            return i;
        }
    }
}

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (flag == true) {
            for (let i = 0; i < 16; i++) {
                if (btns[i].innerText == btn.innerText) {

                    let j = checkMt();
                    if (i + 1 == j || i - 1 == j || i + 4 == j || i - 4 == j) {
                        let t = arr[i];
                        arr[i] = arr[j];
                        arr[j] = t;
                        count++;
                        insertElements();
                        if (checkWon() == true)
                            wonSms();
                        break;
                    }
                }
            }
        }
    });
});

function insertElements() {
    moves.innerText = `M : ${count}`;
    for (let i = 0; i < 16; i++) {
        if (arr[i] == 0)
            btns[i].innerText = "";
        else
            btns[i].innerText = arr[i];
    }
}

function start() {
    flag = true;
    stBtn.classList.add("hide");
    let f = 0;
    for (let i = 0; i < 16;) {
        f = 0;
        let num = (Math.floor(Math.random() * 100) % 16);
        for (let j = 0; j < i; j++) {
            if (arr[j] == num) {
                f = 1;
                break;
            }
        }
        if (f != 1) {
            arr[i] = num;
            i++;
        }
    }
    insertElements();

}