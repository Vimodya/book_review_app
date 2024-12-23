// app/page.tsx
import Link from "next/link"; // Import the Link component
import Navbar from "@/components/NavBar";
import ImageSlider from "./home/components/ImageSlider";
import ReviewCard from "@/components/ReviewCard";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center mt-10">
        <Link href="/auth">
          <button className="bg-[#a58a72] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#52311b] transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
