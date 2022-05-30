import multiprocessing
workers = multiprocessing.cpu_count() * 2 + 1
wsgi_app = 'app:app'
bind = '0.0.0.0:8000'
worker_class = 'sync'
