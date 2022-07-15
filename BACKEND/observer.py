import requests
import json
'''
오직 DB기준으로 DB를 참고하여 독립적으로 돌아가도록 하면된다.
Front에서도 DB 기준으로 보여지고 작동이 된다면 각자 DB만을 참고하기 때문에 문제가 없다.
observer에서 DB를 수정하면 Front에서는 DB를 계속 참조하기때문에 문제없고
Front에서도 DB를 수정하면 observer에서도 .... stream service에서 while문이 돌아가기 때문에.. while문 안에서 컨트롤을 잘해야되네.
혹시나 좌표값을 계속 참조하고 좌표값이 만약에 바뀐다면 observer를 재실행 하는 방향으로 하면될
'''

def send_api(path, method):
    global response
    # API_HOST = "http://127.0.0.1:8000"
    API_HOST = "http://192.168.0.3:81"
    url = API_HOST + path
    headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
    body = {
        "key1": "value1",
        "key2": "value2"
    }

    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            response = requests.post(url, headers=headers, data=json.dumps(body, ensure_ascii=False, indent="\t"))
        print("response status %r" % response.status_code)
        print("response text %r" % response.text)
    except Exception as ex:
        print(ex)

# 호출 예시
send_api("/api/stream/area/133,86,386,96,382,290,122,292/202,146,311,150,309,233,198,234", "GET")