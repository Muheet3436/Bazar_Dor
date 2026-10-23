import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const allProducts = await getProducts();

  const currentSlug = String(slug)
    .trim()
    .toLowerCase();

  const products = allProducts.filter((product) => {
    const productCategory = String(
      product.category || ""
    )
      .trim()
      .toLowerCase();

    return productCategory === currentSlug;
  });

  if (products.length === 0) {
    notFound();
  }

  const firstProduct = products[0];

  const categoryName =
    firstProduct.categoryNameBn ||
    firstProduct.category ||
    slug;

  const categoryIcon =
    firstProduct.categoryIcon ||
    firstProduct.image ||
    "🛒";

  return (
    <main className="min-h-screen bg-[#f4f8f4] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <section className="mb-8">
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-white border flex items-center justify-center text-3xl">
              {categoryIcon}
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {categoryName}
              </h1>

              <p className="text-gray-500 mt-2">
                মোট {products.length} টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>

          </div>
        </section>

        <CategoryProducts products={products} />

      </div>
    </main>
  );
}