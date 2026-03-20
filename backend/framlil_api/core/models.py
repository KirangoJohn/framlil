from django.db import models

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.conf import settings
from django.core.validators import MinValueValidator


class Cards(models.Model):
    id = models.BigAutoField(primary_key=True)
    farmer = models.CharField(max_length=191)
    company_name = models.CharField(
        max_length=191,
        blank=True,
        null=True
    )
    national_id = models.CharField(max_length=20, null=True, blank=True)
    vehicle_no = models.CharField(max_length=191)
    gnr = models.CharField(max_length=191)
    phone = models.CharField(max_length=20, blank=True, null=True)
    crates = models.IntegerField(blank=True, null=True)
    created_on = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'cards'


class Cities(models.Model):
    name = models.CharField(max_length=255)
    state_id = models.IntegerField()
    
    class Meta:
        managed = False
        db_table = 'cities'


class Countries(models.Model):
    name = models.CharField(max_length=255)
    sortname = models.CharField(max_length=255)
    phonecode = models.CharField(max_length=255)
    
    class Meta:
        managed = False
        db_table = 'countries'

class Farmers(models.Model):
    name = models.CharField(max_length=191)
    national_id = models.IntegerField()
    phone = models.CharField(max_length=191)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'farmers'


class Fruits(models.Model):
    name = models.CharField(max_length=191)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
    'users_app.User',
    on_delete=models.CASCADE,
    null=True,
    blank=True
    )
    class Meta:
        managed = True
        db_table = 'fruits'


class Prices(models.Model):
    buying_price = models.IntegerField(blank=True, null=True)
    selling_price = models.IntegerField(blank=True, null=True)
    fruit = models.ForeignKey(
        'Fruits',
        on_delete=models.CASCADE,
        db_column='fruit_id',
        null=True,
        blank=True
    )
    
    user = models.ForeignKey(
    'users_app.User',
    on_delete=models.CASCADE,
    null=True,
    blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'prices'
        unique_together = ['fruit', 'buying_price', 'selling_price']


class Rejects(models.Model):
    id = models.BigAutoField(primary_key=True)
    farmer = models.CharField(max_length=191)
    vehicle_no = models.CharField(max_length=191)
    rejects = models.IntegerField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    total = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey(
    'users_app.User', 
    on_delete=models.CASCADE, 
    null=True, 
    blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'rejects'
        
class Sizes(models.Model):
    id = models.BigAutoField(primary_key=True)
    size = models.IntegerField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'sizes'


class States(models.Model):
    name = models.CharField(max_length=255)
    country_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'states'


class Weights(models.Model):
    weight = models.IntegerField()
    size = models.ForeignKey(
    'Sizes',
    on_delete=models.DO_NOTHING,
    db_column='size_id',
    null=True,
    blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'weights'
        
from django.conf import settings
from django.db import models

class Transaction(models.Model):
    id = models.BigAutoField(primary_key=True)
    gnr = models.CharField(max_length=191, blank=True, null=True)
    
    # RELATIONS: Linked to your existing reference tables
    fruit = models.ForeignKey(
        'Fruits',
        on_delete=models.PROTECT, # Protects against deleting a fruit used in a sale
        db_column='fruit_id'
    )
    # Using ForeignKey instead of IntegerField for Size
    size = models.ForeignKey(
        'Sizes',
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )
    # Using ForeignKey instead of CharField for Weight
    weight = models.ForeignKey(
        'Weights',
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )
    
    # DATA FIELDS
    cartons = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    buying_price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    selling_price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])

    # CALCULATED FIELDS (Keep these if you want to avoid heavy JOINs during reporting)
    framlil_total = models.DecimalField(max_digits=12, decimal_places=2, editable=False)
    supplier_total = models.DecimalField(max_digits=12, decimal_places=2, editable=False)
    profit = models.DecimalField(max_digits=12, decimal_places=2, editable=False)

    user = models.ForeignKey(
        'users_app.User', 
        on_delete=models.SET_NULL,
        null=True, 
        blank=True,
        related_name='transactions'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_finalized = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'transactions'
        indexes = [
        models.Index(fields=['created_at']),
        models.Index(fields=['fruit']),
        models.Index(fields=['is_finalized']),]

    # Logic to automate calculations
    def save(self, *args, **kwargs):
        self.supplier_total = self.cartons * self.buying_price
        self.framlil_total = self.cartons * self.selling_price
        self.profit = self.framlil_total - self.supplier_total
        super().save(*args, **kwargs)
