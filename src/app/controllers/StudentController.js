import * as Yup from 'yup';
import Student from '../models/Student';

class StudentControler {
    async index(req, res) {
        const { page = 1, size = 20 } = req.query;
        const students = await Student.findAll({
            // order: ['date'],
            // where: { canceled_at: null },
            limit: size,
            offset: (page - 1) * 20,
        });
        return res.json(students);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            idade: Yup.number()
                .integer()
                .required(),
            altura: Yup.number().required(),
            peso: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        try {
            const studentExist = await Student.findOne({
                where: { email: req.body.email },
            });
            if (studentExist) {
                return res
                    .status(400)
                    .json({ erro: 'student email already exist' });
            }
            const {
                id,
                name,
                email,
                idade,
                peso,
                altura,
            } = await Student.create(req.body);
            return res.json({ id, name, email, idade, peso, altura });
        } catch (error) {
            return res.json(error);
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            idStudent: Yup.number().required(),
            name: Yup.string(),
            email: Yup.string().email(),
            idade: Yup.number()
                .integer()
                .positive(),
            altura: Yup.number().positive(),
            peso: Yup.number().positive(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const { email, idStudent } = req.body;
        const student = await Student.findByPk(idStudent);
        if (student.email !== email) {
            const studentExist = await Student.findOne({
                where: { email },
            });
            if (studentExist) {
                return res
                    .status(400)
                    .json({ erro: 'student email already exist' });
            }
        }

        const { name, idade, altura, peso } = await student.update(req.body);

        return res.json({ idStudent, name, idade, altura, peso, email });
    }
}

export default new StudentControler();
