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
    Player.objects.create(user=user, photo="https://www.google.com/imgres?imgurl=https%3A%2F%2Fplay-lh.googleusercontent.com%2Fsp23tyBI3QmYvXKc0ZesZ6x6BHDSvPsFQWcgtlOuBkLYFxX7eiNO3Y2B0dCLXvak-x4%3Dw600-h300-pc0xffffff-pd&tbnid=Ot_FOlaUGcmxuM&vet=12ahUKEwj4rM6XxvmDAxUEF2IAHc28CU0QMyhCegUIARD6AQ..i&imgrefurl=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.sparelabs.platform.rider.bluejayshuttle&docid=_Rb_gkAP3BGfiM&w=600&h=300&q=jhu%20blue%20jay&ved=2ahUKEwj4rM6XxvmDAxUEF2IAHc28CU0QMyhCegUIARD6AQ")
    # login after registeration 
    login(request, user)
    return JsonResponse({
        'result': "success",
    })


