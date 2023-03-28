const Appointment = require('../models/Appointment')

const getAppointments = async (req, res) => {
    try {
        console.log(req.params.therapistId)
        const list = await Appointment.find({
            therapistId: req.params.therapistId,
            isBooked: false
        })
        res.json(list)
    } catch (e) {
        res.json({ msg: 'nothing' })
    }

}

module.exports = {
    getAppointments
}