import type { Account, SalesData, Transaction } from './types';

/*export const accounts: Account[] = [
  {
    id: '1',
    service: 'Netflix',
    plan: 'Premium',
    price: 15.99,
    screens: 4,
    quality: '4K+HDR',
    duration: 'mensual',
  },
  {
    id: '2',
    service: 'Spotify',
    plan: 'Familiar',
    price: 9.99,
    screens: 6,
    quality: '320kbps',
    duration: 'mensual',
  },
  {
    id: '3',
    service: 'HBO Max',
    plan: 'Estándar',
    price: 7.99,
    screens: 3,
    quality: '1080p',
    duration: 'mensual',
  },
  {
    id: '4',
    service: 'Disney+',
    plan: 'Anual',
    price: 89.99,
    screens: 4,
    quality: '4K',
    duration: 'anual',
  },
  {
    id: '5',
    service: 'Netflix',
    plan: 'Estándar',
    price: 10.99,
    screens: 2,
    quality: '1080p',
    duration: 'mensual',
  },
  {
    id: '6',
    service: 'Amazon Prime',
    plan: 'Video',
    price: 5.99,
    screens: 3,
    quality: 'HD',
    duration: 'mensual',
  },
    {
    id: '7',
    service: 'Disney+',
    plan: 'Mensual',
    price: 8.99,
    screens: 4,
    quality: '4K',
    duration: 'mensual',
  },
    {
    id: '8',
    service: 'HBO Max',
    plan: 'Móvil',
    price: 4.99,
    screens: 1,
    quality: 'SD',
    duration: 'mensual',
  },
];
*/
export const salesData: SalesData[] = [
    { month: 'Ene', revenue: 1200 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 1500 },
    { month: 'Abr', revenue: 2200 },
    { month: 'May', revenue: 2500 },
    { month: 'Jun', revenue: 2100 },
];

export const transactions: Transaction[] = [
    { id: 'txn_1', user: 'Juan Pérez', account: 'Netflix Premium', amount: 15.99, date: '2023-06-23', status: 'Completado' },
    { id: 'txn_2', user: 'Ana Gómez', account: 'Spotify Familiar', amount: 9.99, date: '2023-06-22', status: 'Completado' },
    { id: 'txn_3', user: 'Carlos Ruiz', account: 'HBO Max Estándar', amount: 7.99, date: '2023-06-22', status: 'Pendiente' },
    { id: 'txn_4', user: 'Lucía Fernández', account: 'Disney+ Anual', amount: 89.99, date: '2023-06-21', status: 'Completado' },
    { id: 'txn_5', user: 'Miguel Torres', account: 'Netflix Estándar', amount: 10.99, date: '2023-06-20', status: 'Fallido' },
];
