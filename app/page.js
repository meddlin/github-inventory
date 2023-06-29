"use client";
import { useState, useEffect } from 'react';

const callAPI = async () => {
  const res = await fetch('https://localhost:32770/api/GitHub/GitHub');
  const data = await res.json();
  if (res.status !== 200) throw Error(body.message);
  
  return data;
};

export default function Home() {
  const [tableData, setTableData] = useState([]);


  useEffect(async () => {
    const data = await callAPI();
    setTableData(data);
  }, []);
  

  return (
    <main className="flex items-center justify-center">
      {/* <button onClick={callAPI}>Call API</button> */}
      
      {/* <h1 className="text-2xl font-bold text-center">GitHub Inventory</h1> */}
      
      <table className="divide-y divide-gray-300">
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
      </table>
      
    </main>
  )
}
