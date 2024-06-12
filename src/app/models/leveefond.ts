export class Leveefond {
  codeLV!: number;
  date: Date;
  client: any;
  responsable: any;
  b50: number;
  b20: number;
  b10: number;
  b5: number;
  monnaie: number;

  constructor(date: Date, client: any,responsable: number, B50: number, B20: number, B10: number, B5: number, monnaie: number) {
    this.date = date;
    this.client = client;
    this.responsable = responsable;
    this.b50 = B50;
    this.b20 = B20;
    this.b10 = B10;
    this.b5 = B5;
    this.monnaie = monnaie;
  }
}
