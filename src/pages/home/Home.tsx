import { DashboardPreview } from "../../components/home/dashboardPreview/DashboardPreview";
import { DataSources } from "../../components/home/dataSources/DataSources";
import { Mitigation } from "../../components/home/mitigation/Mitigation";
import { SDGSection } from "../../components/home/sdgSection/SDGSection";
import { TechnologyAI } from "../../components/home/technologyAI/TechnologyAI";

export function Home () {
    return (
        <div>
            <DashboardPreview />
            <DataSources />
            <TechnologyAI />
            <Mitigation />
            <SDGSection />
        </div>
    )
}