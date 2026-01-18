"use client";
import React from "react";

const Email = () => {
  const [formData, setFormData] = React.useState({
    field: "",
    email: "",
  });
  const [state, setState] = React.useState<{
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
    if (!formData.field || !formData.email) {
      setState({ loading: false, error: "Please fill in all the fields", data: null });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setState({ loading: false, error: "Please enter a valid email address", data: null });
      return;
    }
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
    <div id="Email" className="w-full mt-20 md:mt-32">
      <div className='relative container! mx-auto px-4 h-max! glass flex! flex-col! items-center gap-8 p-7!'>
        <div className="flex flex-col justify-evenly items-center gap-8">
          <div className="text-center text-white text-4xl font-bold leading-10">
            Share your email to be updated with upcoming offers.
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-2xl">
            <input
              type="text"
              name="field"
              required
              placeholder="Your favorite design field"
              className="w-full h-14 px-6 bg-blue-900/30 rounded-full outline-none focus:outline-cyan-500/30"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full h-14 px-6 bg-blue-900/30 rounded-full outline-none focus:outline-cyan-500/30"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <button type="submit" disabled={state.loading} className="w-full py-3.5 bg-secondary-500 hover:opacity-90 transition rounded-full text-white text-base font-semibold">
              {state.loading ? "Sending..." : "Send me samples"}
            </button>
            {state.error && <p className="text-red-500 text-xs bg-red-500/10 p-2 rounded-lg">{state.error as string}</p>}
            {state.data && <p className="text-green-500 text-xs bg-green-500/10 p-2 rounded-lg">{(state.data as any).message as string}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Email;
