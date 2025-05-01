import { AppShell, Button } from "@mantine/core"
import { logout } from "../../auth";

const Header = () => {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    justifyContent: 'center',
                }}
            >
                <div>Weather App</div>
                <Button onClick={logout} style={{ position: 'absolute', right: 16 }}>Logout</Button>
            </AppShell.Header>
        </AppShell>
    );
}

export default Header;