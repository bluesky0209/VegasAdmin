import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ReportUserTable from "../components/report/ReportUserTable";

export default function ReportUser() {

    return (
        <>
            <PageMeta
                title="Report User"
                description="This is Report User page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Report User" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <ReportUserTable />
                </div>
            </div>
        </>
    );
}
