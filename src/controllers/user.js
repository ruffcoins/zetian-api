const User = require('../models/user')

class UserController {
    static async addUser(req, res) {
        const user = new User(req.body)

        try {

            // check if user password is less than 7 characters and if it doesn't contain the word 'password'
            if (user.password.length < 7 || user.password.includes('password')) {
                return res.status(412).send({ success: false, message: 'Password must be at least 7 characters and not contain the word "password"' });
            }

            await user.save()
            res.status(201).send({ success: true, message: user })
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate username
                return res.status(422).send({ success: false, message: "Username already exists" });
            }
            res.status(400).send(e)
        }
    }

    static async addAdminUser(req, res) {
        const user = new User({
            "username": req.body.username,
            "password": req.body.password,
            "role": 'admin'
        })

        try {
            await user.save()
            res.status(201).send({ success: true, message: user })
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate username
                return res.status(422).send({ success: false, message: "Username already exists" });
            }
            res.status(400).send(e)
        }
    }

    static async myProfile(req, res) {

        try {
            const user = req.user;
            res.status(200).send({ success: true, message: user })
        } catch (e) {
            res.status(500).send({ success: false, message: e.message })
        }
    }

    static async viewUsers(req, res) {
        try {
            const users = await User.find({})
            res.send({ success: true, message: users })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }

    static async viewUser(req, res) {
        const id = req.params.id.trim()

        try {
            const user = await User.findById(id)

            if (!user) {
                return res.status(404).send({ success: false, message: "User not found" });
            }

            return res.send({ success: true, message: user })
        } catch (e) {
            return res.status(500).send({ success: false, message: "User does not exist" });
        }
    }

    static async updateUser(req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['username', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const user = await User.findById(req.params.id);

            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();

            if (!user) {
                return res.status(404).send({ success: false, message: "User not found" });
            }

            res.send({ success: true, message: user });
        } catch (e) {

            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate username
                return res.status(422).send({ success: false, message: "Username already exists" });
            } else {
                res.status(400).send({ success: false, message: e });

            }
        }
    }

    static async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)

            if (!user) {
                return res.status(404).send({ success: false, message: "User not found" })
            }

            res.send({ success: true, message: user })
        } catch (e) {
            res.status(500).send({ success: false, message: "User does not exist" });
        }
    }

    static async userLogin(req, res) {
        try {
            const user = await User.findByCredentials(req.body.username, req.body.password);
            const token = await user.generateAuthToken();
            res.status(200).send({ success: true, message: user, token });
        } catch (e) {
            res.status(404).send({ success: false, message: "Wrong Username or Password" });
        }
    }

    static async logout(req, res) {
        try {
            req.user.tokens = [];
            await req.user.save();

            res.status(200).send({ success: true, message: "Logged out Successfully" });

        } catch (e) {
            res.status(500).send({ success: false, message: e });

        }
    }
}

module.exports = UserController;