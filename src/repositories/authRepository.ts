import attributesCrud from './repositories.interface/crudInterface';
import User, { IUser } from '../models/User';

class UserRepository implements attributesCrud<IUser>{
    /*****************************************************************************/
    /* Crud principal de usuarios: guarda, actualiza, obtiene todos los usuario */
    /***************************************************************************/

    /*****************************************************************************/
    /* Guardar usuario */
    /***************************************************************************/
    async store(json: IUser): Promise<IUser> {
        let user: IUser = new User();
        json.password = await user.encryptPassword(json.password);
        Object.assign(user, json);//introduce el json transformado a user
        return await user.save()
    }
    /*****************************************************************************/
    /* Actualizar usuario */
    /***************************************************************************/
    async update(id: string, json: object): Promise<IUser | null> {
        return await User.findOneAndUpdate({ _id: new Object(id) }, json)
    }
    /*****************************************************************************/
    /* Eliminar usuario*/
    /***************************************************************************/
    async delete(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete({ _id: new Object(id) });
        // return await User.findOneAndUpdate({ _id: new Object(id) }, { active: false });
    }
    /*****************************************************************************/
    /* Obtener todos los usuarios */
    /***************************************************************************/
    async getAll(): Promise<IUser[]> {
        try {
            return await User.find({}, '-password');
        } catch (e) {
            throw console.error(e);
        }
    }

    /*****************************************************************************/
    /*Obtener un usuario mediante id */
    /***************************************************************************/
    async findOneById(id: string): Promise<IUser | null> {
        try {
            return await User.findById({ _id: new Object(id) }, '-password')
        } catch (e) {
            throw console.error(e);
        }
    }
    
    /*****************************************************************************/
    /*Obtener un usuario mediante email */
    /***************************************************************************/
    async findOneByEmail(email: string): Promise<IUser |null> {
        try {
            return await User.findOne({ email: email })

        } catch (e) {
            throw console.error(e);
        }

    }

}

export default UserRepository;