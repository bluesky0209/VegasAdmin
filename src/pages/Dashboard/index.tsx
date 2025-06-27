import ReportCard from "../../components/dashboard/card";
import PageMeta from "../../components/common/PageMeta";

export default function Dashboard() {

    return (
        <>
            <PageMeta
                title="Dashboard"
                description="Dashboard"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                    <ReportCard />
                </div>
            </div>
        </>
    );
}
