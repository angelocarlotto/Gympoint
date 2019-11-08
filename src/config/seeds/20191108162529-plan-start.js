module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'plans',
            [
                {
                    title: 'Start',
                    price: '129.00',
                    duration: '1',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
