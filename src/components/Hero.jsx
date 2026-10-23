import Image from "next/image";

export default function Hero() {
  const banglaDate =
    new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

  return (
    <section className="bg-[#f4f8f4] py-8 md:py-10">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="bg-white border border-gray-200 rounded-[28px] px-6 md:px-10 lg:px-12 py-8 md:py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-5">

                {banglaDate}

              </div>


              <h1 className="text-4xl sm:text-5xl lg:text-[54px] leading-[1.15] font-bold text-gray-900 max-w-2xl">

                আজকের বাজারের দাম এক নজরে

              </h1>


              <p className="text-gray-500 text-base md:text-lg leading-8 mt-6 max-w-2xl">

                চাল, ডাল, তেল, সবজি, মাছ,
                মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তারিত, গড়,
                সর্বনিম্ন-সর্বাধিক এবং দামের
                পরিবর্তন এক জায়গায়।

              </p>


              <a
                href="#সব-পণ্য"
                className="inline-flex mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3.5 rounded-lg shadow-sm transition"
              >
                সব পণ্য দেখুন
              </a>

            </div>


            {/* RIGHT */}

            <div className="flex justify-center md:justify-end">

              <Image
                src="/assets/bazar-hero.png"
                alt="Bazar Dor market basket"
                width={360}
                height={300}
                priority
                className="w-full max-w-[310px] md:max-w-[340px] object-contain"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}