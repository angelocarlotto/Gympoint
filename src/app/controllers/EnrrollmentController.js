import * as Yup from 'yup';
import { /* isBefore, */ parseISO, addMonths } from 'date-fns';
import Enrrollment from '../models/Enrrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrrollmentsController {
    async index(req, res) {
        const { page = 1, size = 20 } = req.query;
        const enrrollments = await Enrrollment.findAll({
            // order: ['date'],
            // where: { canceled_at: null },
            limit: size,
            offset: (page - 1) * 20,
            attributes: ['id', 'start_date', 'price', 'end_date'],
            include: [
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['title', 'price', 'duration'],
                },
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'idade', 'altura', 'peso', 'email'],
                },
            ],
        });
        return res.json(enrrollments);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const student = await Student.findByPk(req.body.student_id);
        if (!student) {
            return res.status(401).json({ error: 'Student doesnt exist' });
        }

        const plan = await Plan.findByPk(req.body.plan_id);
        if (!plan) {
            return res.status(401).json({ error: 'Plan doesnt exist' });
        }

        const { student_id, plan_id, start_date } = req.body;

        const end_date = addMonths(parseISO(start_date), plan.duration);

        const price = plan.price * plan.duration;

        const { id } = await Enrrollment.create({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        return res.json({
            id,
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            start_date: Yup.date(),
            plan_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const enrrollment = await Enrrollment.findByPk(req.body.id);

        if (!enrrollment) {
            return res
                .status(401)
                .json({ error: 'Enrrollment does not exist' });
        }

        const start_date = req.body.start_date
            ? parseISO(req.body.start_date)
            : enrrollment.start_date;

        const plan_id = req.body.plan_id
            ? req.body.plan_id
            : enrrollment.plan_id;

        const plan = await Plan.findByPk(plan_id);
        if (!plan) {
            return res.status(401).json({ error: 'Plan doesnt exist' });
        }

        const price = plan.price * plan.duration;

        const end_date = addMonths(start_date, plan.duration);

        const { id } = await enrrollment.update({
            start_date,
            plan_id,
            end_date,
            price,
        });

        return res.json({ id, price, start_date, end_date });
    }

    async delete(req, res) {
        const enrollment = await Enrrollment.findByPk(req.params.id);

        if (!enrollment) {
            return res
                .status(400)
                .json({ error: 'Enrollment does not exists ' });
        }

        await enrollment.destroy({ where: { id: enrollment.id } });

        return res.json(enrollment);
    }
}

export default new EnrrollmentsController();
