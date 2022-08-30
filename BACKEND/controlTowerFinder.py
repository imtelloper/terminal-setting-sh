import os
import sys
import time
import requests
import asyncio


# ping sample1
async def ping(host):
    """
    Prints the hosts that respond to ping request
    """
    ping_process = await asyncio.create_subprocess_shell("ping -c 1 " + host + " > /dev/null 2>&1")
    await ping_process.wait()

    if ping_process.returncode == 0:
        print(host)
    return


# ping sample2
async def ping_all():
    tasks = []
    for i in range(1, 255):
        ip = "192.168.0.{}".format(i)
        task = asyncio.ensure_future(ping(ip))
        tasks.append(task)

    await asyncio.gather(*tasks, return_exceptions=True)


# ping sample3
def getDatabaseIp():
    print('********************* getDatabaseIp start **********************')
    ipList = []
    for num in range(2, 256):
        ipAddr = "192.168.0." + str(num)
        pingCmd = "ping -c 1 " + ipAddr
        response = os.system(pingCmd)
        if response == 0:
            print(ipAddr)
    print('********************* getDatabaseIp end **********************')


if __name__ == '__main__':
    start = time.time()  # 시작 시간 저장
    '''
    ip 2 ~ 255번까지 확인. ping은 시간이 오래걸려서 각 minipc에서 돌아가는 Backend api를 통해서 확인
    '''
    for num in range(1, 256):
        addr = "192.168.0." + str(num)
        try:
            response = requests.get('http://' + addr + ":81/api/util/is-control-tower", timeout=0.008)

            if response.status_code == 200:
                pass

            if response.json() == '1':
                print(addr)
                '''
                sed를 사용하여 명령어로 file 수정하는법
                '''
                os.system(
                    "sed -n -i -e '/^MONGO_ADDRESS/c\MONGO_ADDRESS=mongodb://interx:interx12!@" + addr + "':27017/interx -e '1,$p' /home/interx/SAFETY-AI/BACKEND/.env")

        except Exception as e:
            pass

    print("=======================================Work finished at :", time.time() - start)
