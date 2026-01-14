import { Workshop } from '@/types/workshop';

const ToolCard = ({ tool }: { tool: Workshop['tools'][0] }) => {
  return (
    <div className="relative rounded-2xl border border-white/10 glass shadow-md p-6 flex flex-col gap-4 bg-primary-1000">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg">
        <img
          src={tool.logoUrl || "https://placehold.co/64x64"}
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
    </div>
  );
};

const AiToolsYouWillMaster = ({ tools }: { tools: Workshop['tools'] }) => {
  if (!tools || tools.length === 0) return null;

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
