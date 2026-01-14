"use client";

import { useInstructors } from "@/lib/hooks/useInstructors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CreateInstructorPage() {
  const { createInstructor, loading } = useInstructors();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    imgUrl: "",
    achievements: [{
      title: "",
      icon: "",
    }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { title: "", icon: "" }],
    }));
  };

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = { ...updatedAchievements[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));
  };

  const handleRemoveAchievement = (index: number) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));
  };

  // handle selecting image and make it base64 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          imgUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInstructor(formData);
      router.push("/dashboard/instructors");
    } catch (error) {
      alert("Failed to create instructor");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Instructor</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
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
            placeholder="e.g. Senior Product Designer"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="file"
            name="imgUrl"
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                name="title"
                placeholder="Achievement Title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
                value={achievement.title}
                onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
              />
              <input
                type="text"
                name="icon"
                placeholder="Achievement Icon"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
                value={achievement.icon}
                onChange={(e) => handleAchievementChange(index, "icon", e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveAchievement(index)}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAchievement}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
          >
            Add Achievement
          </button>
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
            Add Instructor
          </button>
        </div>
      </form>
    </div>
  );
}
