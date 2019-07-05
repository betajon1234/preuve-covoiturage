export const trip = {
  operator_journey_id: 'operatorJourneyId',
  operator_class: 'A',
  operator_id: '5d0b616f9f611aef34deb309',
  territory: ['5d0b616f9f611aef34deb310'],
  status: 'active',
  start: new Date(),
  people: [
    {
      journey_id: '5d0b616f9f611aef34deb307',
      class: 'A',
      operator_class:'A',
      operator: {
        _id: '5d0b616f9f611aef34deb300',
        name: 'passengerOperatorName',
      },
      is_driver: false,
      identity: {
        firstname: 'passengerFirstName',
        lastname: 'passengerLastName',
        email: 'passenger@example.com',
        phone: '062244558899',
      },
      start: {
        datetime: new Date(),
        lat: 1,
        lon: 2,
      },
      end: {
        datetime: new Date(+2),
        lat: 1,
        lon: 2,
      },
      distance: 2,
      duration: 50,
      cost: 1,
      incentive: 1,
      remaining_fee: 1,
      expense: 1,
    },
    {
      journey_id: '5d0b616f9f611aef34deb307',
      class: 'A',
      operator_class:'A',
      operator: {
        _id: '5d0b616f9f611aef34deb300',
        name: 'driverOperatorName',
      },
      is_driver: true,
      identity: {
        firstname: 'driverFirstName',
        lastname: 'driverLastName',
        email: 'driver@example.com',
        phone: '062244558899',
      },
      start: {
        datetime: new Date(),
        lat: 1,
        lon: 2,
      },
      end: {
        datetime: new Date(+2),
        lat: 1,
        lon: 2,
      },
      distance: 2,
      duration: 50,
      cost: 1,
      incentive: 1,
      remaining_fee: 1,
      contribution: 1,
    },
  ],
};
