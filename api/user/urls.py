from django.urls import path
from .views import UserGetUpdateDeleteView, UserListView, UserGetLoggedView
from dataclasses import dataclass

@dataclass
class UrlNames:
    UserGetUpdateDelete = 'get-update-delete-user-by-id'
    UserList = 'get-users'
    UserGetLogged = 'get-logged-user'


urlpatterns = [
    path('user/<int:id>/', UserGetUpdateDeleteView.as_view(), name=UrlNames.UserGetUpdateDelete),
    path('user/', UserListView.as_view(), name=UrlNames.UserList),
    path('user/logged/', UserGetLoggedView.as_view(), name=UrlNames.UserGetLogged),
]
