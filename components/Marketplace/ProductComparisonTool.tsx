import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { MarketplaceItem } from '../../types';

interface ProductComparisonToolProps {
  selectedProducts: MarketplaceItem[];
  onClose: () => void;
  onRemove: (productId: string) => void;
}

export default function ProductComparisonTool({ selectedProducts, onClose, onRemove }: ProductComparisonToolProps) {
  const [compareMetrics] = useState({
    price: true,
    rating: true,
    seller: true,
    category: true,
    availability: true,
    description: true
  });

  if (selectedProducts.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-xl border border-yellow-600/50 p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-white mb-2">Product Comparison</h2>
          <p className="text-gray-400 text-sm">Select 2-4 products to compare side-by-side</p>
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-black rounded-xl border border-yellow-600/50 p-6 w-full max-w-6xl my-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Product Comparison</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl transition"
          >
            ×
          </button>
        </div>

        {/* COMPARISON TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            {/* HEADER ROW - PRODUCT IMAGES & TITLES */}
            <thead>
              <tr className="border-b border-yellow-600/50">
                <th className="p-4 text-left text-white font-bold w-32 bg-white/5">Metric</th>
                {selectedProducts.map((product) => (
                  <th key={product.id} className="p-4 text-center min-w-[250px] bg-white/5 border-l border-yellow-600/30">
                    <div className="space-y-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg mx-auto"
                      />
                      <h3 className="text-white font-semibold text-sm line-clamp-2">{product.name}</h3>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="text-xs text-red-400 hover:text-red-300 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* COMPARISON ROWS */}
            <tbody>
              {/* PRICE */}
              <tr className="border-b border-white/10">
                <td className="p-4 text-white font-semibold bg-white/5">Price</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-4 text-center text-white border-l border-yellow-600/30">
                    <span className="text-lg font-bold text-yellow-400">R {product.price?.toLocaleString()}</span>
                  </td>
                ))}
              </tr>

              {/* RATING */}
              <tr className="border-b border-white/10">
                <td className="p-4 text-white font-semibold bg-white/5">Rating</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-4 text-center text-white border-l border-yellow-600/30">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-yellow-400">★</span>
                      <span className="font-bold">{product.rating || 'N/A'}</span>
                      <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* SELLER */}
              <tr className="border-b border-white/10">
                <td className="p-4 text-white font-semibold bg-white/5">Seller</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-4 text-center text-gray-300 border-l border-yellow-600/30 text-sm">
                    {product.seller || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* CATEGORY */}
              <tr className="border-b border-white/10">
                <td className="p-4 text-white font-semibold bg-white/5">Category</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-4 text-center text-gray-300 border-l border-yellow-600/30 text-sm">
                    <span className="bg-yellow-600/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category || 'N/A'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* AVAILABILITY */}
              <tr className="border-b border-white/10">
                <td className="p-4 text-white font-semibold bg-white/5">Availability</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-4 text-center border-l border-yellow-600/30">
                    <div className="flex items-center justify-center space-x-1">
                      {product.inStock ? (
                        <>
                          <Check size={16} className="text-green-400" />
                          <span className="text-green-400 text-sm font-semibold">In Stock</span>
                        </>
                      ) : (
                        <span className="text-red-400 text-sm font-semibold">Out of Stock</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* DESCRIPTION */}
              <tr className="border-b border-white/10">
                <td className="p-4 text-white font-semibold bg-white/5">Description</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-4 text-gray-300 border-l border-yellow-600/30 text-sm">
                    <p className="line-clamp-3">{product.description || 'No description available'}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* PRICING ANALYSIS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-green-600/30 rounded-lg p-4">
            <p className="text-xs text-green-400 font-semibold mb-2">💰 BEST PRICE</p>
            <p className="text-white font-bold">
              R {Math.min(...selectedProducts.map(p => p.price || Infinity)).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {selectedProducts.find(p => p.price === Math.min(...selectedProducts.map(p => p.price || Infinity)))?.name}
            </p>
          </div>

          <div className="bg-white/5 border border-yellow-600/30 rounded-lg p-4">
            <p className="text-xs text-yellow-400 font-semibold mb-2">⭐ BEST RATED</p>
            <p className="text-white font-bold">
              {Math.max(...selectedProducts.map(p => p.rating || 0))}/5
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {selectedProducts.find(p => p.rating === Math.max(...selectedProducts.map(p => p.rating || 0)))?.name}
            </p>
          </div>

          <div className="bg-white/5 border border-blue-600/30 rounded-lg p-4">
            <p className="text-xs text-blue-400 font-semibold mb-2">📊 AVERAGE PRICE</p>
            <p className="text-white font-bold">
              R {Math.round(selectedProducts.reduce((sum, p) => sum + (p.price || 0), 0) / selectedProducts.length).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {selectedProducts.length} products
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-bold transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
