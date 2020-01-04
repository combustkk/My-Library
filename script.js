let myLibrary = []
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

function addBookToLibrary() {

  //localStorage.setItem(title, JSON.stringify(newBook);
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
  console.log(newBook);
  let row = table.insertRow();
  for (let i in newBook)
  {
    row.insertCell().innerHTML=newBook[i];
  }

  title.value="";
  author.value="";
  pages.value="";

  myLibrary.push(newBook);
}

function render()
{
  for(let i of myLibrary)
  {
    console.log(i);
  }
}
