export enum MessageType {
  PLAIN = 'plain',
  ALERT = 'alert',
}

export type Message = {
  id?: string;
  text: string;
  type: MessageType;
};
