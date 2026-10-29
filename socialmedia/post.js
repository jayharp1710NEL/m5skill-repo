let feed = document.querySelector(".feed");

const icons = {
    like: "M12 20.5s-8-4.6-8-10.6A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8 2.6c0 6-8 10.6-8 10.6z",
    comment: "M20.5 12a8.5 8.5 0 1 0-3.4 6.8l3.9 1.2-1.2-3.9a8.4 8.4 0 0 0 .7-4.1z",
    share: "M21 3 3 10l7.5 3L21 3l-10.5 10L14 21z",
    save: "M19 21l-7-5.5L5 21V3h14z"
};

function makePost(post) {
    let rootElement = document.createElement("article");
    rootElement.classList.add("post");

    rootElement.innerHTML = `
        <div class="post-header">
            <img class="post-avatar" src="${post.avatarUrl}" alt="Profielfoto">
            <a class="post-username" href="#">${post.user}</a>
        </div>

        <img class="post-image" src="${post.imgUrl}" alt="Placeholder afbeelding">

        <div class="post-buttons">
            <button class="icon-button" aria-label="Like">
                <svg viewBox="0 0 24 24"><path d="${icons.like}"/></svg>
            </button>
            <button class="icon-button" aria-label="Comment">
                <svg viewBox="0 0 24 24"><path d="${icons.comment}"/></svg>
            </button>
            <button class="icon-button" aria-label="Share">
                <svg viewBox="0 0 24 24"><path d="${icons.share}"/></svg>
            </button>
            <button class="icon-button save-button" aria-label="Save">
                <svg viewBox="0 0 24 24"><path d="${icons.save}"/></svg>
            </button>
        </div>

        <p class="post-likes">${post.likes} likes</p>
        <p class="post-text"><span class="post-username">${post.user}</span> ${post.text}</p>
        <a class="post-comments" href="#">View all ${post.comments} comments</a>
    `;

    feed.appendChild(rootElement);
}

export { makePost };
