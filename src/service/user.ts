import * as jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';

import {ConflictError, NotFoundError, UnauthorizedError} from "../common";
import {User} from "../entity";
import {jwtSecret} from "../middleware/auth";


export const signup = async (
    email: string,
    password: string,
    name: string
) => {
    try {
        const user = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        await user.save();
    } catch (e) {
        if (e.code === 1062) // unique error code
            throw new ConflictError('email duplicate error');
        throw e;
    }
};

export const login = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({email});

    if(!user)
        throw new NotFoundError('invalid email');

    const isValidPassword = await user.comparePassword(password);

    if(!isValidPassword)
        throw new UnauthorizedError('invalid password');

    const now = new Date();
    const payload = {
        id: user.id,
        email: user.email,
        iat: now.getTime(),
        exp: now.setDate(now.getDate() + 1),
        jti: uuidv4()
    };

    return jwt.sign(payload, jwtSecret);
};
