"use client";

import { useInstructors } from "@/lib/hooks/useInstructors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Upload, Plus, Trash2 } from "lucide-react";

export default function EditInstructorPage({ params }: { params: { id: string } }) {
  const { getInstructor, updateInstructor, loading } = useInstructors();
  const router = useRouter();
  const [formData, setFormData] = useState<{
    name: string;
    title: string;
    bio: string;
    imgUrl: string;
    achievements: {
      title: string;
      icon: string;
    }[];
  }>({
    name: "",
    title: "",
    bio: "",
    imgUrl: "",
    achievements: [],
  });

  useEffect(() => {
    getInstructor(params.id).then((data) => {
      setFormData({
        name: data.name,
        title: data.title,
        bio: data.bio,
        imgUrl: data.imgUrl || "",
        achievements: data.achievements,
      });
    });
  }, [getInstructor, params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imgUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateInstructor(params.id, formData);
      router.push("/dashboard/instructors");
    } catch (error) {
      alert("Failed to update instructor");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Instructor</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 active:outline-none focus:outline-none focus:ring-black focus:border-black"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 active:outline-none focus:outline-none focus:ring-black focus:border-black"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 active:outline-none focus:outline-none focus:ring-black focus:border-black"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Achievements Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Achievements</label>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, achievements: [...prev.achievements, { title: "", icon: "" }] }))}
              className="text-xs flex items-center gap-1 text-black font-medium hover:underline"
            >
              <Plus className="w-3 h-3" /> Add Achievements
            </button>
          </div>
          <div className="space-y-3">
            {formData.achievements && formData.achievements.length > 0 && formData.achievements.map((item, index) => (
              <div key={index} className="flex gap-3 items-start border p-3 rounded-md bg-gray-50 relative">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }))}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex-1 space-y-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Achievements Title"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                      value={item.title}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setFormData(prev => {
                          const list = [...prev.achievements];
                          list[index] = { ...list[index], title: newVal };
                          return { ...prev, achievements: list };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Icon (e.g. 'Award', 'Star') or URL"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                      value={item.icon}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setFormData(prev => {
                          const list = [...prev.achievements];
                          list[index] = { ...list[index], icon: newVal };
                          return { ...prev, achievements: list };
                        });
                      }}
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Enter a Lucide icon name or image URL.</p>
                  </div>
                </div>
              </div>
            ))}
            {(!formData.achievements || formData.achievements.length === 0) && <p className="text-sm text-gray-400 italic">No achievements added.</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
          <div className="flex items-center gap-4">
            {formData.imgUrl && (
              <img src={formData.imgUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover border" />
            )}
            <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Upload className="w-4 h-4 inline-block mr-2" />
              Change Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
