from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import cadastrar_usuario, get_user_data


urlpatterns = [
    path('users/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('cadastrar-usuario/', cadastrar_usuario, name='cadastrar_usuario'),
    path('userdata/', get_user_data, name='user_data'),
]