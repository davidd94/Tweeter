from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

from tweets.models import Tweet
from .forms import TweetForm
from .serializers import TweetCreateSerializer, TweetSerializer, TweetActionSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from tweeter2.rest_api.dev import DevAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, "pages/home.html", context={}, status=200)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, DevAuthentication])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    data = request.data
    serializer = TweetCreateSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    serializer = TweetSerializer(qs, many=True)
    
    return Response(serializer.data, status=200)

@api_view(['GET'])
def tweet_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "Unauthorized to delete"}, status=400)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet deleted!"}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    """
    Action options are: like, unlike, retweet
    """
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")

        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            parent_obj = obj
            new_tweet = Tweet.objects.create(user=request.user, parent=parent_obj)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=200)

    return Response({"message": "Tweet liked!"}, status=200)

def tweet_list_view_pure_django(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by any app that accepts JSON (JavaScript, Java, Swift, iOS/Android, React)
    return json data
    """
    qs = Tweet.objects.all()
    serializer = TweetSerializer(qs, many=True)
    
    return JsonResponse(serializer.data, safe=False)

def tweet_view_pure_django(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Consume by any app that accepts JSON (JavaScript, Java, Swift, iOS/Android, React)
    return json data
    """
    status = 200
    data = {}
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404

    return JsonResponse(data, status=status)

def tweet_create_view_pure_django(request, *args, **kwargs):
    user = request.user
    
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None

    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()

    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

    return render(request, 'components/form.html', context={"form": form}) 