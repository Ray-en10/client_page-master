export class Client {
  code?: string;
  name?: string;
  lastname?: string;
  phone?: number;
  email?: string;
  password?: string;

  constructor(name?: string, lastname?: string, phone?: number, password?: string, email?: string, code?: string) {
    this.code = code;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
}
