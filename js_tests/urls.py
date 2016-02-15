from django.conf.urls import url
from django.views.generic.base import TemplateView

"""
/js_tests/ - під'єднано у модулі superlists.urls.py:
    url(r'^js_tests/',  include('js_tests.urls')),
"""

urlpatterns = [
    url(r'^$',
                TemplateView.as_view(template_name='js_tests.html'), name='js_tests'),
    url(r'^lists/$',
                TemplateView.as_view(template_name='js_tests_lists.html'), name='lists'),
    url(r'^accounts/$',
                TemplateView.as_view(template_name='js_tests_accounts.html'), name='accounts'),
]

