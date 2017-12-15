/**
 * Created by 李欣彤 on 16/04/28.
 */
(function ($) {
    /**
     * ajax方式提交表单
     * @param success 成功后回调方法
     * @param error 请求错误的回调方法
     */
    $.fn.ajaxForm = function (success,error) {
        if(!this.attr("action")) return;
        $.ajax({
            cache: true,
            type: "POST",
            url:this.attr("action"),
            data:$(this).serialize(),
            async: false,
            error: function(request) {
                console.log("ajaxFormErr:"+request.status+","+request.statusText);
                if (typeof error == "function"){
                    error(request);
                }
            },
            success: function(data) {
                if (typeof success == "function"){
                    success(data);
                }
            }
        });
    };
    
})(jQuery);

//是否存在指定函数
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
//是否存在指定变量
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            //alert("value is undefined");
            return false;
        } else {
            //alert("value is true");
            return true;
        }
    } catch(e) {}
    return false;
}

function checkInput(ele, accurate) {
    var value = $(ele).val();
//        var regx = /^[0-9]+\.?[1-9]?$/;
//        if(!regx.test(value)){
//            console.log(regx.test(value))
////            var reg = /^[^(0-9+\.)|(0-9+\.1-9)]$/g;
////            value = value.replace(reg,"");
//            value = value.substring(0,value.length-1);
//            value = value.replace(/\.\.+/g,".");
//            $(ele).val(value);
//        }
    var regx = /^\d/;
    if (regx.test(value)) {
        var index = value.indexOf(".");
        if (index != -1 && (index + 1) == value.length) {
            return;
        }
        $(ele).val(parseFloat(parseFloat(value).toFixed(accurate)));
    } else {
        $(ele).val($(ele).attr("data-value"));
    }
}

function isNumber(ele) {
    var value = $(ele).val();
    var index = value.indexOf(".");
    if (-1 != index && (index + 1) == value.length) {
        $(ele).val(value.substring(0, index));
    }
    if (isNaN(value)) {
        $(ele).val($(ele).attr("data-value"));
    }
}
function checkWholeInput(ele) {
    var value = $(ele).val();
    var regx = /[^0-9]/g;
    if (regx.test(value)) {
        value = value.replace(regx, ".");
        $(ele).val(value);
    }
}
///获得文件的大小(单位字节)
function getFileSize(fileId) {
    var dom = fileId;
    if(typeof fileId == "string"){
        dom = document.getElementById(fileId);
    }
    try {
        return dom.files.item(0).size;
    } catch (e) {
        try {
            var img = new Image();
            img.src = dom.value;
            img.style.display='none';
            document.body.appendChild(img);
            setTimeout(function(){
                document.body.removeChild(img);
            },1000);
            return img.size;
        } catch (e) {
            return -1;
        }
    }
}