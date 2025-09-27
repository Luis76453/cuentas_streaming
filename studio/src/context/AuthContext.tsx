    'use client';

    import React, { createContext, useContext, useEffect, useState } from 'react';
    import { useRouter } from 'next/navigation';
    import type { User } from '@/lib/types';

    interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    isLoggedIn: boolean;
    isAdmin: boolean,
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Cargar usuario del localStorage al iniciar
    useEffect(() => {
        try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user'); // Limpiar datos corruptos
        } finally {
        setIsLoading(false);
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/');
    };

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        logout,
        isLoggedIn: !!user,
        isAdmin: !!user?.isAdmin, 
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
    }