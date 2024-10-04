import { TgGroup } from './group/entities/tg-group.entity';
import { TgMessage } from './message/entities/tg-message.entity';
import { Project } from './project/entities/project.entity';
import { TgSender } from './sender/entities/tg-sender.entity';
import { TgUserSocial } from './user/entities/tg-user-social.entity';
import { UserSocial } from './user/entities/user-social.entity';
import { User } from './user/entities/user.entity';

export const entities = [User, UserSocial, TgSender, TgUserSocial, Project, TgMessage, TgGroup];
