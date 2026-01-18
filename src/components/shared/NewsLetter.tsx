"use client"
import React, { useState } from 'react'

const NewsLetter = () => {
  const [formData, setFormData] = useState({
    field: "",
    email: "",
  });
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    data: string | null;
  }>({
    loading: false,
    error: null,
    data: null,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setState({ loading: true, error: null, data: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: formData.field,
          email: formData.email,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setFormData({ field: "", email: "" });
        setState({ loading: false, error: null, data: data.message });
      } else {
        setState({ loading: false, error: data.message, data: null });
      }
    } catch (error: any) {
      console.log(error);
      setState({ loading: false, error: error.message, data: null });
    }
  };
  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-1 w-full">
      <span className="text-neutral-100 text-base font-semibold">
        Subscribe to our newsletter
      </span>
      <div className="flex flex-col gap-2 items-center justify-start">
        <div className="flex gap-4 w-full">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-3 bg-primary-900 rounded-lg outline-1 outline-indigo-300/10 text-neutral-600 text-xs"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <button type="submit" disabled={state.loading} className="h-9 px-4 bg-secondary-500 rounded-lg text-white text-sm font-medium">
            {state.loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
        {state.error && <p className="text-red-500 text-xs bg-red-500/10 p-2 rounded-lg">{state.error as string}</p>}
        {state.data && <p className="text-green-500 text-xs bg-green-500/10 p-2 rounded-lg">{state.data as string}</p>}
      </div>
    </form>
  )
}

export default NewsLetter