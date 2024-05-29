from django.urls import path

from .views import CursoCreateView, CursoListView


urlpatterns = [
     path("cadastrar/", CursoCreateView.as_view(), name="curso-create"),  
     path("listar/", CursoListView.as_view(), name="cursos-list"),
]
