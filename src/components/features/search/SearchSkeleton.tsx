const heights = [
  'h-[220px]', 'h-[280px]', 'h-[180px]', 'h-[320px]',
  'h-[240px]', 'h-[200px]', 'h-[300px]', 'h-[260px]',
  'h-[180px]', 'h-[340px]', 'h-[220px]', 'h-[280px]',
]

export function SearchSkeleton() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-[10px]">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`${h} rounded-xl bg-[#E8E8E8] mb-[10px] break-inside-avoid animate-pulse`}
        />
      ))}
    </div>
  )
}
