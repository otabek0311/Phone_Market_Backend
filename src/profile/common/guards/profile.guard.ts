import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class ProfileGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const profileId = Number(req.params.id);

    if (!user || user.id !== profileId) {
      throw new ForbiddenException('Access denied to this profile');
    }

    return true;
  }
}
