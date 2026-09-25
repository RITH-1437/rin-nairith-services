import Reveal from "./Reveal";

const capabilities = [
  {
    label: "Business websites",
    detail: "Clear, responsive experiences",
  },
  {
    label: "Management systems",
    detail: "Tools for daily operations",
  },
  {
    label: "APIs & integrations",
    detail: "Connected software layers",
  },
  {
    label: "Cloud & maintenance",
    detail: "Reliable deployment and support",
  },
];

export default function CapabilityStrip() {
  return (
    <section aria-label="2Brothers Services capabilities" className="border-y border-line bg-bgSoft">
      <div className="container-page">
        <Reveal>
          <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <div key={capability.label} className="px-0 py-6 sm:px-6 sm:py-7 lg:px-7">
                <p className="font-semibold text-fg">{capability.label}</p>
                <p className="mt-1 text-sm text-fgMuted">{capability.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
