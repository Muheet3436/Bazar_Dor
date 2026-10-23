"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState("");

  const redirectPath =
    searchParams.get("redirect") || "/";

  const reason = searchParams.get("reason");


  useEffect(() => {
    if (reason === "protected") {
      toast.error(
        "এই পেজটি দেখতে আগে সাইন ইন করুন"
      );
    }
  }, [reason]);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error(
        "ইমেইল এবং পাসওয়ার্ড দিন"
      );

      return;
    }

    setLoading(true);

    try {
      const result =
        await authClient.signIn.email({
          email,
          password,
        });


      if (result.error) {
        toast.error(
          result.error.message ||
            "লগইন করা যায়নি"
        );

        return;
      }


      toast.success(
        "সফলভাবে লগইন হয়েছে"
      );


      router.push(redirectPath);
      router.refresh();

    } catch (error) {
      console.error(error);

      toast.error(
        "লগইন করার সময় সমস্যা হয়েছে"
      );

    } finally {
      setLoading(false);
    }
  }


  async function handleSocialLogin(provider) {
    try {
      setSocialLoading(provider);

      await authClient.signIn.social({
        provider,
        callbackURL: redirectPath,
      });

    } catch (error) {
      console.error(error);

      toast.error(
        `${provider} দিয়ে লগইন করা যায়নি`
      );

      setSocialLoading("");
    }
  }


  return (
    <main className="min-h-[calc(100vh-90px)] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm">

        <div className="text-center mb-7">

          <div className="text-5xl mb-3">
            🛒
          </div>

          <h1 className="text-3xl font-bold">
            সাইন ইন
          </h1>

          <p className="text-gray-500 mt-2">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              ইমেইল
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="example@email.com"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />

          </div>


          <div>

            <label className="block mb-2 font-medium">
              পাসওয়ার্ড
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="আপনার পাসওয়ার্ড"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading
              ? "অপেক্ষা করুন..."
              : "সাইন ইন"}
          </button>

        </form>


        <div className="flex items-center gap-3 my-6">

          <div className="h-px bg-gray-200 flex-1" />

          <span className="text-sm text-gray-400">
            অথবা
          </span>

          <div className="h-px bg-gray-200 flex-1" />

        </div>


        <div className="space-y-3">

          <button
            type="button"
            onClick={() =>
              handleSocialLogin("google")
            }
            disabled={Boolean(socialLoading)}
            className="w-full border rounded-lg py-3 font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            {socialLoading === "google"
              ? "অপেক্ষা করুন..."
              : "Google দিয়ে চালিয়ে যান"}
          </button>


          <button
            type="button"
            onClick={() =>
              handleSocialLogin("github")
            }
            disabled={Boolean(socialLoading)}
            className="w-full border rounded-lg py-3 font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            {socialLoading === "github"
              ? "অপেক্ষা করুন..."
              : "GitHub দিয়ে চালিয়ে যান"}
          </button>

        </div>


        <p className="text-center mt-6 text-gray-600">

          অ্যাকাউন্ট নেই?{" "}

          <Link
            href="/sign-up"
            className="text-green-600 font-semibold"
          >
            সাইন আপ
          </Link>

        </p>

      </div>

    </main>
  );
}