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
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    /*****************************************************************************/
    /* Crud principal de usuarios: guarda, actualiza, obtiene todos los usuario */
    /***************************************************************************/
    /*****************************************************************************/
    /* Guardar usuario */
    /***************************************************************************/
    store(json) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User_1.default();
            json.password = yield user.encryptPassword(json.password);
            Object.assign(user, json); //introduce el json transformado a user
            return yield user.save();
        });
    }
    /*****************************************************************************/
    /* Actualizar usuario */
    /***************************************************************************/
    update(id, json) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOneAndUpdate({ _id: new Object(id) }, json);
        });
    }
    /*****************************************************************************/
    /* Eliminar usuario*/
    /***************************************************************************/
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findByIdAndDelete({ _id: new Object(id) });
            // return await User.findOneAndUpdate({ _id: new Object(id) }, { active: false });
        });
    }
    /*****************************************************************************/
    /* Obtener todos los usuarios */
    /***************************************************************************/
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.find({}, '-password');
            }
            catch (e) {
                throw console.error(e);
            }
        });
    }
    /*****************************************************************************/
    /*Obtener un usuario mediante id */
    /***************************************************************************/
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findById({ _id: new Object(id) }, '-password');
            }
            catch (e) {
                throw console.error(e);
            }
        });
    }
    /*****************************************************************************/
    /*Obtener un usuario mediante email */
    /***************************************************************************/
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOne({ email: email });
            }
            catch (e) {
                throw console.error(e);
            }
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=authRepository.js.map