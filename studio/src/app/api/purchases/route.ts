
/*import { NextResponse } from 'next/server';
import type { Purchase } from '@/lib/types';

// Simulación de una base de datos de compras en memoria
const purchases: Purchase[] = [];

export async function POST(request: Request) {
  try {
    const purchaseData = await request.json();

    // Simular validación
    if (!purchaseData.userId || !purchaseData.items || !purchaseData.total) {
      return NextResponse.json({ message: 'Datos de compra incompletos' }, { status: 400 });
    }

    const newPurchase: Purchase = {
      id: `purchase_${Date.now()}`,
      ...purchaseData,
      createdAt: new Date().toISOString(),
    };

    purchases.push(newPurchase);
    console.log('Compra registrada:', newPurchase);
    console.log('Todas las compras:', purchases);

    return NextResponse.json(newPurchase, { status: 201 });

  } catch (error) {
    console.error('Error al registrar la compra:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al registrar la compra' },
      { status: 500 }
    );
  }
}*/
