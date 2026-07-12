import sessionsRepository from "../repositories/sessions.repository.js";

import {
    createHash,
    isValidPassword
} from "../utils/hash.js";

import ApiError from "../utils/ApiError.js";

class SessionsService {

    async register(userData) {

        const {

            first_name,

            last_name,

            email,

            password

        } = userData;

        // Verificar si el correo ya existe
        const existingUser =
            await sessionsRepository.findByEmail(
                email
            );

        if (existingUser) {

            throw ApiError.conflict(
                "El correo ya está registrado"
            );

        }

        // Crear usuario
        const newUser = {

            first_name,

            last_name,

            email,

            password: createHash(password),

            role: "user"

        };

        // Guardar usuario
        const createdUser =
            await sessionsRepository.create(
                newUser
            );

        // Eliminar contraseña
        const user =
            createdUser.toObject();

        delete user.password;

        return user;

    }

    async login(loginData) {

        const {

            email,

            password

        } = loginData;

        const normalizedEmail =
            email.trim().toLowerCase();

        const user =
            await sessionsRepository.findByEmail(
                normalizedEmail
            );

        // No revelar si falló el correo o la contraseña
        if (!user) {

            throw ApiError.unauthorized(
                "Credenciales inválidas"
            );

        }

        const validPassword =
            isValidPassword(
                password,
                user.password
            );

        if (!validPassword) {

            throw ApiError.unauthorized(
                "Credenciales inválidas"
            );

        }

        // Eliminar contraseña antes de devolverlo
        const safeUser =
            user.toObject();

        delete safeUser.password;

        return {

            user: safeUser

        };

    }

    async getAllUsers() {

        return await sessionsRepository.findAll();

    }

}

export default new SessionsService();