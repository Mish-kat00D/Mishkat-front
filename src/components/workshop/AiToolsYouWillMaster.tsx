import { Workshop } from '@/types/workshop';
import { PenTool } from 'lucide-react';

const ToolCard = ({ tool }: { tool: Workshop['tools'][0] }) => {
  return (
    <div className="relative rounded-2xl border border-white/10 glass shadow-md p-6 flex flex-col gap-4 bg-primary-1000">
      {/* Title */}
      <h3 className="text-white text-base font-semibold flex items-center gap-2">
        <PenTool size={24} className="text-secondary-500" />
        {tool.name}
      </h3>

      {/* Purpose */}
      <p className="text-white/60 text-sm">
        {tool.purpose}
      </p>

      {/* Features */}
      <ul className="list-disc list-inside text-white/60 text-sm">
        {tool.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
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
