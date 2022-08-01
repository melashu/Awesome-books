const title = document.getElementById("title");
const author = document.getElementById("author");
const booklist = document.getElementsByClassName("book-list")[0];
const form = document.getElementsByClassName("book-form")[0];

let allBook = [];

/**
 *
 */
if (localStorage.getItem("ourbook") != null) {
  allBook = JSON.parse(localStorage.getItem("ourbook"));
}

let btnRemove;
let index = 0;
for (book of allBook) {
  const bookTemplate = `<div class="book">
        <p class="book-title">${book["title"]}</p>
        <p class="book-author">${book["author"]}</p>
        <button type="button" id="${index}" class="btn-remove">
    Remove
  </button>
<br/>
<br/>

  <hr>
    </div>`;

  let domBook = new DOMParser().parseFromString(bookTemplate, "text/html");
  const bookContainer = domBook.querySelector(".book");
  booklist.appendChild(bookContainer);
  index++;
}

btnRemove = document.querySelectorAll(".book .btn-remove");

function addBook(event) {
  event.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;

  let book = { title: bookTitle, author: bookAuthor };
  const prev = JSON.parse(localStorage.getItem("ourbook")); // Tooks the previous book from localstorage
  prev.push(book);
  localStorage.setItem("ourbook", JSON.stringify(prev));
  window.location.reload();
}

form.addEventListener("submit", addBook);

function removeBook(e) {
  let parent = e.target.parentNode;
  let elementIndex = e.target.id;
  booklist.removeChild(parent);
  const result = allBook.filter((book) => book != allBook[elementIndex]);
  allBook = result;
  localStorage.setItem("ourbook", JSON.stringify(result));
}

btnRemove.forEach((remove) => {
  remove.addEventListener("click", removeBook);
});
