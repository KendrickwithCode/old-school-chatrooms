export type Message = {
  id?: number,
  user: string,
  message: string,
  online: boolean
}

export type SendMessageProp = {
  onSend: (text: string) => void;
}

export type MessageRowAreaProp = {
  message: Message;
}

export interface ChatAreaProp {
  chatMessages: Message[];
}

export interface OnlineUserRowProp {
  User: string;
}

export interface ChatRoomAreaProp {
  chatMessages: Message[];
  onSend: (text: string) => void;
}