function displayOutput(message) {
  document.getElementById("result").innerHTML += `<p>${message}</p>`;
}

function fetchUserData(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("User not found");
      return response.json();
    })
    .then(user => {

      const userName = user.name;
      return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
          const postTitles = posts.map(post => post.title);
          const postId = posts[0]?.id;
          if (!postId) throw new Error("No posts found");
          return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => ({
              userName,
              postTitles,
              commentCount: comments.length
            }));
        });
    });
}

document.getElementById("fetch-data").addEventListener("click", () => {
  displayOutput("Fetching data...");
  fetchUserData(1)
    .then(result => {
      displayOutput(`User: ${result.userName}`);
      displayOutput(`Posts: ${result.postTitles.join(", ")}`);
      displayOutput(`Comments on first post: ${result.commentCount}`);
    })
    .catch(err => displayOutput(`Error: ${err.message}`));
});