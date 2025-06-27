import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import GameListTable from "../components/games/GameListTable";

export default function GameLists() {
    return (
        <>
            <PageMeta
                title="User Lists"
                description="This is User Lists page for Vegas-xx admin panel"
            />
            <PageBreadcrumb pageTitle="Game Lists" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <GameListTable />
                </div>
            </div>
        </>
    );
}
