import { STATS } from '@/lib/mock'

export function StatsBar() {
  return (
    <section className="bg-white border-t border-[#F0F0F0]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-wrap">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="flex-1 min-w-[140px] flex flex-col items-center justify-center gap-1 py-8 px-3 relative"
            >
              {index > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[#EBEBEB]" />
              )}
              <span className="text-[#EE2B24] text-[32px] font-bold leading-none tracking-[-0.5px]">
                {stat.value}
              </span>
              <span className="text-[#999] text-[13px] font-normal leading-[1.35] text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
