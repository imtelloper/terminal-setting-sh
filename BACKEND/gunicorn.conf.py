import multiprocessing
# workers = multiprocessing.cpu_count() * 2 + 1
workers = 10
wsgi_app = 'app:app'
bind = '0.0.0.0:8000'
worker_class = 'sync'
# accesslog = './log/access_log.txt'
# errorlog = './log/error_log.txt'
deamon = True
timeout = 60
preload_app = True