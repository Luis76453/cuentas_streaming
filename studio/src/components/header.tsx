'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clapperboard, LayoutDashboard, LogIn, UserPlus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  
  const { user, isLoggedIn, isAdmin, logout, isLoading } = useAuth();
  const { cart } = useCart();

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Clapperboard className="h-6 w-6" />
            <span className="font-headline">StreamDeck</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
          </nav>
        </div>
      </header>
    );
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Clapperboard className="h-6 w-6" />
          <span className="font-headline">StreamDeck</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
           <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
             {cart.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{cart.length}</Badge>
             )}
          </Link>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150" alt="User" />
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                { isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Panel Admin</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => logout()}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
               <Button variant="ghost" asChild>
                 <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                 </Link>
              </Button>
               <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                 <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Registrarse
                 </Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
