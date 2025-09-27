'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Icons } from '@/components/icons';
import { Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Bolsa de Compras</h1>
      {cart.length === 0 ? (
        <Card className="text-center py-20">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Tu bolsa está vacía</h2>
            <p className="text-muted-foreground mb-6">Parece que aún no has añadido ninguna cuenta.</p>
            <Button asChild>
                <Link href="/">Explorar Catálogo</Link>
            </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => {
                      const ServiceIcon = Icons[item.servicio.toLowerCase() as keyof typeof Icons];
                      return (
                        <TableRow key={item.id_cuenta}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              {ServiceIcon && <ServiceIcon className="h-8 w-8 text-muted-foreground" />}
                              <div>
                                <p className="font-medium">{item.servicio} - {item.plan}</p>
                                <p className="text-sm text-muted-foreground">{item.calidad}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                             <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id_cuenta, parseInt(e.target.value))}
                                className="w-16 mx-auto"
                            />
                          </TableCell>
                          <TableCell className="text-right font-medium">${(item.precio * item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id_cuenta)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>Calculados al pagar</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">Proceder al Pago</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
