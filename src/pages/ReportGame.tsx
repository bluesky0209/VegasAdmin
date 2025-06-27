import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ReportGameTable from "../components/report/ReportGameTable";

export default function ReportGame() {

    return (
        <>
            <PageMeta
                title="Report Game"
                description="This is Report Game page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Report Game" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <ReportGameTable />
                </div>
            </div>
        </>
    );
}
