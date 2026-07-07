import sessionsService from "../services/sessions.service.js";

export const getCurrent = async (req, res) => {

    res.status(200).json({
        status: "success",
        payload: req.user
    });

};

export const register = async (req, res) => {

    try {

        const user = await sessionsService.register(req.body);

        res.status(201).json({
            status: "success",
            payload: user
        });

    } catch (error) {

        res.status(400).json({
            status: "error",
            message: error.message
        });

    }

};

export const login = async (req, res) => {

    try {

        const { user, token } = await sessionsService.login(req.body);

        res.cookie("currentUser", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000
        });

        res.status(200).json({
            status: "success",
            payload: user
        });

    } catch (error) {

        res.status(401).json({
            status: "error",
            message: error.message
        });

    }

};

export const logout = (req, res) => {

    res.clearCookie("currentUser");

    res.status(200).json({
        status: "success",
        message: "Sesión cerrada correctamente"
    });

};