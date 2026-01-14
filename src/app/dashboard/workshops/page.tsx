"use client";

import { useWorkshops } from "@/lib/hooks/useWorkshops";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function WorkshopsPage() {
  const { getWorkshops, deleteWorkshop, loading } = useWorkshops();
  const [workshops, setWorkshops] = useState<any[]>([]);

  const fetchWorkshops = async () => {
    try {
      const data = await getWorkshops();
      console.log(data);
      setWorkshops(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, [getWorkshops]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this workshop?")) {
      try {
        await deleteWorkshop(id);
        fetchWorkshops(); // Refresh list
      } catch (error) {
        alert("Failed to delete workshop");
      }
    }
  };

  if (loading && workshops.length === 0) {
    return <div className="p-8">Loading workshops...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Workshops</h1>
        <Link
          href="/dashboard/workshops/create"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Create Workshop
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workshops.map((workshop) => (
              <tr key={workshop.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{workshop.title}</div>
                  <div className="text-sm text-gray-500">{workshop.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${workshop.isOnSale ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {workshop.isOnSale ? 'On Sale' : 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/dashboard/workshops/${workshop.slug}/manage`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1">
                    <Edit size={16} /> Manage
                  </Link>
                  <button onClick={() => handleDelete(workshop.id)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {workshops.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No workshops found. Create one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
