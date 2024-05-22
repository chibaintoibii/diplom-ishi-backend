import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginUserDto} from "./dto/login-user.dto";
import {UsersService} from "../users/users.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto) {
    const token = await this.authService.login(dto);
    return {
      accessToken: token
    }
  }
}
