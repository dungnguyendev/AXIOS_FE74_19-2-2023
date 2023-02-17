var callApi = new CallApi()
var validation = new Validation()
var chucVu1 = ""
var heSoChucVu1 = ""
function getEle(id) {
    return document.getElementById(id)
}
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})
getListMember()
function getListMember() {
    callApi.fetchListData()
        .then(function (result) {
            renDerStaff(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
function checkImforMation() {
    var heSoLuong = 0;
    var chucVu = ""
    var nameMb = getEle("nameMember").value
    var codeID = getEle("code").value
    var regency = getEle("regency").value * 1
    var wageBasic = getEle("wageBasic").value 
    var timeMonth = getEle("timeMonth").value 

    if (regency === 1) {
        chucVu = "Nhân viên"
        heSoLuong = 1
    } else if (regency === 2) {
        chucVu = "Quản lý"
        heSoLuong = 2
    } else if (regency === 3) {
        chucVu = "Giám đốc"
        heSoLuong = 3
    }

    var isValid = true

    isValid &=
        validation.emptyCheck(codeID, "tbCode", "(*) Bạn chưa nhập mã")
        && validation.checkCharacters(codeID, "tbCode", "(*) Vui nhập tối đa 4-6 ký số", 4, 6)

    isValid &=
        validation.emptyCheck(nameMb, "tbName", "(*) Bạn chưa nhập tên")

        && validation.nameStaffCheck(nameMb, "tbName", "(*) Tên nhân viên phải là chữ")

    isValid &=
    validation.emptyCheck(wageBasic, "tbWage", "(*) Bạn chưa nhập lương")

    && validation.wageBasic(wageBasic, "tbWage", "(*) Mức lương phải trong khoảng: 1.000.000 - 20.000.000 VNĐ",1000000,20000000)

    isValid &=
    validation.emptyCheck(timeMonth, "tbTimeMonth", "(*) Bạn chưa số giờ làm/tháng")

    && validation.timeMonth(timeMonth, "tbTimeMonth", "(*) Số giờ làm phải trong khoảng: 50 - 150 giờ",50,150)

    if (!isValid) return null;

    var member = new staff(codeID * 1, nameMb, chucVu, heSoLuong, wageBasic*1, timeMonth)

    return addNhanVien(member)
}
function checkUpdate(id){
    let heSoLuong = 0
    let chucVu = ""
    var name = getEle("nameStaff").value
    var regency = getEle("regency1").value * 1
    var wagebasic = getEle("wagebasic").value 
    var timeMonth = getEle("timeMonth1").value 

    if (regency === 1) {
        chucVu = "Nhân viên"
        heSoLuong = 1
    } else if (regency === 2) {
        chucVu = "Quản lý"
        heSoLuong = 2
    } else if (regency === 3) {
        chucVu = "Giám đốc"
        heSoLuong = 3
    } else if (regency === 0) {
        chucVu = chucVu1
        heSoLuong = heSoChucVu1
    }

    let isValid = true
    
    isValid &= 
    validation.nameStaffCheck(name,"tbName1","(*) Tên nhân viên phải là chữ")

    isValid &=
    validation.wageBasic(wagebasic, "tbWage1", "(*) Mức lương phải trong khoảng: 1.000.000 - 20.000.000 VNĐ",1000000,20000000)

    isValid &=
    validation.timeMonth(timeMonth, "tbTimeMonth1", "(*) Số giờ làm phải trong khoảng: 50 - 150 giờ",50,150)

    if(!isValid) return null
    var nv = new staff(id, name, chucVu, heSoLuong, wagebasic*1, timeMonth*1)
    return updateStaff(nv)
}
// renDerNhanVien
function renDerStaff(data) {
    let renDer = ""
    let rating = ""
    data.forEach((nv, i) => {

        console.log(nv);
        console.log("đá" + nv.soGioLamTrongThang);
        if (nv.soGioLamTrongThang >= 150) {
            rating = "Nhân viên xuất sắc"
        } else if (nv.soGioLamTrongThang >= 100) {
            rating = "Nhân viên giỏi"

        } else if (nv.soGioLamTrongThang >= 50) {
            rating = "Nhân viên khá"
        }
        renDer += `
            <tr>
                <td><span class="mr-1">${i + 1}</span></td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${formatter.format(nv.luongCoBan)}</td>
                <td>${formatter.format(parseFloat(nv.luongCoBan) * parseFloat(nv.heSoChucVu))}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${rating}</td>
                <td><i onclick="deleteStaff(${nv.maNhanVien})" class="fa-solid fa-trash-can"></i></td>  
                <td><button class="btn1" onclick="handleEditStaff(${nv.maNhanVien})" data-toggle="modal" data-target="#exampleModal"><i class="fa-regular fa-pen-to-square"></i></button></td></tr>
        `
    });

    getEle("tableDanhSach").innerHTML = renDer
}
function deleteStaff(id) {
    callApi.deleteStaff(id)
    .then(function(){
        getListMember()
    })
}
function handleEditStaff(id) {
    // update
    var btnUpdate = `<button type="button" class="btn btn-success" onclick="checkUpdate(${id})">Update</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate
    callApi.getStaffById(id)
        .then(function (result) {
            let staff = result.data
            getEle("nameStaff").value = staff.tenNhanVien
            getEle("wagebasic").value = staff.luongCoBan
            getEle("timeMonth1").value = staff.soGioLamTrongThang
            chucVu1 = staff.chucVu
            heSoChucVu1 = staff.heSoChucVu
        })
        .catch(function (errr) {
            console.log(errr);
        })
}
function updateStaff(nv) {
    callApi.updateStaff(nv)
        .then(function () {
            getListMember()
            document.getElementsByClassName("close")[0].click()
        })
        .catch(function (error) {
            console.log(error);
        })
}
function addNhanVien(member) {

    console.log(member);
    callApi.addNhanVien(member)
        .then(function () {
            getListMember()
            console.log("add complete");
        })
        .catch(function (error) {
            console.log(error);
        })

    
}
