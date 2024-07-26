$(document).ready(function () {
    if ($('#hd_id').val() > 0) {
        GetTestByID();
    }
    $('#txtQty').on('change', function () {
        let total = 0;
        total = parseInt($('#txtQty').val()) * parseInt($('#txtPrice').val());
        tax = (parseInt($('#txtPrice').val()) * parseInt($('#txtQty').val())) * parseInt($('#txtTax').val()) / 100
        $('#txtAmount').val(total + tax);
    });
    $('#txtPrice').on('change', function () {
        let total = 0;
        total = parseInt($('#txtQty').val()) * parseInt($('#txtPrice').val());
        tax = (parseInt($('#txtPrice').val()) * parseInt($('#txtQty').val())) * parseInt($('#txtTax').val()) / 100
        $('#txtAmount').val(total + tax);
    });
    $('#txtTax').on('change', function () {
        let total = 0;
        total = parseInt($('#txtQty').val()) * parseInt($('#txtPrice').val());
        tax = (parseInt($('#txtPrice').val()) * parseInt($('#txtQty').val())) * parseInt($('#txtTax').val()) / 100
        $('#txtAmount').val(total + tax);
    });
    $('#btn_Submit').on('click', function () {
        ExecuteForm("insert");
    });
});
function ExecuteForm(type) {
    var obj = {};
    if (type == "insert") {

        obj.Mode = "INSERT";
    }
    if (type == "update") {
        obj.Mode = "UPDATE";
    }
    obj.ID = $('#hd_id').val();
    obj.ItemID = $('#hd_ItemID').val();
    obj.Name = $('#txtName').val();
    obj.Price = $('#txtPrice').val();
    obj.Tax = $('#txtTax').val();
    obj.Qty = $('#txtQty').val();
    obj.Amount = $('#txtAmount').val();
    let isValid = 1;
    if ($('#txtName').val().trim() == "" || $('#txtName').val().trim() == null) {
        isValid = 0;
        alert("Please Enter Name");
        return false;
    }
    if (isValid == 1) {
        if ($('#txtPrice').val().trim() == "" || $('#txtPrice').val().trim() == null) {
            isValid = 0;
            alert("Please Enter Price");
            return false;
        }
        if (isValid == 1) {
            if ($('#txtTax').val().trim() == "" || $('#txtTax').val().trim() == null) {
                isValid = 0;
                alert("Please Enter Tax");
                return false;
            }
            if (isValid == 1) {
                if ($('#txtQty').val().trim() == "" || $('#txtQty').val().trim() == null) {
                    isValid = 0;
                    alert("Please Enter Qty");
                    return false;
                }
                if (isValid == 1) {
                    if ($('#txtAmount').val().trim() == "" || $('#txtAmount').val().trim() == null) {
                        isValid = 0;
                        alert("Please Enter Amount");
                        return false;
                    }
                }
            }
        }
    }
    if (isValid) {
        $.ajax({
            url: '/Test/ExecuteTestForm',
            dataType: 'JSON',
            type: 'POST',
            data: { objEntity: obj },
            success: function (res) {
                console.log(res);
                alert("Success");
                location.href = '/Test/Index';

            }
        });
    }
}
function GetTestByID() {
    var obj = {};
    obj.Mode = "GETBYID";
    obj.ID = $('#hd_id').val();
    $.ajax({
        url: '/Test/ExecuteTestForm',
        dataType: 'JSON',
        type: 'POST',
        data: { objEntity: obj },
        success: function (res) {
            console.log(res);
            //alert("Success");
            //location.href = '/Test/Index';
            let data = res.Table[0];
            $('#txtName').val(data.Name);
            $('#txtPrice').val(data.Price);
            $('#txtTax').val(data.Tax);
            $('#txtQty').val(data.Qty);
            $('#txtAmount').val(data.Amount);
            $('#txtItemID').val(data.ITEMID);
            $('#btn_div').html(`<button class="btn btn-info" id="btn_Update">Update</button>`);
            $('#btn_Update').on('click', function () {
                ExecuteForm("update");
            });
        }
    });
}