"use client";

import { useState, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    useReactTable,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel
} from "@tanstack/react-table";
import {
    ViewDetailModal,
    ViewDetailModalOpenButton,
    ViewDetailModalDismissButton,
    ViewDetailModalContents
} from '@/components/view-detail-modal';
import { CheckIcon } from '@heroicons/react/20/solid';
import ViewDetailDisplay from '@/components/view-detail-display';

const callAPI = async () => {
    const res = await fetch('https://localhost:7080/api/GitHub/GetRepos');
    const data = await res.json();
    if (res.status !== 200) throw Error(body.message);

    return data;
};

const RepoTablePage = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await callAPI();
            setTableData(data);
        })();
    }, []);

    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('view-detail', {
            header: () => <></>,
            cell: ({ row, getValue }) => {
                return (
                    <>
                        <ViewDetailModal>
                            <ViewDetailModalOpenButton>
                                <button>Detail</button>
                            </ViewDetailModalOpenButton>
                            <ViewDetailModalContents>
                                <ViewDetailDisplay data={row.original} />

                                <ViewDetailModalDismissButton>
                                    <button>Close</button>
                                </ViewDetailModalDismissButton>
                            </ViewDetailModalContents>
                        </ViewDetailModal>
                    </>
                );
            },
        }),
        columnHelper.accessor('name', {
            header: () => <h2>Name</h2>,
            cell: ({ row, getValue }) => {
                const styles = '';
                return (<span className="font-semibold">{getValue()}</span>)
            },
            footer: 'Name'
        }),
        columnHelper.accessor('owner.login', {
            header: () => <h2>Owner</h2>,
            cell: ({ row, getValue }) => {
                const styles = '';
                const htmlUrl = row.original.owner.html_Url;
                return (
                    <a href={htmlUrl}>
                        <span className="underline decoration-solid hover:decoration-dashed">{getValue()}</span>
                    </a>
                )
            },
            footer: 'Owner Login'
        }),
        columnHelper.accessor('private', {
            header: () => <h2>Type</h2>,
            cell: ({ row, getValue }) => {
                const styles = '';
                const value = getValue();
                return (<span className={`${styles}`}>{value ? 'private' : 'public'}</span>)
            },
            footer: 'Private'
        }),
        columnHelper.accessor('html_Url', {
            header: () => <h2>URL</h2>,
            cell: ({ row, getValue }) => {
                const styles = '';
                // TODO : Security - make sure this is a valid URL pointing at the GitHub repo
                return (
                    <a href={`${getValue()}`} className="underline decoration-solid hover:decoration-dashed">{getValue()}</a>
                )
            },
            footer: 'URL'
        }),
        columnHelper.accessor('description', {
            header: () => <h2>Description</h2>,
            cell: ({ row, getValue }) => {
                const styles = '';
                const value = getValue();
                return (<span className={`${styles}`}>{value && value !== undefined ? `${value.slice(0, 30)}...` : ''}</span>)
            },
            footer: 'Description'
        }),
        columnHelper.accessor('language', {
            header: () => <h2>Language</h2>,
            cell: ({ row, getValue }) => {
                const styles = '';
                return (<span className={`${styles}`}>{getValue()}</span>)
            },
            footer: 'Language'
        }),
        columnHelper.accessor('default_Branch', {
            header: () => (<h2>Default Branch</h2>),
            cell: ({ row, getValue }) => {
                const styles = '';
                return (<span className={`${styles}`}>{getValue()}</span>)
            },
            footer: 'Default Branch'
        }),
        columnHelper.accessor('has_license', {
            header: () => <h2>Has License</h2>,
            cell: ({ row, getValue }) => {
                const styles = '';
                // Show if license is present, not the actual license name
                const licenseValue = (row.original.license &&
                    row.original.license !== undefined &&
                    row.original.license.hasOwnProperty('name')) ?
                    true : false;

                return (
                    <span className={`${styles}`}>
                        {licenseValue ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                        ) : ''}
                    </span>
                );
            },
            footer: 'Has License'
        })
    ];

    const table = useReactTable({
        columns,
        data: (tableData && tableData.length > 0) ? tableData : [],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 30,
            },
        },
    });

    return (
        <>

            <div className="px-4 sm:px-6 lg:px-8">

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <Table> {/* className="min-w-full divide-y divide-gray-900" */}
                                <TableCaption>A list of GitHub repos</TableCaption>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id} className="h-20">
                                            {headerGroup.headers.map((header) => (
                                                // TODO : First <th> should have -> className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                                                <th key={header.id} 
                                                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900 sm:pl-0">
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-200 bg-white">
                                    {table.getRowModel().rows.map((row, r_idx) => (
                                        <TableRow key={row.id}> {/* className="leading-4 text-sm hover:bg-gray-100" */}
                                            {row.getVisibleCells().map(cell => (
                                                <TableCell key={cell.id}> {/* className="whitespace-nowrap px-2 py-2 text-sm text-gray-900" */}
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <tfoot>
                                    {table.getFooterGroups().map((footerGroup) => (
                                        <tr key={footerGroup.id}>
                                            {footerGroup.headers.map(header => (
                                                <th key={header.id} className="text-left text-gray-500 font-normal antialiased">
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </tfoot>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RepoTablePage;