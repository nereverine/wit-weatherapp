import { AppShell, Button } from "@mantine/core"
import { logout } from "../../auth";
import TemperatureSwitch from "./TemperatureSwitch";

const Header = () => {
    return (

        <AppShell.Header
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                justifyContent: 'center',
            }}
        >
            <div>Weather App</div>
            <TemperatureSwitch />
            <Button onClick={logout} style={{ position: 'absolute', right: 16 }}>Logout</Button>
        </AppShell.Header>

    );
}

export default Header;