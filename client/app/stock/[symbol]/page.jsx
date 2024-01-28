"use client";
import { useEffect, useState } from "react";
import { AreaChart, Card, Title, Text } from "@tremor/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios from "axios";

import Chatbox from "@/components/Chatbox";

import Chat from "@/assets/icons/chat.svg";

export default function Stock() {
  const [stockData, setStockData] = useState([]);
  const [toggleChat, setToggleChat] = useState(false);
  const [stockInfo, setStockInfo] = useState({});
  const [price, setPrice] = useState(0);

  const pathname = usePathname();
  const symbol = pathname.replace("/stock/", "").toUpperCase();

  useEffect(() => {
    const fetchStockInfo = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/stock/${symbol}`);
      setStockInfo(response.data);
    };
    fetchStockInfo();
  }, [symbol]);

  useEffect(() => {
    if (!symbol) return;

    // Establish the WebSocket connection
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      ws.send(symbol); // Send symbol when connection is open
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStockData(data); // Update stock data
      setPrice(data[data.length - 1].price);
    };

    return () => {
      ws.close(); // Clean up WebSocket on component unmount
    };
  }, [symbol]); // Empty dependency array to run once on mount

  const valueFormatter = function (number) {
    return "$" + new Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div className="md:px-[4rem] px-[1rem] mt-[3rem] max-w-[1280px] mb-[4rem] w-full min-h-screen">
      {stockData.length != 0 ? (
        <>
          <div className="mb-[1rem]">
            <div className="font-bold text-[24px] text-[#1E293B]">
              {stockInfo.shortName}
            </div>
            <div className="font-bold text-[36px] bg-gradient-to-r from-[#2865EC] to-[#5EA4F9] bg-clip-text text-transparent inline">
              {valueFormatter(price)}
            </div>
          </div>

          <Card>
            <AreaChart
              className="h-72 mt-4"
              data={stockData}
              index="date"
              yAxisWidth={65}
              categories={["price"]}
              colors={["blue"]}
              valueFormatter={valueFormatter}
            />
          </Card>

          <Card
            className="flex flex-col gap-[1rem] mt-[2rem] px-[2rem] py-[3rem]"
            decoration="top"
            decorationColor="blue"
          >
            <div>
              <div className="text-[24px] text-[#1E293] font-semibold">
                Stock Sentiment
              </div>
              <div className="bg-gradient-to-r from-[#2865EC] to-[#5EA4F9] bg-clip-text text-transparent inline font-bold text-[36px]">
                HIGH GROWTH
              </div>
            </div>

            <div className="text-[#696969]">
              Our model is 95% certain that the overall mood on {symbol} is very
              positive. Since the beta of this company is 1.75, it is not very
              volatile. Given that the market is bullish, our model expects high
              growth.
            </div>
          </Card>

          <Card
            className="flex flex-col gap-[1rem] mt-[2rem] px-[2rem] py-[3rem]"
            decoration="top"
            decorationColor="blue"
          >
            <div>
              <div className="text-[24px] text-[#1E293] font-semibold">
                Risk Value
              </div>
              <div className="bg-gradient-to-r from-[#2865EC] to-[#5EA4F9] bg-clip-text text-transparent inline font-bold text-[36px]">
                {stockInfo.overallRisk}
              </div>
            </div>
          </Card>

          <Card
            className="flex flex-col gap-[1rem] mt-[2rem] px-[2rem] py-[3rem]"
            decoration="top"
            decorationColor="blue"
          >
            <div className="text-[24px] text-[#1E293] font-semibold">About</div>
            <div className="text-[#696969]">Website</div>
            <div>{stockInfo.website}</div>
            <div className="text-[#696969]">Employees</div>
            <div>{stockInfo.fullTimeEmployees}</div>
            <div className="text-[#696969]">Headquarters</div>
            <div>
              {stockInfo.city}, {stockInfo.state}
            </div>
            <div className="text-[#696969]">Symbol</div>
            <div>{stockInfo.symbol}</div>
          </Card>

          <div
            className={`bg-[#2865EC] w-[50px] h-[50px] rounded-full flex justify-center items-center fixed bottom-[1.5rem] right-[1.5rem] cursor-pointer`}
            onClick={() => setToggleChat(!toggleChat)}
          >
            <Image src={Chat} quality={100} alt="chat-icon" />
          </div>
          <div className={toggleChat ? "block" : "hidden"}>
            <Chatbox
              toggleChat={toggleChat}
              setToggleChat={setToggleChat}
              stockInfo={stockInfo}
            />
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <div className="dot-windmill"></div>
        </div>
      )}
    </div>
  );
}
