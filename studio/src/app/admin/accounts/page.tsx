
    'use client';

    import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from '@/components/ui/table';
    import { Badge } from '@/components/ui/badge';
    import { Button } from '@/components/ui/button';
    import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu';
    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from '@/components/ui/dialog';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { MoreHorizontal, PlusCircle } from 'lucide-react';
    import { Icons } from '@/components/icons';
    import type { Account, NewAccount } from '@/lib/types';
    import { useState, useEffect } from 'react';
    import { useToast } from '@/hooks/use-toast';
    import { createAccount, deleteAccount, fetchAccounts, updateAccount } from '@/services/api';
    import { Skeleton } from '@/components/ui/skeleton';
    import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    } from '@/components/ui/alert-dialog';


    function AccountForm({ account, onSave, onCancel }: { account?: Account | null, onSave: () => void, onCancel: () => void }) {
    const { toast } = useToast();
    const isEditing = !!account;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const accountData = {
        servicio: formData.get('service') as string,
        plan: formData.get('plan') as string,
        precio: parseFloat(formData.get('price') as string),
        pantallas: parseInt(formData.get('screens') as string),
        calidad: formData.get('quality') as string,
        duracion: formData.get('duration') as string,
        };

        try {
        if (isEditing) {
            await updateAccount(account.id_cuenta, accountData);
            toast({ title: 'Éxito', description: 'Cuenta actualizada correctamente.' });
        } else {
            await createAccount(accountData);
            toast({ title: 'Éxito', description: 'Nueva cuenta añadida.' });
        }
        onSave();
        } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">Servicio</Label>
            <Input id="service" name="service" defaultValue={account?.servicio} required className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="plan" className="text-right">Plan</Label>
            <Input id="plan" name="plan" defaultValue={account?.plan} required className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Precio</Label>
            <Input id="price" name="price" type="number" step="0.01" defaultValue={account?.precio} required className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="screens" className="text-right">Pantallas</Label>
            <Input id="screens" name="screens" type="number" defaultValue={account?.pantallas} required className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quality" className="text-right">Calidad</Label>
            <Input id="quality" name="quality" defaultValue={account?.calidad} required className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">Duración</Label>
            <Input id="duration" name="duration" defaultValue={account?.duracion || 'mensual'} required className="col-span-3" />
        </div>
        <DialogFooter>
            <Button onClick={onCancel} type="button" variant="outline">Cancelar</Button>
            <Button type="submit">{isEditing ? 'Guardar Cambios' : 'Guardar Cuenta'}</Button>
        </DialogFooter>
        </form>
    )
    }

    export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const { toast } = useToast();

    const loadAccounts = async () => {
        try {
        setLoading(true);
        const data = await fetchAccounts();
        setAccounts(data);
        } catch (error) {
        toast({ title: 'Error', description: 'No se pudieron cargar las cuentas.', variant: 'destructive'});
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        loadAccounts();
    }, []);

    const handleAddClick = () => {
        setSelectedAccount(null);
        setFormOpen(true);
    }

    const handleEditClick = (account: Account) => {
        setSelectedAccount(account);
        setFormOpen(true);
    }
    
    const handleDeleteClick = (account: Account) => {
        setSelectedAccount(account);
        setDeleteDialogOpen(true);
    };
    
    const handleConfirmDelete = async () => {
        if (!selectedAccount) return;
        try {
        await deleteAccount(selectedAccount.id_cuenta);
        toast({ title: 'Éxito', description: `La cuenta de ${selectedAccount.servicio} ha sido eliminada.` });
        setDeleteDialogOpen(false);
        setSelectedAccount(null);
        loadAccounts();
        } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        setDeleteDialogOpen(false);
        }
    };

    const handleFormSave = () => {
        setFormOpen(false);
        loadAccounts();
    }


    return (
        <div className="space-y-4">
        <div className="flex items-center justify-end">
            <Button size="sm" className="gap-1" onClick={handleAddClick}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Añadir Cuenta
            </span>
            </Button>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>{selectedAccount ? 'Editar Cuenta' : 'Añadir Nueva Cuenta'}</DialogTitle>
                <DialogDescription>
                    {selectedAccount ? 'Actualiza los detalles de la cuenta.' : 'Rellena los detalles de la nueva cuenta de streaming.'}
                </DialogDescription>
                </DialogHeader>
                <AccountForm account={selectedAccount} onSave={handleFormSave} onCancel={() => setFormOpen(false)} />
            </DialogContent>
            </Dialog>
        <Card>
            <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Icono</span>
                    </TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Precio</TableHead>
                    <TableHead>
                    <span className="sr-only">Acciones</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-8 w-8" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-12" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                    ))
                ) : (
                    accounts.map((account: Account) => {
                    const ServiceIcon = Icons[account.servicio.toLowerCase() as keyof typeof Icons];
                    const isAvailable = Math.random() > 0.3; // Mock availability
                    return (
                        <TableRow key={account.id_cuenta}>
                        <TableCell className="hidden sm:table-cell">
                            {ServiceIcon && <ServiceIcon className="h-8 w-8 text-muted-foreground" />}
                        </TableCell>
                        <TableCell className="font-medium">{account.servicio}</TableCell>
                        <TableCell>{account.plan}</TableCell>
                        <TableCell>
                            <Badge variant={isAvailable ? 'default' : 'destructive'}>
                            {isAvailable ? 'Disponible' : 'Vendido'}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">${account.precio.toFixed(2)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditClick(account)}>Editar</DropdownMenuItem>
                                <DropdownMenuItem 
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                onClick={() => handleDeleteClick(account)}
                                >
                                Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        </TableRow>
                    );
                    })
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente la cuenta de
                <span className="font-bold"> {selectedAccount?.servicio} - {selectedAccount?.plan} </span>
                de los servidores.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
                Sí, eliminar
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
    );
    }


    const Card = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4" {...props}>{children}</div>
    );

    const CardContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="p-0" {...props}>{children}</div>
    );
