import Sequelize, { Model } from 'sequelize';
// import { /* isBefore, parseISO, */ addMonths } from 'date-fns';

class Enrrollment extends Model {
    static init(sequelize) {
        super.init(
            {
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
                price: Sequelize.FLOAT,
                /* end_date: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return addMonths(this.start_date, this.plan.duration);
                    },
                },
                price: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return this.plan.duration * this.plan.price;
                    },
                }, */
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Student, {
            foreignKey: 'student_id',
            as: 'student',
        });
        this.belongsTo(models.Plan, {
            foreignKey: 'plan_id',
            as: 'plan',
        });
    }
}

export default Enrrollment;
