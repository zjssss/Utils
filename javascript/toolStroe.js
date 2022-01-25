
/** 
 * 使用blob实现文件下载导出 需要请求后端接口
 *  responseType: 'blob' 需要在axios设置responseType处理乱码
 * @param fileName 文件名 Blob参数 后端返回的文件流
*/
createBlob = function (fileName) {
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(new Blob([data]), fileName + '.xls')
  } else {
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName + '.xls')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link); //下载完成移除元素
    window.URL.revokeObjectURL(url); //释放掉blob对象
  }
};

/** 
 * 吸顶效果 需要监测元素的scroll事件 滚动到哪里触发
 * @param 事件源对象  
 * isFixed 的样式是 固定定位
*/
ceiling = function (e) {
  if (e.target.scrollTop >= this.headerTop) {
    document.getElementsByClassName("is-stretch")[0].classList.add("isFixed");
  } else {
    document.getElementsByClassName("is-stretch")[0].classList.remove("isFixed");
  }
};

/** 
 * 判断一个变量的类型
 * typeof  null  输出  object =>[object Null]
   typeof  {}  输出  object => [object Object]
   typeof  []  输出  object => [object Array]
*/
judgeType = function (target) {
  var ret = typeof (target);
  return ret == "object" ? Object.prototype.toString.call(target) : ret
}

/** 
 * 判断一个对象是否为空
*/
isNullObj = function (obj) {
  return JSON.stringify(obj) === '{}' && Object.keys(obj).length === 0
};

// 判断一个对象是否有某个属性
getObJproperty = () => {
  // 两个方法
  return obj.hasOwnProperty(属性名)
  //    if(!obj.name)
}

// 把多个数组对象转成一个数组对象
changeObj = () => {
  let newPersonList = []
  newArr.map(function (value, index, array) {
    newPersonList = newPersonList.concat(value)
  })
}

// 把对象数组转成数组对象
objChangeArr = () => {
  let newArr = []
  for (const key in this.personInfo) {
    if (this.personInfo.hasOwnProperty(key)) {
      newArr.push(this.personInfo[key])
    }
  }
}

// 遍历每一个数组对象添加相同的属性
addSameProperty = () => {
  callUnitList: this.beUnitId.map(item => ({ unitId: item }))
}


// 实现年月日的分割  把年月日放成上下两行
//   使用变量 { { getTimeByDateTime(item.datetime).date } }
function getTimeByDateTime(datetime) {
  let arr = datetime.split(' ');
  return {
    date: arr[0],
    time: arr[1]
  };
}



/** 
 * 旋转木马  可以给li添加过渡属性
 * 把数组第一个类名取出来，删除第一个
 * 把刚刚取出来的数据放到数组最后
*/
rotateHorse = function () {
  // 获取全部需要操作的标签的类名
  var classArr = ["zuo3", "zuo2", "zhong", "you2", "you3"];
  arrRight.addEventListener("click", function () {
    var res = classArr.shift();
    classArr.push(res);
    lis.forEach((v, i) => lis[i].className = classArr[i])
  });
};

/** 
 * 电商放大镜效果
*/
zoomMirror = function () {
  // 鼠标移入分区  显示遮罩层  显示大图盒子
  box.addEventListener("mouseover", function () {
    mask.style.display = "block";
    big.style.display = "block";
  });
  box.addEventListener("mouseout", function () {
    mask.style.display = "none";
    big.style.display = "none";
  });
  // 获取分区偏移值
  var boxLeft = box.offsetLeft;
  var boxTop = box.offsetTop;
  var boxWidth = box.offsetWidth;
  var boxHeight = box.offsetHeight;
  // 给分区添加鼠标移动事件
  box.addEventListener("mousemove", function (event) {
    // 4.4 获取 遮罩盒子 宽度和高度
    var maskWidth = mask.offsetWidth;
    var maskHeight = mask.offsetHeight;
    // 4.1 获取鼠标基于页面的坐标
    var x = event.pageX - boxLeft - maskWidth / 2;
    var y = event.pageY - boxTop - maskHeight / 2;
    // 4.5 遮罩盒子移动边界处理,遮罩 盒子相当于 整个分区 定位
    // 左边界处理，不能小于 0
    if (x < 0) x = 0;
    // 上边界处理，不能小于 0
    if (y < 0) y = 0;
    // 右边界处理，右边最大边界：大盒子宽度 - 遮罩盒子宽度
    if (x > boxWidth - maskWidth) {
      x = boxWidth - maskWidth;
    }
    // 下边界处理，下边最大边界：大盒子高度 - 遮罩盒子高度
    if (y > boxHeight - maskHeight) {
      y = boxHeight - maskHeight;
    }
    // 4.2 把坐标设置给 遮罩盒子，让遮罩盒子移动
    mask.style.left = x + "px";
    mask.style.top = y + "px";
    // 4.7 获取大图的宽度和高度
    var bigImgWidth = bigImg.offsetWidth;
    var bigImgHeight = bigImg.offsetHeight;
    // 4.6 把坐标设置给 大图片盒子，让图片也能移动
    // 遮罩盒子移动的坐标值要乘以 《比例》 才是大图移动坐标
    // 大图和小图的《比例》 = 大图宽度 / 小图宽度
    // 和遮罩盒子移动方向是相反的，所以需要乘以 -1
    bigImg.style.left = -1 * x * (bigImgWidth / boxWidth) + "px";
    bigImg.style.top = -1 * y * (bigImgHeight / boxHeight) + "px";
  })
};

/** 
 * 原生文件上传
*/
uploadFile = function () {

};

/** 
 * 实现四舍五入后的百分比计算
 * 除数和被除数都为0 结果 NaN
 * 除数为0 结果  Infinity
 * 保险起见传进来的参数先全部转为浮点数类型
*/
calculate = function (num1, num2) {
  return num1 === 0 || num2 === 0 ? 0 : Math.round(parseFloat(num1) / parseFloat(num2) * 10000) / 100 + "%";
}

/** 
 * 
 * 移动端视口   理想视口  布局视口
 * 默认理想视口<meta name="viewport" content="width=device-width, initial-scale=1.0">
 * 大项目推荐视口
 * device-width  设备宽度  自动识别
 * initial-scale  初始化缩放  1.0默认不缩放
 * ser-scalable  是否允许用户手动缩放 用手势
*/

viewport = () => {
  <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1,minimum-scale=1,user-scalable=no" />
}

// 设置cookie过期时间 使用js_cookies
cookie = () => {
  Cookies.set('name', 'value', {
    expires: 7,
  });
}


兄弟选择器和子元素选择器
// 兄弟选择器加号“+”，可以选择指定元素相邻的下一个元素
// 兄弟元素选择器‘~’，可以选择指定元素后的，同级的相同的所有元素。
// 子元素选择器“>”,选择指定元素的所有子元素(仅限子元素，孙的不计）

/** 
 * 在vue中嵌套iframe页面的一些问题
 * 
*/

  //调用iframe页面中的方法
  this.$refs.video.contentWindow.方法名()
  //vue页面引用iframe的地方设置一个id并且设置一个data-属性
  parent.document.getElementById("task").dataset.sessionid

  //子页面调用父页面的方法 父页面挂载一个方法在window上
  function transFer() {
        let that=this;
        window.addTab = function(obj) {
          that.flag=obj;
        };
      }
   window.parent.addTab(true)





// js获取宽高和偏移值
/** 
 * 原生  
 * offsetLeft   offsetTop   offsetWidth offsetHeight      
*JQ     
 offset().top  offset().lef  width()   height（）
*/


// 前端设置cookie
var setCookit = function () {
  document.cookie = `token=${token}`
}
var ClearCookit = function () {
  document.cookie = 'token=""'
}

// 判断手机端与浏览器
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  window.location.href = "https://www.baidu.com/";
} else {
  window.location.href = "http://news.baidu.com/";  
}

// 判断移动端的 IOS android
function mobile() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isiOS
}

/**
* 判断是否是微信环境
*/
function getIsWxClient() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  }
  return false
}

// url 解析获取到code  analysisUrl(window.location.href)
function analysisUrl(url) {
  const urlJson = new URL(url)
  console.log(urlJson)
  return urlJson.search?.split('=')[1]?.split('&')[0]
}

// 生成一个随机颜色
function rgb() {//rgb颜色随机
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = '(' + r + ',' + g + ',' + b + ')';
  return rgb;
}
// 正则匹配模糊查询
function selectMatchItem(lists, keyWord) {
  if (!keyWord) return;
  let reg = new RegExp(keyWord);
  let resArr = [];
  resArr = lists.filter(res => reg.test(res.speciesName));
  return resArr;
}

// 利用canvas获取图片主颜色
// 获取颜色
function getColor() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = canvas.createImage()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 300, 150)
    const data = ctx.getImageData(0, 0, 300, 150).data;
    getUniqueColor(data)
    // img.src = that.data.swiperImgs[e.detail.current]
  }
}
// 计算颜色
function getUniqueColor(imageData) {
  let res_r = 0
  let res_g = 0
  let res_b = 0
  let res_a = 0
  for (let i = 0; i < imageData.length; i += 1) {
    if (i % 4 === 0) {
      res_r += imageData[i]
    } else if (i % 4 === 1) {
      res_g += imageData[i]
    } else if (i % 4 === 2) {
      res_b += imageData[i]
    } else if (i % 4 === 3) {
      res_a += imageData[i]
    }
  }
  res_r = Math.round(res_r / (imageData.length / 4))
  res_g = Math.round(res_g / (imageData.length / 4))
  res_b = Math.round(res_b / (imageData.length / 4))
  res_a = Math.round(res_a / (imageData.length / 4))
  return `rgba(${res_r},${res_g},${res_b},${res_a})`
}

// html5的接口FileReader将文件转换成base64编码格式
function fileReader(files) {
  var fileReader = new FileReader()
  fileReader.readAsDataURL(files)
  fileReader.onload = event => {
    let originalUrl = event.target.result
    // 使用canvas进行图片压缩
  }
}
// 使用canvas进行图片压缩
function compressPicture(blob) {
  var quality = 0.5
  var image = new Image()
  image.setAttribute('crossOrigin', 'Anonymous')
  image.src = blob
  let vm = this
  image.onload = function () {
    var width = that.width
    var height = that.height
    width = width / 4
    height = height / 4
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    ctx.drawImage(that, 0, 0, width, height)
    let base64Url = canvas.toDataURL('image/jpeg', quality)
  }
}

//  颜色转换 rbga转16进制 两个参数 数组rgb 和 a
function rgbaToHexColor(rgbaArray, alphaMaxVal = 1) {
  //补位警号
  return "#" + rgbaArray.map((chanel, index) => {
    let hexNum = "";
    if (index === 3) {
      //这是alpha通道
      hexNum = Number(Math.round(chanel * 255 / alphaMaxVal)).toString(16);
    } else {
      //普通通道直接转换
      hexNum = Number(chanel).toString(16)
    }
    return hexNum.length === 1 ? '0' + hexNum : hexNum; //这里解决了部分通道数字小于10的情况进行补位
  }).join("");
}

//  颜色转换 16进制转rbga 两个参数 
function hexColorToRgba(hexColor, alphaMaxVal = 1) {

  hexColor = hexColor.replace("#", "");
  //用于分割16进制色彩通道
  let reg = new RegExp("\\w{1,2}", "g");
  //分割颜色通道
  let rgbaArray255 = hexColor.match(reg);
  rgbaArray255 = rgbaArray255.map((channel, index) => {
    //计算每个通道的10进制值
    let colorVal = parseInt(channel, 16);
    if (index === 3) {
      //这是alpha通道
      return Math.round(colorVal / (255 / alphaMaxVal) * 100) / 100
    }
    return colorVal;
  });
  // return rgbaArray255;
  return "rgba(" + rgbaArray255.join(",") + ")";
}

//   高德地图定位
function getCoordinates() {
  let vm = this;
  AMap.plugin("AMap.Geolocation", function () {
    let geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000
    });
    geolocation.getCurrentPosition();
    //这里需要调用成功和失败两个回调函数
    AMap.event.addListener(geolocation, "complete", vm.onComplete);
    AMap.event.addListener(geolocation, "error", vm.onError);
  });
}

// 计时器函数
function calcTimer() {
  let timerRecord = { hour: '00', min: '00', second: '00' };
  let totalClock = 0;
  timerRecord.second = showNum(totalClock % 60);
  timerRecord.min = showNum(parseInt((totalClock / 60) % 60));
  timerRecord.hour = showNum(parseInt(totalClock / 60 / 60));
}
//封装一个处理单位数字的函数
function showNum(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

// 生成children变成树结构函数 参数是数组
function sortArr(arr) {
  // 深拷贝一份数据
  var copy = JSON.parse(JSON.stringify(arr));
  // 创建一个存储数据的对象
  var obj = {};
  // 遍历数据，将数据所有数据添加到对象中，key为数据id，value为原数据对象
  copy.forEach((item, index) => {
    obj[item.id] = item;
  });
  // 创建一个最终返回的数组
  var res = [];
  // 遍历数据开始处理
  copy.forEach(item => {
    // 将root数据添加进res数组， 因为数据使引用类型，子元素数据都会带过来，下面的循环会处理子元素数据
    if (item.parentId === 0) {
      res.push(item);
    }
    // 梳理子元素数据
    for (var key in obj) {
      //   当一层元素id 和 二层元素pId一致，那么，二层遍历的元素就是一层遍历元素的children
      if (item.id === obj[key].parentId) {
        // 处理数据children
        if (item.children) {
          item.children.push(obj[key]);
        } else {
          item.children = [obj[key]];
        }
      }
    }
  });
  return res;
}
// 图片上传之前
function imgBeforeUpload(file) {
  let types = ['image/jpeg', 'image/png'];
  const isImage = types.includes(file.type);
  const isLtSize = file.size / 1024 / 1024 < 5;
  if (!isImage) {
    this.$message.error('上传图片只能是 JPG、PNG 格式!');
    return false;
  }
  if (!isLtSize) {
    this.$message.error('上传图片大小不能超过 15MB!');
    return false;
  }
  return true;
}
// 视频上传之前
function videoBeforeUpload(file) {
  // let types = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'];
  let types = ['video/mp4']
  const isVideo = types.includes(file.type);
  const isLtSize = file.size / 1024 / 1024 < 200;
  if (!isVideo) {
    this.$message.error('上传视频只能是 mp4 格式!');
    return false;
  }
  if (!isLtSize) {
    this.$message.error('上传图片大小不能超过 200MB!');
    return false;
  }
  return true;
}

// 多个判断进行优化
function verifyIdentity(identityId) {
  if ([1, 2, 3, 4].includes(identityId)) {
    return '你的身份合法，请通行！'
  } else {
    return '你的身份不合法'
  }
}

// for循环优化 var i = 0, i<arr.length;i++
// 传统循环当数组的长度到达百万级时，arr.length 就要计算一百万次，这是相当耗性能的
for (var i = 0, length = arr.length; i < length; i++) {
  console.log(arr[i])
}

// vue轮播图
// 1表示container向右移动，-1表示container向左移动；偏移量是600，也就是一张图片的宽度  默认是600
// 如果移动到7张图片的最后一张，就把container拉到7张图片里的第二张；如果移动到7张图片里第一张，就把container拉到7张图片里的第5张
function move(offset, direction) {
  // 切换小圆点
  direction === -1 ? this.currentIndex++ : this.currentIndex--
  if (this.currentIndex > 5) this.currentIndex = 1
  if (this.currentIndex < 1) this.currentIndex = 5
  // 切换图片偏移量
  this.distance += this.distance * direction
  if (this.distance < -3000) this.distance = -600
  if (this.distance > -600) this.distance = -3000
}

// 点击跳到对应的锚点 Vue 
  this.$refs.opt[index].scrollIntoView(true);

// 递归函数 判断children添加
function recursionFun(tempArr) {
  let newTempArr = JSON.parse(JSON.stringify(tempArr));
  let arr = [];
  newTempArr.map(item => {
    let obj= {
      id: item.id,
      value: item.id,
      label: item.label,
    };
     if (item.children.length > 0) {
      obj.children = this.recursionFun(item.children);
    }
    arr.push(obj)
  });
  return arr
}

