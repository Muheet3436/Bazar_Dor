"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function CategoryProducts({ products }) {
  const [sortType, setSortType] = useState("default");

  const sortedProducts = useMemo(() => {
    const copiedProducts = [...products];

    if (sortType === "low") {
      return copiedProducts.sort(
        (a, b) =>
          Number(a.today || 0) -
          Number(b.today || 0)
      );
    }

    if (sortType === "high") {
      return copiedProducts.sort(
        (a, b) =>
          Number(b.today || 0) -
          Number(a.today || 0)
      );
    }

    return copiedProducts;
  }, [products, sortType]);

  return (
    <section>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-2xl font-bold">
            পণ্যসমূহ
          </h2>

          <p className="text-gray-500 mt-1">
            মোট {products.length} টি পণ্য
          </p>
        </div>


        <div className="flex items-center gap-3">

          <label
            htmlFor="sort"
            className="font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="sort"
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value)
            }
            className="border rounded-lg px-4 py-2.5 bg-white outline-none focus:border-green-600"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low">
              দাম: কম থেকে বেশি
            </option>

            <option value="high">
              দাম: বেশি থেকে কম
            </option>
          </select>

        </div>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {sortedProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}