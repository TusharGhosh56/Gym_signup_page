let books = [];
let filteredBooks = [];
const booksPerPage = 6;
let currentPage = 1;
const apiUrl = 'https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=QTd4H7HDVpLKhqIqtV42NmAthrt8ub4b';


async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        books = data.results.books.map(book => {
            return {
                ...book,
                rating: book.rating || 0  
            };
        });
        filteredBooks = books; 
        paginateBooks();
    } catch (error) {
        document.getElementById('error-message').textContent = `Error fetching books: ${error.message}`;
        console.error('Error fetching books:', error);
    }
}



function displayBooks(booksToDisplay) {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    booksToDisplay.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <img src="${book.book_image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
        `;
        booksContainer.appendChild(bookItem);
    });
}


function displayPagination(totalBooks, booksPerPage) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalBooks / booksPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.style.backgroundColor = 'darkgreen';
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            paginateBooks();
        });
        paginationContainer.appendChild(pageButton);
    }
}

function paginateBooks() {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    displayBooks(paginatedBooks);
    displayPagination(filteredBooks.length, booksPerPage);
}


function searchBooks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
    currentPage = 1; 
    paginateBooks();
}


function sortBooks() {
    const sortOrder = document.getElementById('sorting').value;
    filteredBooks.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === 'desc') {
            return b.title.localeCompare(a.title);
        }
    });
    currentPage = 1; 
    paginateBooks();
}

function filterByRating() {
    const selectedRating = document.getElementById('rankFilter').value;
    if (selectedRating === 'top10') {
        filteredBooks = books.filter(book => book.rating && book.rating >= 4.5);  
    } else if (selectedRating === 'top50') {
        filteredBooks = books.filter(book => book.rating && book.rating >= 3.0);  
    } else {
        filteredBooks = books; 
    }
    currentPage = 1;
    paginateBooks();
}



// Fetch books and initialize
document.getElementById('fetchbooks').addEventListener('click', () => {
    fetchBooks();
});

// Search functionality
document.getElementById('search').addEventListener('input', () => {
    searchBooks();
});

// Sorting functionality
document.getElementById('sorting').addEventListener('change', () => {
    sortBooks();
});

// Genre filtering
document.getElementById('genreFilter').addEventListener('change', () => {
    filterByGenre();
});

// Rank filtering
document.getElementById('rankFilter').addEventListener('change', () => {
    filterByRank();
});
