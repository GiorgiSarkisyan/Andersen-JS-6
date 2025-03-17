class DataHandler {
  fetchPosts() {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        this.storage = new Map(data.map((post) => [post.id, post]));
        return this;
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        throw error;
      });
  }

  listPosts() {
    return [...this.storage.values()].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  getPost(id) {
    return this.storage.get(id);
  }

  clearPosts() {
    this.storage.clear();
    return this;
  }
}

const dataHandler = new DataHandler();

dataHandler
  .fetchPosts()
  .then(() => {
    console.log(dataHandler.listPosts());
    console.log(dataHandler.getPost(22));
  })
  .catch((error) => {
    console.error(error);
  });
