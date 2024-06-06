import scrapy

class NewsSpider(scrapy.Spider):
    name = "news_spider"
    allowed_domains = ["cn-healthcare.com"]
    start_urls = [
        'https://www.cn-healthcare.com/jkjapphot/?type=0'
    ]

    def parse(self, response):
        # 找到热点新闻部分
        hot_news_section = response.xpath('//div[@class="ni_hot_list clear"]')

        # 获取前两个热点新闻的链接
        hot_news_links = hot_news_section.xpath('.//a/@href').extract()[:2]

        # 访问每个新闻链接以获取详细内容
        for link in hot_news_links:
            yield response.follow(link, self.parse_news_content)

    def parse_news_content(self, response):
        # 提取主要内容
        content_div = response.xpath('//div[@class="dt_rt_content_wrap dt_cont_wrap"]//div[@class="wz-textbox"]')
        paragraphs = content_div.xpath('.//p').extract()
        content = "\n".join([self.clean_text(para) for para in paragraphs])

        yield {
            'url': response.url,
            'content': content,
        }

    def clean_text(self, text):
        # 清理提取的段落文本，去除多余的标签和空白
        clean_text = scrapy.Selector(text=text).xpath('string(.)').extract_first()
        return clean_text.strip() if clean_text else ''
