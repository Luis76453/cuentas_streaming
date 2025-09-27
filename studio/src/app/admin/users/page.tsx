
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
    DialogTitle
    } from '@/components/ui/dialog';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { MoreHorizontal, PlusCircle } from 'lucide-react';
    import type { User, NewUser } from '@/lib/types';
    import { useState, useEffect } from 'react';
    import { useToast } from '@/hooks/use-toast';
    import { fetchUsers, createUser, updateUser, deleteUser } from '@/services/api';
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
    import { Switch } from '@/components/ui/switch';


    function UserForm({ user, onSave, onCancel }: { user?: User | null, onSave: () => void, onCancel: () => void }) {
    const { toast } = useToast();
    const isEditing = !!user;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        isAdmin: formData.get('isAdmin') === 'on',
        };

        try {
        if (isEditing) {
            // En edición, no enviamos la contraseña si no se cambia.
            const updateData: Partial<User> = { name: userData.name, email: userData.email, isAdmin: userData.isAdmin };
            await updateUser(user.id_usuario, updateData);
            toast({ title: 'Éxito', description: 'Usuario actualizado correctamente.' });
        } else {
            await createUser(userData);
            toast({ title: 'Éxito', description: 'Nuevo usuario creado.' });
        }
        onSave();
        } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input id="name" name="name" defaultValue={user?.name} required className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Correo</Label>
            <Input id="email" name="email" type="email" defaultValue={user?.email} required className="col-span-3" />
        </div>
        {!isEditing && (
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">Contraseña</Label>
            <Input id="password" name="password" type="password" required={!isEditing} className="col-span-3" />
            </div>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isAdmin" className="text-right">Es Admin</Label>
            <Switch id="isAdmin" name="isAdmin" defaultChecked={user?.isAdmin} className="col-span-3 justify-self-start" />
        </div>
        <DialogFooter>
            <Button onClick={onCancel} type="button" variant="outline">Cancelar</Button>
            <Button type="submit">{isEditing ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
        </DialogFooter>
        </form>
    )
    }

    export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { toast } = useToast();

    const loadUsers = async () => {
        try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        } catch (error) {
        toast({ title: 'Error', description: 'No se pudieron cargar los usuarios.', variant: 'destructive'});
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAddClick = () => {
        setSelectedUser(null);
        setFormOpen(true);
    }

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setFormOpen(true);
    }
    
    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setDeleteDialogOpen(true);
    };
    
    const handleConfirmDelete = async () => {
        if (!selectedUser) return;
        try {
        await deleteUser(selectedUser.id_usuario);
        toast({ title: 'Éxito', description: `El usuario ${selectedUser.name} ha sido eliminado.` });
        setDeleteDialogOpen(false);
        setSelectedUser(null);
        loadUsers();
        } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        setDeleteDialogOpen(false);
        }
    };

    const handleFormSave = () => {
        setFormOpen(false);
        loadUsers();
    }

    return (
        <div className="space-y-4">
        <div className="flex items-center justify-end">
            <Button size="sm" className="gap-1" onClick={handleAddClick}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Añadir Usuario
            </span>
            </Button>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{selectedUser ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</DialogTitle>
                <DialogDescription>
                {selectedUser ? 'Actualiza los detalles del usuario.' : 'Rellena los detalles del nuevo usuario.'}
                </DialogDescription>
            </DialogHeader>
            <UserForm user={selectedUser} onSave={handleFormSave} onCancel={() => setFormOpen(false)} />
            </DialogContent>
        </Dialog>
        
        <Card>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>
                    <span className="sr-only">Acciones</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                    ))
                ) : (
                    users.map((user: User) => (
                    <TableRow key={user.id_usuario}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                        <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                            {user.isAdmin ? 'Admin' : 'Usuario'}
                        </Badge>
                        </TableCell>
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
                            <DropdownMenuItem onClick={() => handleEditClick(user)}>Editar</DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                onClick={() => handleDeleteClick(user)}
                            >
                                Eliminar
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
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
                Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario
                <span className="font-bold"> {selectedUser?.name} </span>
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