import prisma from "../models/prisma.js"
import { comparePasswords } from "../utils/passwords.js";
import { generateToken } from "../utils/token.js";
import { hashPass } from "../utils/passwords.js";

const login = async ({email, password}) => {
    // Find if user exist
    const user = await prisma.user.findUnique({
        where: {email}
    });

    if (!user){
        const error = new Error("Invalid email or password");
        error.statutsCode = 401;
        throw error;
    }
    //compare password
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid){
        const error = new Error("Invalid email or password");
        error.statutsCode = 401;
        throw error;
    }

    const token = generateToken(user.id);

    return{
        user : {
            id: user.id,
            name: user.name,
            email : user.email,
        },
        token,
    }
    };


const register = async ({ email, password, name }) => {

    // vérifier si email existe
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
    }

    // hash password
    const hashedPassword = await hashPass(password);

    // create user
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    // token
    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
};

const getMe = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true
        }
    });

    return user;
};

    export {
    login,
    register
};