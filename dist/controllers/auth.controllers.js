"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const jwtRepository_1 = require("../utils/jwtRepository");
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
const crudUser = new authRepository_1.default();
const jwtSign = new jwtRepository_1.JwtSign();
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield crudUser.store(req.body);
        const token = jwtSign.jwtSign(user._id);
        res.header('auth-token', token).json(user);
    }
    catch (e) {
        res.status(500).json({
            ok: false,
            err: {
                message: `Lo sentmos, hubo un error con el servidor ${e}`
            }
        });
    }
});
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msgDismatch = { ok: false, err: { message: "email o contraseña incorrecta" } };
        var body = req.body;
        const user = yield crudUser.findOneByEmail(body.email);
        if (!user || user == null)
            return res.status(400).json(msgDismatch);
        const match = yield user.validatePassword(body.password);
        if (match) {
            var token = jwtSign.jwtSign(user._id);
            var userLoged = yield crudUser.findOneById(user._id);
            return res.header('auth-token', token).json(userLoged);
        }
        else {
            return res.status(400).json(msgDismatch);
        }
    }
    catch (e) {
        return res.status(500).json({ ok: false, err: { message: "Server internal error :,/" } });
    }
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield crudUser.findOneById(req.userId);
    if (!user)
        return res.status(404).json('User not found');
    res.json(user);
});
//# sourceMappingURL=auth.controllers.js.map