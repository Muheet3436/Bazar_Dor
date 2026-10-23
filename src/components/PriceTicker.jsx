"use client";

export default function PriceTicker({ products = [] }) {
  if (!products.length) {
    return null;
  }

  const tickerItems = [...products, ...products];

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {tickerItems.map((product, index) => {
          const direction = product.change?.dir;
          const percentage = product.change?.pct ?? 0;

          return (
            <div
              key={`${product.id}-${index}`}
              className="ticker-item"
            >
              <span className="text-xl">
                {product.image || "🛒"}
              </span>

              <span className="font-semibold">
                {product.nameBn}
              </span>

              <span className="text-sm">
                {product.today} টাকা/{product.unit}
              </span>

              <span
                className={
                  direction === "up"
                    ? "text-green-600 font-semibold"
                    : direction === "down"
                    ? "text-red-600 font-semibold"
                    : "text-gray-500 font-semibold"
                }
              >
                {direction === "up"
                  ? "▲"
                  : direction === "down"
                  ? "▼"
                  : "—"}{" "}
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}