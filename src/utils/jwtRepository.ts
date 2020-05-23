import { jwtMiddlewareAttribute, jwtSign } from './utils.interface/jwtInterface';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
export interface IPayload {
    _id: string;
    iat: number;
}
const tokenSecret: string = process.env['TOKEN_SECRET'] || `!#T!#o!#k!#e!#nS!#e!#c!#r!#e!#t!#K!#e!#y!#`;
export class JwtSign implements jwtSign {
    jwtSign(_id: string): string {
        const token: string = jwt.sign({ _id: _id }, tokenSecret, { expiresIn: 60 * 60 });
        return token;
    }
}

export class JwtMiddleware implements jwtMiddlewareAttribute {
    jwtVerify(req: Request, res: Response, next: NextFunction) {
        var jsonError: Object = { ok: false, err: { message: 'acceso denegado' } }
        try {
            const token = req.header('token');
            if (!token) return res.status(401).json(jsonError);
            const payload = jwt.verify(token, tokenSecret) as IPayload;
            req.userId = payload._id;
            next();
        } catch (e) {
            res.status(400).json(jsonError);
        }

    }
}

