class Book {
  constructor(bookTitle, bookAuthor) {
    this.title = bookTitle;
    this.author = bookAuthor;
  }
}
class BStorage {
  static getBook() {
    let book = [];
    if (localStorage.getItem("ourbook") !== null) {
      book = JSON.parse(localStorage.getItem("ourbook"));
    } else {
      book = [];
    }
    return book;
  }
  static addBook(book) {
    let bookList = BStorage.getBook();
    bookList.push(book);
    console.log(bookList);
    localStorage.setItem("ourbook", JSON.stringify(bookList));
  }
  static removeBook(e) {
    if (e.target.classList.contains("btn-remove")) {
      let list = BStorage.getBook();
      const parent = e.target.parentElement.parentElement;
      const elementIndex = e.target.id;
      parent.remove();
      const result = list.filter((book) => book !== list[elementIndex]);
      list = result;
      localStorage.setItem("ourbook", JSON.stringify(result));
    }
  }
}
