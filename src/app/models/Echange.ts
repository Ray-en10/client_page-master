export interface Echange {
  codeEchange?: number;
  client?: { code: string } | null;
  responsable?: { id: number } | null;
  createdAt?: Date;
  montant: number;
  state: string;
  livrer: boolean;
}
