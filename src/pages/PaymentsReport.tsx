import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ReportPaymentsTable from "../components/report/ReportPaymentsTable";

export default function PaymentsReport() {
    return (
        <>
            <PageMeta
                title="Payments Report"
                description="This is Payments Report page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Payments Report" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <ReportPaymentsTable />
                </div>
            </div>
        </>
    );
}
