"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম দিন");
      return;
    }

    if (!email) {
      toast.error("আপনার ইমেইল দিন");
      return;
    }

    if (password.length < 8) {
      toast.error(
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
      );
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            "রেজিস্ট্রেশন করা যায়নি"
        );

        return;
      }

      toast.success(
        "রেজিস্ট্রেশন সফল হয়েছে"
      );

      router.push("/sign-in");

    } catch (error) {
      console.error(error);

      toast.error(
        "রেজিস্ট্রেশনের সময় সমস্যা হয়েছে"
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
        callbackURL: "/",
      });

    } catch (error) {
      console.error(error);

      toast.error(
        `${provider} দিয়ে সাইন আপ করা যায়নি`
      );

      setSocialLoading("");
    }
  }

  return (
    <main className="min-h-[calc(100vh-90px)] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md border rounded-2xl p-8 shadow-sm bg-white">

        <div className="text-center mb-7">

          <div className="text-5xl mb-3">
            🛒
          </div>

          <h1 className="text-3xl font-bold">
            সাইন আপ
          </h1>

          <p className="text-gray-500 mt-2">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              নাম
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="আপনার নাম"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />

          </div>


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
              minLength={8}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Minimum 8 characters"
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
              : "সাইন আপ"}
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
              : "G Google দিয়ে চালিয়ে যান"}
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

          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}

          <Link
            href="/sign-in"
            className="text-green-600 font-semibold"
          >
            সাইন ইন
          </Link>

        </p>

      </div>

    </main>
  );
}