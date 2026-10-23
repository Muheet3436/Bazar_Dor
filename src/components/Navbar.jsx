"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import PriceTicker from "@/components/PriceTicker";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

const categories = [
  {
    slug: "chal",
    name: "চাল",
    icon: "🍚",
  },
  {
    slug: "dal",
    name: "ডাল",
    icon: "🫘",
  },
  {
    slug: "tel",
    name: "তেল",
    icon: "🛢️",
  },
  {
    slug: "sobji",
    name: "সবজি",
    icon: "🥬",
  },
  {
    slug: "mach",
    name: "মাছ",
    icon: "🐟",
  },
  {
    slug: "mangsho",
    name: "মাংস",
    icon: "🍗",
  },
  {
    slug: "dim-dudh",
    name: "ডিম-দুধ",
    icon: "🥛",
  },
  {
    slug: "moshla",
    name: "মসলা",
    icon: "🌶️",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const { data: session, isPending } =
    authClient.useSession();

  const [products, setProducts] = useState([]);
  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          `${API_URL}/products`
        );

        const json = await response.json();

        const productData = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : [];

        setProducts(productData);
      } catch (error) {
        console.error(
          "Navbar product loading error:",
          error
        );
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function handleLogout() {
    try {
      setProfileOpen(false);

      await authClient.signOut();

      toast.success(
        "সফলভাবে সাইন আউট হয়েছে"
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      toast.error(
        "সাইন আউট করা যায়নি"
      );
    }
  }

  function getBanglaDate() {
    return new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }

  return (
    <header className="sticky top-0 z-50 bg-white">

      <div className="relative z-50 border-b bg-white">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="flex items-center justify-between py-4">

            <Link
              href="/"
              className="flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">

                <Image
                  src="/assets/logo-icon.png"
                  alt="Bazar Dor"
                  width={30}
                  height={30}
                  className="object-contain"
                />

              </div>

              <div>

                <h1 className="text-2xl font-bold leading-none text-gray-900">
                  বাজার দর
                </h1>

                <p className="text-xs text-gray-500 mt-2">
                  {getBanglaDate()}
                </p>

              </div>

            </Link>


            {!isPending && !session && (
              <div className="flex items-center gap-3">

                <Link
                  href="/sign-in"
                  className="border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700"
                >
                  সাইন আপ
                </Link>

              </div>
            )}


            {!isPending && session && (
              <div
                ref={profileRef}
                className="relative z-[100]"
              >

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(
                      (previous) => !previous
                    )
                  }
                  className="flex items-center gap-3"
                >

                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={
                        session.user.name ||
                        "Profile"
                      }
                      className="w-11 h-11 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                      {session.user?.name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "U"}
                    </div>
                  )}

                  <span className="font-medium text-gray-800 hidden sm:block">
                    {session.user?.name}
                  </span>

                  <span className="text-gray-500 text-xs">
                    ▼
                  </span>

                </button>


                {profileOpen && (
                  <div className="absolute right-0 top-[56px] z-[999] w-52 bg-white border rounded-xl shadow-xl overflow-hidden">

                    <Link
                      href="/profile"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="block px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      👤 আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      ↩ সাইন আউট
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>


      <div className="relative z-20 border-b bg-white">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <nav className="flex items-center gap-7 overflow-x-auto py-4">

            {categories.map((category) => {
              const href =
                `/category/${category.slug}`;

              const active =
                pathname === href;

              return (
                <Link
                  key={category.slug}
                  href={href}
                  className={
                    active
                      ? "flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-green-600"
                      : "flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-600"
                  }
                >
                  <span>
                    {category.icon}
                  </span>

                  {category.name}
                </Link>
              );
            })}

          </nav>

        </div>

      </div>


      <div className="relative z-10">
        <PriceTicker products={products} />
      </div>

    </header>
  );
}