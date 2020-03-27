window.addEventListener("DOMContentLoaded", (event) => {
    let cogButton = document.querySelector(".fa-cog");
    let searchIcon = document.querySelector(".fa-search");
    let searchBar = document.querySelector(".masthead__search");
    let searchButton = document.querySelector(".masthead__button");
    cogButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (document.querySelector(".pref--hidden")) {
            document.querySelector(".pref--hidden").classList.remove("pref--hidden");
        }
    });
    document.body.addEventListener("click", (e) => {
        document.querySelector(".pref").classList.add("pref--hidden");
    });
    searchIcon.addEventListener("click", (e) => {
        if (searchBar.classList.contains("masthead__search--hidden")) {
            searchBar.classList.remove("masthead__search--hidden");
            searchButton.classList.remove("masthead__button--hidden");
        } else {
            searchBar.classList.add("masthead__search--hidden");
            searchButton.classList.add("masthead__button--hidden");
        }
    })
});
