from django.db import models
from decimal import Decimal

class Curso(models.Model):
    NIVEL_CHOICES = (
        ('Tec', 'Técnico'),
        ('Tecn', 'Tecnólogo'),
        ('Sup', 'Superior'),
        ('Pos', 'Pós-Graduação'),
    )

    CERTIFICACAO_CHOICES = (
        (True, 'Sim'),
        (False, 'Não'),
    )

    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    nivel = models.CharField(choices=NIVEL_CHOICES, blank=True, null=True)
    duracao = models.CharField(max_length=50, blank=True, null=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=Decimal('0.00'))
    vagas_disponiveis = models.IntegerField(default=0)
    certificacao = models.BooleanField(choices=CERTIFICACAO_CHOICES, default=False)
    pre_requisitos = models.TextField(blank=True, null=True)
    status_curso = models.CharField(max_length=50, default='Ativo')

    def save(self, *args, **kwargs):
        if self.preco is None:
            self.preco = Decimal('0.00')
        super(Curso, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.nome

    class Meta:
        db_table = 'curso'
        managed = True
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'
