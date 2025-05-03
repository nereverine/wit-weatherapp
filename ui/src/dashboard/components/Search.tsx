import { Button, TextInput } from "@mantine/core";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchWord, setSearchWord] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (searchWord.trim() === '') {
            setError(true);
            return;
        } else {
            navigate(`/weather/${searchWord}`)
        }

    }

    return (
        <div style={{ display: 'flex' }}>
            <TextInput value={searchWord} onChange={(e) => {
                setSearchWord(e.currentTarget.value);
                setError(false)
            }} leftSection={<SearchIcon />} error={error ? 'Please type the name of the city' : null} />
            <Button onClick={handleSubmit}>Search </Button>
        </div>
    );
};

export default Search;