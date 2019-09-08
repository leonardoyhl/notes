#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
import io
import json
import time
import copy

def get_title_in_html(content):
    start = content.find('<title>')
    end = content.find('</title>')
    return content[start+7:end]

def get_http_content(res, encoding="gbk"):
    # encoding = "gbk" if res.encoding==None else res.encoding
    if res.encoding:
        encoding = res.encoding  # res.apparent_encoding
    return res.content.decode(encoding, errors="ignore")
    # return res.text

def save_to_file(content): #filename
    file = io.open("html.txt", mode='w', encoding='utf-8')
    file.write(content)

def get_cat(content):
    save_to_file(content)
    index = content.find("cat")
    cat = ''
    if index > 0:
        tmp = content[index:]
        start = tmp.find("[")
        end = tmp.find("]")
        cat = tmp[start+1:end]
    # print(tmp, cat)
    return cat

def get_area():
    return '4_50950_88_0'

def get_stock(skuId, cat, area):
    params = {
        'skuId':  skuId,
        'cat': cat,
        'area': area
    }
    res = requests.get(url='https://c0.3.cn/stock', params=params)
    stock_str = get_http_content(res)
    return json.loads(stock_str)['stock']

_need_stop = False

def get_timestamp():
    return int(round(time.time()*1000))

def get_format_time(fmt):
    return time.strftime(fmt, time.localtime())

def parse_jsonp(jsonp, prefix=None):
    start = jsonp.find('(') if prefix==None else jsonp.find(prefix) + len(prefix)
    if start >= 0:
        # length = len(jsonp)
        json_str = jsonp[start+1:len(jsonp)-1]
        return json.loads(json_str)
    return None

class JDSkuMonitor():
    def __init__(self, sku_ids, areas=[]):
        self.sku_ids = sku_ids
        self.areas = areas
        self.removed_ids = []
        self.infos = {}

    def remove_id(self, sku_id):
        self.sku_ids.remove(sku_id)
        self.removed_ids.append(sku_id)

    def get_base_info(self, sku_id):
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            # 'authority': 'item.jd.com',
        }
        url = "https://item.jd.com/" + sku_id + ".html"
        # avoid redirecting automatically, to judge whether the sku exists. if not, remove it.
        res = requests.get(url, headers=headers, allow_redirects=False)
        # print(url, res.url)
        if res.status_code == 200:
            content = get_http_content(res, encoding="gbk")
            title = get_title_in_html(content)
            cat = get_cat(content)  # category
            return {
                'skuId': sku_id,
                'title': title,
                'cat': cat
            }
        else:
            self.remove_id(sku_id)
            print('Error in gain base info: ' + str(res.status_code) + '\t' + sku_id + ', removed from sku id list to query.')

    def query_stock(self, info):  # include sku_id, cat, area
        info['callback'] = 'jQuery1513981'
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
            'referer': 'https://item.jd.com/' + info['skuId'] + '.html',
        }
        res = requests.get('https://c0.3.cn/stock', params=info, headers=headers)
        if res.status_code == 200:
            content = get_http_content(res)
            stock = parse_jsonp(content)['stock']
            # python处理utf8编码中文 https://www.cnblogs.com/super-admin/p/5525241.html
            print(json.dumps(stock, ensure_ascii=False))
            self.handle_stock(stock)
        else:
            print('Error in query stock: ' + str(res.status_code) + '\t' + sku_id)

    def handle_stock(self, stock):
        state = stock['StockState']
        if state in [33, 36, 39, 40]:
            print (get_format_time('%H:%M:%S') + '\t' + str(stock['realSkuId'])
                   + '\t' + stock['StockStateName'] + '\t' + str(state))
        else:
            print (get_format_time('%H:%M:%S') + '\t' + str(stock['realSkuId'])
                   + '\t' + stock['StockStateName'] + '\t' + str(state))



    def query_stocks(self, sku_ids, area):
        params = {
            'skuIds': ','.join(sku_ids),
            'area': area,
            'type': 'getstocks',
            'callback': 'jQuery3659748',
            '_': get_timestamp()
        }
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        }
        res = requests.get('https://c0.3.cn/stocks', params=params, headers=headers)
        if res.status_code == 200:
            content = get_http_content(res)
            stocks = parse_jsonp(content)
            print(json.dumps(stocks, encoding="utf-8", ensure_ascii=False))
            return stocks
        else:
            print('Error in query stocks: ' + str(res.status_code) + '\t' + ','.join(sku_ids))
            return None

    # 查询促销信息，包含促销广告，优惠券、购买数量限制，促销-【附件】等
    def query_promotion(self, info):    # include sku_id, cat, area
        info['_'] = get_timestamp()
        info['callback'] = 'jQuery2204189'
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
            'referer': 'https://item.jd.com/' + info['skuId'] + '.html',
        }
        url = 'https://cd.jd.com/promotion/v2'
        res = requests.get(url=url, params=info, headers=headers)
        if res.status_code == 200:
            content = get_http_content(res)
            promotion = parse_jsonp(content)
            return promotion

    def save_info(self, info):
        self.infos[info['skuId']] = info

    def get_info(self, sku_id):
        return self.infos[sku_id]

    def before(self):
        print ('Gain and save(collect) the base info of all firstly.')
        for sku_id in self.sku_ids[:]:
            info = self.get_base_info(sku_id)
            if info:    # != None:
                self.save_info(info)
                print ('The base info of sku ' + sku_id + ' saved.')
            # 遍历的同时移除元素解决方案：http://www.mamicode.com/info-detail-2264708.html
                # self.remove_id(sku_id)
        # print(self.sku_ids, self.removed_ids)

    def query(self):
        for sid in self.sku_ids[:]:
            info = self.get_info(sid)
            tmp = copy.deepcopy(info)
            if 'title' in tmp:
                del tmp['title']
            tmp['area'] = '4_50950_88_0'
            self.query_stock(tmp)  # sku_id, info['cat'], '4_50950_88_0'
            print json.dumps(tmp, ensure_ascii=False)
        self.query_stocks(self.sku_ids, '4_50950_88_0')

    def run(self):
        self.before()
        self.query()

def main():
    # monitor = SkuMonitor(['100000177760', '100005724725', '100000177761', '41392575165'])    #
    monitor = JDSkuMonitor('100000177760,100005724725,100000177761,100000177786,100002539310,100000287141,100001860775,100000177774,100000177758,100001860781,100000177760,100001860805,100000177772,100000177756,100001860787,100000287115,100001860779,100000177826,100000287121,100002539298,100000177782,100001860777,100000177802,100000177788,100002539278,100000177770,100000177776,100000177766,100001860803,100000287163,100002539276,100000287165'.split(','))
    monitor.run()

main()
