"use client";

import { useInstructors } from "@/lib/hooks/useInstructors";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function InstructorsPage() {
  const { getInstructors, deleteInstructor, loading } = useInstructors();
  const [instructors, setInstructors] = useState<any[]>([]);

  const fetchInstructors = async () => {
    try {
      const data = await getInstructors();
      setInstructors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [getInstructors]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this instructor?")) {
      try {
        await deleteInstructor(id);
        fetchInstructors(); // Refresh list
      } catch (error) {
        alert("Failed to delete instructor");
      }
    }
  };

  if (loading && instructors.length === 0) {
    return <div className="p-8">Loading instructors...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
        <Link
          href="/dashboard/instructors/create"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add Instructor
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {instructors.map((instructor) => (
              <tr key={instructor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {instructor.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  {/* Edit functionality can be added later */}
                  <Link href={`/dashboard/instructors/${instructor.id}/edit`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1">
                    <Edit size={16} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(instructor.id)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {instructors.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No instructors found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
