'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Clapperboard } from 'lucide-react';
import { loginUser } from '@/services/api';
import type { LoginCredentials } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
    password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});


export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { login } = useAuth();

    const form = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        try {
            const user = await loginUser(data);

            login(user);

            toast({
                title: '¡Bienvenido de vuelta!',
                description: 'Has iniciado sesión correctamente.',
            });
            router.push('/');
        } catch (error: any) {
            toast({
                title: 'Error al iniciar sesión',
                description: error.message || 'No se pudo conectar con el servidor. Inténtalo de nuevo.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-accent p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="space-y-2 text-center">
                    <Link href="/" className="inline-block">
                        <div className="inline-block bg-primary text-primary-foreground p-3 rounded-full mb-4">
                            <Clapperboard className="h-8 w-8" />
                        </div>
                    </Link>
                    <CardTitle className="text-3xl font-bold font-headline">Iniciar Sesión</CardTitle>
                    <CardDescription>
                        Accede a tu cuenta de StreamDeck
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="nombre@ejemplo.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Contraseña</FormLabel>
                                            <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline">
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full text-base font-bold" disabled={isSubmitting}>
                                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-6 text-center text-sm">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/register" className="font-semibold text-primary hover:underline">
                            Regístrate ahora
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}