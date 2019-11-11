// import { parseISO, format } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class AnswerQuestionOrderMail {
    get key() {
        return 'AnswerQuestionOrderMail';
    }

    async handle({ data }) {
        const { help_order } = data;

        const obj = {
            to: `${help_order.student.name} <${help_order.student.email}>`,
            subject:
                'GYMPOINT: Nova resposta da sua academia par aum pedidod de ajuda',
            template: 'newhelporderanswer',
            context: {
                student: help_order.student.name,
                question: help_order.question,
                answer: help_order.answer,
            },
        };
        await Mail.sendMail(obj);

        return 'AnswerQuestionOrderMail';
    }
}

export default new AnswerQuestionOrderMail();
