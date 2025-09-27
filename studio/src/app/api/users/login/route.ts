
/*import { NextResponse } from 'next/server';
import type { LoginCredentials, User } from '@/lib/types';

// Usar la misma "base de datos" simulada que en el registro
// En una app real, esto estaría conectado a tu base de datos real.
const users: User[] = [
    // Usuario admin de ejemplo
    { id: 'admin_1', name: 'Admin User', email: 'admin@example.com', isAdmin: true }
];

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as LoginCredentials;

    // Simular validación
    if (!email || !password) {
      return NextResponse.json({ message: 'Correo y contraseña son requeridos' }, { status: 400 });
    }
    
    // Simular búsqueda de usuario y comprobación de contraseña
    // En una app real, aquí buscarías en la BD y compararías un hash de la contraseña
    const foundUser = users.find(user => user.email === email);
    
    if (foundUser && password === 'password') { // Contraseña de prueba
        console.log('Usuario autenticado:', foundUser);
        const { ...userToReturn } = foundUser;
        return NextResponse.json(userToReturn, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al iniciar sesión' },
      { status: 500 }
    );
  }
}
*/