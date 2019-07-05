import { JourneyInterface } from '../../src/interfaces/JourneyInterface';

export const journey = <JourneyInterface>{
  journey_id: 'journeyId',
  operator_journey_id: 'operatorJourneyId',
  operator_class: 'A',
  operator_id: '5d0b616f9f611aef34de4121',
  passenger: {
    identity: {
      firstname: 'passengerFirstName',
      lastname: 'passengerLastName',
      email: 'passenger@example.com',
      phone: '0622445588',
      over_18: true,
    },
    start: {
      datetime: new Date(),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5678'],
    },
    end: {
      datetime: new Date(+2),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5679'],
    },
    distance: 2,
    duration: 50,
    cost: 1,
    contribution: 1,
    expense: 1,
    seats: 1,
    incentives: [
      // todo: fill
    ],
    remaining_fee: 1,
  },
  driver: {
    identity: {
      firstname: 'driverFirstName',
      lastname: 'driverLastName',
      email: 'driver@example.com',
      phone: '0622445599',
    },
    start: {
      datetime: new Date(),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5678'],
    },
    end: {
      datetime: new Date(+2),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5679'],
    },
    distance: 2,
    duration: 50,
    expense: 1,
    cost: 1,
    revenue: 1,
    incentives: [
      // todo: fill
    ],
    remaining_fee: 1,
  },
};

export const secondJourney = <JourneyInterface>{
  journey_id: 'secondJourneyId',
  operator_journey_id: 'operatorJourneyId',
  operator_class: 'A',
  operator_id: '5d0b616f9f611aef34de4122',
  passenger: {
    identity: {
      firstname: 'secondPassengerFirstName',
      lastname: 'secondPassengerLastName',
      email: 'secondpassenger@example.com',
      phone: '0622445587',
      over_18: true,
    },
    start: {
      datetime: new Date(+1),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5678'],
    },
    end: {
      datetime: new Date(+2),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5679'],
    },
    distance: 1,
    duration: 25,
    contribution: 1,
    cost: 1,
    expense: 1,
    seats: 1,
    incentives: [
      // todo: fill
    ],
    remaining_fee: 1,
  },
  driver: {
    identity: {
      firstname: 'driverFirstName',
      lastname: 'driverLastName',
      email: 'driver@example.com',
      phone: '0622445599',
    },
    start: {
      datetime: new Date(),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5678'],
    },
    end: {
      datetime: new Date(+2),
      lat: 1,
      lon: 2,
      territory: ['5d0b616f9f611aef34de5679'],
    },
    distance: 2,
    duration: 50,
    expense: 1,
    cost: 1,
    revenue: 1,
    remaining_fee: 1,
    incentives: [
      // todo: fill
    ],
  },
};
