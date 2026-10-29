import { makePost } from "./post.js";

async function fetchData(){
    let response = await fetch("data.json");
    let posts = await response.json();
    console.log(posts);

    for(const post of posts){
        makePost(post);
    }
}

fetchData();
