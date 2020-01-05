let myLibrary = new Map();
const newBookBtn = document.getElementById("newBookBtn");
const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const status = document.querySelectorAll("input[name=status]");
const table = document.getElementById("bookTableBody");

function Book(title, author, pages, status)
{
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addRow(newBook)
{
  let row = table.insertRow();
  for (let i in newBook)
  {
    row.insertCell().innerHTML=newBook[i];
  }
  deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-circle");
  deleteBtn.classList.add("btn-danger");
  deleteBtn.innerHTML = "x";
  deleteBtn.style = "float: right";
  row.insertCell().appendChild(deleteBtn);
  deleteBtn.addEventListener("click", ()=>
  {
    table.deleteRow(row.index);
    myLibrary.delete(row.cells[0].innerHTML);
    localStorage.removeItem(row.cells[0].innerHTML);
  });
}


function addBookToLibrary() {
  let statusValue;
  status.forEach((st)=>{
      if(st.checked)
      {
        statusValue = st.value;
        st.checked = false;
      }
    }
  )
  let newBook = new Book(title.value, author.value, pages.value,statusValue);
  addRow(newBook);
  title.value="";
  author.value="";
  pages.value="";
  newBookString = JSON.stringify(newBook);
  myLibrary.set(newBook.title, newBookString);
  localStorage.setItem(newBook.title, newBookString);
  table.innerHTML = "";
  render();
}

function render()
{
  for(let i = 0; i < localStorage.length; i++)
  {
    let bookString = localStorage.getItem(localStorage.key(i));
    addRow(JSON.parse(bookString));
    myLibrary.set(localStorage.key(i), bookString);
  }
}

render();
