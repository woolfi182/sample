import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/is-public';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageFactory } from './services/message.factory';

@Controller('/v1/messages')
export class MessageController {
  private logger = new Logger(MessageController.name);
  constructor(private readonly messageFactory: MessageFactory) {}

  // TODO: add validation for internal usage
  @Public()
  @Post()
  async saveMessage(@Body() messageData: CreateMessageDto) {
    this.logger.log({
      function: this.saveMessage.name,
      message: 'Save new message',
      payload: messageData,
    });

    const message = await this.messageFactory.saveMessage(messageData);
    return {
      result: message,
    };
  }
}
