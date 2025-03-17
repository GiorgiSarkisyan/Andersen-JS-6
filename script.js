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
    console.log(dataHandler.clearPosts());
  })
  .catch((error) => {
    console.error(error);
  });

// I added Map, i added it straight into the fetch because i don't think adding it into constructor made any sense because
// it should change and be fresh and stuff and i kinda repeat myself so that's how i did it
