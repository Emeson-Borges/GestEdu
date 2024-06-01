from django.urls import path

from .views import CursoCreateView, CursoListView, TurmaListCreate, TurmaDetail, TurmaListView


urlpatterns = [
     path('cadastrar/', CursoCreateView.as_view(), name="curso-create"),  
     path('listar/', CursoListView.as_view(), name="cursos-list"),
     path('addturmas/', TurmaListCreate.as_view(), name='turma-list-create'),
     path('listaturma/', TurmaListView.as_view(), name='turmas-list'),
    path('turmas/<int:pk>/', TurmaDetail.as_view(), name='turma-detail'),
]
