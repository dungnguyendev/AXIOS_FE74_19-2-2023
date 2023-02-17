function Validation() {
  this.emptyCheck = function (value, spanId, mess) {
    console.log(value * 1);
    if (value === "") {
      console.log("chay");
      getEle(spanId).style.display = "block";
      getEle(spanId).style.color = "red";
      getEle(spanId).innerHTML = mess;
      return false;
    }
    console.log("k chay");
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };
  this.checkCharacters = function (value, spanId, mess, min, max) {
    console.log(value.length);
    if (value.length > max || value.length < min) {
      console.log("chay");
      getEle(spanId).style.color = "red";
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mess;
      return false;
    }
    console.log("k chay");
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  }
  this.nameStaffCheck = function (value, spanId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

    if (value.match(letter)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }

    getEle(spanId).style.color = "red";
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mess;
    return false;
  }

  this.wageBasic = function (value, spanId, mess, min, max) {

    if (value * 1 < min || value * 1 > max) {
      console.log("chay 1");
      getEle(spanId).style.display = "block";
      getEle(spanId).style.color = "red";
      getEle(spanId).innerHTML = mess;
      return false;

    }
    console.log(value);
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    console.log("chay 2");
    return true;
  }
  this.timeMonth = function (value, spanId, mess, min, max) {

    if (value * 1 < min || value * 1 > max) {
      getEle(spanId).style.display = "block";
      getEle(spanId).style.color = "red";
      getEle(spanId).innerHTML = mess;
      return false;

    }
    console.log(value);
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  }
}
