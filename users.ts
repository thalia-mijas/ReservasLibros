class User {
  private name: string;
  private email: string;
  private birth: string;

  constructor(nombre: string, email: string, nacimiento: string) {
    this.name = nombre;
    this.email = email;
    this.birth = nacimiento;
  }

  //Enlista los usuarios existentes en la localStorage
  setUsers(): void {
    const usersStorage = localStorage.getItem("users");
    if (usersStorage != null) {
      const users: User[] = JSON.parse(usersStorage);
      users.forEach((user, index) => {
        this.listUsers(user, index);
      });
    }
  }

  //Agrega los usuarios a nuestro HTML
  listUsers(data: any, id: any): void {
    const divUsers = document.getElementById("users");
    if (divUsers) {
      const divNewUser = document.createElement("div");
      divNewUser.setAttribute("class", "user");
      divNewUser.innerHTML = `
        <div class="nombre">${data.name}</div>
        <div class="nombre">${data.email}</div>
        <div class="fecha">${data.birth}</div>
        <div class="opt-user">
          <button onclick="defUser.deleteUser(${id})" class="del-element" title="Eliminar usuario"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg></button>
        </div>`;
      divUsers.appendChild(divNewUser);
    }
  }

  //Elimina usuarios de la localStorage y de la pagina web
  deleteUser(userId: number): void {
    const userStorage = localStorage.getItem("users");

    if (userStorage) {
      const users: User[] = JSON.parse(userStorage);
      const newUsers = users.filter((_, index) => index !== userId);
      const myJSON = JSON.stringify(newUsers);
      localStorage.setItem("users", myJSON);

      window.location.reload();
    }
  }

  //Crea nuevo usuario, lo agrega a localeStorage y lo enlista en la pagina web
  newUser(): void {
    const urlUser = (<HTMLFormElement>document.getElementById("new-user-form"))
      .action;
    if (urlUser) {
      const pathsUser: any = urlUser.split("=");
      const valueName = pathsUser[1]
        .replaceAll("&email", "")
        .replaceAll("+", " ")
        .replaceAll("%C3%A1", "á")
        .replaceAll("%C3%A9", "é")
        .replaceAll("%C3%AD", "í")
        .replaceAll("%C3%B3", "ó")
        .replaceAll("%C3%BA", "ú")
        .replaceAll("%C3%B1", "ñ");
      const valueEmail = pathsUser[2]
        .replaceAll("&birth", "")
        .replaceAll("%40", "@");
      const valueBirth = pathsUser[3];

      var userStorage = localStorage.getItem("users");
      const myObj = new User(valueName, valueEmail, valueBirth);
      if (userStorage) {
        const usersList = JSON.parse(userStorage);
        usersList.forEach((user: any) => {
          if (user.name == myObj.name || user.email == myObj.email) {
            alert(
              "Usuario ya existe\nUsuario: " +
                user.name +
                "\nCorreo: " +
                user.email
            );
            window.location.replace("index.html");
            throw new Error("Usuario o email ya registrados");
          }
        });
        usersList?.push(myObj);
        const myJSON = JSON.stringify(usersList);
        localStorage.setItem("users", myJSON);
        this.listUsers(myJSON, userStorage.length);
      } else {
        const myJSON = JSON.stringify([myObj]);
        localStorage.setItem("users", myJSON);
        this.listUsers(myJSON, "0");
      }

      window.location.replace("index.html");
    }
  }
}

const defUser = new User("", "", "");
defUser.setUsers();
defUser.newUser();
