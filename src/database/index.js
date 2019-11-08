import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Enrrollment from '../app/models/Enrrollment';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
import databaseconfig from '../config/database';

const models = [User, Student, Plan, Enrrollment, Checkin, HelpOrder];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connnection = new Sequelize(databaseconfig);
        models
            .map(model => model.init(this.connnection))
            .map(
                model =>
                    model.associate && model.associate(this.connnection.models)
            );
    }
}

export default new Database();
