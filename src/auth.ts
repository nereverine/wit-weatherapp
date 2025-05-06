import { supabase } from './supabaseClient';

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message); //change these to display toasts maybe
    return null;
  }

  //insert into profile table, the new user
  const { error: profileError } = await supabase
    .from('Profiles')
    .insert([
      {
        id: data.user?.id
      }]);

  if (profileError) alert(profileError.message);
  return data.user;
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    alert(error.message)
    return null;
  }
  return data.user;
}

export const logout = async () => {
  await supabase.auth.signOut();
}