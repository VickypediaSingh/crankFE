import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AssignUnitsForm() {
  // const crankURL = "http://localhost:3000";
  const crankURL = "https://crank.zeppsandbox.com/api";
  //
  const caURL = "https://ca.crankenergy.in";
  const adminURL = "https://admin.crankenergy.in";

  const { id } = useParams();
  const navigate = useNavigate();
  const [distributor, setDistributor] = useState(null);
  const [additionalUnits, setAdditionalUnits] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDistributor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${adminURL}/admin/distributor/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch distributor");
        }

        const data = await response.json();
        setDistributor(data);
      } catch (error) {
        console.error("Error fetching distributor:", error);
        toast.error(error.message || "Failed to load ambassador details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistributor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!additionalUnits || isNaN(additionalUnits) || additionalUnits <= 0) {
      toast.error("Please enter a valid number of units");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${adminURL}/admin/assign-units/${id}`, // Fixed typo in endpoint (was 'assign-units')
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            additional_units: parseInt(additionalUnits),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign units");
      }

      const result = await response.json();
      toast.success(`${additionalUnits} units assigned successfully!`);
      setTimeout(() => {
        navigate("/assign-more-to-an-ambassador");
      }, 1500);
    } catch (error) {
      console.error("Assignment error:", error);
      toast.error(error.message || "Failed to assign units");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#93c740]"></div>
      </div>
    );
  }

  if (!distributor) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
        <p>Ambassador not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#121212] text-white animate-fadeIn">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#93c740]">
          Assign More Units
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Assign additional sampling units to {distributor.name}
        </p>
      </div>

      <div className="max-w-md mx-auto bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] p-8">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <StatCard
            title="Currently Assigned"
            value={distributor.quantity_alloted}
            color="blue"
          />
          <StatCard
            title="Units Remaining"
            value={distributor.quantity_remaining}
            color={distributor.quantity_remaining > 0 ? "green" : "yellow"}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="units" className="block text-gray-300 mb-2">
              Additional Units to Assign
            </label>
            <input
              type="number"
              min={-distributor.quantity_remaining}
              max="2000"
              value={allocations[d.id] ?? ""}
              onChange={(e) => handleAllocationChange(d.id, e.target.value)}
              placeholder={d.quantity_remaining.toString()}
              className="w-24 px-3 py-2 bg-[#2e2e2e] border border-[#3e3e3e] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#93c740] text-center"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/assign-more-to-an-ambassador")}
              className="px-6 py-3 bg-transparent border border-[#3e3e3e] text-gray-300 rounded-lg hover:bg-[#2e2e2e] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-[#93c740] text-[#121212] font-medium rounded-lg hover:bg-[#83b730] transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Assigning..." : "Assign Units"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: "text-blue-400",
    green: "text-[#93c740]",
    yellow: "text-yellow-400",
  };

  return (
    <div className="bg-[#2e2e2e] p-4 rounded-lg">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}
