from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse
import requests

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

def logout(request):
    auth.logout(request)
    return redirect('/')

# def articles(request, slug):
#     return render(request, 'article.html', {'slug': slug})

def articles(request, slug):
    # Replace 'your_api_key' with the actual API key if required
    api_url = f'http://api.recsysproject.tech/api/get_article?content_id={slug}&api_key=your_api_key'

    try:
        # Make the API request
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception for bad responses (4xx and 5xx)

        # Parse the JSON data from the response
        article_data = response.json()

        # Pass the article data to the template
        return render(request, 'article.html', {'article_data': article_data})

    except requests.exceptions.RequestException as e:
        # Handle request exceptions (e.g., connection error, timeout, etc.)
        error_message = f"Error fetching article data: {e}"
        return render(request, 'error.html', {'error_message': error_message})