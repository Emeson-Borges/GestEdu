from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.utils.translation import gettext as _

@csrf_exempt
def cadastrar_usuario(request):
    if request.method == 'POST':
        User = get_user_model()
        email = request.POST.get('email')
        password = request.POST.get('password')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        date_of_birth = request.POST.get('date_of_birth')
        cpf = request.POST.get('cpf')
        phone_number = request.POST.get('phone_number')
        profile_picture = request.FILES.get('profile_picture')

        if not User.objects.filter(email=email).exists():
            user = User.objects.create_user(
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                date_of_birth=date_of_birth,
                cpf=cpf,
                phone_number=phone_number,
                profile_picture=profile_picture
            )
            return JsonResponse({'message': _('Usuário cadastrado com sucesso!')})
        else:
            return JsonResponse({'error': _('Email já cadastrado')}, status=400)
    return JsonResponse({'error': _('Método não permitido')}, status=405)

@login_required
def get_user_data(request):
    user = request.user
    return JsonResponse({
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'date_of_birth': user.date_of_birth,
        'cpf': user.cpf,
        'phone_number': user.phone_number,
        'profile_picture': user.profile_picture,  })