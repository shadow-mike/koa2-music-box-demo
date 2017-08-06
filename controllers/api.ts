import * as superagent from 'superagent'

export default class Api {
  /**
   * 获取音乐数据
   * @param keywords 音乐关键词
   */
  static getData(keywords: string) {
    const params = {
      music_input: keywords,
      music_filter: 'name',
      music_type: 'netease'
    }
    return new Promise((resolve, reject) => {
      superagent.post('http://music.2333.me/')
        .set({
          'Host': 'music.2333.me',
          'Connection': 'keep-alive',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Origin': 'http://music.2333.me',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.1.3228.1 Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Referer': 'http://music.2333.me/',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'zh-CN,zh;q=0.8'
        })
        .send(params)
        .end((err, res) => {
          if (err) {
            reject(err)
          }
          resolve(JSON.parse(res.text))
        })

    })
  }

  static async search(keywords: string) {
    let data: any = {};
    try {
      data = await this.getData(keywords)
    } catch (e) {
      console.log(e)
    }
    return data.code ?
       data : {
        code: 400,
        data: [],
        error: '查询失败'
       }
  }

}