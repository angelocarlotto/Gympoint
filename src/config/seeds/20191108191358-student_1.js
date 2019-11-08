module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'students',
            [
                {
                    name: 'Dandara',
                    email: 'Dandara@gmail.com',
                    peso: 55,
                    altura: 1.56,
                    idade: 29,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
