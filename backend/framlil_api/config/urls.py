
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import FarmerViewSet, FruitViewSet, TransactionViewSet

router = DefaultRouter()
router.register(r'farmers', FarmerViewSet)
router.register(r'fruits', FruitViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('core.urls')),
]