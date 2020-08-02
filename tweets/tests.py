from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from .models import Tweet


# Create your tests here.
User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="davie", password="somepass")
        
        # creating a tweet with ID 1 for ALL tests to see/use
        Tweet.objects.create(content="test tweet #1", user=self.user)
        Tweet.objects.create(content="test tweet #2", user=self.user)
        Tweet.objects.create(content="test tweet #3", user=self.user)

        self.currentCount = Tweet.objects.all().count()
    
    def test_user_created(self):
        self.assertEqual(self.user.username, "davie")
    
    def test_tweet_created(self):
        # tweet created for this specific test only and will tear down after
        tweet_obj = Tweet.objects.create(content="test tweet #4", user=self.user)
        self.assertEqual(tweet_obj.id, 4)
        self.assertEqual(tweet_obj.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepass')
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
    
    # def test_action_like(self):
    #     client = self.get_client()

    #     response = client.post("/api/tweets/action/", {"id": 1, "action": "like"})
    #     like_ct = response.json().get("likes")
    #     self.assertEqual(like_ct, 1)

    #     response = client.post("/api/tweets/action/", {"id": 1, "action": "unlike"})
    #     like_ct = response.json().get("likes")
    #     self.assertEqual(like_ct, 0)

    #     self.assertEqual(response.status_code, 200)

    def test_action_retweet(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 1, "action": "retweet"})
        self.assertEqual(response.status_code, 200)

        data = response.json()
        new_tweet_id = data.get("id")
        self.assertNotEqual(2, new_tweet_id)
        self.assertEqual(self.currentCount + 1, new_tweet_id)
    
    def test_tweet_create_api_view(self):
        client = self.get_client()

        data = {"content": "This is my test tweet"}
        response = client.post("/api/tweets/create/", {"id": 1, "action": "retweet"})
        self.assertEqual(response.status_code, 201)

        response_data = response.json()
        new_tweet_id = response_data.get("id")

        self.assertEqual(self.currentCount + 1, new_tweet_id)

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/1/")
        self.assertEqual(response.status_code, 200)
        
        data = response.json()
        _id = data.get("id")
        self.assertEqual(_id, 1)

    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/delete/1/")
        self.assertEqual(response.status_code, 200)

        client = self.get_client()
        response = client.delete("/api/tweets/delete/1/")
        self.assertEqual(response.status_code, 404)
        
