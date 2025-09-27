
import { NextResponse } from 'next/server';
import { accounts } from '@/lib/placeholder-data';

// Simula la eliminación de una cuenta
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const accountIndex = accounts.findIndex(acc => acc.id === id);

        if (accountIndex === -1) {
            return NextResponse.json({ message: 'Cuenta no encontrada' }, { status: 404 });
        }

        // Simular la eliminación
        const deletedAccount = accounts.splice(accountIndex, 1);
        console.log(`Cuenta eliminada:`, deletedAccount[0]);
        console.log(`Cuentas restantes:`, accounts);
        
        // Devolver una respuesta vacía con estado 204 No Content, que es lo estándar para DELETE exitoso.
        return new NextResponse(null, { status: 204 });

    } catch (error) {
        return NextResponse.json(
            { message: 'Error interno del servidor simulado' },
            { status: 500 }
        );
    }
}
