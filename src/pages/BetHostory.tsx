import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import HistoryListTable from "../components/history/HistoryListTable";

export default function BetHistory() {
    return (
        <>
            <PageMeta
                title="Bet History"
                description="This is Bet History page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Bet History" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <HistoryListTable />
                </div>
            </div>
        </>
    );
}
