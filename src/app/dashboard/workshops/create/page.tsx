"use client";

import { useWorkshops } from "@/lib/hooks/useWorkshops";
import { useInstructors } from "@/lib/hooks/useInstructors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function CreateWorkshopPage() {
  const { createWorkshop, loading } = useWorkshops();
  const { getInstructors } = useInstructors();
  const router = useRouter();
  const [instructors, setInstructors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: 0,
    level: "BEGINNER",
    format: "ONLINE",
    language: "Arabic",
    instructorId: "",
  });

  useEffect(() => {
    getInstructors().then(setInstructors).catch(console.error);
  }, [getInstructors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Handle number inputs
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWorkshop(formData);
      router.push("/dashboard/workshops");
    } catch (error) {
      alert("Failed to create workshop");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Workshop</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            name="slug"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.slug}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (EGP)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              name="level"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="PROFESSIONAL">Professional</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
          <select
            name="format"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.format}
            onChange={handleChange}
          >
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
          <select
            name="instructorId"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.instructorId}
            onChange={handleChange}
          >
            <option value="">Select Instructor</option>
            {instructors.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name} ({inst.title})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Workshop
          </button>
        </div>
      </form>
    </div>
  );
}
