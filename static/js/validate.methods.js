/**
 * Created by 李欣彤 on 16/03/17.
 */

$(function(){
    // 判断浮点数value是否大于0
    jQuery.validator.addMethod("isFloatGtZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value>0;
    }, "请输入大于零的数字");


    // IP地址验证
    jQuery.validator.addMethod("ip", function(value, element) {
        return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
    }, "请填写正确的IP地址");


    // 手机号验证
    jQuery.validator.addMethod("phone", function(value, element) {
        return this.optional(element) || /^([0-9]{11})$/.test(value);
    }, "请填写正确的手机号");

    // 邮箱验证
    jQuery.validator.addMethod("email", function(value, element) {
        return this.optional(element) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value);
    }, "请填写正确的邮箱");

    // 身份证号验证
    jQuery.validator.addMethod("idCard", function(value, element) {
        return this.optional(element) || /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value);
    }, "请填写15或18位身份证号");

});