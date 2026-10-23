import Link from "next/link";


export default function ProductCard({ product }) {


  return (

    <Link
      href={`/product/${product.id}`}
      className="border rounded-xl p-5 shadow hover:shadow-lg transition"
    >


      <div className="text-5xl">
        {product.image}
      </div>



      <h2 className="text-xl font-bold mt-3">
        {product.nameBn}
      </h2>



      <p className="text-gray-500">
        প্রতি {product.unit}
      </p>



      <div className="flex justify-between items-center mt-4">



        <div>

          <p className="text-sm">
            আজকের দাম
          </p>


          <p className="text-2xl font-bold">
            {product.today} টাকা
          </p>

        </div>





        <div
          className={
            product.change?.dir === "up"
              ?
              "bg-green-100 text-green-700 px-3 py-1 rounded"
              :
              "bg-red-100 text-red-700 px-3 py-1 rounded"
          }
        >


          {
            product.change?.dir === "up"
              ?
              "▲"
              :
              "▼"
          }


          {" "}


          {product.change?.pct}%

        </div>



      </div>



    </Link>

  );

}