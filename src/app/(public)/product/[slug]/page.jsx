import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

function toBanglaNumber(value) {
  return Number(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/sign-in?reason=protected&redirect=/product/${slug}`
    );
  }

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets || [];

  const minimumPrice =
    markets.length > 0
      ? Math.min(
          ...markets.map((market) =>
            Number(market.min || 0)
          )
        )
      : Number(product.today || 0);

  const maximumPrice =
    markets.length > 0
      ? Math.max(
          ...markets.map((market) =>
            Number(market.max || 0)
          )
        )
      : Number(product.today || 0);

  const averagePrice =
    markets.length > 0
      ? (
          markets.reduce((total, market) => {
            const min = Number(market.min || 0);
            const max = Number(market.max || 0);

            return total + (min + max) / 2;
          }, 0) / markets.length
        ).toFixed(2)
      : Number(product.today || 0);

  const yesterday = Number(product.yesterday || 0);

  const priceDifference =
    Number(product.today || 0) - yesterday;

  return (
    <main className="bg-[#f4f8f4] min-h-screen py-8">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">

          <Link
            href="/"
            className="hover:text-green-600"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-900">
            {product.nameBn}
          </span>

        </div>


        {/* PRODUCT SUMMARY */}

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="flex items-center gap-5">

              <div className="w-24 h-24 rounded-2xl bg-[#f4f8f4] flex items-center justify-center text-6xl">
                {product.image || "🛒"}
              </div>


              <div>

                <h1 className="text-3xl md:text-4xl font-bold">
                  {product.nameBn}
                </h1>


                <p className="text-gray-500 mt-2">
                  প্রতি {product.unit} · {product.categoryNameBn}
                </p>


                <p className="text-gray-700 mt-3">

                  গতকালের তুলনায় আজ দাম{" "}

                  <span className="font-semibold">
                    {priceDifference > 0
                      ? "বেড়েছে"
                      : priceDifference < 0
                      ? "কমেছে"
                      : "অপরিবর্তিত"}
                  </span>

                  {priceDifference !== 0 && (
                    <>
                      {" · "}
                      {toBanglaNumber(
                        Math.abs(priceDifference)
                      )}{" "}
                      টাকা
                    </>
                  )}

                </p>

              </div>

            </div>


            <div className="bg-[#f4f8f4] rounded-2xl px-8 py-5 text-center min-w-[150px]">

              <p className="text-gray-500">
                আজকের দাম
              </p>

              <p className="text-4xl font-bold mt-1">
                {toBanglaNumber(product.today)}
              </p>

              <p className="text-gray-500 mt-1">
                টাকা / {product.unit}
              </p>


              <p
                className={
                  product.change?.dir === "up"
                    ? "text-red-500 font-semibold mt-2"
                    : product.change?.dir === "down"
                    ? "text-green-600 font-semibold mt-2"
                    : "text-gray-500 font-semibold mt-2"
                }
              >

                {product.change?.dir === "up"
                  ? "▲"
                  : product.change?.dir === "down"
                  ? "▼"
                  : "—"}{" "}

                {toBanglaNumber(
                  product.change?.pct || 0
                )}%

              </p>

            </div>

          </div>

        </section>


        {/* PRICE SUMMARY */}

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            দামের সারসংক্ষেপ
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="border rounded-xl p-6">

              <p className="text-gray-600">
                সর্বনিম্ন দাম
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {toBanglaNumber(minimumPrice)}{" "}
                <span className="text-lg">
                  টাকা
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-2">
                সবচেয়ে কম দামের বাজার
              </p>

            </div>


            <div className="border rounded-xl p-6">

              <p className="text-gray-600">
                সর্বাধিক দাম
              </p>

              <p className="text-3xl font-bold text-red-500 mt-2">
                {toBanglaNumber(maximumPrice)}{" "}
                <span className="text-lg">
                  টাকা
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-2">
                সবচেয়ে বেশি দামের বাজার
              </p>

            </div>


            <div className="border rounded-xl p-6">

              <p className="text-gray-600">
                গড় দাম
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {toBanglaNumber(averagePrice)}{" "}
                <span className="text-lg">
                  টাকা
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-2">
                প্রতি {product.unit}-এর হিসাবে
              </p>

            </div>

          </div>


          {/* MARKET TABLE */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-5">
              বাজারভিত্তিক আজকের দাম
            </h2>


            {markets.length === 0 ? (

              <p className="text-gray-500">
                বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>

            ) : (

              <div className="overflow-x-auto border border-gray-200 rounded-2xl">

                <table className="w-full min-w-[800px] border-collapse">

                  <thead>

                    <tr className="bg-white text-gray-500">

                      <th className="text-left px-5 py-4 font-semibold">
                        বাজার
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        বিভাগ
                      </th>

                      <th className="text-right px-5 py-4 font-semibold">
                        সর্বনিম্ন
                      </th>

                      <th className="text-right px-5 py-4 font-semibold">
                        সর্বাধিক
                      </th>

                      <th className="text-right px-5 py-4 font-semibold">
                        গড়
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {markets.map((market, index) => {

                      const rowAverage =
                        (
                          Number(market.min || 0) +
                          Number(market.max || 0)
                        ) / 2;

                      return (

                        <tr
                          key={`${market.market}-${index}`}
                          className={
                            index % 2 === 0
                              ? "bg-white border-t"
                              : "bg-[#f4f8f4] border-t"
                          }
                        >

                          <td className="px-5 py-4 font-medium">
                            {market.market}
                          </td>

                          <td className="px-5 py-4">
                            {market.division}
                          </td>

                          <td className="px-5 py-4 text-right">
                            {toBanglaNumber(
                              market.min
                            )}{" "}
                            টাকা
                          </td>

                          <td className="px-5 py-4 text-right">
                            {toBanglaNumber(
                              market.max
                            )}{" "}
                            টাকা
                          </td>

                          <td className="px-5 py-4 text-right font-bold">
                            {toBanglaNumber(
                              rowAverage
                            )}{" "}
                            টাকা
                          </td>

                        </tr>

                      );
                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}