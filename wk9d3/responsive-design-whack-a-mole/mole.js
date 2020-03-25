// Write your JS here.

window.addEventListener('DOMContentLoaded', () => {
    let moles = document.querySelectorAll(".wgs__mole-head");
    moles.forEach(mole =>{
        mole.addEventListener("click", (event) =>{
            event.target.classList.add("wgs__mole-head--hidden");
            event.target.classList.add("wgs__mole-head--whacked");
        })
    })
    setTimeout(() => popUpRandomMole(), 0);


});

function popUpRandomMole () {
    let moleHeads = document.querySelectorAll(".wgs__mole-head:not(.wgs__mole-head--whacked)");
    if (!moleHeads.length) {
        console.log("You win!");
        return;
    }
    let randomNumber = Math.floor(Math.random() * moleHeads.length);
    let specificHead = moleHeads[randomNumber];
    specificHead.classList.remove("wgs__mole-head--hidden");
    setTimeout(() => hideMole(specificHead), 1000);
}

function hideMole (param) {
    param.classList.add("wgs__mole-head--hidden");
    setTimeout(() => popUpRandomMole(), 1000)
}
