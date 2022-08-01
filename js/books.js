const title = document.getElementById("title");
const author = document.getElementById("author");
const booklist = document.getElementsByClassName("book-list")[0];
const fomr = document.getElementsByClassName("book-form")[0];

let allBook = [
  {
    title: "Japan",
    author: "Meshu",
  },
  {
    title: "Japan",
    author: "DADA",
  },
];

if (localStorage.getItem("ourbook") != null) {
  allBook = JSON.parse(localStorage.getItem("ourbook"));
}

let btnRemove;

for (book of allBook) {
  const bookTemplate = `<div class="book">
        <p class="book-title">${book["title"]}</p>
        <p class="book-author">${book["author"]}</p>
        <button type="button" class="btn-remove">
    Remove
  </button>
    </div>`;

  let domBook = new DOMParser().parseFromString(bookTemplate, "text/html");
  const bookContainer = domBook.querySelector(".book");
  booklist.appendChild(bookContainer);
}

btnRemove = document.querySelectorAll(".book .btn-remove");

btnRemove.forEach((remove) => {
  remove.addEventListener("click", (e) => {
    let parent = e.target.parentNode;
    booklist.removeChild(parent);
  });
});
