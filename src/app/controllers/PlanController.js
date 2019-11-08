import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
    async index(req, res) {
        const { page = 1, size = 20 } = req.query;
        const plans = await Plan.findAll({
            // order: ['date'],
            where: { canceled_at: null },
            attributes: ['id', 'title', 'duration', 'price', 'canceled_at'],
            limit: size,
            offset: (page - 1) * 20,
        });
        return res.json(plans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const { id, title, price, duration } = await Plan.create(req.body);
        return res.json({ id, title, price, duration });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            price: Yup.number(),
            duration: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const plan = await Plan.findByPk(req.body.id);

        const { id, title, price, duration, canceled_at } = await plan.update(
            req.body
        );

        return res.json({ id, title, price, duration, canceled_at });
    }

    async delete(req, res) {
        const plan = await Plan.findByPk(req.params.id);

        plan.canceled_at = new Date();

        await plan.save();

        const { id, title, price, duration, canceled_at } = plan;

        return res.json({ id, title, price, duration, canceled_at });
    }
}

export default new PlansController();
