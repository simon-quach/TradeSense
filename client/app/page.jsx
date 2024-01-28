'use client';
import SearchBar from "@/components/SearchBar";

const Home = () => {
  return (
    <div class="absolute inset-0 flex flex-col justify-center items-center mb-24">
      <p className="cursor-default text-center font-bold text-7xl">
        Risk Analysis With <br/>
        <span className="font-signature ml-2 inline-block bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent font-bold p-3">TradeSense</span>
      </p>
      <p className="cursor-default text- text-black font-normal">Navigating Market Risks With Confidence</p>
      <div className="drop-shadow-md hover:scale-105 mt-10 w-1/2 max-w-2x6 bg-slate-100 h-10 rounded-md">
        <SearchBar/>
      </div>
      <p className="cursor-default mt-10 text-gray-500 text-center">
        By harnessing the power of Machine Learning (ML) and comprehensive<br/> 
        sentiment analysis, TradeSense offers an unparalleled level of insight into<br/> 
        the potential risks associated with any selected stock.
      </p>
    </div>
  );
};

export default Home;
