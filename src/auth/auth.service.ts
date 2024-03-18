import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {UserDocument} from "../users/schemas/user.schema";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService) {
  }

  async validateUser(dto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByUsername(dto.username);
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      delete user.password;
      return user;
    }
    return null;

  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    if (!user) throw new UnauthorizedException();
    return {
      tokens: await this._generateTokens(user),
      user: user
    }
  }

  private async _generateTokens(user: UserDocument) {
    const payload = {id: user._id, role: user.role, username: user.username}
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_ACCESS_SECRET_KEY"),
        expiresIn: '1h'
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET_KEY"),
        expiresIn: '7d'
      })
    }
  }

}
