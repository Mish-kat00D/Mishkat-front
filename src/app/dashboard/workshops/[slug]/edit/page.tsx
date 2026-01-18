"use client";

import { useWorkshops } from "@/lib/hooks/useWorkshops";
import { useInstructors } from "@/lib/hooks/useInstructors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditWorkshopPage({ params }: { params: { slug: string } }) {
  const { getWorkshopBySlug, updateWorkshop, loading: workshopLoading } = useWorkshops();
  const { getInstructors } = useInstructors();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [workshopId, setWorkshopId] = useState("");

  const [formData, setFormData] = useState<{
    title: string;
    slug: string; // Slug can be edited, but careful
    subtitle: string;
    imageUrl: string;
    videoUrl: string;
    description: string;
    price: number;
    originalPrice: number;
    currency: string;
    durationHours: number;
    isOnSale: boolean;
    level: string;
    format: string;
    language: string;
    instructorId: string;
    whatYouWillMaster: string[];
    studentsResult: {
      imageUrl: string;
      caption: string;
    }[];
    tools: {
      name: string;
      description: string;
      logoUrl: string;
    }[];
  }>({
    title: "",
    slug: "",
    subtitle: "",
    imageUrl: "",
    videoUrl: "",
    description: "",
    price: 0,
    originalPrice: 0,
    currency: "EGP",
    durationHours: 0,
    isOnSale: false,
    level: "BEGINNER",
    format: "ONLINE",
    language: "Arabic",
    instructorId: "",
    whatYouWillMaster: [],
    studentsResult: [],
    tools: []
  });

  useEffect(() => {
    Promise.all([
      getInstructors(),
      getWorkshopBySlug(params.slug)
    ]).then(([instructorsData, workshopData]) => {
      setInstructors(instructorsData);
      setWorkshopId(workshopData.id);

      // Map backend data to form data
      setFormData({
        title: workshopData.title,
        slug: workshopData.slug,
        subtitle: workshopData.subtitle || "",
        imageUrl: workshopData.imageUrl || "",
        videoUrl: workshopData.videoUrl || "",
        description: workshopData.description || "",
        price: workshopData.price,
        originalPrice: workshopData.originalPrice || 0,
        currency: workshopData.currency,
        durationHours: workshopData.durationHours || 0,
        isOnSale: workshopData.isOnSale,
        level: workshopData.level,
        format: workshopData.format,
        language: workshopData.language,
        instructorId: workshopData.instructorId,
        whatYouWillMaster: workshopData.whatYouWillMaster || [],
        studentsResult: workshopData.studentResults || [],
        tools: workshopData.tools || []
      });
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
      // alert("Failed to load workshop data");
    });
  }, [getInstructors, getWorkshopBySlug, params.slug]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updates: any = { [name]: name === "price" || name === "originalPrice" || name === "durationHours" ? Number(value) : value };
      if (name === "title") {
        updates.slug = generateSlug(value);
      }
      return { ...prev, ...updates };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number, subField?: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (index !== undefined && subField) {
          setFormData(prev => {
            const list = [...(prev as any)[field]];
            list[index] = { ...list[index], [subField]: base64String };
            return { ...prev, [field]: list };
          });
        } else {
          setFormData(prev => ({ ...prev, [field]: base64String }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (field: "whatYouWillMaster", index: number, value: string) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: "whatYouWillMaster" | "studentsResult" | "tools") => {
    setFormData(prev => {
      let newItem: any = "";
      if (field === "studentsResult") newItem = { imageUrl: "", caption: "" };
      if (field === "tools") newItem = { name: "", description: "", logoUrl: "" };

      return { ...prev, [field]: [...prev[field], newItem] };
    });
  };

  const removeArrayItem = (field: "whatYouWillMaster" | "studentsResult" | "tools", index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleComplexArrayChange = (field: "studentsResult" | "tools", index: number, subField: string, value: string) => {
    setFormData(prev => {
      const list = [...prev[field] as any[]];
      list[index] = { ...list[index], [subField]: value };
      return { ...prev, [field]: list };
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateWorkshop(workshopId, formData);
      router.push("/dashboard/workshops");
    } catch (error) {
      alert("Failed to update workshop");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Workshop</h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Info */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                name="slug"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                value={formData.slug}
                onChange={handleInputChange}
              />
              <p className="text-xs text-yellow-600 mt-1">Changing slug will break existing links!</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              value={formData.subtitle}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
              <div className="flex items-center gap-4">
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-black transition-colors">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <Upload className="w-4 h-4" /> Change Image
                    </span>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "imageUrl")} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (Intro)</label>
              <input
                type="url"
                name="videoUrl"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                value={formData.videoUrl}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Details & Pricing */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Details & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (EGP)</label>
              <input type="number" name="price" min="0" required className="w-full border border-gray-300 rounded-lg px-4 py-2" value={formData.price} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
              <input type="number" name="originalPrice" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={formData.originalPrice} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
              <input type="number" name="durationHours" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={formData.durationHours} onChange={handleInputChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select name="level" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={formData.level} onChange={handleInputChange}>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="PROFESSIONAL">Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select name="format" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={formData.format} onChange={handleInputChange}>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
              <select name="instructorId" required className="w-full border border-gray-300 rounded-lg px-4 py-2" value={formData.instructorId} onChange={handleInputChange}>
                <option value="">Select Instructor</option>
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.id}>{inst.name} ({inst.title})</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isOnSale"
              name="isOnSale"
              checked={formData.isOnSale}
              onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))}
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <label htmlFor="isOnSale" className="text-sm text-gray-700">Is on Sale?</label>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Content</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div data-color-mode="light">
              <MDEditor
                value={formData.description}
                onChange={(val) => setFormData(prev => ({ ...prev, description: val || "" }))}
                height={300}
                preview="edit"
              />
            </div>
          </div>

          {/* What You Will Master */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">What You Will Master</label>
              <button type="button" onClick={() => addArrayItem("whatYouWillMaster")} className="text-xs flex items-center gap-1 text-black font-medium hover:underline">
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {formData.whatYouWillMaster.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    value={item}
                    onChange={(e) => handleArrayChange("whatYouWillMaster", index, e.target.value)}
                  />
                  <button type="button" onClick={() => removeArrayItem("whatYouWillMaster", index)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.whatYouWillMaster.length === 0 && <p className="text-sm text-gray-400 italic">No items added yet.</p>}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-xl font-semibold text-gray-800">Tools Used</h2>
            <button type="button" onClick={() => addArrayItem("tools")} className="text-sm flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">
              <Plus className="w-4 h-4" /> Add Tool
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.tools.map((tool, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg relative bg-gray-50">
                <button type="button" onClick={() => removeArrayItem("tools", index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex gap-4">
                  <div className="w-16 h-16 flex-shrink-0 bg-white border border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer relative group">
                    {tool.logoUrl ? (
                      <img src={tool.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, "tools", index, "logoUrl")} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Tool Name"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                      value={tool.name}
                      onChange={(e) => handleComplexArrayChange("tools", index, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Brief Description"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                      value={tool.description}
                      onChange={(e) => handleComplexArrayChange("tools", index, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Students Result Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-xl font-semibold text-gray-800">Student Results</h2>
            <button type="button" onClick={() => addArrayItem("studentsResult")} className="text-sm flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">
              <Plus className="w-4 h-4" /> Add Result
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.studentsResult.map((result, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg relative bg-gray-50 flex flex-col gap-3">
                <button type="button" onClick={() => removeArrayItem("studentsResult", index)} className="absolute top-2 right-2 z-10 text-white bg-black/50 p-1 rounded-full hover:bg-red-600 transition">
                  <Trash2 className="w-3 h-3" />
                </button>
                <div className="w-full aspect-video bg-white border border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer relative group">
                  {result.imageUrl ? (
                    <img src={result.imageUrl} alt="Result" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-500 flex flex-col items-center">
                      <Upload className="w-4 h-4 mb-1" /> Change Image
                    </span>
                  )}
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, "studentsResult", index, "imageUrl")} />
                </div>
                <input
                  type="text"
                  placeholder="Caption / Student Name"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                  value={result.caption}
                  onChange={(e) => handleComplexArrayChange("studentsResult", index, "caption", e.target.value)}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={workshopLoading}
            className="px-6 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-black/20 transition-all active:scale-95"
          >
            {workshopLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
