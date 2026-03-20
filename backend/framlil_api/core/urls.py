from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, FruitViewSet, PriceViewSet, CardsViewSet

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'fruits', FruitViewSet)
router.register(r'prices', PriceViewSet)
router.register(r'cards', CardsViewSet)



urlpatterns = router.urls