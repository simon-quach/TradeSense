import requests, json, threading
from bs4 import BeautifulSoup
from fastapi import APIRouter
from pydantic import BaseModel, Json

router = APIRouter()

def parse_yahoo_ticker(ticker, dataset: list):
    # Yahoo Fin
    response = requests.get(f'https://finance.yahoo.com/quote/{ticker}?p={ticker}&.tsrc=fin-srch')
    if response.status_code != 200:
        return

    soup = BeautifulSoup(response.text, 'html.parser')

    articles = []
    # YAHOO
    for article in soup.find_all('h3', {'class': 'Mb(5px)'}):
        title = article.text.strip()
        link = article.find('a')['href']
        articles.append({'title': title, 'link': f"https://finance.yahoo.com{link}"})

    for data in articles:
        temp_dict = {}
        url = data['link']
        res = requests.get(url)
        if(res.status_code == 200):
            sp = BeautifulSoup(res.text, 'html.parser')
            body_text = sp.find('div', class_='caas-body').text.strip()
            # New edits
            temp_dict['bodyText'] = body_text
        dataset.append({'title': data['title'], 'bodyText': body_text})
    
def parse_fool_ticker(ticker, dataset: list):
    response = requests.get(f'https://www.fool.com/quote/nasdaq/{ticker}')

    if(response.status_code != 200):
        return

    soup = BeautifulSoup(response.text, 'html.parser')

    temp_data = []

    for article in soup.find_all('a', {'class': 'block border-b border-gray-300 hover-trigger text-gray-1100 hover:text-black p-20px'}):
        title = article.get('data-track-link')
        url = article.get('href')

        temp_data.append({'title': title, 'link': f"https://www.fool.com/{url}"})

    for data in temp_data:
        url = data['link']

        temp_dict = {}

        res = requests.get(url)
        if(res.status_code == 200):
            sp = BeautifulSoup(res.text, 'html.parser')
            body_text = sp.find('div', class_='article-body').text.strip()
            temp_dict['bodyText'] = body_text
            # dataset_test[data['title']] = temp_dict
        dataset.append({'title': data['title'], 'bodyText': body_text})

async def parse_bloomberg_ticker(ticker, dataset: list):
    response = requests.get(f'https://www.bloomberg.com/search?query={ticker}')

    if(response.status_code != 200):
        return
    
    soup = BeautifulSoup(response.text, 'html.parser')

    temp_data = []

    for article in soup.find_all("a", {'class': 'headline__3a97424275'}):
        title = article.text
        url = article.get('href')
        
        temp_data.append({"title": title, "link": url})
    
    for data in temp_data:
        temp_dict = {}
        url = data['link']
        res = requests.get(url)
        
        if res.status_code == 200:
            sp = BeautifulSoup(res.text, 'html.parser')
            body_text = sp.find('div', class_='Paragraph_text-SqIsdNjh0t0- paywall').text.strip()
            temp_dict['bodyText'] = body_text
        
        dataset.append({'title': data['title'], 'bodyText': body_text})


async def execute(ticker):
    dataset = []

    yahoo_thread = threading.Thread(target=parse_yahoo_ticker, args=(ticker, dataset,))
    fool_thread = threading.Thread(target=parse_fool_ticker, args=(ticker, dataset,))
    # bloom_thread = threading.Thread(target=parse_bloomberg_ticker, args=(ticker, dataset,))

    yahoo_thread.start()
    fool_thread.start()
    # bloom_thread.start()

    yahoo_thread.join()
    fool_thread.join()
    # bloom_thread.join()

    # output = json.dumps(dataset)

    # return output

    return dataset
    
    # return JSON dumped

class ScrapedData(BaseModel):
    scraped_data: str

@router.post('/execute')
async def send_data(request: ScrapedData):
    try:
        response = await execute(request.scraped_data)
        # print(response)
        return response
    except Exception as e:
        print(e)