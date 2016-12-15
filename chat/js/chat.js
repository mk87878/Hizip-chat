/**
 * Created by 张铭纹 on 2016/12/15.
 */
window.onload = function() {
    //实例并初始化hichat程序
    var hichat = new HiChat();
    hichat.init();
};

//定义hichat类
var HiChat = function() {
    this.socket = null;
};

//向原型添加业务方法
HiChat.prototype = {
    init: function() {//此方法初始化程序
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        this.socket.on('connect', function() {
            //连接到服务器后，显示昵称输入框
            $('#info').html('get yourself a nickname!');
            $('#nickWrapper').css('display','block');
            $('#nicknameInput').focus();
        });
    }
};