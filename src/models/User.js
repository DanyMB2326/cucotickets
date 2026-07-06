// Modelo base de Usuario.
// En próximas entregas se conectará a MongoDB (Mongoose) y sumará
// autenticación (registro, login, JWT, roles).

export class User {
    constructor({ id, firstName, lastName, email, password, role = 'user' }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export default User;
