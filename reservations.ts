class Reservation {
  private startMin: string = this.startDate(new Date());
  private duration: any = 0;
  private client: string;
  private book: string;
  private start: string;
  private end: string;

  constructor(cliente: string, libro: string, inicio: string, fin: string) {
    this.client = cliente;
    this.book = libro;
    this.start = inicio;
    this.end = fin;
  }

  //Setea la fecha de inicio de reservacion en el formato requerido
  startDate(today: any): string {
    console.log(today);
    const start = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    return start;
  }

  //Calcula la fecha de fin de reservacion en funcion de la duracion escogida
  endDate(today: any): string {
    today = new Date(today);
    const moreDay = this.duration;
    var day;

    day = today.getTime() + moreDay * 24 * 60 * 60 * 1000;
    today.setTime(day);
    console.log(today);
    const end = `${today.getFullYear()}-${
      (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)
    }-${(today.getDate() < 10 ? "0" : "") + today.getDate()}`;

    return end;
  }

  //Setea opciones en el formulario de reservacion
  setOptions(): void {
    const startDate = document.getElementById("start");
    startDate?.setAttribute("min", this.startMin);

    //Agrega en opciones los usuarios existentes en localStorage
    var usersStorage = localStorage.getItem("users");
    if (usersStorage != null) {
      const listUsers = document.getElementById("client");
      listUsers?.removeAttribute("disabled");
      const users = JSON.parse(usersStorage);
      users.forEach((user: any) => {
        const data = user;
        if (listUsers) {
          const optUser = document.createElement("option");
          optUser.setAttribute("value", data.name);
          optUser.innerHTML = `${data.name}`;
          listUsers.appendChild(optUser);
        }
      });
    }

    //Agrega en opciones los libros existentes en localStorage y que tengan copias disponibles
    var booksStorage = localStorage.getItem("books");
    if (booksStorage != null) {
      const listBooks = document.getElementById("book");
      listBooks?.removeAttribute("disabled");
      const books = JSON.parse(booksStorage);
      books.forEach((book: any) => {
        if (book.availability > 0) {
          const data = book;
          if (listBooks) {
            const optBook = document.createElement("option");
            optBook.setAttribute("value", data.title);
            optBook.innerHTML = `${data.title}`;
            listBooks.appendChild(optBook);
          }
        }
      });
    }
  }

  //Enlista las reservaciones existentes en la localStorage
  setReservations(): void {
    const reservationsStorage = localStorage.getItem("reservations");
    if (reservationsStorage != null) {
      const reservations: Reservation[] = JSON.parse(reservationsStorage);
      reservations.forEach((reservation, index) => {
        const data = reservation;
        if (new Date(reservation.end).getTime() > new Date().getTime()) {
          this.listReservations(reservation, index);
        } else {
          this.deleteReservation(index);
          this.bookMore(reservation.book);
        }
      });
    }
  }

  //Agrega las reservaciones a nuestro HTML
  listReservations(data: any, id: any): void {
    const divReservations = document.getElementById("reservations");
    if (divReservations) {
      const divNewReservation = document.createElement("div");
      divNewReservation.setAttribute("class", "reservation");
      divNewReservation.innerHTML = `
              <div class="nombre">${data.client}</div>
              <div class="nombre">${data.book}</div>
              <div class="fecha">${data.start}</div>
              <div class="fecha">${data.end}</div>
              <div class="opt">
                <button onclick="defReservation.deleteReservation(${id})" class="del-element" title="Eliminar usuario"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg></button>
              </div>`;
      divReservations.appendChild(divNewReservation);
    }
  }

  //Elimina reservaciones de la localStorage y de la pagina web
  deleteReservation(reservationId: number): void {
    const reservationStorage = localStorage.getItem("reservations");

    if (reservationStorage) {
      const reservations: Reservation[] = JSON.parse(reservationStorage);
      const newReservations = reservations.filter(
        (_, index) => index !== reservationId
      );
      const myJSON = JSON.stringify(newReservations);
      localStorage.setItem("reservations", myJSON);

      window.location.reload();
    }
  }

  //Crea nueva reservacion, lo agrega a localeStorage y lo enlista en la pagina web
  newReservation(): void {
    const urlReservation = (<HTMLFormElement>(
      document.getElementById("new-reservation-form")
    )).action;
    if (urlReservation) {
      const pathsReservation: any = urlReservation.split("=");
      const valueClient = pathsReservation[1]
        .replaceAll("&book", "")
        .replaceAll("+", " ")
        .replaceAll("%C3%A1", "á")
        .replaceAll("%C3%A9", "é")
        .replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%B1", "ñ");
      const valueBook = pathsReservation[2]
        .replaceAll("&start", "")
        .replaceAll("+", " ")
        .replaceAll("%C3%A1", "á")
        .replaceAll("%C3%A9", "é")
        .replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%B1", "ñ")
        .replaceAll("%C3%BC", "ü");
      const valueStart = pathsReservation[3].replaceAll("&duration", "");
      this.duration = pathsReservation[4];
      const valueEnd = this.endDate(valueStart);

      var reservationStorage = localStorage.getItem("reservations");
      const myObj = new Reservation(
        valueClient,
        valueBook,
        valueStart,
        valueEnd
      );
      if (reservationStorage) {
        const reservationsList = JSON.parse(reservationStorage);
        reservationsList.forEach((reservation: any) => {
          if (
            reservation.client == myObj.client &&
            reservation.book == myObj.book &&
            new Date(reservation.end).getTime() >
              new Date(myObj.start).getTime()
          ) {
            alert(
              "Reservación ya existe\nUsuario: " +
                reservation.client +
                "\nLibro: " +
                reservation.book +
                "\nFecha de finalización: " +
                reservation.end
            );
            window.location.replace("reservations.html");
            throw new Error("Reservación ya registrada para este usuario");
          }
        });
        reservationsList?.push(myObj);
        const myJSON = JSON.stringify(reservationsList);
        localStorage.setItem("reservations", myJSON);
        this.listReservations(myJSON, reservationStorage.length);
        this.bookLess(myObj.book);
      } else {
        const myJSON = JSON.stringify([myObj]);
        localStorage.setItem("reservations", myJSON);
        this.listReservations(myJSON, "0");
        this.bookLess(myObj.book);
      }

      window.location.replace("reservations.html");
    }
  }

  bookLess(theBook: string): void {
    var bookStorage = localStorage.getItem("books");
    if (bookStorage) {
      const booksList = JSON.parse(bookStorage);
      booksList.forEach((book: any) => {
        if (book.title == theBook) {
          book.availability = book.availability - 1;
        }
      });
      const myJSON = JSON.stringify(booksList);
      localStorage.setItem("books", myJSON);
    }
  }

  bookMore(theBook: string): void {
    var bookStorage = localStorage.getItem("books");
    if (bookStorage) {
      const booksList = JSON.parse(bookStorage);
      booksList.forEach((book: any) => {
        if (book.title == theBook) {
          book.availability = book.availability + 1;
        }
      });
      const myJSON = JSON.stringify(booksList);
      localStorage.setItem("books", myJSON);
    }
  }
}

const defReservation = new Reservation("", "", "", "");
defReservation.setReservations();
defReservation.setOptions();
defReservation.newReservation();
