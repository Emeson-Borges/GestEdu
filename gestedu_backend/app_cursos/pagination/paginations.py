from rest_framework.pagination import PageNumberPagination

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10  # Número de itens por página
    page_size_query_param = 'page_size'  # Parâmetro de consulta para alterar o número de itens por página
    max_page_size = 100  # Número máximo de itens por página
    page_query_param = 'page'  # Parâmetro de consulta para especificar o número da página
