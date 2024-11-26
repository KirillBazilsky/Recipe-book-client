export enum messageType {
  info = "info",
  error = "error",
}

export interface IMessage {
  value: string;
  type: messageType;
}
