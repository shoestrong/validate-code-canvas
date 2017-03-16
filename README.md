### 生成图形验证码
###### 调用

```
var verifyCode = new GVerify(param);
```

###### 参数

```
// param为对象
param = {
  id:"st_container", // 容器id
  canvasId:"verifyCanvas",// canvas的id
  width:"100",// 默认canvas的width
  height:"30",// 默认canvas的height
  type:"",// 图形验证码类型: 默认(数字与字母)、letter(字母)、number(数字)
  code:""
}
// param为字符串
param = "st_container"; // 获取ID
```

###### 方法

```
verifyCode.refresh(); // 生成验证码
verifyCode.validate(code); // 校验，code为校验值
```