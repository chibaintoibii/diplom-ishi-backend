import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {Role} from "../auth/roles/roles.enum";
import {Roles} from "../auth/roles/roles.decorator";
import {RolesGuard} from "../auth/roles/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User, UserJwtPayload} from "../auth/auth.decorator";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('/')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@User() user: UserJwtPayload) {
    return this.usersService.getUserDetails(user.id, user.role);
  }


}
