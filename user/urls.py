from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('logout', views.logout, name='logout'),
    path('articles/views/<str:slug>', views.articles, name='articles'), 
]