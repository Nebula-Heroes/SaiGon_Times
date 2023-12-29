from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout, name='logout'),
    path('articles/views/<str:article_id>', views.articles, name='articles'),
    path('articles/most_popular/<str:user_id>', views.most_popular, name='most_popular'),
    path('related_articles/<str:user_id>', views.related_articles, name='related_articles'),
    # path('articles/most_popular/views/<str:article_id>', views.articles, name='articles'),
    path('articles/views/register', views.index, name='aregister'),
    path('articles/views/logout', views.index, name='alogout'),
    path('<str:slug>/', views.dynamic_router, name='dynamic_router'),
]