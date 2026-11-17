import { Bookmark, ArrowUpRight } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { FabricListing } from '../types/marketplace';
import { FabricImage } from './FabricImage';

interface FabricCardProps {
  fabric: FabricListing;
}

export function FabricCard({ fabric }: FabricCardProps) {
  const { navigate, savedFabricIds, toggleSavedFabric, addToCart } =
    useMarketplace();
  const isSaved = savedFabricIds.includes(fabric.id);

  return (
    <article className="group bg-white rounded-xl border border-[#0F1F3D]/10 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md flex flex-col">
      <div className="relative aspect-[4/3] bg-[#F3EDE2] overflow-hidden">
        <button
          type="button"
          onClick={() => navigate('product-detail', { fabricId: fabric.id })}
          className="block w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1B4D3E]"
          aria-label={`View specifications for ${fabric.name}`}
        >
          <FabricImage
            src={fabric.imageUrl}
            alt={`${fabric.name} fabric from ${fabric.cluster}`}
            fallbackTitle={fabric.name}
            className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSavedFabric(fabric.id);
          }}
          aria-label={isSaved ? 'Remove from saved swatches' : 'Save swatch'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer border ${
            isSaved
              ? 'bg-[#1B4D3E] text-white border-[#1B4D3E]'
              : 'bg-white/90 text-[#0F1F3D] border-[#0F1F3D]/15 hover:bg-white'
          }`}
        >
          <Bookmark
            className="w-4 h-4"
            fill={isSaved ? 'currentColor' : 'none'}
            strokeWidth={1.75}
          />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Unboxed clean metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-[#435066] mb-1.5 truncate">
            <span>{fabric.type}</span>
            <span aria-hidden="true">·</span>
            <span>{fabric.cluster}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{fabric.gsm} GSM</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('product-detail', { fabricId: fabric.id })}
            className="text-left w-full cursor-pointer group/title"
          >
            <h3 className="font-display text-lg font-semibold text-[#0F1F3D] leading-snug group-hover/title:text-[#1B4D3E] transition-colors line-clamp-2">
              {fabric.name}
            </h3>
          </button>

          <p className="text-xs text-[#435066] mt-1 truncate">
            {fabric.supplierName}
          </p>
        </div>

        <div className="pt-3 border-t border-[#0F1F3D]/8 flex items-center justify-between gap-3">
          <div>
            <p className="text-base font-semibold text-[#0F1F3D] tabular-nums">
              ₹{fabric.pricePerMeter.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-[#435066]"> / meter</span>
            </p>
            <p className="text-xs text-[#435066] tabular-nums">
              MOQ {fabric.moqMeters}m · {fabric.color}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => addToCart(fabric.id, fabric.moqMeters)}
              className="px-3 py-2 text-xs font-medium text-[#1B4D3E] border border-[#1B4D3E]/30 hover:bg-[#1B4D3E] hover:text-white rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              Add MOQ
            </button>
            <button
              type="button"
              onClick={() => navigate('product-detail', { fabricId: fabric.id })}
              aria-label={`Open ${fabric.name} details`}
              className="w-8 h-8 rounded-lg bg-[#F3EDE2] hover:bg-[#0F1F3D] text-[#0F1F3D] hover:text-white flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
