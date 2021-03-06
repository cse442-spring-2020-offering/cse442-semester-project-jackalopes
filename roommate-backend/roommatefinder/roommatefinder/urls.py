"""roommatefinder URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from rest_registration.api.urls import register, login

from rest_framework import routers
from roommatefinder import views

api_urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('matches/', views.MatchList.as_view()),
    path('like/', views.MatchLike.as_view()),
    path('dislike/', views.MatchDislike.as_view()),
    path('user/', views.UserProfile.as_view()),
    path('user/matches/', views.UserMatches.as_view()),
    path('messages/', views.Messages.as_view()),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urlpatterns)),
]
