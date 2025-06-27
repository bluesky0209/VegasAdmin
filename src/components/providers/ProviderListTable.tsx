"use client";

import { useState, useEffect } from "react";
// import withReactContent from 'sweetalert2-react-content';
// import Swal from 'sweetalert2';

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
// import { PencilIcon, TrashBinIcon } from "../../icons";
import useApi from "../../hooks/useApi";
import { useSelector } from "../../redux/storeConfig/store";
import PaginationWithButton from "./PaginationWithButton";
import { toast } from "react-toastify";

type SortKey = "name" | "position" | "location" | "age" | "date" | "salary";
type SortOrder = "asc" | "desc";

interface Provider {
    Id: string;
    Name: string;
}

// const MySwal = withReactContent(Swal);

export default function ProviderListTable() {
    const Api = useApi();
    const { auth } = useSelector((state: any) => ({ auth: state.auth }));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [aggregator, setAggregator] = useState<string>("");

    useEffect(() => { getProviders() }, [currentPage, itemsPerPage, aggregator, searchTerm]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const chagneStatus = async (id: string, status: boolean) => {
        await Api.updateProvider(id, { status }).then((res: any) => {
            if (res.data) {
                toast.success("Status updated successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });
                getProviders()
            }
        })
    }
    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const getProviders = async () => {
        await Api.getProviders({ userId: auth?.userData?._id, pageSize: itemsPerPage, page: currentPage, filter: searchTerm, aggregator })
            .then((res: any) => {
                if (res.data) {
                    setProviders(res.data.results);
                    setTotalItems(res.data.count);
                    setTotalPages(Math.ceil(res.data.count / itemsPerPage));
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
                    setStartIndex(startIndex);
                    setEndIndex(endIndex);
                }
            });
    }

    useEffect(() => {
        getProviders();
    }, []);

    return (
        <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
            <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 dark:text-gray-400"> Show </span>
                    <div className="relative z-20 bg-transparent">
                        <select
                            className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                        >
                            {[10, 20, 50, 100].map((value) => (
                                <option
                                    key={value}
                                    value={value}
                                    className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                        <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                            <svg
                                className="stroke-current"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                                    stroke=""
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400"> entries </span>
                </div>

                <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
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
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search..."
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 dark:text-gray-400"> Aggregators </span>

                    <div className="relative z-20 bg-transparent">
                        <select
                            className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            value={aggregator}
                            onChange={(e) => {
                                setCurrentPage(1)
                                setSearchTerm('')
                                setAggregator(e.target.value)
                            }}
                        >
                            {[{ name: '', label: 'All' }, { name: 'c2gaming', label: 'C2 Gaming' }, { name: 'skyxspin', label: 'Skyxspin' }]?.map((value: any) => (
                                <option
                                    key={value.name}
                                    value={value.name}
                                    className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                >
                                    {value.label}
                                </option>
                            ))}
                        </select>
                        <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                            <svg
                                className="stroke-current"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                                    stroke=""
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>

                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div>
                    <Table>
                        <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {[
                                    { key: "Name", label: "Name" },
                                    { key: "Id", label: "Id" },
                                    { key: "aggregator", label: "Aggregator" },
                                ].map(({ key, label }) => (
                                    <TableCell
                                        key={key}
                                        isHeader
                                        className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                                    >
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => handleSort(key as SortKey)}
                                        >
                                            <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                                {label}
                                            </p>
                                            <button className="flex flex-col gap-0.5">
                                                <svg
                                                    className={`text-gray-300 dark:text-gray-700  ${sortKey === key && sortOrder === "asc"
                                                        ? "text-brand-500"
                                                        : ""
                                                        }`}
                                                    width="8"
                                                    height="5"
                                                    viewBox="0 0 8 5"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <svg
                                                    className={`text-gray-300 dark:text-gray-700  ${sortKey === key && sortOrder === "desc"
                                                        ? "text-brand-500"
                                                        : ""
                                                        }`}
                                                    width="8"
                                                    height="5"
                                                    viewBox="0 0 8 5"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </TableCell>
                                ))}
                                <TableCell
                                    isHeader
                                    className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                                >
                                    <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                        Action
                                    </p>
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {providers.map((item: any, i: any) => (
                                <TableRow key={i + 1} className="cursor-pointer">

                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {item.Name}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                                        {item.Id}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {item.aggregator}
                                    </TableCell>

                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
                                        <select
                                            className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                            value={item.status}
                                            onChange={(e: any) => {
                                                chagneStatus(item._id, e.target.value)
                                            }}
                                        >
                                            {[{ value: true, label: 'Enable' }, { value: false, label: 'Disable' }].map((item: any) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                    className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                    {/* Left side: Showing entries */}

                    <PaginationWithButton
                        totalPages={totalPages}
                        initialPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                    <div className="pt-3 xl:pt-0">
                        <p className="pt-3 text-sm font-medium text-center text-gray-500 border-t border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-t-0 xl:pt-0 xl:text-left">
                            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
