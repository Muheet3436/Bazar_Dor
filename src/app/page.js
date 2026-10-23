import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Number(b.change?.pct || 0) -
        Number(a.change?.pct || 0)
    )
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct || 0)) -
        Math.abs(Number(a.change?.pct || 0))
    )
    .slice(0, 6);

  return (
    <>
      <Hero />

      <main className="max-w-7xl mx-auto px-5 py-12">

        {/* TOP RISERS */}

        <section className="mb-16">

          <div className="mb-8">

            <div className="flex items-center gap-3">

              <h2 className="text-3xl md:text-4xl font-bold">
                আজ দাম বেড়েছে
              </h2>

              <span className="text-green-600 text-3xl">
                ▲
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
            </p>

          </div>


          {risers.length === 0 ? (

            <p className="text-gray-500">
              আজ কোনো পণ্যের দাম বাড়েনি।
            </p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {risers.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          )}

        </section>


        {/* TOP FALLERS */}

        <section className="mb-16">

          <div className="mb-8">

            <div className="flex items-center gap-3">

              <h2 className="text-3xl md:text-4xl font-bold">
                আজ দাম কমেছে
              </h2>

              <span className="text-red-600 text-3xl">
                ▼
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
            </p>

          </div>


          {fallers.length === 0 ? (

            <p className="text-gray-500">
              আজ কোনো পণ্যের দাম কমেনি।
            </p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {fallers.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          )}

        </section>


        {/* ALL PRODUCTS */}

        <section id="সব-পণ্য">

          <div className="mb-8">

            <h2 className="text-3xl md:text-4xl font-bold">
              সব পণ্য
            </h2>

            <p className="text-gray-500 mt-2">
              প্রয়োজনীয় সকল পণ্যের আজকের বাজারদর
            </p>

          </div>


          {products.length === 0 ? (

            <p className="text-gray-500">
              কোনো পণ্য পাওয়া যায়নি।
            </p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          )}

        </section>

      </main>
    </>
  );
}