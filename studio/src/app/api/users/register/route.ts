
/*import { NextResponse } from 'next/server';
import type { NewUser, User } from '@/lib/types';

// Simulación de una base de datos de usuarios en memoria
const users: User[] = [];

export async function POST(request: Request) {
  try {
    const { name, email, password } = (await request.json()) as NewUser;

    // Simular validación
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Todos los campos son requeridos' }, { status: 400 });
    }
    if (users.some(user => user.email === email)) {
        return NextResponse.json({ message: 'El correo electrónico ya está en uso' }, { status: 409 });
    }

    const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        isAdmin: false, 
    };

    users.push(newUser);
    console.log('Usuario registrado:', newUser);
    console.log('Todos los usuarios:', users);

    // Devolver el usuario creado (sin la contraseña)
    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al registrar usuario' },
      { status: 500 }
    );
  }
}
*/