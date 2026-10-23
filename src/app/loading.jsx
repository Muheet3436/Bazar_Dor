export default function HomeLoading() {
  return (
    <main>

      <section className="bg-green-50">
        <div className="max-w-7xl mx-auto px-5 py-12 md:py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-pulse">

            <div>
              <div className="h-8 bg-gray-200 rounded w-48 mb-5" />

              <div className="h-12 bg-gray-200 rounded w-full max-w-lg mb-4" />

              <div className="h-12 bg-gray-200 rounded w-3/4 max-w-md mb-5" />

              <div className="h-5 bg-gray-200 rounded w-full max-w-lg mb-3" />

              <div className="h-5 bg-gray-200 rounded w-2/3 max-w-md mb-6" />

              <div className="h-12 bg-gray-200 rounded w-36" />
            </div>


            <div className="flex justify-center">
              <div className="w-full max-w-md h-72 bg-gray-200 rounded-2xl" />
            </div>

          </div>

        </div>
      </section>


      <section className="max-w-7xl mx-auto px-5 py-12 animate-pulse">

        <div className="mb-8">
          <div className="h-9 bg-gray-200 rounded w-56 mb-3" />
          <div className="h-5 bg-gray-200 rounded w-72" />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-xl p-5"
            >
              <div className="h-12 w-12 bg-gray-200 rounded mb-5" />

              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />

              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />

              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

              <div className="flex justify-between">

                <div className="h-7 bg-gray-200 rounded w-24" />

                <div className="h-7 bg-gray-200 rounded w-16" />

              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}