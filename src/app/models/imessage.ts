export interface IMessage {
  content: string;
  senderAdmin: {
    id: number;
  };
  receiverClient: {
    code: string;
  };
}
