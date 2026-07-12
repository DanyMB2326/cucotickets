import sessionsService from "../services/sessions.service.js";
import { generateToken } from "../utils/jwt.js";
import UserDTO from "../dto/UserDTO.js";

export const getCurrent = async (req, res) => {

    res.status(200).json({

        status: "success",

        payload: new UserDTO(req.user)

    });

};

export const register = async (req, res, next) => {

    try {

        res.status(201).json({

            status: "success",

            payload: new UserDTO(req.user)

        });

    } catch (error) {

        next(error);

    }

};

export const login = async (req, res, next) => {

    try {

        const user = req.user;

        const token =
            generateToken(user);

        res.cookie(
            "currentUser",
            token,
            {
                httpOnly: true,
                sameSite: "lax",
                secure:
                    process.env.NODE_ENV === "production",
                maxAge: 3600000
            }
        );

        res.status(200).json({

            status: "success",

            payload: new UserDTO(user)

        });

    } catch (error) {

        next(error);

    }

};

export const logout = (req, res) => {

    res.clearCookie("currentUser");

    res.status(200).json({

        status: "success",

        message: "Sesión cerrada correctamente"

    });

};

export const getUsers = async (req, res, next) => {

    try {

        const users =
            await sessionsService.getAllUsers();

        res.status(200).json({

            status: "success",

            payload: users.map(
                user => new UserDTO(user)
            )

        });

    } catch (error) {

        next(error);

    }

};