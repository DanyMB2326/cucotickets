import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { config } from "./env.config.js";

import sessionsService from "../services/sessions.service.js";

const cookieExtractor = (req) => {

    if (req && req.cookies) {
        return req.cookies.currentUser;
    }

    return null;

};
export const initializePassport = () => {

    console.log("Inicializando Passport...");

    passport.use(
        "register",
        new LocalStrategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, email, password, done) => {

                try {

                    const user =
                        await sessionsService.register({

                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email,
                            password

                        });

                    return done(null, user);

                } catch (error) {

                    return done(error);

                }

            }
        )
    );

    passport.use(
        "login",
        new LocalStrategy(
            {
                usernameField: "email"
            },
            async (email, password, done) => {

                try {

                    const { user } =
                        await sessionsService.login({
                            email,
                            password
                        });

                    return done(null, user);

                } catch (error) {

                    return done(null, false, {
                        message: error.message
                    });

                }

            }
        )
    );

    passport.use(
    "current",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
                cookieExtractor
            ]),
            secretOrKey: config.jwtSecret
        },
        async (payload, done) => {

            try {

                return done(null, payload);

            } catch (error) {

                return done(error, false);

            }

        }
    )
);

    console.log(
    "Estrategias:",
    Object.keys(passport._strategies)
);

};

export default passport;