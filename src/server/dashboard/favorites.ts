import { Favorite } from "../../dashboard/components/Favorites";
import { supabase } from "../../supabaseClient";

export const fetchFavorites = async (): Promise<Favorite[]> => {
    const { data, error } = await supabase
        .from('FavoriteCities')
        .select('*').eq('user_id', (await supabase.auth.getUser()).data.user?.id);
    if (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }

    return data;
};