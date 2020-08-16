from rest_framework import authentication
from django.contrib.auth import get_user_model


User = get_user_model()


class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        user = qs.order_by("?").first() # order by random so we can randomly get a user
        return (user, None)