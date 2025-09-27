
import type { Account, CartItem, LoginCredentials, NewAccount, NewUser, Purchase, User } from '@/lib/types';

// En un entorno real, esta URL apuntaría a tu backend de Spring Boot.
// Ejemplo: const API_BASE_URL = 'http://localhost:8080/api';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Función genérica para manejar las peticiones fetch
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || `Error del servidor: ${response.status}`);
  }
  return response.json();
}

/**
 * Obtiene todas las cuentas de streaming.
 */
export async function fetchAccounts(): Promise<Account[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`);
    return await handleResponse<Account[]>(response);
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
    throw new Error('No se pudo conectar con el servidor de cuentas.');
  }
}

/**
 * Actualiza una cuenta de streaming (Admin).
 */
export async function updateAccount(accountId: number, accountData: Partial<NewAccount>): Promise<Account> {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accountData),
    });
    return await handleResponse<Account>(response);
  } catch (error) {
    console.error(`Failed to update account ${accountId}:`, error);
    throw error;
  }
}

/**
 * Registra un nuevo usuario. (solo publico)
 */
export async function registerUser(userData: NewUser): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await handleResponse<User>(response);
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
}

/**
 * Registra un nuevo usuario (público y admin).
 */
export async function createUser(userData: NewUser): Promise<User> {
  try {
    // Usamos el endpoint de registro público para la creación
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await handleResponse<User>(response);
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

/**
 * Obtiene todos los usuarios.
 */
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    return await handleResponse<User[]>(response);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('No se pudo conectar con el servidor de usuarios.');
  }
}

/**
 * Actualiza un usuario (Admin).
 */
export async function updateUser(userId: number, userData: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await handleResponse<User>(response);
  } catch (error) {
    console.error(`Failed to update user ${userId}:`, error);
    throw error;
  }
}

/**
 * Elimina un usuario (Admin).
 */
export async function deleteUser(userId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
       const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
       throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error);
    throw error;
  }
}


/**
 * Autentica a un usuario.
 */
export async function loginUser(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await handleResponse<User>(response);
  } catch (error) {
    console.error('Failed to login user:', error);
    throw error;
  }
}


/**
 * Crea una nueva cuenta de streaming (Admin).
 */
export async function createAccount(accountData: NewAccount): Promise<Account> {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accountData),
    });
    return await handleResponse<Account>(response);
  } catch (error) {
    console.error('Failed to create account:', error);
    throw error;
  }
}

/**
 * Elimina una cuenta de streaming (Admin).
 */
export async function deleteAccount(accountId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
       const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }
    // No se espera contenido en una respuesta 204 No Content
    return;
  } catch (error) {
    console.error(`Failed to delete account ${accountId}:`, error);
    throw error;
  }
}

/**
 * Registra una nueva compra.
 */
export async function createPurchase(purchaseData: { user_id: number; items: CartItem[]; total: number }): Promise<Purchase> {
  try {
    const response = await fetch(`${API_BASE_URL}/purchases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user_id: purchaseData.user_id,
        total: purchaseData.total,
        items: purchaseData.items.map(item => ({
          cuenta_id: item.id_cuenta,
          quantity: item.quantity,
          precio_unitario: item.precio  // ← MAPEAR precio a precio_unitario
        }))
      }),
    });
    return await handleResponse<Purchase>(response);
  } catch (error) {
    console.error('Failed to create purchase:', error);
    throw error;
  }
}
