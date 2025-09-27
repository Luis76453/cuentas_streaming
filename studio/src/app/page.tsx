'use client';

import { useState, useEffect } from 'react';
import type { Account } from '@/lib/types';
import { fetchAccounts } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Tv, Users, Clapperboard, Star, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


function AccountCard({ account }: { account: Account }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  //const ServiceIcon =
  const serviceName = account.servicio || '';
  const ServiceIcon = serviceName 
    ? Icons[account.servicio.toLowerCase() as keyof typeof Icons] || Clapperboard
    : Clapperboard;
  
  

  const handleAddToCart = () => {
    addToCart(account);
    toast({
      title: "¡Añadido al carrito!",
      description: `${account.servicio} ${account.plan} ha sido añadido a tu carrito.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="bg-card p-6 flex justify-center items-center h-40">
          <ServiceIcon className="h-20 w-auto text-primary" />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold font-headline">{account.plan}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-primary">
              ${account.precio}
            </span>
            <span className="text-muted-foreground">/ {account.duracion}</span>
          </div>
          {/* aqui cambio  */}
          <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center gap-2" key={`${account.id_cuenta}-service`}>
            <Tv className="w-4 h-4 text-primary" />
            <span>{account.servicio}</span>
          </li>
          <li className="flex items-center gap-2" key={`${account.id_cuenta}-screens`}>
            <Users className="w-4 h-4 text-primary" />
            <span>{account.pantallas} Pantallas</span>
          </li>
          <li className="flex items-center gap-2" key={`${account.id_cuenta}-quality`}>
            <Star className="w-4 h-4 text-primary" />
            <span>Calidad {account.calidad}</span>
          </li>
        </ul>
          {/* hasta aqui  */}
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Añadir al Carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AccountSkeleton() {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <Skeleton className="h-40 w-full" />
                <div className="p-6 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function Home() {
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  useEffect(() => {
    async function loadAccounts() {
      try {
        setLoading(true);
        const accountsData = await fetchAccounts();
        setAllAccounts(accountsData);
      } catch (err: any) {
        setError(err.message || 'Ocurrió un error al cargar las cuentas.');
      } finally {
        setLoading(false);
      }
    }
    loadAccounts();
  }, []);

  const filteredAccounts = allAccounts
    .filter((account) =>
      account.plan.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (account) =>
        serviceFilter === 'all' ? true : account.servicio === serviceFilter
    );

  const services = [
    'all',
    ...Array.from(new Set(allAccounts.map((a) => a.servicio))),
  ];

  function renderContent() {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }, (_, index) => (
          <AccountSkeleton key={`skeleton-${index}`} />
                    ))}
            
        </div>
      );
    }
    if (error) {
       return (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error de Conexión</AlertTitle>
                <AlertDescription>
                    No se pudo establecer la conexión con el servidor. Por favor, inténtalo de nuevo más tarde.
                    <p className="text-xs mt-2">Detalle: {error}</p>
                </AlertDescription>
            </Alert>
       );
    }
     if (filteredAccounts.length > 0) {
      return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAccounts.map((account) => (
              <AccountCard key={account.id_cuenta} account={account} />
            ))}
          </div>
        )
    }
    return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              No se encontraron cuentas con esos criterios.
            </p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-primary tracking-tight">
          Encuentra tu Próximo Stream
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Cuentas de streaming seguras y al mejor precio. Compra fácil y
          rápido.
        </p>
        <div className="mt-8 max-w-md mx-auto flex gap-2">
          <Input
            type="search"
            placeholder="Buscar por plan (ej. Premium)..."
            className="flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">Buscar</Button>
        </div>
      </section>

      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-headline">Catálogo</h2>
          <div className="flex items-center gap-4">
            <Select value={serviceFilter} onValueChange={setServiceFilter} disabled={loading || !!error}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por servicio" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service === 'all' ? 'Todos' : service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {renderContent()}
      </section>
    </div>
  );
}
