from django.urls import path

from .views import (
    home_view, tweet_view, tweet_list_view, tweet_create_view, 
    tweet_create_view_pure_django, tweet_delete_view, tweet_action_view
)

"""
Base API endpoint is /api/tweets/
"""
urlpatterns = [
    path('', tweet_list_view),
    path('action/', tweet_action_view),
    path('create/', tweet_create_view),
    path('<tweet_id>/', tweet_view),
    path('delete/<int:tweet_id>/', tweet_delete_view),

]