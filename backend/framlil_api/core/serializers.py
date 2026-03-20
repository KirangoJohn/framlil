from rest_framework import serializers
from .models import Farmers, Fruits, Prices, Rejects, Cards
from .models import Transaction, Sizes

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmers
        fields = '__all__'

class CardsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cards
        fields = "__all__"

    def validate(self, data):
        gnr = data.get("gnr")

        if gnr:
            qs = Cards.objects.filter(gnr=gnr)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError(
                "Client with this GNR ID already exists."
            )

        return data
    
class FruitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fruits
        fields = '__all__'
        
    def validate_name(self, value):
        name = value.strip().lower()

        if Fruits.objects.filter(name__iexact=name).exists():
            raise serializers.ValidationError("This fruit already exists.")

        return value
        
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('supplier_total','framlil_total','profit','created_at', 'updated_at')
    
class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prices
        fields = '__all__'
    def validate(self, data):
        fruit = data.get("fruit")
        buying_price = data.get("buying_price")
        selling_price = data.get("selling_price")

        if Prices.objects.filter(
            fruit=fruit,
            buying_price=buying_price,
            selling_price=selling_price
        ).exists():
            raise serializers.ValidationError(
                "This price record already exists for this fruit."
            )

        return data
        
class RejectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rejects
        fields = '__all__'
        
class SizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sizes
        fields = '__all__'