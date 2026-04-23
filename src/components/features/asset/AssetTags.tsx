interface AssetTagsProps {
  tags?: string[]
}

export function AssetTags({ tags = [] }: AssetTagsProps) {
  if (tags.length === 0) return null
  
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <a
          key={tag}
          href={`/search?q=${encodeURIComponent(tag)}`}
          className="px-3 py-1 bg-[#F5F5F7] text-[#444] text-[12px] font-medium rounded-full hover:bg-[#EBEBEB] hover:text-[#111] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          {tag}
        </a>
      ))}
    </div>
  )
}
