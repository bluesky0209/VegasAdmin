import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ReportCashTable from "../components/report/ReportCash";

export default function ReportCash() {
    return (
        <>
            <PageMeta
                title="Cash Report"
                description="This is Cash Report page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Cash Report" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <ReportCashTable />
                </div>
            </div>
        </>
    );
}
