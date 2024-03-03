export class FacebookEventDto {
  sender: {
    id: string;
  };
  message: {
    text: string;
    attachments?: Attachment[];
  };
}

interface Attachment {
  type: string;
  payload: {
    url: string;
  };
}
