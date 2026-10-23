"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }

    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("শুধু ছবি নির্বাচন করুন");
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("ছবির সাইজ 500 KB এর কম রাখুন");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.onerror = () => {
      toast.error("ছবি লোড করা যায়নি");
    };

    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImage("");
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        image: image || null,
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            "তথ্য আপডেট করা যায়নি"
        );

        return;
      }

      toast.success(
        "প্রোফাইল সফলভাবে আপডেট হয়েছে"
      );

      router.push("/profile");
      router.refresh();

    } catch (error) {
      console.error(error);

      toast.error(
        "আপডেট করার সময় সমস্যা হয়েছে"
      );

    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <main className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <p className="text-gray-500">
          Loading...
        </p>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#f7fbf7] px-4 py-12">

      <div className="max-w-xl mx-auto">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            তথ্য আপডেট করুন
          </h1>

          <p className="text-gray-500 mt-2">
            নাম এবং প্রোফাইল ছবি পরিবর্তন করুন
          </p>

        </div>


        <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8">

          <div className="flex flex-col items-center mb-8">

            {image ? (
              <img
                src={image}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-green-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-3xl font-bold">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}


            <label
              htmlFor="profileImage"
              className="mt-4 cursor-pointer bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg font-semibold hover:bg-green-100"
            >
              ছবি নির্বাচন করুন
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />


            {image && (
              <button
                type="button"
                onClick={removeImage}
                className="mt-3 text-sm text-red-500 hover:text-red-600"
              >
                ছবি সরিয়ে ফেলুন
              </button>
            )}


            <p className="text-xs text-gray-400 mt-3">
              JPG, PNG বা অন্য image file — সর্বোচ্চ 500 KB
            </p>

          </div>


          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >

            <div>

              <label className="block font-medium mb-2">
                নাম
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="আপনার নাম"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>


            <div>

              <label className="block font-medium mb-2">
                ইমেইল
              </label>

              <input
                type="email"
                value={session.user.email}
                disabled
                className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
              />

              <p className="text-xs text-gray-500 mt-2">
                ইমেইল পরিবর্তন করা যাবে না।
              </p>

            </div>


            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading
                  ? "আপডেট হচ্ছে..."
                  : "Update Information"}
              </button>


              <Link
                href="/profile"
                className="flex-1 border px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-50"
              >
                বাতিল
              </Link>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}