import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Switch } from "@mantine/core";
import { fetchUnit } from "../../server/dashboard/weatherCalls";

const TemperatureToggle = () => {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const loadUnit = async () => {
            const unit = await fetchUnit()
            if (unit) setUnit(unit);
            setLoading(false);
        }
        loadUnit();
    }, []);

    const toggleUnit = async () => {
        const newUnit = unit === "metric" ? "imperial" : "metric";
        setUnit(newUnit);

        const { error } = await supabase
            .from("Profiles")
            .update({ temp_unit: newUnit })
            .eq("id", (await supabase.auth.getUser()).data.user?.id);

        if (error) {
            alert(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ position: 'absolute', right: 124 }}>
            <Switch
                size="md"
                color="dark"
                onLabel="°C"
                offLabel="°F"
                checked={unit === "metric"}
                onChange={toggleUnit}
            />
        </div>
    );
};

export default TemperatureToggle;