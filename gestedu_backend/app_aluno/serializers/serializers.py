from rest_framework import serializers
from ..models import Aluno, Curso, Matricula
from app_cursos.serializers.serializers import CursoSerializer

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = '__all__'

    def validate_email(self, value):
        # Validar o formato do e-mail
        if '@' not in value:
            raise serializers.ValidationError("O e-mail deve ser válido.")
        return value

    def validate_foto(self, value):
        # Validar se é um arquivo de imagem
        if not value.name.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise serializers.ValidationError("A foto deve estar no formato PNG, JPG ou JPEG.")
        return value
    
    def validate_cpf(self, value):
        # Adicione validação para CPF aqui
        if not value.isdigit() or len(value) != 11:
            raise serializers.ValidationError("CPF deve conter 11 dígitos.")
        return value

    def validate_cep(self, value):
        # Adicione validação para CEP aqui
        if not value.isdigit() or len(value) != 8:
            raise serializers.ValidationError("CEP deve conter 8 dígitos.")
        return value

class MatriculaSerializer(serializers.ModelSerializer):
    aluno = AlunoSerializer()
    curso = CursoSerializer()

    class Meta:
        model = Matricula
        fields = '__all__'
