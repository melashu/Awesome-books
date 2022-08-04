/* eslint-disable */
class Book {
  constructor(bookTitle, bookAuthor) {
    this.title = bookTitle;
    this.author = bookAuthor;
  }
}

/* eslint-disable */
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
    const bookList = BStorage.getBook();
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

/* eslint-disable */
class UI {
  static displayBook() {
    const bookList = BStorage.getBook();
    bookList.forEach((book, index) => {
      UI.addBookToScreen(book, index);
    });
  }

  static addBookToScreen(book, index) {
    document.querySelector(".book h2").style.display = "block";
    const table = document.getElementsByClassName("book-list")[0];
    const row = document.createElement("tr");
    const td = ` <td>${book.title} By ${book.author}</td> <td class='btn-td'> <button type="button" id="${index}" class="btn-remove"> Remove </button></td> `;
    row.innerHTML = td;
    table.appendChild(row);
  }
}
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const book = new Book(title, author);
  UI.addBookToScreen(book, BStorage.getBook().length);
  BStorage.addBook(book);
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
});
document.addEventListener("DOMContentLoaded", UI.displayBook);
document
  .getElementsByClassName("book-list")[0]
  .addEventListener("click", BStorage.removeBook);

document.querySelector(".list").addEventListener("click", () => {
  document.getElementsByClassName("book")[0].style.display = "block";
  document.getElementsByClassName("add-book-list")[0].style.display = "none";
  document.getElementsByClassName("contact-me")[0].style.display = "none";
});
document.querySelector(".add").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementsByClassName("book")[0].style.display = "none";
  document.getElementsByClassName("contact-me")[0].style.display = "none";
  document.getElementsByClassName("add-book-list")[0].style.display = "flex";
});

document.querySelector(".contact").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementsByClassName("book")[0].style.display = "none";
  document.getElementsByClassName("contact-me")[0].style.display = "flex";
  document.getElementsByClassName("add-book-list")[0].style.display = "none";
});
