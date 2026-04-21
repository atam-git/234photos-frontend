const tools = [
  {
    id: 'editor',
    name: '234photos Editor',
    description:
      'Create on-brand content for social media, events and campaigns — with African templates built in.',
    cta: 'Try Editor →',
    href: '/editor',
    badge: null,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="18" height="2.5" rx="1.25" fill="#EE2B24" opacity="0.85" />
        <rect x="4" y="13.5" width="13" height="2.5" rx="1.25" fill="#EE2B24" opacity="0.85" />
        <rect x="4" y="19" width="15" height="2.5" rx="1.25" fill="#EE2B24" opacity="0.85" />
        <circle cx="25" cy="10" r="5.5" fill="#FFEAEA" />
        <rect x="22.5" y="9.25" width="5" height="1.5" rx="0.75" fill="#EE2B24" />
        <rect x="24.25" y="7.5" width="1.5" height="5" rx="0.75" fill="#EE2B24" />
      </svg>
    ),
  },
  {
    id: 'ai-generator',
    name: 'AI Image Generator',
    description:
      'Describe the African scene you need — AI generates it in seconds, commercially licensed and ready to use.',
    cta: 'Generate now →',
    href: '/ai-generator',
    badge: { label: 'NEW', color: 'bg-[#EE2B24] text-white' },
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="#FFEAEA" />
        <path
          d="M16 8l1.8 5.2H23l-4.2 3.1 1.6 5-4.4-3.2-4.4 3.2 1.6-5L9 13.2h5.2L16 8z"
          fill="#EE2B24"
        />
      </svg>
    ),
  },
  {
    id: 'bg-remover',
    name: 'Background Remover',
    description:
      'Instantly remove backgrounds from product shots, portraits and event photos with one click.',
    cta: 'Remove background →',
    href: '/background-remover',
    badge: null,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="#FFEAEA" />
        <circle cx="16" cy="16" r="8" stroke="#EE2B24" strokeWidth="1.75" fill="none" />
        <path
          d="M12 16l2.5 2.5L20 13"
          stroke="#EE2B24"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'generative-fill',
    name: 'Generative Fill',
    description:
      'Extend, reimagine or modify any image using AI — perfect for adapting visuals to local contexts.',
    cta: 'Try Generative Fill →',
    href: '/generative-fill',
    badge: { label: 'BETA', color: 'bg-[#F0F0F0] text-[#555]' },
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="7" width="22" height="18" rx="3" stroke="#EE2B24" strokeWidth="1.75" strokeDasharray="3 2" fill="#FFEAEA" />
        <circle cx="11" cy="13" r="2" fill="#EE2B24" opacity="0.7" />
        <path
          d="M5 20l6-5 4 4 3-3 9 7"
          stroke="#EE2B24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    ),
  },
]

export function CreativeTools() {
  return (
    <section className="bg-white py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-[#1A1A1A] text-[26px] md:text-[30px] font-extrabold leading-[1.2] tracking-[-0.5px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Powerful creative tools
          </h2>
          <p
            className="text-[#666] text-[14px] leading-[21px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Everything African creators and businesses need to design, edit and publish
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="relative flex flex-col gap-4 p-6 rounded-2xl border border-[#E8E8E8] bg-white hover:shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] transition-shadow duration-200"
            >
              {/* Badge */}
              {tool.badge && (
                <span
                  className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-[0.8px] px-2 py-0.5 rounded-full ${tool.badge.color}`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {tool.badge.label}
                </span>
              )}

              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center">
                {tool.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <h3
                  className="text-[#1A1A1A] text-[16px] font-bold leading-[1.35]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {tool.name}
                </h3>
                <p
                  className="text-[#666] text-[13px] leading-[20px] flex-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {tool.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href="#"
                className="text-[#EE2B24] text-[13px] font-semibold leading-[19.5px] hover:underline self-start mt-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {tool.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
