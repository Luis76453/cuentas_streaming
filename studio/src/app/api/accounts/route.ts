
import { NextResponse } from 'next/server';
import { accounts } from '@/lib/placeholder-data';
import type { Account, NewAccount } from '@/lib/types';

// GET: Obtiene todas las cuentas
export async function GET() {
  try {
    // Simulamos una demora de red para que se vea el estado de carga
    await new Promise(resolve => setTimeout(resolve, 1000));
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}


// POST: Crea una nueva cuenta
export async function POST(request: Request) {
  try {
    const newAccountData = (await request.json()) as NewAccount;

    // Simulación de validación
    if (!newAccountData.service || !newAccountData.plan || !newAccountData.price) {
      return NextResponse.json({ message: 'Los campos servicio, plan y precio son requeridos' }, { status: 400 });
    }

    const newAccount: Account = {
        id: `acc_${Date.now()}`,
        ...newAccountData,
    };

    accounts.push(newAccount);
    console.log('Cuenta creada:', newAccount);
    console.log('Todas las cuentas:', accounts);

    return NextResponse.json(newAccount, { status: 201 });

  } catch (error) {
    console.error('Error al crear la cuenta:', error);
    return NextResponse.json({ message: 'Error interno del servidor al crear la cuenta' }, { status: 500 });
  }
}
