/*
 * @Author: yt.gan 
 * @Date: 2018-03-29 16:54:01 
 * @Last Modified by: yt.gan
 * @Last Modified time: 2018-03-30 16:34:34
 */

 
function Queue() {
    this.dataStore = [];

    //队列添加元素
    this.enqueue = function(element) {
        return this.dataStore.push(element);
    };

    //删除第一个元素
    this.dequeue = function() {
        return this.dataStore.shift();
    };


    //返回队列首元素
    this.front = function() {
        return this.dataStore[0];
    };

    //返回队尾元素
    this.back = function() {
        return this.dataStore[this.dataStore.length - 1];
    };

    //转化为字符串
    this.toString = function() {
        var reStr = '';
        for (var i = 0; i < this.dataStore.length; ++i) {
            reStr += this.dataStore[i] + '\n';
        }
        return reStr;
    };

    //清空字符串
    this.empty = function() {
        if (this.dataStore.length == 0) {
            return true;
        } else {
            return false;
        }
    };
};

//test
// var queue = new Queue();

// queue.enqueue("Dvid");
// queue.enqueue("Tom");
// queue.enqueue("Amy");

// console.log(queue.dataStore);
// console.log(queue.dequeue());
// console.log("string:" + queue.toString());
// console.log(queue.front());
// console.log(queue.back());

/*
 * 使用队列进行基数排序
 * 分别把个位和十位放入队列
 * 然后对其排序
 * 
 */

var distribute = function(nums, queues, n, mode) { //digit表示为1代表个位，10代表10位  
    var i;
    for (i = 0; i < n; i++) {
        //将个位和十位分别放入对应1-10大小的队列容器里面
        if (mode === "ge") {
            queues[nums[i] % 10].enqueue(nums[i]);
        } else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
        }
    }
};


var collect = function(queues, nums) {

    //队列中收集数据
    var j = 0;
    for (var i = 0; i < 10; ++i) {
        while (!queues[i].empty()) {
            nums[j++] = queues[i].dequeue();
        }
    }
};

var queues = [];
var nums = [];
for (var i = 0; i < 10; ++i) {
    //定义十个队列，当做十个盒子
    queues[i] = new Queue();
}
for (var i = 0; i < 10; ++i) {
    nums[i] = Math.floor(Math.floor(Math.random() * 101));
}

distribute(nums, queues, 10, "ge");
collect(queues, nums);
distribute(nums, queues, 10, "shi");
collect(queues, nums);
console.log(nums);