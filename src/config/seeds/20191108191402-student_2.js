module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'students',
            [
                {
                    name: 'Angelo1',
                    email: 'angelo1@gmail.com',
                    peso: 97,
                    altura: 1.86,
                    idade: 33,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
