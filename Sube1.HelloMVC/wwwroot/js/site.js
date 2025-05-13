// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Öğrenci CRUD işlemleri için jQuery Ajax fonksiyonları

$(document).ready(function () {
    // Sayfa yüklendiğinde öğrenci listesini getir
    loadOgrenciListesi();
    
    // Form submit olayını engelle ve Ajax ile gönder
    $("#ogrenciEkleForm").on("submit", function (e) {
        e.preventDefault();
        ekleOgrenci();
    });
    
    // Güncellenecek öğrencinin bilgilerini form içine yükle
    $(document).on("click", ".btn-duzenle", function () {
        const id = $(this).data("id");
        getOgrenciById(id);
    });
    
    // Güncelleme formunun submit olayını engelle ve Ajax ile gönder
    $("#ogrenciGuncelleForm").on("submit", function (e) {
        e.preventDefault();
        guncelleOgrenci();
    });
    
    // Öğrenci silme işlemi
    $(document).on("click", ".btn-sil", function () {
        const id = $(this).data("id");
        if (confirm("Bu öğrenciyi silmek istediğinize emin misiniz?")) {
            silOgrenci(id);
        }
    });
});

// Tüm öğrencileri getir ve tabloya doldur
function loadOgrenciListesi() {
    $.ajax({
        url: "/Ogrenci/OgrenciListeAjax",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            let tableRows = "";
            $.each(data, function (index, ogrenci) {
                tableRows += `
                    <tr>
                        <td>${ogrenci.ogrenciid}</td>
                        <td>${ogrenci.ad}</td>
                        <td>${ogrenci.soyad}</td>
                        <td>
                            <button class="btn btn-sm btn-primary btn-duzenle" data-id="${ogrenci.ogrenciid}">Düzenle</button>
                            <button class="btn btn-sm btn-danger btn-sil" data-id="${ogrenci.ogrenciid}">Sil</button>
                        </td>
                    </tr>`;
            });
            $("#ogrenciListesiTbody").html(tableRows);
        },
        error: function (error) {
            console.log("Hata oluştu:", error);
            alert("Öğrenci listesi yüklenirken bir hata oluştu.");
        }
    });
}

// ID'ye göre öğrenci bilgilerini getir
function getOgrenciById(id) {
    $.ajax({
        url: `/Ogrenci/OgrenciGetirAjax?id=${id}`,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Düzenleme formunu göster ve verileri doldur
            $("#guncelleId").val(data.ogrenciid);
            $("#guncelleAd").val(data.ad);
            $("#guncelleSoyad").val(data.soyad);
            $("#guncelleModal").modal('show');
        },
        error: function (error) {
            console.log("Hata oluştu:", error);
            alert("Öğrenci bilgileri getirilirken bir hata oluştu.");
        }
    });
}

// Yeni öğrenci ekle
function ekleOgrenci() {
    const ogrenci = {
        ad: $("#ekleAd").val(),
        soyad: $("#ekleSoyad").val()
    };
    
    $.ajax({
        url: "/Ogrenci/OgrenciEkleAjax",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(ogrenci),
        success: function (response) {
            if (response.success) {
                alert(response.message);
                $("#ekleModal").modal('hide');
                $("#ogrenciEkleForm")[0].reset();
                loadOgrenciListesi(); // Listeyi yenile
            } else {
                alert(response.message);
            }
        },
        error: function (error) {
            console.log("Hata oluştu:", error);
            alert("Öğrenci eklenirken bir hata oluştu.");
        }
    });
}

// Öğrenci güncelle
function guncelleOgrenci() {
    const ogrenci = {
        ogrenciid: $("#guncelleId").val(),
        ad: $("#guncelleAd").val(),
        soyad: $("#guncelleSoyad").val()
    };
    
    $.ajax({
        url: "/Ogrenci/OgrenciGuncelleAjax",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(ogrenci),
        success: function (response) {
            if (response.success) {
                alert(response.message);
                $("#guncelleModal").modal('hide');
                loadOgrenciListesi(); // Listeyi yenile
            } else {
                alert(response.message);
            }
        },
        error: function (error) {
            console.log("Hata oluştu:", error);
            alert("Öğrenci güncellenirken bir hata oluştu.");
        }
    });
}

// Öğrenci sil
function silOgrenci(id) {
    $.ajax({
        url: "/Ogrenci/OgrenciSilAjax",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(id),
        success: function (response) {
            if (response.success) {
                alert(response.message);
                loadOgrenciListesi(); // Listeyi yenile
            } else {
                alert(response.message);
            }
        },
        error: function (error) {
            console.log("Hata oluştu:", error);
            alert("Öğrenci silinirken bir hata oluştu.");
        }
    });
}
