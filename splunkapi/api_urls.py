from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from .views import SplunkSearch
urlpatterns = [
    url(r'^search$', csrf_exempt(SplunkSearch.as_view()), name="splunk_search"),
]
