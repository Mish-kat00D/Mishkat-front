type Tool = {
  name: string;
  description: string;
  points: string[];
};

const tools: Tool[] = [
  {
    name: "ChatGPT",
    description: "For creativity, planning & idea generation",
    points: [
      "Brainstorm design ideas fast",
      "Write creative briefs",
      "Get AI-based design feedback",
    ],
  },
  {
    name: "Perplexity",
    description: "For smart research",
    points: [
      "Collect visual references",
      "Summarize complex topics",
    ],
  },
  {
    name: "Midjourney",
    description: "For design generation & style creation",
    points: [
      "Generate concept visuals",
      "Build consistent aesthetics",
    ],
  },
  {
    name: "Mhm.ai",
    description: "For branding & product design",
    points: [
      "Create brand systems",
      "Generate product mockups",
    ],
  },
  {
    name: "Nano Banana",
    description: "For brand identity visualization",
    points: ["Keep design tone & color unified"],
  },
  {
    name: "Microsoft Copilot",
    description: "For AI-assisted daily design work",
    points: ["Automate creative workflows"],
  },
  {
    name: "Flux",
    description: "For dynamic & motion-based designs",
    points: ["Experiment with motion and animation"],
  },
  {
    name: "Leonardo.ai",
    description: "For high-quality, realistic visuals",
    points: ["Generate photorealistic designs"],
  },
  {
    name: "Stable Diffusion",
    description: "For total control over outputs",
    points: [
      "Build ControlNet workflows",
      "Use style transfer & fine-tuning",
    ],
  },
  {
    name: "ComfyUI",
    description: "For custom workflows",
    points: [
      "Build and automate design pipelines",
      "Use LoRA models & upscale to 4K",
    ],
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <div className="relative rounded-2xl border border-white/10 shadow-md p-6 flex flex-col gap-4 bg-primary-1000">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg">
        <img
          src="https://placehold.co/64x64"
          alt={tool.name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Title */}
      <h3 className="text-white text-base font-semibold">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-white/60 text-sm">
        {tool.description}
      </p>

      {/* Points */}
      <ul className="flex flex-col gap-2 pt-2">
        {tool.points.map((point) => (
          <li key={point} className="flex gap-2 text-white/70 text-sm">
            <span className="text-secondary-500">•</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AiToolsYouWillMaster = () => {
  return (
    <section className="w-full flex flex-col gap-2">
      {/* Title */}
      <h2 className="text-white text-[32px] font-bold leading-[48px]">
        AI Tools You&apos;ll Master
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default AiToolsYouWillMaster;
