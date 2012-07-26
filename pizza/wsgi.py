import os, sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__))))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pizza.settings")

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
