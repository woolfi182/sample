import { CreateMessageMetadata } from '../dtos/create-message.dto';

export abstract class AbstractMessageService {
  abstract saveMessage(message: string, metadata: CreateMessageMetadata): Promise<any>;
}
