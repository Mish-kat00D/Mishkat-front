"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// Helper to handle API calls directly for now or move to hook
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CreateSessionPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const workshopId = searchParams.get("workshopId");
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "**Write your session content here...**", // mapped to 'content' in DTO
    idx: 1,
    duration: 60,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // For showing "Creating session...", "Uploading...", etc.

  if (!workshopId) {
    return <div className="p-8">Error: Workshop ID missing</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "idx" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a video file");
      return;
    }
    setLoading(true);
    setStatus("Creating session reference...");

    try {
      // 1. Create Session
      const sessionRes = await fetch(`${API_URL}/workshop/${workshopId}/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Essential for generic auth if needed, but endpoint returns cookie
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          idx: formData.idx,
          duration: formData.duration,
          // content? DTO says content
        }),
      });

      if (!sessionRes.ok) {
        throw new Error("Failed to create session");
      }

      const { session, uploadUrl } = await sessionRes.json();
      console.log("Session created:", session.id, "Upload URL:", uploadUrl);

      // 2. Upload Video
      setStatus("Uploading video (this may take a while)...");

      const uploadData = new FormData();
      uploadData.append("video", videoFile);
      // Backend sets sessionToken cookie, so the request below will include it because 'same-origin' or 'include' credentials
      // BUT 'uploadUrl' might be different domain (GO_URL). 
      // If Go is on localhost:8080 and Front on localhost:3000, we need cors and credentials.
      // Go handler expects 'sessionToken' cookie? Or generic bearer?
      // NestJS creates 'sessionToken' cookie.
      // We must ensure this request sends that cookie.

      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        body: uploadData,
        credentials: "include", // Send cookies (sessionToken)
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`Video upload failed: ${errText}`);
      }

      setStatus("Success! Redirecting...");
      setTimeout(() => {
        router.push(`/dashboard/workshops/${params.slug}/manage`);
      }, 1000);

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong");
      setStatus("");
    } finally {
      if (!status.includes("Redirecting")) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Session</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Index (Order)</label>
            <input
              type="number"
              name="idx"
              required
              min="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
              value={formData.idx}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              required
              min="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <div data-color-mode="light">
            <MDEditor
              value={formData.content}
              onChange={(val) => setFormData(prev => ({ ...prev, content: val || "" }))}
              height={200}
              preview="edit"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video File</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-black transition-colors">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600 justify-center">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" accept="video/*" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">{videoFile ? videoFile.name : "MP4, WebM up to 500MB"}</p>
            </div>
          </div>
        </div>

        {status && (
          <div className="text-sm text-blue-600 font-medium bg-blue-50 p-3 rounded-md">
            {status}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
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
            {loading ? "Processing..." : "Create & Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}
