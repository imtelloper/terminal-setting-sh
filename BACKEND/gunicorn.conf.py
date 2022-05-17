import multiprocessing
workers = multiprocessing.cpu_count() * 2 + 1
wsgi_app = 'app:app'
bind = '0.0.0.0:9000'
worker_class = 'sync'
loglevel = 'info'
accesslog = './gunicorn-access.log'
acceslogformat = "%(h)s %(l)s %(u)s %(t)s %(r)s %(s)s %(b)s %(f)s %(a)s"
errorlog = './gunicorn-error.log'
