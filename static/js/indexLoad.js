/**
 * Created by 李欣彤 on 16/04/27.
 */

$(function () {

    $("body").pjax("a[href$='.view']","#contentBox",{push:true,timeout:8000,type:"POST"});//timeout 0 不重新发起请求

    /*加载动画*/
    $("#contentBox").on('pjax:send', function() {
        Pace.start();
    });
    $("#contentBox").on('pjax:end', function() {
        Pace.stop();
    });
    /*避免无限循环 返回false则不进行再次尝试请求*/
    $("#contentBox").on("pjax:error",function () {
        return false;
    })

    $("#contentBox").on("pjax:complete",function (xhr) {
        var node = $(xhr.relatedTarget);//取得点击的a标签
        node.closest("li").siblings().removeClass("active");
        node.closest("li").addClass("active");

        node.closest("li.treeview").siblings().removeClass("active");
        node.closest("li.treeview").addClass("active");
    });
    // $("body").pjax("a[href$='.modal']","#modalBody");


    // //加载完毕后改变菜单
    // $('#contentBox').bind('pjax.end', function(){
    //     selectMenu();
    // });

//     $.pjax({
//         selector: "a[href$='.modal']",
// //            selector: "a[href$='.do']",
//         container: '#modalBody', //内容替换的容器
//         show: 'fade',  //展现的动画，支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
//         cache: false,  //是否使用缓存
//         storage: false,  //是否使用本地存储
//         titleSuffix: '', //标题后缀
//         push:false,
//         title:$("title").text(),
//         filter: function(){},
//         callback: function(){}
//     });

    //菜单点击选中
    $(".treeview-menu li a[href$='.view']").on("click",function (node) {
        $(node).closest("li").siblings().removeClass("active");
        $(node).closest("li").addClass("active");
    });

    //为菜单添加选择效果
    function selectMenu(url) {
        var node = $(".treeview-menu li a[href$='"+url+"']");
        node.closest("li").siblings().removeClass("active");
        node.closest("li").addClass("active");

        node.closest("li.treeview").siblings().removeClass("active");
        node.closest("li.treeview").addClass("active");
    }

    /**
     * 定义公用跳转方法
     * @param url 需要跳转的URL 地址后缀为.view则加载内容盒子 后缀为.modal则加载拟态框盒子
     * @param prarm 请求参数 不传则使用get方式 否则使用post
     */
    $.loadViewOrModal = function pjaxSkip(url,prarm) {
        if (!url) url = document.location.href;

        var suffix = url.substring(url.lastIndexOf(".")+1,url.length);
        /*去除参数部分*/
        suffix = suffix.substring(0,suffix.indexOf("?")!=-1?suffix.indexOf("?"):suffix.length);
        if (suffix != "view" && suffix != "modal"){
                return;
        }
        var ajaxType = "get";
        if (prarm){
            ajaxType="post";
            /*如果传入参数 则去除URL后面拼接参数*/
            url = url.substring(0,url.indexOf("?")!=-1?url.indexOf("?"):url.length);
        }
        var vessel;
        if (suffix=="view"){
            vessel ="#contentBox";
        }else{
            vessel ="#modalBody";
        }
        $(vessel).empty();
        //发起pjax请求
        // if(params){
        //     console.info('刷新------参数：'+params)
        // }
        $.pjax({url: url, container: vessel,push:false,timeout:8000,method:ajaxType,data:prarm});
        // $.ajax({
        //     url:  url
        //     ,dataType: 'html'
        //     ,type:ajaxType
        //     ,data:prarm
        //     ,beforeSend: function(xhr){
        //         xhr.setRequestHeader('X-PJAX', 'true')
        //     },
        //     success: function(data){
        //         if (suffix=="view"){
        //             $('#contentBox').html(data);
        //             history.pushState(null, $(data).filter('title').text(), url);
        //         }else{
        //             $('#modalBody').html(data);
        //         }
        //     }
        // });
    };

    //初始化左侧菜单
    if ($("#INDEX_BACK_URL").prop("value")) {
        var url = $("#INDEX_BACK_URL").val().trim();
        if(!url) return;//空url不做处理
        selectMenu(url);
        $.loadViewOrModal(url);
    }
});

