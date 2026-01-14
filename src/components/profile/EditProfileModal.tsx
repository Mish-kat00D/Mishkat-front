"use client";
import React, { useState, useRef } from "react";
import { UserProfile } from "./Header";
import { X, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EditProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ user, isOpen, onClose }: EditProfileModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    title: user.title || "",
    company: user.company || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    phone: user.phone || "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(
    user.profileImageUrl
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    user.coverImageUrl
  );

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "profile") {
        setProfileImage(file);
        setProfilePreview(URL.createObjectURL(file));
      } else {
        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          data.append(key, value);
        }
      });

      if (profileImage) {
        data.append("profile", profileImage);
      }
      if (coverImage) {
        data.append("cover", coverImage);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "PUT",
        body: data,
        // No Content-Type header needed for FormData, browser sets it with boundary
        // But we might need auth headers if not handled by cookie
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update profile");
      }

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
      <div className="bg-white no-scrollbar dark:bg-primary-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-primary-700">
          <h2 className="text-2xl font-bold dark:text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-full transition"
          >
            <X className="w-6 h-6 dark:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            {/* Cover Image */}
            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-200 dark:bg-primary-800 group">
              <Image
                src={coverPreview || "/default-cover.png"}
                alt="Cover"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer" onClick={() => coverInputRef.current?.click()}>
                <Camera className="text-white w-8 h-8" />
              </div>
              <input
                type="file"
                ref={coverInputRef}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, "cover")}
              />
            </div>

            {/* Profile Image */}
            <div className="relative -mt-16 ml-6 w-24 h-24 rounded-full border-4 border-white dark:border-primary-900 overflow-hidden bg-gray-200 dark:bg-primary-800 group self-start">
              <Image
                src={profilePreview || "/Male_Avatar.jpg"}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer" onClick={() => profileInputRef.current?.click()}>
                <Camera className="text-white w-6 h-6" />
              </div>
              <input
                type="file"
                ref={profileInputRef}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, "profile")}
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-neutral-300">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-neutral-300">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white/50 cursor-not-allowed"
                disabled // Email usually shouldn't be changed this easily or needs verification
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-neutral-300">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Product Designer"
                className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-neutral-300">Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-neutral-300">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Cairo, Egypt"
                className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium dark:text-neutral-300">Website</label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://..."
                className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium dark:text-neutral-300">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about yourself..."
                className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-primary-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full font-medium text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-primary-800 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full font-medium text-white bg-secondary-500 hover:bg-secondary-600 transition flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
