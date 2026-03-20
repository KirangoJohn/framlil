from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework import viewsets
from .models import Farmers, Fruits, Transaction, Prices, Cards
from .serializers import FarmerSerializer, FruitSerializer, TransactionSerializer, PriceSerializer, CardsSerializer

class FarmerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Farmers.objects.all()
    serializer_class = FarmerSerializer
    
class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Transaction.objects.all().select_related('fruit', 'size', 'weight', 'user').order_by('-created_at')
    serializer_class = TransactionSerializer
    
    def Perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class FruitViewSet(viewsets.ModelViewSet):
    serializer_class = FruitSerializer
    queryset = Fruits.objects.all().order_by('name')
    
    
class PriceViewSet(viewsets.ModelViewSet):
    serializer_class = PriceSerializer
    queryset = Prices.objects.select_related('fruit').all()

class CardsViewSet(viewsets.ModelViewSet):
    serializer_class = CardsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['farmer', 'vehicle_no', 'gnr']
    queryset = Cards.objects.all().order_by('-created_at')
    
class SizesViewSet(viewsets.ModelViewSet):
    queryset = Sizes.objects.all()
    serializer_class = SizesSerializer