from django.db import models
from app_cursos.models import Curso

class Aluno(models.Model):
    SEXO_CHOICES = (
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('O', 'Outro'),
    )
    
    nome = models.CharField(max_length=100)
    matricula = models.CharField(max_length=8, unique=True)
    cpf = models.CharField(max_length=11, unique=True)
    data_nascimento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    endereco = models.CharField(max_length=255, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    estado = models.CharField(max_length=100, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)
    foto = models.ImageField(upload_to='alunos_image/', blank=True, null=True)
    observacoes = models.TextField(blank=True, null=True)
    cep = models.CharField(max_length=8)
    criado_em = models.DateTimeField(auto_now_add=True, db_column='criado_em')
    atualizado_em = models.DateTimeField(auto_now=True, db_column='atualizado_em')

    def __str__(self):
        return self.nome
    
    class Meta:
        db_table = 'aluno'
        managed = True
        verbose_name = 'Aluno'
        verbose_name_plural = 'Alunos'



class Matricula(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='matriculas')
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    data_matricula = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.aluno.nome} - {self.curso.nome}'

    class Meta:
        db_table = 'matricula'
        managed = True
        verbose_name = 'Matricula'
        verbose_name_plural = 'Matriculas'
