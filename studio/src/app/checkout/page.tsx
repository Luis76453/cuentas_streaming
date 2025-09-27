
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, User, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createPurchase } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const { cart, clearCart, total } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Acceso Denegado</AlertTitle>
          <AlertDescription>
            Debes iniciar sesión para poder realizar una compra. Por favor, inicia sesión o crea una cuenta.
          </AlertDescription>
          <div className="mt-4 flex gap-4">
            <Button onClick={() => router.push('/login')} variant="outline">
              Iniciar Sesión
            </Button>
            <Button onClick={() => router.push('/register')}>
              Registrarse
            </Button>
          </div>
        </Alert>
      </div>
    );
  }


  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast({
        title: 'Carrito vacío',
        description: 'No puedes realizar una compra sin artículos.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsProcessing(true);
    toast({
        title: "Procesando pago...",
        description: "Esto puede tardar un momento.",
    });

    try {
      
      await createPurchase({
        user_id: user?.id_usuario || 0, 
        items: cart,
        total: total,
      });


      toast({
          title: "¡Pago Exitoso!",
          description: "Gracias por tu compra. Recibirás los detalles de tu cuenta por correo.",
      });

      // Retraso para que el usuario vea el toast antes de limpiar el carrito y redirigir
      setTimeout(() => {
        clearCart();
        router.push('/');
      }, 1500);

    } catch (error: any) {
      toast({
        title: 'Error en la compra',
        description: error.message || 'No se pudo completar la compra.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>

      {/* Mostrar información del usuario */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id_cuenta} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.servicio} - {item.plan}</p>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.precio * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                 {cart.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Tu carrito está vacío.</p>
                )}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <p>Total a Pagar</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información de Pago</CardTitle>
              <CardDescription>Esta es una pasarela de pago simulada.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePayment}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-name">Nombre en la tarjeta</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="card-name" placeholder="Juan Pérez" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Número de tarjeta</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="card-number" placeholder="0000 0000 0000 0000" required className="pl-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Fecha de Expiración</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="expiry-date" placeholder="MM/AA" required className="pl-10"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="cvc" placeholder="123" required className="pl-10"/>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg" disabled={isProcessing || cart.length === 0}>
                  {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
