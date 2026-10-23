const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.api-store.workers.dev/api/bazardor";


export async function getProducts() {

  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });


  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }


  const json = await res.json();


  // API may return the array directly
  if (Array.isArray(json)) {
    return json;
  }


  // fallback for wrapped response
  return json.data || json.products || [];
}



export async function getProduct(id) {

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store",
  });


  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }


  const json = await res.json();


  // Single-product API may return the object directly
  return json.data || json.product || json;
}