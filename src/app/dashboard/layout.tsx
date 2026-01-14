import AdminGuard from "@/components/guards/AdminGuard";
import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Video, Users } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LayoutDashboard size={20} />
                <span>Overview</span>
              </Link>
              <Link
                href="/dashboard/workshops"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                id="sidebar-workshops-link"
              >
                <BookOpen size={20} />
                <span>Workshops</span>
              </Link>
              <Link
                href="/dashboard/instructors"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Users size={20} />
                <span>Instructors</span>
              </Link>
              {/* Sessions are usually managed within workshops, but we could add a direct link if needed */}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">Mishkat Admin v1.0</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
