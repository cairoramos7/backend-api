"use strict";

const User = use("App/Models/User");

class AuthController {
    async register({ request, auth, response }) {
        const data = request.only(["username", "email", "password"]);

        const user = await User.create(data);

        const token = await auth.generate(user);
        return response.json({
            user: user,
            token: token
        });
    }

    async authenticate({ request, auth, response }) {
        const { email, password } = request.all();

        const attempt = await auth.attempt(email, password);
        if (attempt) {
            const user = await User.findBy("email", email);
            const token = await auth.generate(user);
            return response.json({
                user: user,
                token: token
            });
        }

        /* try {
            const attempt = await auth.attempt(email, password)
            if (attempt) {
                const user = await User.findBy("email", email);
                const token = await auth.generate(user);
                return response.json({
                    user: user,
                    token: token
                });
            }
        } catch (error) {
            return error;
        } */

        // const token = await auth.attempt(email, password)

        // return token
    }
}

module.exports = AuthController;
