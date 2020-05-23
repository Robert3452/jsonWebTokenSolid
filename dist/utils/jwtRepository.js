"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = exports.JwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env['TOKEN_SECRET'] || `!#T!#o!#k!#e!#nS!#e!#c!#r!#e!#t!#K!#e!#y!#`;
class JwtSign {
    jwtSign(_id) {
        const token = jsonwebtoken_1.default.sign({ _id: _id }, tokenSecret, { expiresIn: 60 * 60 });
        return token;
    }
}
exports.JwtSign = JwtSign;
class JwtMiddleware {
    jwtVerify(req, res, next) {
        var jsonError = { ok: false, err: { message: 'acceso denegado' } };
        try {
            const token = req.header('token');
            if (!token)
                return res.status(401).json(jsonError);
            const payload = jsonwebtoken_1.default.verify(token, tokenSecret);
            req.userId = payload._id;
            next();
        }
        catch (e) {
            res.status(400).json(jsonError);
        }
    }
}
exports.JwtMiddleware = JwtMiddleware;
//# sourceMappingURL=jwtRepository.js.map