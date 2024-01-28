from fastapi import APIRouter, WebSocket
from dotenv import load_dotenv
import os
import asyncio
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

router = APIRouter()

client = OpenAI(
    organization="org-Fk56Pol0i7pW7x9Ep8lbv7e0",
    api_key=os.getenv("OPENAI_API_KEY"),
)


async def call_openai_api(prompt: str, symbol: str, stockInfo: str):
    user_prompt = f"""The symbol we are looking at is {symbol}. Stock information: {stockInfo}

    User prompt:
    ###
     {prompt}
    ###
    
    """
    print(user_prompt)
    system_message = """You are a knowledgeable financial assistant that will assist the user with specific inquiries about Stocker Tickers. You will provide a comprehensive yet concise answer regarding user inquiries of the stock. Be very conversational and friendly.
    
    Example:
    ###
    User inputted: What is the current price of AAPL?
    System response: The current price of AAPL is $127.45.
    ###
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": system_message,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
    )
    return response.choices[0].message.content


class GenerateRequest(BaseModel):
    prompt: str
    symbol: str
    stockInfo: str


@router.post("/generate")
async def generate_text(request: GenerateRequest):
    print(request.stockInfo)
    try:
        response = await call_openai_api(
            request.prompt, request.symbol, request.stockInfo
        )
        return response
    except Exception as e:
        print(e)
