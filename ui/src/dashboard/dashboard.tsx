import { AppShell } from "@mantine/core";
import Header from "./components/Header";
import Favorites from "./components/Favorites";
import Search from "./components/Search";

const Dashboard = () => {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <Header />
            <AppShell.Main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    gap: '20px',
                }}
            >
                <div style={{ alignSelf: 'flex-start', width: '100%' }}>
                    <Search />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Favorites />
                </div>
            </AppShell.Main>
        </AppShell>
    );
};

export default Dashboard;