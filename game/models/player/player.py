from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    #one to one - connected
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # profile image
    photo = models.URLField(max_length=256, blank=True)
    

    def __str__(self):
        return str(self.user)

