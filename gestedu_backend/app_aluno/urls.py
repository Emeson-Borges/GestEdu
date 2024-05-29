from django.urls import path
from .views import filtrar_alunos

from .views import AlunoCreateView, AlunoListView  

urlpatterns = [
    path("matricular/", AlunoCreateView.as_view(), name="aluno-create"),
    path("alunos/", AlunoListView.as_view(), name="aluno-list"),
    path("filtrar_alunos/", filtrar_alunos, name='filtrar_alunos'),
]

