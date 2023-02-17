function CallApi(){
    this.fetchListData = function(){
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
            method: "GET"
        })
    }
    this.getStaffById = function(id){
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien="+id,
            method: "GET"
        })
    }
    this.addNhanVien = function(nv){
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
            method: "POST",
            data: nv
        })
    }
    this.deleteStaff = function(id){
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien="+id,
            method: "DELETE"
        })
    }
    this.updateStaff = function(nv){
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien="+nv.maNhanVien,
            method: "PUT",
            data:nv
        })
    }
}