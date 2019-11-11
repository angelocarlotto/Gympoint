import HelpOrderPlan from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderPlanController {
    async index(req, res) {
        const { student_id } = req.params;
        const student = await Student.findByPk(student_id);
        if (!student) {
            return res.status(400).json({ error: 'Student does not exist' });
        }
        const helporders = await HelpOrderPlan.findAll({
            where: { student_id },
        });
        return res.json(helporders);
    }

    async store(req, res) {
        const { question } = req.body;
        const { student_id } = req.params;
        const student = await Student.findByPk(student_id);
        if (!student) {
            return res.status(400).json({ error: 'Student does not exist' });
        }
        if (!question) {
            return res
                .status(400)
                .json({ error: 'Must say something in question' });
        }
        const helporder = await HelpOrderPlan.create({ question, student_id });
        return res.json(helporder);
    }

    async update(req, res) {
        const { help_order_id } = req.params;
        const { answer } = req.body;

        const help_order = await HelpOrderPlan.findByPk(help_order_id);
        if (!help_order) {
            return res.status(400).json({ error: 'Help order does not exist' });
        }

        if (help_order.answer_at) {
            return res.status(400).json({
                error: 'Help order already answered',
                help_Order: help_order,
            });
        }

        if (!answer) {
            return res
                .status(400)
                .json({ error: 'Must say something at your answer, dog' });
        }
        help_order.answer = answer;
        help_order.answer_at = new Date();
        await help_order.save();

        return res.json(help_order);
    }
}

export default new HelpOrderPlanController();
