const myForm = document.querySelector('#form');
const formContainer = document.querySelector('.form-container');
const nameInput = document.querySelector('#name');
const authorInput = document.querySelector('#author');
const pageInput = document.querySelector('#page');
const nameError = document.querySelector('#nameError');
const authorError = document.querySelector('#authorError');
const pageError = document.querySelector('#pageError');
const addBtn = document.querySelector('.add-btn');
const submitBtn = document.querySelector('#submit-btn');
const emptyBtn = document.querySelector('.empty-lib');

// Preventing default submit button and showing error message if the inputs are left empty
myForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (nameInput.value === '') {
        nameError.textContent = "*Book's name is required";
    } else {
        nameError.textContent = '';
    }

    if (authorInput.value === '') {
        authorError.textContent = "*Author's name is required";
    } else {
        authorError.textContent = '';
    }

    if (pageInput.value === '') {
        pageError.textContent = "*Book's number of pages is required";
    } else {
        pageError.textContent = '';
    }
});

// Showing the book registration form
addBtn.addEventListener('click', () => {
    if (addBtn.classList.contains('active')) {
      addBtn.classList.remove('active');
      formContainer.style.display = 'none';
    } else {
      addBtn.classList.add('active');
      formContainer.style.display = 'flex';
    }
});

// Library array
let myLibrary = [];

// Book function using class contructor with 2 methods inside
class Book {
  constructor(name, author, page, read) {
     this.name = name;
     this.author = author;
     this.page = page;
     this.read = read;
  };

  // toggle is used to change read and unread status in books
  toggle() {
    this.read = !this.read;
    render();
  }

  // removeBook is used to delete a certain book from the library
  removeBook() {
    const index = myLibrary.indexOf(this);
    myLibrary.splice(index, 1);
    render();
  }
}
  // Function to display newly added books after registering them
  function render() {
    let libraryEl = document.querySelector('#card-container');
    libraryEl.innerHTML = "";

  
    myLibrary.forEach(function(book) {
      let bookEl = document.createElement('div');
      bookEl.setAttribute('class', 'card');
      bookEl.innerHTML = `
        <h2>Book</h2>
        <p><strong>Name:</strong> ${book.name}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.page}</p>
        <p><strong>Status:</strong> <button id="read-btn">${book.read ? 'Read!' : 'Not read!'}</button></p>
        <button id="delete-card">Delete</button>
        <button id="toggleRead">${book.read ? 'Toggle Unread' : 'Toggle Read'}</button>
      `;
      libraryEl.appendChild(bookEl);
      emptyBtn.style.display = "none";
  
      let readBtn = bookEl.querySelector('#read-btn');
      let deleteBtn = bookEl.querySelector('#delete-card');
      let toggleBtn = bookEl.querySelector('#toggleRead');
  
      // button to change status of the book to read or unread, related to toogle function
      readBtn.addEventListener('click', function() {
        book.toggle();
        render();
      });
  
      // button to remove book, related to removeBook function
      deleteBtn.addEventListener('click', function() {
        book.removeBook();
        emptyBtn.style.display = "flex";
        console.log('Book is deleted');
        render();
      });
  
      // Button to change the toggle button textcontent accordingly to status of the book, also related to toggle function
      toggleBtn.addEventListener('click', function() {
        book.toggle();
        console.log('Book is toggled');
        render();
      });
    });

    // Local Storage to save changes and new books
    localStorage.setItem('libraryBooks', JSON.stringify(myLibrary));
  }

  // Function to let books have the same prototypes after being added to localStorage
function createBookFromData(data) {
    let book = new Book(data.name, data.author, data.page, data.read);
    book.toggle = Book.prototype.toggle;
    book.removeBook = Book.prototype.removeBook;
    return book;
  }
  
  const storedBooks = localStorage.getItem('libraryBooks');
  if (storedBooks) {
    let parsedBooks = JSON.parse(storedBooks);
    myLibrary = parsedBooks.map(createBookFromData);
    render();
  }

  // Function that take values that were added through registration form and passes to render function to display books
function addBookToLibrary() {
    let name = document.querySelector('#name').value;
    let author = document.querySelector('#author').value;
    let page = document.querySelector('#page').value;
    let readSelect = document.querySelector('#read');
    let read = readSelect.value === 'Read!';

    if (name && author && page > 0) {
    let newBook = new Book(name, author, page, read);
    myLibrary.push(newBook);
    console.log(myLibrary);
    render();
    console.log('New Book is added');
    } 
};

submitBtn.addEventListener('click', addBookToLibrary);

// setting the year
const year = document.querySelector('#current-year');
year.innerHTML = new Date().getFullYear();






