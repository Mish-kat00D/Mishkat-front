"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useWorkshops } from "@/lib/hooks/useWorkshops";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditSessionPage({ params }: { params: { slug: string; sessionId: string } }) {
  const searchParams = useSearchParams();
  const workshopId = searchParams.get("workshopId");
  const router = useRouter();
  const { getSession, updateSession, getSessions } = useWorkshops();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    idx: 1,
    duration: 60,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (workshopId && params.sessionId) {
      getSession(workshopId, params.sessionId).then(data => {
        setFormData({
          title: data.title,
          content: data.content || "",
          idx: data.idx,
          duration: data.duration,
        });
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [workshopId, params.sessionId, getSession]);

  if (!workshopId) {
    return <div className="p-8">Error: Workshop ID missing in URL params</div>;
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
    setSaving(true);
    setStatus("Updating session details...");

    try {
      // 1. Update Session Details
      await updateSession(workshopId, params.sessionId, formData);

      // 2. Upload Video if selected
      if (videoFile) {
        setStatus("Getting upload URL...");
        // We reuse the fetch approach because useWorkshops hook doesn't (yet) expose the special cookie handling for independent video upload if logic differs.
        // Wait, I added getSessionUploadUrl to hook.
        // Let's use fetch manually for the upload part to be safe with the cookie loop if needed or check if we can reuse the hook.
        // The hook `getSessionUploadUrl` returns { uploadUrl: ... }, setting cookies.

        const { uploadUrl } = await new Promise<any>((resolve, reject) => {
          // Retrieve upload URL
          // Using fetch directly to ensure we get the cookies as expected if hook wrapper hides them? 
          // No, hook wrapper uses 'include'.
          // But 'getSessionUploadUrl' is a GET request.
          // Let's implement it here manually to match 'CreateSession' logic or assume hook works.
          // Hook calls `workshop/${workshopId}/session/${sessionId}/upload-url`

          // We need the credentials to be set.
          // Let's try to fetch it.
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/workshop/${workshopId}/session/${params.sessionId}/upload-url`, {
            credentials: "include"
          }).then(res => res.json()).then(resolve).catch(reject);
        });

        console.log("Upload URL:", uploadUrl);
        setStatus("Uploading video (this may take a while)...");

        const uploadData = new FormData();
        uploadData.append("video", videoFile);

        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          body: uploadData,
          credentials: "include",
        });

        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          throw new Error(`Video upload failed: ${errText}`);
        }
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
        setSaving(false);
      }
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Session</h1>

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Video File (Optional)</label>
          <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-black transition-colors">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600 justify-center">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                  <span>Upload new video</span>
                  <input type="file" className="sr-only" accept="video/*" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-xs text-gray-500">{videoFile ? videoFile.name : "Leave empty to keep existing video"}</p>
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
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
