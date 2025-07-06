import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import SummaryTable from "../components/summary/summary";

export default function Summary() {
    return (
        <>
            <PageMeta
                title="Summary"
                description="This is Summary page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Summary" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <SummaryTable />
                </div>
            </div>
        </>
    );
}
