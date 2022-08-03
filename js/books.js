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
class UI {
  static displayBook() {
    let bookList = BStorage.getBook();
    bookList.forEach((book, index) => {
      UI.addBookToScreen(book, index);
    });
  }
  static addBookToScreen(book, index) {
     
    const table = document.getElementsByClassName("book-list")[0];
    let row = document.createElement("tr");
    let td = ` <td>${book.title} By ${book.author}</td> <td class='btn-td'> <button type="button" id="${index}" class="btn-remove"> Remove </button></td> `;
    row.innerHTML = td;
    table.appendChild(row);
  }
}
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  let book = new Book(title, author);
  UI.addBookToScreen(book, BStorage.getBook().length);
  BStorage.addBook(book);
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
});
document.addEventListener("DOMContentLoaded", UI.displayBook);
document
  .getElementsByClassName("book-list")[0]
  .addEventListener("click", BStorage.removeBook);
