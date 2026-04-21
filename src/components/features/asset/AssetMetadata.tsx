interface MetaRow {
  label: string
  value: string
}

interface AssetMetadataProps {
  rows: MetaRow[]
}

export function AssetMetadata({ rows }: AssetMetadataProps) {
  return (
    <div className="flex flex-col divide-y divide-[#F0F0F0]">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex items-center justify-between py-2.5">
          <span
            className="text-[12.5px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {label}
          </span>
          <span
            className="text-[12.5px] font-semibold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}
