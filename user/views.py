from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse
import requests
from django.urls import path
from django.http import Http404

def dynamic_router(request, slug):
    # Kiểm tra nếu có thể chuyển hướng đến view login
    if slug == 'login':
        return login(request)
    # Nếu không, thì xử lý theo logic của view articles
    else:
        return articles(request, slug)

# Create your views here.
def index(request):
    if request.method == "POST":
        # user = request.user
        # user_profile, created = Users.objects.get_or_create(user=user)
        email = request.POST.get('email', '')
        if email == '':
            username = request.POST['username']
            password = request.POST['password']
            print(username + "/" + password)
            
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                messages.success(request, f"Login successfully! Welcome back, {username}.")
                return redirect('/')
            else:
                messages.info(request, 'Invalid username or password.')
                return redirect('/')
        else:
            email = request.POST['email']
            username = request.POST['username']
            password = request.POST['password']
            password2 = request.POST['password2']
            if password == password2:
                if User.objects.filter(email=email).exists():
                    messages.info(request, 'Email is already existed.')
                    return redirect('/')
                elif User.objects.filter(username=username).exists():
                    messages.info(request, 'Username is already existed.')
                    return redirect('/')
                else:
                    user = User.objects.create_user(username=username, email=email, password=password)
                    user.save()
                    user = auth.authenticate(username=username, password=password)
                    auth.login(request, user)
                    return redirect('/')
            else:
                messages.info(request, 'Passwords donot match')
                return redirect('/')
    else:
        return render(request, 'index.html', {})

def register(request):
    nextUrl = request.POST.get('next')
    if request.method == 'POST':
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']
        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email already exists')
                return redirect('register')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Username already exists')
                return redirect('register')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                user = auth.authenticate(username=username, password=password)
                auth.login(request, user)
                if nextUrl != '' and nextUrl is not None:
                    return redirect(nextUrl)
                else:
                    return redirect('/')
        else:
            messages.info(request, 'Password doesn\'t match')
            return redirect('register')
    else:
        return render(request, 'register.html')
    
def login(request):
    nextUrl = request.POST.get('next')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = auth.authenticate(username=username, password=password)
        # nextUrl = request.POST.get('next')
        if user is not None:
            auth.login(request, user)
            messages.success(request, f"Login successfully! Welcome back, {username}.")
            if nextUrl != '' and nextUrl is not None:
                return redirect(nextUrl)
            else:
                return redirect('/')
            # return redirect(nextUrl)
        else:
            messages.info(request, 'Invalid username or password.')
            return redirect('login')
        
    else: 
        return render(request, 'login.html')
    
def logout(request):
    auth.logout(request)
    return redirect('/')

# def articles(request, slug):
#     return render(request, 'article.html', {'slug': slug})

def articles(request, article_id):
    return render(request, 'article.html', {'article_id': article_id})

def most_popular(request, user_id):
    if not request.user.is_authenticated:
        messages.info(request, 'You must log in first.')
    return render(request, 'mostPopular.html', {'user_id': user_id})

def related_articles(request, user_id):
    if not request.user.is_authenticated:
        messages.info(request, 'You must log in first.')
    return render(request, 'relatedArticles.html', {'user_id': user_id})
