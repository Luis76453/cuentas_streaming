'use client';

import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clapperboard, Home, BarChart, Package, Users, Settings } from 'lucide-react';

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === '/admin') return 'Panel de Ventas';
        if (pathname.startsWith('/admin/accounts')) return 'Gestión de Cuentas';
        if (pathname.startsWith('/admin/users')) return 'Gestión de Usuarios';
        return 'Admin';
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar className="border-r">
                    <SidebarHeader className="p-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                            <Clapperboard className="w-6 h-6 text-primary" />
                            <span className="font-headline">StreamDeck</span>
                        </Link>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin'}>
                                    <Link href="/admin">
                                        <BarChart />
                                        <span>Panel de Ventas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/accounts')}>
                                    <Link href="/admin/accounts">
                                        <Package />
                                        <span>Cuentas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/users')}>
                                    <Link href="/admin/users">
                                        <Users />
                                        <span>Usuarios</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="#">
                                        <Settings />
                                        <span>Configuración</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <SidebarInset className="flex-1">
                    <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
                        <SidebarTrigger className="md:hidden"/>
                        <h1 className="text-lg font-semibold md:text-xl">
                            {getPageTitle()}
                        </h1>
                    </header>
                    <main className="p-4 sm:p-6">{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}