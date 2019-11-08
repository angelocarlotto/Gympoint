module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'plans',
            [
                {
                    title: 'Gold',
                    price: '109.00',
                    duration: '3',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
