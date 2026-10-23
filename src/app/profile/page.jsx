import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#f7fbf7] px-4 py-12">

      <div className="max-w-xl mx-auto">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="text-gray-500 mt-2">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>

        </div>


        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

          <div className="flex flex-col items-center text-center">

            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="w-24 h-24 rounded-full object-cover border-2 border-green-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}


            <h2 className="text-2xl font-bold mt-4">
              {user.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {user.email}
            </p>

          </div>


          <div className="border-t mt-7 pt-7 space-y-5">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

              <span className="text-gray-500">
                নাম
              </span>

              <span className="font-semibold text-gray-900">
                {user.name}
              </span>

            </div>


            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

              <span className="text-gray-500">
                ইমেইল
              </span>

              <span className="font-semibold text-gray-900 break-all">
                {user.email}
              </span>

            </div>


            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

              <span className="text-gray-500">
                ইমেইল ভেরিফাইড
              </span>

              <span className="font-semibold text-gray-900">
                {user.emailVerified ? "হ্যাঁ" : "না"}
              </span>

            </div>

          </div>


          <div className="mt-8">

            <Link
              href="/profile/update"
              className="w-full inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              তথ্য আপডেট করুন
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}