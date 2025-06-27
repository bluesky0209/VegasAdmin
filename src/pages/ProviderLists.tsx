import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ProviderListTable from "../components/providers/ProviderListTable";

export default function ProviderLists() {
    return (
        <>
            <PageMeta
                title="Provider Lists"
                description="This is Provider Lists page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Provider Lists" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <ProviderListTable />
                </div>
            </div>
        </>
    );
}
