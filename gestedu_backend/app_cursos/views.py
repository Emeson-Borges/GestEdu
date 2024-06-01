from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Curso, Turma
from app_cursos.serializers.serializers import CursoSerializer, TurmaSerializer
from rest_framework import generics
from django.views.generic import ListView
from rest_framework.generics import ListAPIView
from .pagination.paginations import CustomPageNumberPagination


class CursoCreateView(APIView):
    def post(self, request, format=None):
        serializer = CursoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CursoListView(APIView):
    def get(self, request, format=None):
        cursos = Curso.objects.all()
        serializer = CursoSerializer(cursos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CursoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TurmaListCreate(generics.ListCreateAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer

class TurmaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    
class TurmaListView(ListAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    # filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nome', 'ano_letivo', 'periodo']  # Campos pelos quais você pode pesquisar
    ordering_fields = ['nome', 'ano_letivo', 'periodo']  # Campos pelos quais você pode ordenar
    pagination_class = CustomPageNumberPagination  # Adiciona paginação à lista de turmas