from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Aluno
from .serializers.serializers import AlunoSerializer, CursoSerializer, MatriculaSerializer
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from django.core.exceptions import ValidationError
import random
from django.http import JsonResponse

from django.db.models.functions import ExtractYear

class AlunoCreateView(APIView):
    def post(self, request, format=None):
        print("Dados recebidos:", request.data)  # Adiciona print para depuração
        
        # Obtém o último aluno inserido no banco de dados
        ultimo_aluno = Aluno.objects.order_by('-matricula').first()
        if ultimo_aluno:
            ultimo_numero_matricula = int(ultimo_aluno.matricula)
            proximo_numero_matricula = ultimo_numero_matricula + 1
        else:
            proximo_numero_matricula = 1
        
        matricula = str(proximo_numero_matricula).zfill(8)  # Formata a matrícula para ter 8 caracteres
        request.data['matricula'] = matricula  # Adiciona a matrícula aos dados recebidos no request
        
        serializer = AlunoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Erros de validação:", serializer.errors)  # Adiciona print para depuração
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlunoListView(ListAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nome', 'matricula']  # Campos pelos quais você pode pesquisar
    ordering_fields = ['nome', 'matricula', 'turma', 'ano']  # Campos pelos quais você pode ordenar
    pagination_class = PageNumberPagination  # Adiciona paginação à lista de alunos

class CursoCreateView(APIView):
    def post(self, request, format=None):
        serializer = CursoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


def filtrar_alunos(request):
    ano = request.GET.get('ano')
    matricula = request.GET.get('matricula')

    alunos = Aluno.objects.all()

    # Aplicar todos os filtros de uma vez
    if ano:
        alunos = alunos.annotate(ano_criado=ExtractYear('criado_em')).filter(ano_criado=ano)
    if matricula:
        alunos = alunos.filter(matricula__icontains=matricula)

    # Serializa os alunos filtrados para JSON
    alunos_serialized = [
        {
            # 'id': aluno.id,
            'nome': aluno.nome,
            # 'classe': aluno.classe,
            # 'ano': aluno.ano,
            'matricula': aluno.matricula,
            'criado_em': aluno.criado_em,
            'atualizado_em': aluno.atualizado_em
        }
        for aluno in alunos
    ]

    return JsonResponse(alunos_serialized, safe=False)


