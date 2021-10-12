const User = require('../models/user')

class UserController {
    static async addUser(req, res) {
        const user = new User(req.body)

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

    static async viewUsers(req, res) {
        try {
            const users = await User.find({})
            res.send({ success: true, message: users })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }

    static async viewUser(req, res) {
        const _id = req.params.id

        try {
            const user = await User.findById(_id)

            if (!user) {
                return res.status(404).send({ success: false, message: "User not found" });
            }

            res.send({ success: true, message: user })
        } catch (e) {
            res.status(500).send({ success: false, message: "User does not exist" });
        }
    }

    static async updateUser(req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['username', 'password', 'employee_id']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const user = await User.findById(req.params.id);

            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

            if (!user) {
                return res.status(404).send({ success: false, message: "User not found" });
            }

            res.send({ success: true, message: user });
        } catch (e) {
            res.status(400).send({ success: false, message: e });
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
            res.send({ success: true, message: user, token })
        } catch (e) {
            res.status(400).send({ success: false, message: "Wrong Username or Password" });
        }
    }
}

module.exports = UserController;