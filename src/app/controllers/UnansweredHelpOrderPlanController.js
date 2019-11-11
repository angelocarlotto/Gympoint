import HelpOrderPlan from '../models/HelpOrder';
import Student from '../models/Student';

class UnansweredHelpOrderPlanController {
    async index(req, res) {
        const helporders = await HelpOrderPlan.findAll({
            where: { answer_at: null },
            attributes: ['id', 'question', 'created_at'],
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });
        return res.json(helporders);
    }
}

export default new UnansweredHelpOrderPlanController();
