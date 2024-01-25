from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player


def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()

    if not username or not password:
        return JsonResponse({
            'result': "Username or Password Cannot be Empty",
        })
    if password != password_confirm:
        return JsonResponse({
            'result': "Passwords Mismatch",
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': "Username Already Existed"
        })
    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user, photo="https://images.footballfanatics.com/johns-hopkins-blue-jays/johns-hopkins-blue-jays-auto-emblem_ss10_p-100102233+u-w6jxyplwncahvhrf6u9b+v-nmxzgbovfppyulvx0qxq.jpg?_hv=2&w=900")
    # login after registeration 
    login(request, user)
    return JsonResponse({
        'result': "success",
    })


