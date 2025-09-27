
export type StreamingService = 'Netflix' | 'HBO Max' | 'Disney+' | 'Amazon Prime' | 'Spotify';

export type Account = {
  id_cuenta: number;
  plan: string;
  servicio: string;
  precio: number;
  calidad: string;
  pantallas: number;
  duracion: string;
};

export type NewAccount = Omit<Account, 'id_cuenta'>;

export type CartItem = Account & {
  quantity: number;
};

export type Transaction = {
  id_transaction: number;
  compra_id : number;
  user_id: number;
  account_info: any;
  amount: number;
  transaction_date: string;
  status: 'Completado' | 'Pendiente' | 'Fallido';
  updated_at?: string;
};

export type SalesData = {
  month: string;
  revenue: number;
};

export type User = {
    id_usuario: number;
    name: string;
    email: string;
    isAdmin?: boolean;
    created_at?: string;
    updated_at?: string;
}

// Y también:
export type NewUser = Omit<User, 'id_usuario' | 'created_at' | 'updated_at'> & {
    password: string;
};



export type LoginCredentials = Pick<User, 'email'> & {
    email: string;
  password: string;
}

export type Purchase = {
  id_compra: number;
  user_id: number;
  items: CartItem[];
  total: number;
  created_at: string;
}
