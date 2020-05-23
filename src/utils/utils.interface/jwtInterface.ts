import { Request, Response, NextFunction } from 'express';
export interface jwtMiddlewareAttribute {
    jwtVerify(req: Request, res: Response, next: NextFunction): void;
}

export interface jwtSign {
    jwtSign(_id: string): string;
}
