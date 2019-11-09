import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
    async index(req, res) {
        /* const schema = Yup.object().shape({
            student_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        } */
        const student_id = req.params.id;
        const checkins = await Checkin.findAll({
            where: { student_id },

            attributes: ['created_at'],
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'email'],
                },
            ],
        });
        return res.json(checkins);
    }

    async store(req, res) {
        /* const schema = Yup.object().shape({
            student_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        } */
        const { id } = req.params;
        const today = new Date();
        const daysAgo = subDays(today, 7);
        const checkins = await Checkin.findAll({
            where: {
                student_id: id,
                created_at: {
                    [Op.between]: [startOfDay(daysAgo), endOfDay(today)],
                },
            },
        });
        if (checkins.length > 4) {
            return res.status(401).json({
                error: `max of ${checkins.length} checkins reached in  7 days`,
            });
        }
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(401).json({ error: 'Student does not exist' });
        }
        const checkin = await Checkin.create({ student_id: id });

        return res.json(checkin);
    }
}

export default new CheckinController();
