"use client";
import { useState, useEffect } from 'react';

export default function Home() {

  const callAPI = async () => {
    const res = await fetch('https://localhost:32786/api/GitHub/GitHub');
    const data = await res.json();
    if (res.status !== 200) throw Error(body.message);
    
    setTableData(data);
  };

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    callAPI();
  }, [tableData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <button onClick={callAPI}>Call API</button> */}
      
      <h1 className="text-2xl font-bold text-center">GitHub Inventory</h1>
      <table className="min-w-full divide-y divide-gray-300">
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
          {tableData ? tableData.map(
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
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.description}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{item.default_Branch}</td>
                </tr>
              )
            }
          ) : <tr><td>No data</td></tr>}
        </tbody>
      </table>
    </main>
  )
}
