import sys
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.shortcuts import redirect

def login(request):
    # print('login view', file=sys.stderr)
    print('login view')
    print('request.user =', request.user)
    # user = PersonaAuthenticationBackend().authenticate(request.POST['assertion'])
    user = authenticate(assertion=request.POST['assertion'])
    print('user =', user)
    if user is not None:
        auth_login(request, user)
        print('after auth_login: user =', user)
    return redirect('/')

def logout(request):
    # print('logout view', file=sys.stderr)
    print('logout view')
    print('request.user =', request.user)
    auth_logout(request)
    print('after auth_logout: request.user =', request.user)
    return redirect('/')
