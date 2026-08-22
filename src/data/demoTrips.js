import { addDays, format } from 'date-fns';

const today = new Date();

export const demoTrips = [
  {
    id: 't1',
    name: 'European Summer',
    description: 'A classic tour through some of Europe\'s most iconic cities.',
    startDate: format(addDays(today, 30), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 37), 'yyyy-MM-dd'),
    coverImage: 'https://picsum.photos/seed/europe/800/600',
    stops: [
      {
        id: 's1',
        cityId: 'c1', // Paris
        startDate: format(addDays(today, 30), 'yyyy-MM-dd'),
        endDate: format(addDays(today, 33), 'yyyy-MM-dd'),
        activities: [
          {
            id: 'ta1',
            activityId: 'a1', // Eiffel Tower
            date: format(addDays(today, 31), 'yyyy-MM-dd'),
            time: '10:00',
            customCost: 2500
          },
          {
            id: 'ta2',
            activityId: 'a3', // Seine Cruise
            date: format(addDays(today, 32), 'yyyy-MM-dd'),
            time: '16:00',
            customCost: 1500
          }
        ]
      },
      {
        id: 's2',
        cityId: 'c2', // Amsterdam
        startDate: format(addDays(today, 33), 'yyyy-MM-dd'),
        endDate: format(addDays(today, 37), 'yyyy-MM-dd'),
        activities: [
          {
            id: 'ta3',
            activityId: 'a5', // Van Gogh
            date: format(addDays(today, 34), 'yyyy-MM-dd'),
            time: '11:00',
            customCost: 2000
          }
        ]
      }
    ]
  }
];
