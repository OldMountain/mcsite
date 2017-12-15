/**
 * Created by 李欣彤 on 16/04/27.
 */

(function ($) {
    /**
     * 打开拟态框
     * @param options               参数对象
     * @param options.title         弹出框标题
     * @param options.height        拟态框高度
     * @param options.width         拟态框宽度 默认自适应
     * @param options.url           打开的URL 如果options.body字段有值则优先使用body内容填充
     * @param options.body          拟态框内容
     * @param options.foot          拟态框底部
     * @param options.onShown()     对用户完全可见时回调方法
     * @param options.onHide()      试图关闭窗口时回调方法 返回false则不关闭
     * @param options.onHidden()    对用户完全不可见时回调方法
     * @param options.disabledShut      设置无法取消
     * @constructor
     */

    var defaultBody = "<div style='text-align: center;width: 100%'><i class='fa fa-2x fa-spinner fa-pulse'></i></div>";

    $.OpenModal = function OpenModal(options) {
        var modal = $('#modal');

//       ========================================================================================
        $('#modal').find(".modal-footer").css("display","none");
        if(options.foot){
            $('#modal .modal-footer').css('text-align',options.footStyle);
            $('#modal .modal-footer').html('<button type="button" style="border-width: 0px" class="btn btn-default" data-dismiss="modal">'+options.foot+'</button>');
            $('#modal .modal-footer .btn').css('background-color',options.footColor);
        }

        if(options.contentStyle){
            modal.find(".modal-content").css(options.contentStyle);
        }
        if(options.bodyStyle){
            modal.find(".modal-body").css(options.bodyStyle);
        }

        if(options.disabledShut){
            modal.modal({
                backdrop: 'static',
                keyboard: false, // 按下esc不能退出
            });
            modal.find(".close").remove();
        }

//       ========================================================================================
        //设置宽高
        $("#modal>.modal-dialog")
            .css("height", options.height+"px")
            .css("width", options.width+"px");

        $("#modalTitle").html(options.title);
        //当拟态框打开时
        // modal.on('show.bs.modal', function () {
        //     iframe.attr("src", options.url);//初始化框架
        // });

        //对用户完全可见时
        if (typeof options.onShown == "function") {
            modal.one('shown.bs.modal', function () {
                options.onShown();
            });
        }
        //试图关闭窗口时
        if (typeof options.onHide == "function") {
            modal.one('hide.bs.modal', function () {
                return options.onHide();
            });
        }

        //窗口对用户不可见时
        modal.one('hidden.bs.modal', function () {
            if (typeof options.onHidden == "function") {
                options.onHidden();
                $('#modalBody').html(defaultBody);
            }
            options = null;
            //去除宽高
            $("#modal>.modal-dialog").attr("style","");
            //解除绑定事件
            modal.unbind("shown.bs.modal");
            modal.unbind("hide.bs.modal");
        });

        if(options.body){
            $('#modalBody').html(options.body);
            //打开弹出框
            modal.modal("show");
        }else{

            $.pjax({url: options.url, container: "#modalBody",push:false,timeout:0});
            $("#modalBody").one("pjax:complete",function (xhr) {
                modal.modal("show");
            });
            // //发起Pjax请求
            // $.ajax({
            //     url:  options.url,
            //     dataType: 'html',
            //     beforeSend: function(xhr){
            //         xhr.setRequestHeader('X-PJAX', 'true')
            //     },
            //     success: function(data){
            //         $('#modalBody').html(data);
            //         //打开弹出框
            //         modal.modal("show");
            //         //pushState
            //         // history.pushState(null, $(data).filter('title').text(), options.url)
            //     }
            // });
        }



    };

    /**
     * 关闭拟态框
     */
    $.closeModal = function closeModal() {
        $('#modal').modal('hide');//关闭拟态框
    };
    /**
     * 拟态框显示foot
     */
    $.showFoot = function closeModal() {
        $('#modal').find(".modal-footer").css("display","block");
    };


    /**
     * 打开询问框
     * @param options       参数对象
     * @param options.title 提示框标题 默认值为 "提示"
     * @param options.body  提示框内容
     * @param options.OK()  点击确认时回调方法
     * @constructor
     */
    $.OpenConfirm = function (options) {
        var confirm = $('#confirm');
        $("#confirmTitle").html(options.title);
        $("#confirmBody").html(options.body);

        if (typeof options.OK == "function") {
            $("#confirm_btn_OK").one("click",function () {
                confirm.one('hidden.bs.modal', function () {
                    if (typeof options.OK == "function") {
                        options.OK();
                    }
                });
                confirm.modal("hide");
            });
        }

        confirm.one('hidden.bs.modal', function () {
            $("#confirmTitle").html("提示");
            $('#confirmBody').html(defaultBody);
            $("#confirm_btn_OK").unbind("click");//解除绑定
        });
        confirm.modal({keyboard: true});//按下esc退出
        //打开弹出框
        confirm.modal("show");
    }

    /**
     * 打开对话框
     * @param options       参数对象
     * @param options.title 提示框标题 默认值为 "提示"
     * @param options.body  提示框内容
     * @param options.OK()  点击确认时回调方法
     * @constructor
     */
    $.OpenAlert = function (options) {
        var alert = $('#alert');
        $("#alertTitle").html(options.title);
        $("#alertBody").html(options.body);

        $("#alert_btn_OK").one("click",function () {
            alert.one('hidden.bs.modal', function () {
                if (typeof options.OK == "function") {
                    options.OK();
                }
            });
            alert.modal("hide");

        });

        alert.one('hidden.bs.modal', function () {
            $("#alertTitle").html("提示");
            $('#alertBody').html(defaultBody);
            $("#alert_btn_OK").unbind("click");//解除绑定
        });
        alert.modal({keyboard: true});//按下esc退出
        //打开弹出框
        alert.modal("show");
    }
})(jQuery);