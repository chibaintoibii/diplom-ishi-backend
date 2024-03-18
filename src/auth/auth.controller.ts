import {Body, Controller, Get, HttpCode, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginUserDto} from "./dto/login-user.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {User, UserJwtPayload} from "./auth.decorator";
import {UsersService} from "../users/users.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
}
