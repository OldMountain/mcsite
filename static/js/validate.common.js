/**
 * Created by 李欣彤 on 16/03/17.
 */
(function ($) {

    /*创建对象*/
    var _this = new Object();

    /*承载异常的标签*/
    var errElement = "p";

    /*标签的class*/
    var errClass = "help-block";


    /*显示提示*/
    _this.showErr = function showErr(error, element){
        $(element).closest("div").addClass("has-error");
        if($(element).next("div.error-box").length==0){
            $(element).after("<div class='error-box'></div>");
        }
        if(typeof error == 'string'){
            //检查是否存在标签
            if(!/^<(.*?)>(\S*?)<\/(\S*?)>$/.test(error)){
                error = "<"+errElement+" class='"+errClass+"'>"+error+"</"+errElement+">";
            }
            $(element).next("div.error-box").html(error);
        }
        else {
            $(element).next("div.error-box").html(error[0]);
        }
    };

    /*清除提示*/
    _this.clearErr=function clearErr(element){
        var div = $(element).closest("div.has-error");
        div.removeClass("has-error");
        div.find(".error-box").remove();
    };

    /**
     * 拼装默认配置
     * @param rules
     * @param submitHandler
     * @returns {{errorClass: string, errorElement: string, errorPlacement: validateShowErr, success: validateClearErr, rules: *, submitHandler: *}}
     */
    _this.config = function validateConfig (rules,submitHandler,messages){
        /*错误提示配置*/
        return {
            errorPlacement: _this.showErr //错误显示
            , errorClass: errClass
            , errorElement: errElement
            , success:_this.clearErr //消除错误
            /*验证*/
            , rules: rules
            , submitHandler:submitHandler
            , messages:messages  /*提示消息*/
        };
    };

    /*对象赋值*/
    $.validateUtil = _this;
})(jQuery);
