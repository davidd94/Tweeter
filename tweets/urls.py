from django.urls import path

from .views import (
    tweet_view, tweet_list_view, tweet_create_view, 
    tweet_delete_view, tweet_action_view, tweet_list_view_pure_django
)

"""
Base API endpoint is /api/tweets/
"""
urlpatterns = [
    path('', tweet_list_view_pure_django),
    path('action/', tweet_action_view),
    path('create/', tweet_create_view),
    path('<tweet_id>/', tweet_view),
    path('delete/<int:tweet_id>/', tweet_delete_view),

]