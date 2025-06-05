import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AssignMoreUnits() {
  const [distributors, setDistributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/admin/distributors-summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setDistributors(data);
      } catch (error) {
        console.error("Error fetching ambassadors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#93c740]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#121212] text-white animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#93c740]">
          Assign More Units
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Select an ambassador to assign more sampling units
        </p>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#2e2e2e]">
            <thead className="bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Assigned
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Sampled
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Remaining
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1e1e1e] divide-y divide-[#2e2e2e]">
              {distributors.length > 0 ? (
                distributors.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-[#2e2e2e] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/assign-units/${d.id}`}
                        className="font-medium text-white hover:text-[#93c740] transition-colors"
                      >
                        {d.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {d.mobile_number}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">
                      {d.quantity_alloted}
                    </td>
                    <td className="px-6 py-4 text-center text-[#93c740] font-medium">
                      {d.quantity_alloted - d.quantity_remaining}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">
                      {d.quantity_remaining}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5" // Updated to match number of columns
                    className="px-6 py-8 text-center text-gray-500 italic"
                  >
                    No Ambassadors Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
