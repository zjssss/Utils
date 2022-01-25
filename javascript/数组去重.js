var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]

// 1 ES6 set  无法去掉空对象
function unique_one(arr) {
    let newArr = Array.from(new Set(arr));
    return newArr
}

// 2 两个for循环 splice去重  NAN和空对象没有去重
function unique_two(arr) {
    let len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--;
                len--;
            }
        }
    }
    return arr
}

// 利用数组的indexOf下标属性来查询 有则跳过 没有则添加 NAN和空对象没有去重
function unique_three(arr) {
    var array = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array;
}
// 利用sort0排序方法，然后根据排序后的结果进行遍历及相邻元素比对。NAN和空对象没有去重
function unique_four(arr) {
    arr = arr.sort()
    var array = [arr[0]]
    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i] !== arr[i - 1]) {
            array.push(arr[i])
        }
    }
    return array
}

// 利用includes检测是否有包含的值  空对象没有去重
function unique_five(arr) {
    var arr1 = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!arr1.includes(arr[i])) {
            arr1.push(arr[i]);
        }
    }
    return arr1;
}
// 利用hasOwnProperty判断是否存在对象属性 所有去重
function unique_six(arr) {
    var obj = {};
    let newArr = arr.filter((item, index, arr) => {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
    return newArr
}

function unique_seven(arr) {
    // 如果新数组的当前元素的索引值 == 该元素在原始数组中的第一个索引，则返回当前元素
    return arr.filter(function (item, index) {
        return arr.indexOf(item, 0) === index;
    });
}

// 多维数组去重

// 1 for循环去重
function morea_unique_one(data) {
    let list = [];
    let ids = [];
    for (let i in data) {
        if (ids.indexOf(data[i].id) == -1) {
            ids.push(data[i].id)
            list.push(data[i])
        }
    }
}

// 2 利用对象属性值的唯一性覆盖想同的数组
function morea_unique_two(arr) {
    let res = {}
    arr.forEach(item => {
        item.sort((a, b) => a - b);
        res[item] = item;
    });
    return Object.values(res)
}


// 数组对象去重
// es5冒泡排序法，去重arr
function deWeight() {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].name == arr[j].name) {
                arr.splice(j, 1);
                //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                j--;
            }
        }
    }
    return arr;
}
// es6的Map()
let deWeightThree = (arr3) => {
    let map = new Map();
    for (let item of arr3) {
        if (!map.has(item.name)) {
            map.set(item.name, item);
        }
    }
    return [...map.values()];
}

// es6 set
function set(arr){
    let arr1 = [...new set(arr)];
    return arr1;
}
// 对象法去重  利用reduce方法遍历数组
function deWeightFour() {
    var obj = {};
    arr = arr.reduce((item, next)=>{
        obj[next.key] ? '' : obj[next.key] = true && item.push(next);
        return item;
    }, []);
    return arr;
}