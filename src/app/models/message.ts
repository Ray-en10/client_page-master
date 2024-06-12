export class Message {
  content: string;
  senderAdmin?: Admin; // Make senderAdmin optional
  receiverClient?: Partial<Client>; // Make receiverClient a Partial<Client>
  timestamp: Date;

  constructor(content: string, senderAdmin?: Admin, receiverClient?: Partial<Client>) {
    this.content = content;
    this.senderAdmin = senderAdmin;
    this.receiverClient = receiverClient;
    this.timestamp = new Date();
  }
}


export class Admin {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class Client {
  code: string;
  email: string;
  lastname: string;
  name: string;
  password: string;
  phone: number;

  constructor(code: string, email: string, lastname: string, name: string, password: string, phone: number) {
    this.code = code;
    this.email = email;
    this.lastname = lastname;
    this.name = name;
    this.password = password;
    this.phone = phone;
  }
}
