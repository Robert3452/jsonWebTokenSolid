import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
}

var userSchema: Schema = new Schema({
    username: { type: String, required: true, min: 3, lowercase: true },
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true }
})

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>("User", userSchema);