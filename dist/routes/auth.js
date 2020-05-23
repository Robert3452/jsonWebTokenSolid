"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const jwtRepository_1 = require("../utils/jwtRepository");
const jwtVerify = new jwtRepository_1.JwtMiddleware().jwtVerify;
const router = express_1.default();
router.post('/signup', auth_controllers_1.signup);
router.post('/signin', auth_controllers_1.signin);
router.get('/profile', jwtVerify, auth_controllers_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map