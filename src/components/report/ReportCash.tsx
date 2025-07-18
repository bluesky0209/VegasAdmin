"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import useApi from "../../hooks/useApi";
import Button from "../ui/button/Button";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useSelector } from "react-redux";

const TABLE_HEADERS = [
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "account", label: "Account" },
    { key: "totalRecharged", label: "Total Recharged" },
    { key: "totalRedeemed", label: "Total Redeemed" },
    { key: "totalIncome", label: "Total Income" },
    { key: "holdings", label: "Holdings" }
];

const SearchIcon = () => (
    <svg
        className="fill-current"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
            fill=""
        />
    </svg>
);

export default function ReportCashTable() {
    const Api = useApi();
    const { userData } = useSelector((state: any) => state.auth);
    const [currentData, setCurrentData] = useState([]);
    const [search, setSearch] = useState('');
    const [date, setDate] = useState([
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
        new Date()
    ]);

    const getLists = async () => {
        try {
            const response = await Api.getReportCash({
                date,
                username: search,
                userId: userData?._id,
                page: 1,
                pageSize: 20
            });

            if (response?.data) {
                setCurrentData(response.data.results);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDateChange = (selectedDates: Date[]) => {
        if (selectedDates.length === 2) {
            setDate([selectedDates[0], selectedDates[1]]);
            getLists();
        }
    };

    const setDateRange = (startDate: Date, endDate: Date) => {
        setDate([startDate, endDate]);
        getLists();
    };

    const getToday = () => {
        const today = new Date();
        return setDateRange(
            new Date(today.setHours(0, 0, 0, 0)),
            new Date(today.setHours(23, 59, 59, 999))
        );
    };

    const getYesterday = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return setDateRange(
            new Date(yesterday.setHours(0, 0, 0, 0)),
            new Date(yesterday.setHours(23, 59, 59, 999))
        );
    };

    const getThisWeek = () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return setDateRange(
            new Date(startOfWeek.setHours(0, 0, 0, 0)),
            new Date(today.setHours(23, 59, 59, 999))
        );
    };

    const getLastWeek = () => {
        const today = new Date();
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
        const lastWeekStart = new Date(lastWeekEnd);
        lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
        return setDateRange(
            new Date(lastWeekStart.setHours(0, 0, 0, 0)),
            new Date(lastWeekEnd.setHours(23, 59, 59, 999))
        );
    };

    useEffect(() => {
        getLists();
    }, [date]); // Add date as dependency to trigger getLists when date changes

    return (
        <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
            <div className="">
                <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center z-20 gap-3">
                        <Flatpickr
                            options={{
                                mode: "range",
                                dateFormat: "Y-m-d",
                                defaultDate: date,
                                onChange: handleDateChange
                            }}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by username"
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                        />
                    </div>
                    <Button size="sm" onClick={getLists}>
                        Search
                    </Button>
                </div>
                <div className="flex gap-2 px-4 py-2">
                    <Button size="sm" onClick={getToday}>Today</Button>
                    <Button size="sm" onClick={getYesterday}>Yesterday</Button>
                    <Button size="sm" onClick={getThisWeek}>This Week</Button>
                    <Button size="sm" onClick={getLastWeek}>Last Week</Button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div>
                    <Table>
                        <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {TABLE_HEADERS.map(({ key, label }) => (
                                    <TableCell
                                        key={key}
                                        isHeader
                                        className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                                    >
                                        <div className="flex items-center justify-between cursor-pointer">
                                            <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                                {label}
                                            </p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((item: any, i: number) => (
                                <TableRow key={i} className="cursor-pointer">
                                    <TableCell className="border text-center dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        {date[0]?.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="border text-center dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        {date[1]?.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        {item.username}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-green-800 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-green-400 whitespace-nowrap">
                                        {item?.In?.toFixed(2) ?? 0}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-red-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-red-400 whitespace-nowrap">
                                        {(-item?.Out)?.toFixed(2) ?? 0}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        {(item?.In + item?.Out).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-500 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                        {(((item?.In + item?.Out) / item.In) * 100).toFixed(2)}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
