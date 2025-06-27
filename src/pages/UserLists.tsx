import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import UserListsTable from "../components/users/UserListTable";

export default function UserLists() {
  const [role, setRole] = useState('');
  const [cashier, setCashier] = useState('');
  const [agent, setAgent] = useState('');
  const [superagent, setSuperagent] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const role = path.split('/')[1];
    const cashier = searchParams.get('cashier');
    const agent = searchParams.get('agent');
    const superagent = searchParams.get('superagent');
    setRole(role);
    setCashier(cashier || '');
    setAgent(agent || '');
    setSuperagent(superagent || '');
  }, [window.location.pathname, window.location.search]);

  return (
    <>
      <PageMeta
        title={`${role.charAt(0).toUpperCase() + role.slice(1)} Lists`}
        description="This is User Lists page for Vegas-xx admin panel"
      />
      <PageBreadcrumb pageTitle={`${role.charAt(0).toUpperCase() + role.slice(1)} Lists`} />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

        <div className="space-y-6">
          {
            role &&
            (<UserListsTable role={role} cashier={cashier} agent={agent} superagent={superagent} />)
          }
        </div>
      </div>
    </>
  );
}
