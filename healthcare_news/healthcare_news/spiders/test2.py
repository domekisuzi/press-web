import requests
from bs4 import BeautifulSoup

# 目标URL
url = 'https://www.cn-healthcare.com/jkjapphot/?type=0'

# 发送GET请求
response = requests.get(url)
response.encoding = 'utf-8'

# 解析HTML
soup = BeautifulSoup(response.text, 'html.parser')

# 找到热点新闻部分
hot_news_section = soup.find_all('div', class_='ni_hot_list clear')

# 解析热点新闻内容
hot_news = []
for news in hot_news_section[:2]:  # 只取前两个热点新闻
    title = news.find('h3').text.strip()
    link = news.find('a')['href']
    summary = news.find('div', class_='ni_h_content').text.strip()

    hot_news.append({
        'title': title,
        'link': link,
        'summary': summary
    })

# 输出结果
for idx, news in enumerate(hot_news, 1):
    print(f"热点新闻 {idx}：")
    print(f"标题：{news['title']}")
    print(f"链接：{news['link']}")
    print(f"摘要：{news['summary']}\n")
