import Navbar from "@/components/NavBar";
import ImageSlider from "./home/components/ImageSlider";
import ReviewCard from "@/components/ReviewCard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-between w-full">
        {/* Left Section */}
        <div className="w-1/2 h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#a58a72]">
              Welcome to our store
            </h1>
            <p className="text-lg mt-4 mt-12">
              Discover the best products from our store
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-full">
          <ImageSlider />
        </div>
      </div>
      <div className="flex justify-center font-bold text-2xl mt-12 text-[#a58a72]">
        Browse a Book to read
      </div>
      <div className="flex flex-wrap justify-around w-full mt-12 mx-8 gap-x-4 gap-y-8">
        <ReviewCard
          image="/images/1.jpg" // Replace with your image URL
          title="Zero to One"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          author="Peter Thiel"
          submitted="2 days ago"
        />
        <ReviewCard
          image="/images/1.jpg" // Replace with your image URL
          title="Zero to One"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          author="Peter Thiel"
          submitted="2 days ago"
        />
        <ReviewCard
          image="/images/1.jpg" // Replace with your image URL
          title="Zero to One"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          author="Peter Thiel"
          submitted="2 days ago"
        />
        <ReviewCard
          image="/images/1.jpg" // Replace with your image URL
          title="Zero to One"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          author="Peter Thiel"
          submitted="2 days ago"
        />
        <ReviewCard
          image="/images/1.jpg" // Replace with your image URL
          title="Zero to One"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          author="Peter Thiel"
          submitted="2 days ago"
        />
      </div>
    </div>
  );
}
