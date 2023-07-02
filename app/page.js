"use client";
import { useState, useEffect } from 'react';
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
import ViewDetailDisplay from '@/components/view-detail-display';

const callAPI = async () => {
  const res = await fetch('https://localhost:32770/api/GitHub/GitHub');
  const data = await res.json();
  if (res.status !== 200) throw Error(body.message);
  
  return data;
};

export default function Home() {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    (async () => {
      const data = await callAPI();
      setTableData(data);
    })();
  }, []);

  const columnHelper = createColumnHelper();
  const columns = [
    // columnHelper.accessor('id', {
    //   header: () => <h2>ID</h2>,
    //   cell: ({ row, getValue }) => {
    //     const styles = '';
    //     return (<span className={`${styles}`}>{getValue()}</span>)
    //   },
    // }),
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
        )
      },
    }),
    columnHelper.accessor('name', {
      header: () => <h2>Name</h2>,
      cell: ({ row, getValue }) => {
        const styles = '';
        return (<span className={`${styles}`}>{getValue()}</span>)
      },
    }),
    columnHelper.accessor('private', {
      header: () => <h2>Private</h2>,
      cell: ({ row, getValue }) => {
        const styles = '';
        return (<span className={`${styles}`}>{getValue()}</span>)
      },
    }),
    columnHelper.accessor('html_Url', {
      header: () => <h2>HTML URL</h2>,
      cell: ({ row, getValue }) => {
        const styles = '';
        return (<span className={`${styles}`}>{getValue()}</span>)
      },
    }),
    columnHelper.accessor('description', {
      header: () => <h2>Description</h2>,
      cell: ({ row, getValue }) => {
        const styles = '';
        const value = getValue();
        return (<span className={`${styles}`}>{value && value!== undefined ? `${value.slice(0, 30)}...` : ''}</span>)
      },
    }),
    columnHelper.accessor('default_Branch', {
      header: () => <h2>Default Branch</h2>,
      cell: ({ row, getValue }) => {
        const styles = '';
        return (<span className={`${styles}`}>{getValue()}</span>)
      },
    }),
    columnHelper.accessor('has_license', {
      header: () => <h2>Has License</h2>,
      cell: ({ row, getValue }) => {
        const styles = '';
        const licenseValue = (row.original.license && 
                        row.original.license !== undefined && 
                          row.original.license.hasOwnProperty('name')) ? row.original.license.name : '';
        return (
          <span className={`${styles}`}>
            {licenseValue}
          </span>
        )
      }
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
    <main className="flex items-center justify-center">
      
      {/* <h1 className="text-2xl font-bold text-center">GitHub Inventory</h1> */}

      <table className="overflow-x-auto min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-40">
                  {headerGroup.headers.map((header) => (
                      // <th key={header.id} className="text-left text-slate-900">
                      <th key={header.id} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                  ))}
              </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row, r_idx) => (
              <tr key={row.id} className="leading-4 text-sm">
                  {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                  ))}
              </tr>
          ))}
        </tbody>
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
      </table>
      
      {/* <table className="divide-y divide-gray-300">
        <thead>
          <tr>
            {tableData && tableData.length > 0 ? Object.keys(tableData[0]).map(
              (item, index) => {
                return (
                    <td 
                      key={index}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {item}
                    </td>
                );
              }
            ) : <td>No data</td>}
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length > 0 ? tableData.map(
            (item, index) => {
              return (
                <tr key={index}>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.id}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.node_Id}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.full_Name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.private ? 'true' : 'false'}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-md">
                    <a
                      className="font-blue-500 hover:underline"
                      href={item.html_Url}>{item.html_Url}</a>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                    {item.description ? `${item.description.slice(0, 30)}...` : ''}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.default_Branch}</td>
                </tr>
              )
            }
          ) : <tr><td>No data</td></tr>}
        </tbody>
      </table> */}
      
    </main>
  )
}
