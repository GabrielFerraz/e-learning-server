import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as process from 'process';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.getToken(req);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      req['user'] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWTSECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private getToken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
