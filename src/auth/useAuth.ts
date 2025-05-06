import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const user = supabase.auth.getUser();
        setUser(user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return { user };
};
