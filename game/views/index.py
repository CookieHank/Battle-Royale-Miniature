from django.shortcuts import render


def index(request):
    return render(request, "multuends/web.html")

