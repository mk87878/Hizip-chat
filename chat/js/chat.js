/**
 * Created by 张铭纹 on 2016/12/15.
 */
$(window).on('load',function() {
    //实例并初始化hichat程序
    var hichat = new HiChat();
    hichat.init();
});

//定义hichat类
var HiChat = function() {
    this.socket = null;
};

//向原型添加业务方法
HiChat.prototype = {    //prototype:返回对象类型原型的引用,此处我理我为创建hichat的实例方法
    init: function() {//此方法初始化程序
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        this.socket.on('connect', function() {
            //连接到服务器后，显示昵称输入框
            $('#info').html('创建自己的昵称');
            $('#nickWrapper').css('display','block');
            $('#nicknameInput').focus();
        });

        //昵称设置的确定按钮
        $('#loginBtn').on('click',function() {
            var nickName = $('#nicknameInput').val();
            //检查昵称输入框是否为空
            if (nickName.trim().length != 0) {
                that.socket.emit('login', nickName);//不为空，则发起一个login事件并将输入的昵称发送到服务器
            } else {
                $('#nicknameInput').focus();//否则输入框获得焦点
            }
        });

        //显示昵称被占用的提示
        this.socket.on('nickExisted',function () {
            $('#info').html('昵称被占用');
        });

        //隐藏遮罩层显聊天界面
        this.socket.on('loginSuccess',function () {
            $(document).attr('title','Chat Name：' + $('#nicknameInput').val());
            $('#loginWrapper').css('display','none');//隐藏遮罩层显聊天界面
            $('#messageInput').focus();//让消息输入框获得焦点
        });

        //将在线人数显示到页面顶部并判断用户是连接还是离开
        this.socket.on('system', function(nickName, userCount, type) {
            var msg = nickName + (type == 'login' ? ' 已加入' : ' 已离开');
            that._displayNewMsg('system',msg,'red');
            // $('<p>').appendTo($('#historyMsg')).html(msg);//判断用户是连接还是离开以显示不同的信息
            $('#status').html(userCount + '个用户在线');//将在线人数显示到页面顶部
        });
    },

    _displayNewMsg:function (user,msg,color) {
        var container = $('#historyMsg'),
            msgToDisplay = $('<p>'),
            date = new Date().toTimeString().substr(0,8);
        msgToDisplay.css({
            color: color || '#000'
        });
        msgToDisplay.html(user + '<span class="time">(' + date + '): </span>'+ msg);
        container.append(msgToDisplay);
        container.scrollTop = container.scrollHeight;


    }
};

