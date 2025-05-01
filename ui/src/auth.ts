import { supabase } from './supabaseClient';

export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error(error.message); //change these to display toasts maybe
      return null;
    }
    return data.user;
  };

export const login = async (email: string, password:string) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if(error){
        console.error(error.message)
        return null;
    }
    return data.user;
}

export const logout = async () => {
    await supabase.auth.signOut();
}