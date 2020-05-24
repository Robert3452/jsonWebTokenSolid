import validator from './utils.interface/InterfaceValidations';
export class verifyEmail implements validator {
    verify(value: string): boolean {
        const patternEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        if (!patternEmail.test(value)) {
            return false
        }
        return true
    }
}

export class verifyPassword implements validator {
    verify(value: string): boolean {
        /*La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, 
       al menos una minúscula y al menos una mayúscula.
       NO puede tener otros símbolos.*/
        const patternPassword = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        if (!patternPassword.test(value)) {
            return false;
        }
        return true;
    }

}