from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse
from django.template import loader

from .models import Disk, Book, Bike

def index(request):

    latest_music_list = Disk.objects.order_by('-pub_date')[:3] #Ultimos discos
    latest_book_list = Book.objects.order_by('-pub_date')[:3] #Ultimos libros
    latest_bike_list = Bike.objects.order_by('brand')[:3] #Orden por marca
    context = {'latest_music_list': latest_music_list, 'latest_book_list': latest_book_list, 'latest_bike_list': latest_bike_list}
    return render(request, 'my_shop/index2.html', context)


def product_index(request, product_type):

    if product_type == 'libros':
        product_list = Book.objects.order_by('title')
        title = "EL RINCON DE LA LECTURA"
    elif product_type == 'discos':
        product_list = Disk.objects.order_by('title')
        title = "EL RINCON DE LA MUSICA"
    elif product_type == 'bicicletas':
        product_list = Bike.objects.order_by('brand')
        title = "EL RINCON SOBRE RUEDAS"
    else:
        product_list = []
        title = ""
    context = {'product_list': product_list, 'title':title, 'product_type':product_type}
    return render(request, 'my_shop/index_product2.html', context)


def product_description(request, product_type, field1, field2):

    product_data = {}

    if product_type == 'discos':
        all_products = Disk.objects.order_by('title')
        for product in all_products:
            if (product.author == field1) and (product.title == field2):
                product_data = product

    elif (product_type == 'libros'):
        all_products = Book.objects.order_by('title')
        for product in all_products:
            if (product.author == field1) and (product.title == field2):
                product_data = product
                print(product_data)
    elif product_type == 'bicicletas':
        all_products = Bike.objects.order_by('brand')
        for product in all_products:
            if (product.brand == field1) and (product.model == field2):
                product_data = product

    context = {'product_data': product_data, 'product_type': product_type}

    return render(request, 'my_shop/description_product2.html', context)



def cart(request):
    print "paso por carrito"
    context = {}
    return render(request, 'my_shop/cart.html', context)
