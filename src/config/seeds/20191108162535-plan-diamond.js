module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'plans',
            [
                {
                    title: 'Diamond',
                    price: '89.00',
                    duration: '6',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
