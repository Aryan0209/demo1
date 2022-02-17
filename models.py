from django.db import models


class ExcelDetails(models.Model):
    id = models.AutoField(primary_key=True)
    file_name = models.CharField(max_length=200, null=True, blank=True)
    created_date = models.DateField(null=True, blank=True)
    updated_date = models.DateField(null=True, blank=True)
    uploaded_date = models.DateTimeField(null=True, blank=True)


class MaterialPlant(models.Model):
    id = models.AutoField(primary_key=True)
    material_code = models.IntegerField(null=True, blank=True)
    material_description = models.CharField(
        max_length=10000, null=True, blank=True)
    bun = models.CharField(max_length=200, null=True, blank=True)
    storage_location = models.IntegerField(default=1000)
    plant = models.CharField(max_length=100, null=True, blank=True)
    cost_center = models.IntegerField()
    quantity = models.FloatField()
    upload_date = models.DateTimeField(null=True, blank=True)
    posting_date = models.DateField(null=True, blank=True)
    sap_posting = models.DateTimeField(null=True, blank=True)
    doc_num = models.BigIntegerField(null=True, blank=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    excel_file_details = models.ForeignKey(
        ExcelDetails, on_delete=models.CASCADE)


class BillingDetails(models.Model):
    uid = models.BigAutoField(primary_key=True, unique=True)
    srno = models.BigIntegerField(null=True, blank=True)
    vehicle_no = models.CharField(max_length=10, null=True, blank=True)
    peso_re12 = models.CharField(max_length=100, null=True, blank=True)
    invoice = models.CharField(max_length=100, null=True, blank=True)


class DeliveryDetails(models.Model):
    uid = models.BigAutoField(primary_key=True, unique=True)
    so_nu = models.BigIntegerField(null=True, blank=True)
    total_package = models.BigIntegerField()
    storage_location = models.BigIntegerField(null=True, blank=True)
    vehicle_no = models.CharField(max_length=10, null=True, blank=True)
    peso_re12 = models.CharField(max_length=100, null=True, blank=True)
    driver_name = models.CharField(max_length=100, null=True, blank=True)
    transporter_name = models.CharField(max_length=100, null=True, blank=True)
    popup = models.CharField(max_length=100, null=True, blank=True)
    billing_number = models.BigIntegerField(null=True, blank=True)
