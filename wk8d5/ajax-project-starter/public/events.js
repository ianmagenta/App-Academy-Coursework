window.addEventListener("DOMContentLoaded", (e) => {
    picFetcher();

    let newPicButton = document.getElementById("new-pic");
    newPicButton.addEventListener("click", (e) => {
        let loadingText = document.querySelector(".loader");
        loadingText.innerHTML = "Loading..."
        picFetcher()
            .then(() => loadingText.innerHTML = "");
    });

    let upvote = document.getElementById("upvote");
    let downvote = document.getElementById("downvote");
    let score = document.querySelector(".score");
    upvote.addEventListener("click", (e) => {
        mrFetcher("upvote", "PATCH", score, "innerHTML", "score");
    });
    downvote.addEventListener("click", (e) => {
        mrFetcher("downvote", "PATCH", score, "innerHTML", "score");
    });

    let form = document.querySelector(".comment-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        new FormData(form);
    });
    form.addEventListener("formdata", (e) => {
        let commentSection = document.querySelector(".comments");
        commentSection.innerHTML = "";
        let data = e.formData;
        let comment = data.get("user-comment");
        mrFetcher("comments", "POST", commentSection, "innerHTML", "comments", JSON.stringify({ comment }));
    });
});


function picFetcher() {
    let image = document.querySelector(".cat-pic");
    return mrFetcher("image", "GET", image, "src", "src")
}

function mrFetcher (page, method, item, itemVal, dataVal, body=null) {
    let errorText = document.querySelector(".error");
    errorText.innerHTML = "";
    return fetch(`/kitten/${page}`, { method: method, headers: { "Content-Type": "application/json" }, body: body })
        .then(res => {
            if (!res.ok) {
                throw res
            }
            return res.json();
        })
        .then(data => { item[itemVal] = data[dataVal] })
        .catch(err => {
            err = err.json()
            err.then(errJSON => errorText.innerHTML = errJSON.message);
        });
}
