class Book {
  private title: string;
  private author: string;
  private year: number;
  private genre: string;
  private availability: number;

  constructor(
    titulo: string,
    autor: string,
    publicacion: number,
    genero: string,
    copias: number
  ) {
    this.title = titulo;
    this.author = autor;
    this.year = publicacion;
    this.genre = genero;
    this.availability = copias;
  }

  setBooks(): void {
    const booksStorage = localStorage.getItem("books");
    if (booksStorage != null) {
      const books: Book[] = JSON.parse(booksStorage);
      books.forEach((book, index) => {
        this.listBooks(book, index);
      });
    }
  }

  listBooks(data: any, id: any): void {
    const divBooks = document.getElementById("books");
    if (divBooks) {
      const divNewBook = document.createElement("div");
      divNewBook.setAttribute("class", "book");
      divNewBook.innerHTML = `
              <div class="nombre">${data.title}</div>
              <div class="nombre">${data.author}</div>
              <div class="opt">${data.year}</div>
              <div class="opt">${data.genre}</div>
              <div class="opt">${data.availability}</div>
              <div class="opt">
                <button onclick="defBook.deleteBook(${id})" class="del-element" title="Eliminar libro"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg></button>
              </div>`;
      divBooks.appendChild(divNewBook);
    }
  }

  deleteBook(bookId: number): void {
    const bookStorage = localStorage.getItem("books");

    if (bookStorage) {
      const books: Book[] = JSON.parse(bookStorage);
      const newBooks = books.filter((_, index) => index !== bookId);
      const myJSON = JSON.stringify(newBooks);
      localStorage.setItem("books", myJSON);

      window.location.reload();
    }
  }

  newBook(): void {
    const urlBook = (<HTMLFormElement>document.getElementById("new-book-form"))
      .action;
    if (urlBook) {
      const pathsBook: any = urlBook.split("=");
      console.log(pathsBook);
      const valueTitle = pathsBook[1]
        .replaceAll("&author", "")
        .replaceAll("+", " ")
        .replaceAll("%C3%A1", "á")
        .replaceAll("%C3%A9", "é")
        .replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%B1", "ñ")
        .replaceAll("%C3%BC", "ü");
      console.log(valueTitle);
      const valueAuthor = pathsBook[2]
        .replaceAll("&year", "")
        .replaceAll("+", " ")
        .replaceAll("%C3%A1", "á")
        .replaceAll("%C3%A9", "é")
        .replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%B1", "ñ")
        .replaceAll("%C3%BC", "ü");
      console.log(valueAuthor);
      const valueYear = pathsBook[3].replaceAll("&genre", "");
      console.log(valueYear);
      const valueGenre = pathsBook[4]
        .replaceAll("&availability", "")
        .replaceAll("+", " ")
        .replaceAll("%C3%A1", "á")
        .replaceAll("%C3%A9", "é")
        .replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%B1", "ñ")
        .replaceAll("%C3%BC", "ü");
      console.log(valueGenre);
      const valueAvailability = pathsBook[5];
      console.log(valueAvailability);

      var bookStorage = localStorage.getItem("books");
      const myObj = new Book(
        valueTitle,
        valueAuthor,
        valueYear,
        valueGenre,
        valueAvailability
      );
      if (bookStorage) {
        const booksList = JSON.parse(bookStorage);
        booksList.forEach((book: any) => {
          if (book.title == myObj.title && book.author == myObj.author) {
            alert(
              "Libro ya existe\nLibro: " + book.name + "\nAutor: " + book.email
            );
            window.location.replace("books.html");
            throw new Error("Libro ya registrado");
          }
        });
        booksList?.push(myObj);
        const myJSON = JSON.stringify(booksList);
        localStorage.setItem("books", myJSON);
        this.listBooks(myJSON, bookStorage.length);
      } else {
        const myJSON = JSON.stringify([myObj]);
        localStorage.setItem("books", myJSON);
        this.listBooks(myJSON, "0");
      }

      window.location.replace("books.html");
    }
  }
}

const defBook = new Book("", "", 0, "", 0);
defBook.setBooks();
defBook.newBook();
