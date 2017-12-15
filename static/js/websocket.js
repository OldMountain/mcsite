/**
 *@param params	参数json格式
 params参数列表
 url	地址
 onopen 链接服务器成功事件
 onmessage 接收到服务器传过来的数据的处理事件
 onclose 连接关闭的处理事件
 onerror 连接发生错误的处理事件
 onbeforeunload 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接 默认false
 outLog 是否打印日志
 chonglian 是否断线重连
 */
/**
 * 是否打印日志
 * @type {boolean}
 */
var logger = window.console;
function MoorgenWebSocket(params){
    this.outLog = false;			//是否打印日志
    this.params = params;			//参数 Object
    this.url = "ws://localhost";	//请求地址	String
    this.onopen = null;		//连接成功建立的回调方法  function(e)
    this.onmessage = null;	//接收到消息的回调方法  function(e)
    this.onclose = null;	//连接关闭的回调方法 function(e)
    this.onerror = null;	//连接发生错误的回调方法  function(e)
    this.onbeforeunload = false;	//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，服务端会抛异常。 Boolean
    this.socket = null;		//WebSocket对象
    this.timer = null;
    this.chonglian = false;
    this.init();
}
//初始化事件
MoorgenWebSocket.prototype.init = function(params){
    if(this.params == null || this.params == "" || this.params == {}){
        this.params = params;
    }
    if(null != this.params.url && this.params.url.trim() != ""){
        this.url = this.params.url;
    }
    if(null != this.params.outLog && "" != this.params.outLog){
        this.outLog = this.params.outLog;
    }
    if(null != this.params.chonglian && "" != this.params.chonglian){
        this.chonglian = this.params.chonglian;
    }
    this.onopen = this.params.onopen;
    this.onmessage = this.params.onmessage;
    this.onclose = this.params.onclose;
    this.onerror = this.params.onerror;
    this.onbeforeunload = this.params.onbeforeunload;
    this.printLog("连接服务器地址：" + this.url)
    if ('WebSocket' in window) {
        try {
            this.socket = new WebSocket(this.url);
        } catch (emsg) {
        }
    } else if ('MozWebSocket' in window) {
        this.socket = new MozWebSocket(this.url);
    } else {
        this.printLog("无法连接服务，请检查网络！");
        return;
    }
    var thisWebSocket = this;
    thisWebSocket.bindMethod();
    if(this.onbeforeunload){
        window.onbeforeunload = function(){
            thisWebSocket.socket.close();
        }
    }

}

MoorgenWebSocket.prototype.bindMethod = function () {
    var thisWebSocket = this;
    this.socket.onopen = function(e)//通过onopen事件句柄来监听socket的打开事件
    {
        thisWebSocket.printLog("服务器连接成功！连接地址：" + thisWebSocket.url)
        if(typeof thisWebSocket.onopen == "function"){
            thisWebSocket.onopen(e);
        }
    }
    this.socket.onmessage = function(response){//通过onmessage事件句柄接受服务器传过来的数据
        thisWebSocket.printLog("get:" + response.data)
        if(typeof thisWebSocket.onmessage == "function"){
            thisWebSocket.onmessage(response);
        }
    }
    this.socket.onclose = function(e){
        thisWebSocket.printLog("服务器连接关闭！")
        if(typeof thisWebSocket.onclose == "function"){//通过onclose事件句柄监听socket的关闭事件
            thisWebSocket.onclose(e);
        }
        if(thisWebSocket.chonglian){
            window.setTimeout(function(){
                thisWebSocket.printLog("服务器正在尝试重连！")
                if ('WebSocket' in window) {
                    try {
                        thisWebSocket.socket = new WebSocket(thisWebSocket.url);
                    } catch (emsg) {
                    }
                } else if ('MozWebSocket' in window) {
                    thisWebSocket.socket = new MozWebSocket(thisWebSocket.url);
                }
                thisWebSocket.bindMethod();
            },5000);
        }

    }
    this.socket.onerror = function(e){//通过onerror事件句柄监听链接发送错误事件
        thisWebSocket.printLog("服务器连接失败！")
        if(typeof thisWebSocket.onerror == "function"){
            thisWebSocket.onerror(e);
        }
    }
}

//向服务器发送数据
MoorgenWebSocket.prototype.send = function(param){
    if(this.socket == null){
        logger.error(" MoorgenWebSocket Not yet initialized");
        alert("MoorgenWebSocket Not yet initialized");
    }else{
        var msg = "";
        if(param instanceof Object){
            msg = JSON.stringify(param);
            msg = msg.replace(/\"/g,"\'");
        }else{
            msg = param;
        }
        this.printLog("send：" + msg)
        this.socket.send(msg);
    }
}

//关闭连接
MoorgenWebSocket.prototype.close = function(){
    this.chonglian = false,
        this.socket.close();
}
//打开一个新的链接
MoorgenWebSocket.prototype.open = function(){
    this.init();
    return this;
}
/** 打印输出log日志 */
MoorgenWebSocket.prototype.printLog = function(msg) {
    if (this.outLog) {
        console.log(msg);
    }
}

//通过Function.prototype增加一个method方法，我们不必键入prototype这个属性名，就可以为一个对象创建方法了
//给基本类型增加方法，可以大大增加JS的表现力
/*基本类型的原型是公共的结构，因此在添加时首先确定下没有此方法*/
Function.prototype.method = function(name,func){
    if(!this.prototype[name]){
        this.prototype[name] = func;
    }
    return this;
}
//去空格方法 " hello ".trim()
String.method("trim",function(){
    var reg = /^\s+|\s+$/g;
    return this.replace(reg,"");
});
//去空格方法 trim(" hello ")
function trim(str){
    var reg = /^\s+|\s+$/g;
    return str.replace(reg,"");
}