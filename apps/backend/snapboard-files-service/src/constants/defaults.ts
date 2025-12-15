import { UserCreateInput } from '../../generated/prisma/models';

export const ANONYMOUS_USER = {
  name: 'Anonymous',
  email: 'anonymous@gauravranjit.com',
} satisfies UserCreateInput;
