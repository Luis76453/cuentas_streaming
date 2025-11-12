'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Package, Users, TrendingUp } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { Transaction } from '@/lib/types';

interface Stats {
    totalRevenue: number;
    accountsSold: number;
    revenueChangePercentage: number;
    accountsSoldChangePercentage: number;
}

interface UserStats {
    newUsers: number;
    userChangePercentage: number;
}

interface BackendTransaction {
    id_transaccion: number;
    compra_id: number;
    usuario: {
        name: string;
    };
    account_info: string;
    amount: number;
    status: 'Completado' | 'Pendiente' | 'Fallido';
    transaction_date: string;
}

const chartConfig = {
    revenue: {
        label: "Ingresos",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

const salesData = [
    { month: "Enero", revenue: 4000 },
    { month: "Febrero", revenue: 3000 },
    { month: "Marzo", revenue: 5000 },
    { month: "Abril", revenue: 4500 },
    { month: "Mayo", revenue: 6000 },
    { month: "Junio", revenue: 7500 },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [transactions, setTransactions] = useState<BackendTransaction[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api//purchases/stats')
            .then(res => res.json())
            .then(data => setStats(data));

        fetch('http://localhost:8080/api/users/statistics')
            .then(res => res.json())
            .then(data => setUserStats(data));


        /* fetch('http://localhost:8080/api/transacciones')
            .then(res => res.json())
            .then(data => setTransactions(data)); */

    }, []);

    const getBadgeVariant = (status: BackendTransaction['status']) => {
        if (status === 'Completado') return 'default';
        if (status === 'Pendiente') return 'secondary';
        if (status === 'Fallido') return 'destructive';
        return 'outline';
    };

    const parseAccountInfo = (info: string) => {
        try {
            const parsed = JSON.parse(info);
            return `Usuario: ${parsed.username} / Pass: ${parsed.password}`;
        } catch (e) {
            return "Credenciales no disponibles";
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats?.totalRevenue.toFixed(2) ?? '0.00'}</div>
                        <p className="text-xs text-muted-foreground">
                            +{stats?.revenueChangePercentage ?? 0}% desde el mes pasado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cuentas Vendidas</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{stats?.accountsSold ?? 0}</div>
                        <p className="text-xs text-muted-foreground">
                            +{stats?.accountsSoldChangePercentage ?? 0}% desde el mes pasado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nuevos Usuarios</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{userStats?.newUsers ?? 0}</div>
                        <p className="text-xs text-muted-foreground">
                            +{userStats?.userChangePercentage ?? 0}% desde el mes pasado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5.4%</div>
                        <p className="text-xs text-muted-foreground">+2.1% desde el mes pasado</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Rendimiento de Ventas</CardTitle>
                        <CardDescription>Ingresos mensuales de los últimos 6 meses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <BarChart accessibilityLayer data={salesData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis tickFormatter={(value) => `$${Number(value)/1000}k`} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Transacciones Recientes</CardTitle>
                        <CardDescription>Mostrando las últimas transacciones.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Usuario y Credenciales</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.slice(0, 5).map(tx => (
                                    <TableRow key={tx.id_transaccion}>
                                        <TableCell>
                                            <div className="font-medium">{tx.usuario.name}</div>
                                            <div className="text-sm text-muted-foreground">{parseAccountInfo(tx.account_info)}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getBadgeVariant(tx.status)}>{tx.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">${tx.amount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
