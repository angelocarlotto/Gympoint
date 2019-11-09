// import { parseISO, format } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class NewEnrrollmentMail {
    get key() {
        return 'NewEnrrollmentMail';
    }

    async handle({ data }) {
        const { enrrollment } = data;
        /* console.log('Ca fila executou');
        const { appointment } = data;
        const obj = {
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'GYMPOINT: agendamento cancelado',
            text: 'voce tem um novo cancelamento',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseISO(appointment.date),
                    "'dia' dd 'de' MMM, 'às' H:mm'h'",
                    { locale: pt }
                ),
            },
        };
        await Mail.sendMail(obj); */

        const obj = {
            to: `${enrrollment.student.name} <${enrrollment.student.email}>`,
            subject: 'GYMPOINT: Nova Matricula Realizada',
            template: 'newenrrollment',
            context: {
                student: enrrollment.student.name,
                plan: enrrollment.plan.title,
                start_date: enrrollment.start_date,
                end_date: enrrollment.end_date,
                price: enrrollment.price,
            },
        };
        await Mail.sendMail(obj);

        return 'NewEnrrollmentMail';
    }
}

export default new NewEnrrollmentMail();
