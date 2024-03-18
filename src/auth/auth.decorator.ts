import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Role} from "./roles/roles.enum";


export interface UserJwtPayload {
  id: string;
  username: string;
  role: Role;
  groupId?: string;
}
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserJwtPayload => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
})