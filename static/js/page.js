/**
 * Created by XXL on 16/05/07.
 */
//分页信息
function PageInfo() {
    //地址
    this.url = "";
    //当前页码
    this.pageNum = 1;
    //每页显示条数
    this.pageSize = 10;
    //表单数据（没有则为空）
    this.formParams = "";
    this.entityOrField =false;
};

//分页信息对象
$.pageObj = new PageInfo();
//跳转页码
function toJumpPage(ele,pageSize) {
    var page = $('#jumpPage').val();
    toGoPage(page,pageSize);
}
console.info("创建分页对象")
//换页函数
function toGoPage(page,pageSize){
    if($.pageObj.url == "" || $.pageObj.url == null){
        $.pageObj = new PageInfo();
    }
    console.info("分页——"+pageSize)
    //获取浏览器地址栏地址
    var url = document.location.href;
    //表单参数
    var formJson = {};
    //如果有分页查询条件表单
    if(true && document.forms.searchForm) {
        //获取表单数据为json
        formJson = $(document.forms.searchForm).serializeObject();
        //地址为表单提交地址
        url = document.forms.searchForm.getAttribute("action");
    }
    //同一页时并且地址和上一次请求地址一致并且表单数据等于上一次请求的表单数据（没有表单或无表单数据时，表单数据和上一次请求的表单数据都未空）
    //以上条件都成立时则不进行数据查询
    // if($.pageObj.pageNum == page && $.pageObj.url == url && JSON.stringify(formJson) == $.pageObj.formParams){
    //     console.info('分页开始——————和上一次相同')
    //     console.info('分页开始——————和上一次相同'+page)
    //     console.info('分页开始——————和上一次相同'+url)
    //     return;
    // }
    //每页显示数量是否等于上一次的显示数量
    if(pageSize != $.pageObj.pageSize ){
     $.pageObj.pageSize = pageSize;
     }
    if($.pageObj.url == "" || $.pageObj.url != url){
        $.pageObj.pageSize = pageSize;
    }
    //组织分页参数
    var params = new Object();
        params.pageNum = page;
        params.pageSize = $.pageObj.pageSize;

    var json = {};
    if(true && document.forms.searchForm){
        var json = eval('('+(JSON.stringify(params)+JSON.stringify(formJson)).replace(/}{/,',')+')');
    }else{
        json = params;
    }
    //保持表单数据到分页信息对象
    $.pageObj.formParams = JSON.stringify(formJson);
    //保存当前页到分页信息对象
    $.pageObj.pageNum = page;
    //保存地址到分页信息对象
    $.pageObj.url = url;
    /*则去除URL后面拼接参数*/
    console.info("则去除URL后面拼接参数"+url)
    console.info("则去除URL后面拼接参数"+JSON.stringify(json))
    url = url.substring(0,url.indexOf("?")!=-1?url.indexOf("?"):url.length);
    url += "?";
    for(var key in json){
        url+=key+"="+json[key]+"&";
    }
    url = url.substring(0,url.lastIndexOf("&")!=-1?url.lastIndexOf("&"):url.length);
    //数据查询
    $.loadViewOrModal(url)
}

function reload() {
//获取浏览器地址栏地址
    var url = document.location.href;
    //表单参数
    var formJson = {};
    //如果有分页查询条件表单
    if(true && document.forms.searchForm) {
        //获取表单数据为json
        formJson = $(document.forms.searchForm).serializeObject();
        //地址为表单提交地址
        url = document.forms.searchForm.getAttribute("action");
    }
    //组织分页参数
    var params = new Object();
        // params.page = {};
        params.pageNum = $.pageObj.pageNum;
        params.pageSize = $.pageObj.pageSize;

    var json = {};
    if(true && document.forms.searchForm){
        var json = eval('('+(JSON.stringify(params)+JSON.stringify(formJson)).replace(/}{/,',')+')');
    }else{
        json = params;
    }
    //保存当前页到分页信息对象
    //保存地址到分页信息对象
    /*则去除URL后面拼接参数*/
    url = url.substring(0,url.indexOf("?")!=-1?url.indexOf("?"):url.length);
    url += "?";
    for(var key in json){
        url+=key+"="+json[key]+"&";
    }
    url = url.substring(0,url.lastIndexOf("&")!=-1?url.lastIndexOf("&"):url.length);
    //数据查询
    $.loadViewOrModal(url)
}

//将表单数据封装成json
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}