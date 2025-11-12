//sample book data
  const booksData = [
    { id:1, name:"Introduction to Engineering", author:"John Doe", genre:"Academic", status:"Available", location:"Main library", borrower:null, dueDate:null, year:2022 },
    { id:2, name:"Advanced React", author:"Jane Smith", genre:"Technology", status:"Issued", location:"Sub library", borrower:"user@gmail.com", dueDate:"2025-11-15", year:2023 },
    { id:3, name:"Fictional Story", author:"Author X", genre:"Fiction", status:"Available", location:"Main library", borrower:null, dueDate:null, year:2018 }
  ];

  let loggedUser = null;

  function login(){
    const gmailInput = document.getElementById("gmail-input").value.trim();
    const errorPara = document.getElementById("login-error");
    errorPara.textContent = "";
    if(!gmailInput || !gmailInput.endsWith("@gmail.com")){
      errorPara.textContent = "Please enter a valid Gmail ID.";
      return;
    }
    loggedUser = { name: gmailInput.split("@")[0], email: gmailInput };
    document.getElementById("username").textContent = loggedUser.name;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("main-section").classList.remove("hidden");
    loadAllBooks();
  }

  function loadAllBooks(){
    displayBooks(booksData);
  }

  function displayBooks(books) {
    const tbody = document.getElementById("books-tbody");
    const table = document.getElementById("books-table");
    const noBooksMsg = document.getElementById("no-books-msg");
    tbody.innerHTML = "";

    if(books.length === 0) {
      table.classList.add("hidden");
      noBooksMsg.classList.remove("hidden");
      return;
    }

    noBooksMsg.classList.add("hidden");
    table.classList.remove("hidden");

    books.forEach(book => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.status}</td>
        <td>${book.location}</td>
        <td>${book.borrower ? book.borrower : "-"}</td>
        <td>${book.dueDate ? book.dueDate : "-"}</td>
        <td>${book.year}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function searchBooks(){
    const name = document.getElementById("search-name").value.trim().toLowerCase();
    const author = document.getElementById("search-author").value.trim().toLowerCase();
    const genre = document.getElementById("search-genre").value;

    const filtered = booksData.filter(book => {
      return (!name || book.name.toLowerCase().includes(name)) &&
             (!author || book.author.toLowerCase().includes(author)) &&
             (!genre || book.genre === genre);
    });

    displayBooks(filtered);
  }

  function printNotes(){
    const notes = document.getElementById("notes-text").value.trim();
    const copies = parseInt(document.getElementById("copies").value);
    const color = document.querySelector("input[name='print-color']:checked").value;
    const messagePara = document.getElementById("print-message");
    messagePara.style.color = "green";

    if(!notes){
      messagePara.style.color = "red";
      messagePara.textContent = "Please enter notes to print.";
      return;
    }

    setTimeout(() => {
      messagePara.textContent = 'Your print request for ${copies} ${color} copy(ies) has been processed successfully via GPay.';
      document.getElementById("notes-text").value = "";
      document.getElementById("copies").value = "1";
    },1000);
  }
  