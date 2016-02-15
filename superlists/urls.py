"""superlists URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic.base import TemplateView
from lists.views import home_page

urlpatterns = [
    # для прикладів з книги TDD with Python:
    url(r'^$',          home_page,              name='home'),
    url(r'^lists/',     include('lists.urls',   namespace='TDD-lists')),
    url(r'^accounts/',  include('accounts.urls',namespace='TDD-accounts')),

    # /admin/ - під'єднання до вбудованого admin
    # url(r'^admin/',     include(admin.site.urls)),

    # /messages/ - під'єднання до вбудованого django_messages app
    # url(r'^messages/',  include('django_messages.urls')),

    # /js_tests/ - під'єднуємо urls.py js-тестів
    url(r'^js_tests/',  include('js_tests.urls', namespace='js_tests')),

    # FT - порожня сторінка, щоб задати кукі перед аутентифікацією при тестах
    url(r'^selenium-cookie-setup/$',
        TemplateView.as_view(template_name='selenium_cookie_page.html'),
                                        name='selenium-cookie-setup'),
]
