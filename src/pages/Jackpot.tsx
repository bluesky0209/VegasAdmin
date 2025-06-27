import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import JackpotTables from "../components/jackpot/JackpotTable";

export default function Jackpot() {
    return (
        <>
            <PageMeta
                title="Jackpot"
                description="This is Jackpot page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Jackpot" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <JackpotTables />
                </div>
            </div>
        </>
    );
}
