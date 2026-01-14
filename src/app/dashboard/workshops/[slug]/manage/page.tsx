"use client";

import { useWorkshops } from "@/lib/hooks/useWorkshops";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";

export default function ManageWorkshopPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { getWorkshopBySlug, getSessions, createWorkshop, loading: hookLoading } = useWorkshops(); // createWorkshop for update? No updateWorkshop yet

  // We need update capability in hook. For now, let's implement update here or add to hook.
  // The hook has 'createWorkshop' but not 'updateWorkshop'. 
  // I will add updateWorkshop to the hook in a separate step or just fetch here for now.
  // Let's assume I'll add 'updateWorkshop' to the hook later, or now. 
  // Actually, I'll update the hook in the same turn if possible, but I can't.
  // I'll fetch manually for update for now to save turns.

  const [workshop, setWorkshop] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getWorkshopBySlug(slug)
        .then(async (data) => {
          setWorkshop(data);
          setSessions(data.sessions);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!workshop) return <div className="p-8">Workshop not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{workshop.title}</h1>
          <p className="text-gray-500">{workshop.subtitle || "No subtitle"}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/dashboard/workshops/${slug}/sessions/create?workshopId=${workshop.id}`} // Pass ID for session creation
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <Plus size={18} />
            Add Session
          </Link>
        </div>
      </div>

      {/* Workshop Details Section - Could be a form to edit */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Slug:</span> {workshop.slug}</div>
          <div><span className="font-medium">Price:</span> {workshop.price} {workshop.currency}</div>
          <div><span className="font-medium">Level:</span> {workshop.level}</div>
          <div><span className="font-medium">Format:</span> {workshop.format}</div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Sessions</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.map((session: any) => (
              <tr key={session.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.idx}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.duration} mins</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {session.videoUrl ? <span className="text-green-600">Uploaded</span> : <span className="text-yellow-600">Pending</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* Actions like Edit Session could go here */}
                  <span className="text-gray-400">Edit</span>
                </td>
              </tr>
            ))}
            {(!sessions || sessions.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No sessions yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
