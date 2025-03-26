document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:4000/books'; // Backend API URL

    
    document.getElementById('saveButton').addEventListener('click', async () => {
        const bookId = document.getElementById('bookId').value.trim();
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();

        if (!title || !author) {
            alert("Please enter both title and author!");
            return;
        }

        const bookData = { title, author };

        try {
            let response;
            if (bookId) {
               
                const response = await fetch(`http://localhost:4000/books/${bookId}`, {  // Fix: Use "books"
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
                
            } else {
                // POST request to add a new book
                response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);
            document.getElementById('bookId').value = ''; // Clear Book ID field
            document.getElementById('title').value = ''; // Clear Title field
            document.getElementById('author').value = ''; // Clear Author field
        } catch (error) {
            console.error('Error saving book:', error);
            alert('Failed to save book. Please try again.');
        }
    });

    // Event Listener 2: Delete Book (DELETE)
    document.getElementById('deleteButton').addEventListener('click', async () => {
        const bookId = document.getElementById('deleteId').value.trim();

        if (!bookId) {
            alert("Please enter a Book ID to delete!");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/${bookId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);
            document.getElementById('deleteId').value = ''; // Clear Book ID field
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book. Please try again.');
        }
    });

    // Event Listener 3: View All Books (GET)
    document.getElementById('viewButton').addEventListener('click', async () => {
        try {
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const books = await response.json();

            const bookList = document.getElementById('bookList');
            bookList.innerHTML = ''; // Clear previous list

            if (books.length === 0) {
                bookList.innerHTML = '<li>No books found.</li>';
                return;
            }

            books.forEach(book => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}`;
                bookList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
            alert('Failed to fetch books. Please try again.');
        }
    });

    // Event Listener 4: Clear All Inputs
    document.getElementById('clearInputs').addEventListener('click', () => {
        document.getElementById('bookId').value = '';
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('deleteId').value = '';
    });
});