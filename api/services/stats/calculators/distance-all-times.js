module.exports = {
  distanceAllTimes({ aom = null, startDate = '2019-01-01T00:00:00Z' }) {
    const $match = {
      'passenger.start.datetime': { $gte: startDate },
    };
    if (aom) $match['aom._id'] = aom;

    const args = [
      {
        $match,
      },
      {
        $group: {
          _id: {
            name: 'distance',
          },
          total: {
            $sum: '$passenger.distance',
          },
        },
      },
    ];

    return {
      collection: 'journeys',
      commands: [
        {
          args,
          command: 'aggregate',
        },
        {
          command: 'toArray',
        },
      ],
    };
  },
};
