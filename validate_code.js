!(function(window,document){
    function GVerify(options){      // 创建一个图形验证码对象，接收options对象为参数
        this.options = {
            id:"",                  // 容器id
            canvasId:"verifyCanvas",// canvas的id
            width:"100",            // 默认canvas的width
            height:"30",            // 默认canvas的height
            type:"",               // 图形验证码类型: 默认(数字与字母)、letter(字母)、number(数字)
            code:""
        }

        if(Object.prototype.toString.call(options) == '[object Object]'){   // 判断传入参数是否为对象
            for(var i in options){  // 根据传入的参数，修改默认参数值
                this.options[i] =options[i];
            }
        }else{
            this.options.id = options;
        }

        this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(",");
        this.options.letterArr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(",");

        this._init();
        this.refresh();
    }

    GVerify.prototype = {
        // 初始化
        _init:function(){
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            this.options.width = con.offsetWidth>0?con.offsetWidth:"100";
            this.options.height = con.offsetHeight>0?con.offsetHeight:"30";
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = 'pointer';
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function(){
                parent.refresh();
            }
        },
        // 生成验证码
        refresh:function(){

            this.options.code = "";

            var canvas = document.getElementById(this.options.canvasId);
            if(canvas.getContext){
                var ctx = canvas.getContext("2d");
            }
            ctx.textBaseline = "middle";

            ctx.fillStyle = randomColor(100,240);
            ctx.fillRect(0,0,this.options.width,this.options.height);

            var txtArr;
            if(this.options.type=="letter"){
                txtArr = this.options.letterArr;
            }else if(this.options.type == "number"){
                txtArr = this.options.numArr;
            }else{
                txtArr = this.options.numArr.concat(this.options.letterArr);
            }

            for(var i=1;i<=4;i++){
                var txt = txtArr[randomNum(0,txtArr.length)];
                this.options.code += txt;
                ctx.font = randomNum(this.options.height/2,this.options.height)+'px Simhei';    // 随机生成字体大小
                ctx.fillStyle = randomColor(50,160);    // 随机生成字体颜色
                ctx.shadowOffsetX = randomNum(-2,2);
                ctx.shadowOffsetY = randomNum(-2,2);
                ctx.shadowBlur = randomNum(-2,2);
                ctx.shadowColor = "rgba(0,0,0,.6)";
                var x = this.options.width/5 * i;
                var y = this.options.height/2;
                var deg = randomNum(-30,30);
                // 设置旋转角度和坐标原点
                ctx.translate(x,y);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(txt,0,0);
                // 恢复旋转角度和坐标原点
                ctx.rotate(-deg*Math.PI/180);
                ctx.translate(-x,-y);
            }
        },
        // 校验
        validate:function(code){
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            if(code == v_code){
                return true;
            }else{
                return false;
            }
        }
    }

    // 生成一个随机数
    function randomNum(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }
    // 生成一个随机色
    function randomColor(min,max){
        var r = randomNum(min,max);
        var g = randomNum(min,max);
        var b = randomNum(min,max);
        return "rgb("+r+","+g+","+b+")";
    }

    window.GVerify = GVerify;
})(window,document);