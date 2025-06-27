import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { DollarLineIcon, GroupIcon } from "../../icons";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Button from "../ui/button/Button";

const ReportCard = () => {
    const { getUserReports, getReportFinance } = useApi();
    const [date, setDate] = useState([
        new Date(new Date().setDate(new Date().getDate() - 1)),
        new Date()
    ])
    const [activeusers, setActiveusers] = useState(0);
    const [registeredusers, setRegisteredUsers] = useState(0);
    const [loginedusers, setLoginedusers] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [totalWithdraw, setTotalWithdraw] = useState(0);
    const getReport = async () => {
        const res = await getUserReports({ date });
        if (res?.data) {
            setActiveusers(res.data.activeusers);
            setRegisteredUsers(res.data.registeredusers);
            setLoginedusers(res.data.loginedusers);
        }
    }

    const getFinanceReport = async () => {
        const res = await getReportFinance({ date });
        if (res?.data) {
            setTotalDeposit(res.data.totalDeposit);
            setTotalWithdraw(res.data.totalWithdraw);
        }
        console.log(res);
    }

    useEffect(() => {
        getReport();
        getFinanceReport();
    }, [])

    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-3 justify-end">
                <div className="flex items-center gap-2">
                    <Flatpickr
                        options={{
                            mode: "range",
                            dateFormat: "Y-m-d",
                            defaultDate: [date[0], date[1]],
                            onChange: (selectedDates) => {
                                if (selectedDates.length === 2) {
                                    setDate([selectedDates[0], selectedDates[1]]);
                                }
                            }
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    />
                </div>
                <Button size="sm"
                    onClick={() => {
                        getReport();
                        getFinanceReport();
                    }}
                >
                    Search
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white/[0.90]">
                        <GroupIcon className="size-6" />
                    </div>

                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        Registered Users
                    </p>

                    <div className="flex items-end justify-between mt-3">
                        <div>
                            <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                                {registeredusers}
                            </h4>
                        </div>

                        {/* <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                            +20%
                        </span>

                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            Vs last month
                        </span>
                    </div> */}
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white/[0.90]">
                        <GroupIcon className="size-6" />
                    </div>

                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        Logined Users
                    </p>

                    <div className="flex items-end justify-between mt-3">
                        <div>
                            <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                                {loginedusers}
                            </h4>
                        </div>

                        {/* <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1 rounded-full bg-error-50 px-2 py-0.5 text-theme-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">
                            -3.59%
                        </span>

                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            Vs last month
                        </span>
                    </div> */}
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white/[0.90]">
                        <GroupIcon className="size-6" />
                    </div>
                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        Active Users
                    </p>

                    <div className="flex items-end justify-between mt-3">
                        <div>
                            <h4 className="font-bold text-green-800 text-title-sm dark:text-green/90">
                                {activeusers}
                            </h4>
                        </div>

                        {/* <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                            +15%
                        </span>

                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            Vs last month
                        </span>
                    </div> */}
                    </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white/[0.90]">
                        <DollarLineIcon className="size-6 text-green-500" />
                    </div>
                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        Total Deposit
                    </p>

                    <div className="flex items-end justify-between mt-3">
                        <div>
                            <h4 className="font-bold text-green-800 text-title-sm dark:text-green/90">
                                {Number(totalDeposit).toFixed(2)}
                            </h4>
                        </div>

                        {/* <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                            +15%
                        </span>

                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            Vs last month
                        </span>
                    </div> */}
                    </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white/[0.90]">
                        <DollarLineIcon className="size-6 text-red-500" />
                    </div>
                    <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                        Total Withdraw
                    </p>

                    <div className="flex items-end justify-between mt-3">
                        <div>
                            <h4 className="font-bold text-red-800 text-title-sm dark:text-red/90">
                                {Number(totalWithdraw).toFixed(2)}
                            </h4>
                        </div>

                        {/* <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                            +15%
                        </span>

                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            Vs last month
                        </span>
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportCard;