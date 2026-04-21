import { AssetCard, Asset } from './AssetCard'

interface MasonryGridProps {
  assets: Asset[]
  onAssetClick?: (asset: Asset) => void
  onDownload?: (asset: Asset) => void
  onSaveToBoard?: (asset: Asset) => void
  onLike?: (asset: Asset) => void
}

export function MasonryGrid({ assets, onAssetClick, onDownload, onSaveToBoard, onLike }: MasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-[10px]">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onClick={onAssetClick}
          onDownload={onDownload}
          onSaveToBoard={onSaveToBoard}
          onLike={onLike}
        />
      ))}
    </div>
  )
}
