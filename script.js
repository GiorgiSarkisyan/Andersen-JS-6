class DataHandler {
  constructor() {
    this.storage = [];
  }

  fetchPosts() {
    return new Promise((resolve, reject) => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          this.storage = data;
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  listPosts() {
    const sortedStorage = [...this.storage];
    return sortedStorage.sort((a, b) => a.title.localeCompare(b.title));
  }

  getPost(id) {
    return this.storage.find((p) => p.id === id);
  }

  clearPosts() {
    this.storage = [];
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
