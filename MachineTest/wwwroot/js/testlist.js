$(document).ready(function () {
    GetTestList();

});
function GetTestList() {
    var obj = {};
    obj.Mode = "LIST";
    $.ajax({
        url: '/Test/ExecuteTestForm',
        dataType: 'JSON',
        type: 'POST',
        data: { objEntity: obj },
        success: function (res) {
            let html = '';
            //console.log(res); 
            let data = res.Table;
            //console.log(data); 
            $.each(data, function (k, v) {
                if (parseInt(v.Qty) < 10) {
                    html += `<tr style="background-color:red;">`;
                }
                else {
                    html += `<tr>`;
                }
                html += `
                            <td>`+ v.Sno + `</td>
                            <td>`+ v.ITEMID + `</td>
                            <td>`+ v.Price + `</td>
                            <td>`+ v.Tax + `</td>
                            <td>`+ v.Qty + `</td>
                            <td>`+ v.Amount + `</td>
                            <td><a href="/Test/Index?id=`+ v.ID + `">Edit</a></td>
                        </tr>
                        `;
                //console.log(html);
            });

            $('#tbody_test').html(html);
            new DataTable('#tbl_test', {
                pageLength: 5,
                lengthMenu: [5, 10, 15, 20]
            });
        }

    });
}