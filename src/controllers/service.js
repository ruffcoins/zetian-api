const Service = require('../models/service')

class ServiceController {
    static async addService(req, res) {
        const service = new Service(req.body)

        try {
            await service.save()
            res.status(201).send({ success: true, message: service })
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate phone number
                return res.status(422).send({ success: false, message: "Service already exists" });
            }
            res.status(400).send(e)
        }
    }

    static async viewServices(req, res) {
        try {
            const services = await Service.find({})
            res.send({ success: true, message: services })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }

    static async viewService(req, res) {
        const _id = req.params.id

        try {
            const service = await Service.findById(_id)

            if (!service) {
                return res.status(404).send({ success: false, message: "Service not found" });
            }

            res.send({ success: true, message: service })
        } catch (e) {
            res.status(500).send({ success: false, message: "Servcie does not exist" })
        }
    }

    static async updateService(req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'amount']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!service) {
                return res.status(404).send({ success: false, message: "Service not found" });
            }

            res.send({ success: true, message: service });
        } catch (e) {
            res.status(400).send({ success: false, message: e });
        }
    }

    static async deleteService(req, res) {
        try {
            const service = await Service.findByIdAndDelete(req.params.id)

            if (!service) {
                return res.status(404).send({ success: false, message: "Service not found" })
            }

            res.send({ success: true, message: service })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }
}

module.exports = ServiceController;