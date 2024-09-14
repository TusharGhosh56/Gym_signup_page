let books = [];
let filteredBooks = [];
const booksPerPage = 6;
let currentPage = 1;
const apiUrl = 'https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=QTd4H7HDVpLKhqIqtV42NmAthrt8ub4b';

// Function to fetch books from the API
// Function to fetch books from the API
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
                rating: book.rating || 0  // Assuming 'rating' exists or default to 0 if not present
            };
        });
        filteredBooks = books; // Initialize filteredBooks
        paginateBooks();
    } catch (error) {
        document.getElementById('error-message').textContent = `Error fetching books: ${error.message}`;
        console.error('Error fetching books:', error);
    }
}


// Function to display books on the page
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

// Function to handle pagination
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

// Function to paginate books
function paginateBooks() {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    displayBooks(paginatedBooks);
    displayPagination(filteredBooks.length, booksPerPage);
}

// Function to handle book search
function searchBooks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
    currentPage = 1; // Reset to the first page after search
    paginateBooks();
}

// Function to sort books
function sortBooks() {
    const sortOrder = document.getElementById('sorting').value;
    filteredBooks.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === 'desc') {
            return b.title.localeCompare(a.title);
        }
    });
    currentPage = 1; // Reset to the first page after sorting
    paginateBooks();
}
// Function to filter books by rating
function filterByRating() {
    const selectedRating = document.getElementById('rankFilter').value;
    if (selectedRating === 'top10') {
        filteredBooks = books.filter(book => book.rating && book.rating >= 4.5);  // Books with ratings of 4.5 and above
    } else if (selectedRating === 'top50') {
        filteredBooks = books.filter(book => book.rating && book.rating >= 3.0);  // Books with ratings of 3.0 and above
    } else {
        filteredBooks = books;  // Show all books if "all" is selected
    }
    currentPage = 1;  // Reset to the first page after filtering
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
