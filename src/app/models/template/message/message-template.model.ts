import { MessageAttachmentModel } from "./message-attachment.model";

export class MessageTemplateModel {
  id: number;
  orgId: string = '';
  title: string = '';
  autoResponseEmail: boolean;
  emailSubject: string = '';
  loadedBy: string;
  loadedOn: Date;
  templateText: string;
  replyTo: string;
  deliveryMethod: string = 'E';
  changeStatusTo: string = '';
  attachedFiles: MessageAttachmentModel[] = [];
}
