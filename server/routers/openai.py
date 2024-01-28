from fastapi import APIRouter, WebSocket
from dotenv import load_dotenv
import os
import asyncio
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

router = APIRouter()

client = OpenAI(
    organization="org-Fk56Pol0i7pW7x9Ep8lbv7e0"
)


async def call_openai_api(prompt: str):
    prompt_form = '''
    Sample User Input Prompt: Can you tell me about AAPL?

    Output:
    AAPL is the ticker symbol for Apple Inc., a leading technology company listed primarily on the NASDAQ stock exchange. 
    It's widely traded with high liquidity and significant market impact, often influencing broader market indices. 
    Apple's stock is known for its history of dividends, share buybacks, and extensive analyst coverage. 
    Overall, AAPL represents one of the world's most valuable and influential companies in the technology sector.
    '''
    response = client.chat.completions.create(

        model="gpt-3.5-turbo",
        stream=True,
        messages=[
            {
                "role": "system",
                "content": "You are a ChatBot that will assist the user with specific inquiries about Stocker Tickers. You will provide a comprehensive yet concise answer regarding user inquiries of the stock.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )
    answer = ''
    for chunk in response:
        data = chunk['choices'][0]
        if data['finish_reason'] is not None:
            break
        answer += data['delta']['content']
    return answer


class GenerateRequest(BaseModel):
    prompt: str


@router.post("/generate")
async def generate_text(request: GenerateRequest):
    try:
        response = await call_openai_api(request.prompt)
        return response
    except Exception as e:
        print(e)
