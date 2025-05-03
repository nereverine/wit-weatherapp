import { AppShell } from "@mantine/core";
import Header from "./components/Header";
import Favorites from "./components/Favorites";

const Dashboard = () => {

    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <Header />
            <AppShell.Main>

                <Favorites />
            </AppShell.Main>
        </AppShell>

    )
}

export default Dashboard;