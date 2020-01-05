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

function addDropDown(newBook)
{
  const val = newBook.status;
  let dropdownGroup = document.createElement("div");
  //data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
  dropdownGroup.textContent = val;
  let dropdownBtn = document.createElement("button");
  dropdownBtn.setAttribute("data-toggle", "dropdown");
  dropdownBtn.setAttribute("aria-haspopup", "true");
  dropdownBtn.setAttribute("expanded", "false");
  dropdownBtn.classList.add("btn");
  dropdownBtn.classList.add("btn-sm");
  dropdownBtn.classList.add("dropdown-toggle");
  dropdownBtn.id="dropdownMenuButton";
  const statuses = ["In Progress", "Want to read", "Finished", "Given Up"];
  let dropdownDiv = document.createElement("div");
  dropdownDiv.setAttribute("aria-labelledby", "dropdownMenuButton");
  dropdownDiv.classList.add("dropdown-menu");
  for(i of statuses)
  {
      if(i != val)
      {
        let dropdownItem = document.createElement("a");
        dropdownItem.href="#";
        dropdownItem.innerHTML = i;
        dropdownItem.classList.add("dropdown-item");
        dropdownItem.style = "font-size:0.7rem";
        dropdownDiv.appendChild(dropdownItem);
        dropdownItem.addEventListener("click", ()=>
        {
          newBook.status = dropdownItem.innerHTML;
          newBookString = JSON.stringify(newBook);
          myLibrary.set(newBook.title, newBookString);
          localStorage.setItem(newBook.title, newBookString);
          table.innerHTML = "";
          render();
        });
      }
  }
  dropdownGroup.appendChild(dropdownBtn);
  dropdownGroup.appendChild(dropdownDiv);
  dropdownGroup.classList.add("dropdown");
  return dropdownGroup;
}


function addRow(newBook)
{
  let row = table.insertRow();
  let cell;
  for (let i in newBook)
  {
    cell = row.insertCell();
    cell.innerHTML=newBook[i];
  }
  cell.innerHTML = "";
  cell.appendChild(addDropDown(newBook));
  let deleteBtn = document.createElement("button");
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
