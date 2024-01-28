"use client";
import { useEffect, useState } from "react";
import { AreaChart, Card, Title } from "@tremor/react";
import Image from "next/image";

import Chatbox from "@/components/Chatbox";

import Chat from "@/assets/icons/chat.svg";

export default function Stock() {
  const [ws, setWs] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState([]);
  const [toggleChat, setToggleChat] = useState(false);

  useEffect(() => {
    // Establish the WebSocket connection
    const newWebSocket = new WebSocket("ws://localhost:8000/ws");

    newWebSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStockData(data); // Update stock data
    };

    setWs(newWebSocket);

    return () => {
      newWebSocket.close(); // Clean up WebSocket on component unmount
    };
  }, []); // Empty dependency array to run once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ws && symbol) {
      ws.send(symbol); // Send the symbol only on form submission
    }
  };

  const valueFormatter = function (number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div>
      <div>Enter stock symbol:</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border"
        />
        <button type="submit" className="border">
          enter
        </button>
      </form>

      <Card>
        <Title>Stock Data</Title>
        <AreaChart
          className="h-72 mt-4"
          data={stockData}
          index="date"
          yAxisWidth={65}
          categories={["price"]}
          colors={["indigo"]}
          valueFormatter={valueFormatter}
        />
      </Card>

      <div
        className={`bg-[#2865EC] w-[50px] h-[50px] rounded-full flex justify-center items-center fixed bottom-[1.5rem] right-[1.5rem] cursor-pointer`}
        onClick={() => setToggleChat(!toggleChat)}
      >
        <Image src={Chat} quality={100} alt="chat-icon" />
      </div>

      {toggleChat && <Chatbox />}
    </div>
  );
}
