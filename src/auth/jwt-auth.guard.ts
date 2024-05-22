import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Request} from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.log('token yoq')
      throw new UnauthorizedException();
    }

    try {
      request["user"] = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_ACCESS_SECRET_KEY")
      });
    } catch (err) {
      console.log('token decode qilomadi')

      throw new UnauthorizedException()
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}