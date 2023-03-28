import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ValidateDeletedDocumentsMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    next();
  }
}
