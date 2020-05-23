import { Request, Response } from 'express';
import { JwtSign } from '../utils/jwtRepository';
import CrudUser from '../repositories/authRepository';
import User, { IUser } from 'models/User';

const crudUser = new CrudUser();
const jwtSign = new JwtSign();

export const signup = async (req: Request, res: Response) => {
    try {
        const user: IUser = await crudUser.store(req.body);

        const token: string = jwtSign.jwtSign(user._id);

        res.header('auth-token', token).json(user);
    } catch (e) {
        res.status(500).json({
            ok: false,
            err: {
                message: `Lo sentmos, hubo un error con el servidor ${e}`
            }
        });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const msgDismatch: Object = { ok: false, err: { message: "email o contraseña incorrecta" } }
        var body: IUser = req.body;

        const user: IUser | null = await crudUser.findOneByEmail(body.email);

        if (!user || user == null) return res.status(400).json(msgDismatch)

        const match: boolean = await user.validatePassword(body.password);

        if (match) {
            var token = jwtSign.jwtSign(user._id);

            var userLoged = await crudUser.findOneById(user._id);

            return res.header('auth-token', token).json(userLoged)
        } else {
            return res.status(400).json(msgDismatch)
        }

    } catch (e) {
        return res.status(500).json({ ok: false, err: { message: "Server internal error :,/" } })
    }
}

export const profile = async (req: Request, res: Response) => {
    const user = await crudUser.findOneById(req.userId);
    if(!user) return res.status(404).json('User not found');

    res.json(user);
}