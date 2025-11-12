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
import { registerUser } from '@/services/api';
import type { NewUser } from '@/lib/types';


const registerSchema = z.object({
    name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
    email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});


export default function RegisterPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<NewUser>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<NewUser> = async (data) => {
        try {
            const user = await registerUser(data);
            toast({
                title: '¡Cuenta Creada con Éxito!',
                description: `Bienvenido, ${user.name}. Ahora puedes iniciar sesión.`,
            });
            router.push('/login');
        } catch (error: any) {
            toast({
                title: 'Error en el registro',
                description: error.message || 'No se pudo completar el registro. Inténtalo de nuevo.',
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
                    <CardTitle className="text-3xl font-bold font-headline">Crear una Cuenta</CardTitle>
                    <CardDescription>
                        Únete a StreamDeck y accede a tus suscripciones
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre Completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Juan Pérez" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full text-base font-bold" disabled={isSubmitting}>
                                {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-6 text-center text-sm">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Inicia Sesión
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}