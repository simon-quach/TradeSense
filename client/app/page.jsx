"use client";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[6rem] px-[1rem]">
      <p className="cursor-default text-center font-bold text-7xl">
        Risk Analysis With <br />
        <span className="font-signature ml-2 inline-block bg-gradient-to-r from-[#2865EC] to-[#5EA4F9] bg-clip-text text-transparent font-bold p-3">
          TradeSense
        </span>
      </p>
      <p className="cursor-default text- text-black font-normal">
        Navigating Market Risks With Confidence
      </p>
      <div className="mt-10 w-full max-w-2x6 bg-white h-[4rem] shadow-[0_0_16px_rgba(40,101,236,0.1)] rounded-[8px]">
        <SearchBar />
      </div>
      <p className="cursor-default mt-10 text-gray-500 text-center">
        By harnessing the power of Machine Learning (ML) and comprehensive
        <br />
        sentiment analysis, TradeSense offers an unparalleled level of insight
        into
        <br />
        the potential risks associated with any selected stock.
      </p>
    </div>
  );
};

export default Home;
