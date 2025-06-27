import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import FinancialListTable from "../components/payments/PaymentsListTable";

export default function Payments() {
    return (
        <>
            <PageMeta
                title="Payments Lists"
                description="This is Payments Lists page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Payments Lists" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <FinancialListTable />
                </div>
            </div>
        </>
    );
}
