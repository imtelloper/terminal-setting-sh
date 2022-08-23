# 스케줄 종류에는 여러가지가 있는데 대표적으로 BlockingScheduler, BackgroundScheduler 입니다
# BlockingScheduler 는 단일수행에, BackgroundScheduler은 다수 수행에 사용됩니다.
# 여기서는 BackgroundScheduler 를 사용하겠습니다.
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.base import JobLookupError
import time


def job():
    print('🌪🌪🌪🌪🌪🌪🌪🌪🌪🌪🌪🌪🌪')


secretary = BackgroundScheduler(job_defaults={'misfire_grace_time': 300})
secretary.start()
# secretary.add_job(job, 'cron', second='*/5', id='safety-todo1')
0
