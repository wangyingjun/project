// 冒泡排序
// 逐个比较相邻两个元素，大（或者小）的交换位置，最后一个就是最大（或最小）
// 重复前n-i 个 
// 优化点：如果一次遍历没有发生交换 证明已经排序 退出

const BubbleSort = (sourceArray) => {
    if(!Array.isArray(sourceArray) || !sourceArray.length) return sourceArray;
    const arr = [...sourceArray];
    const len = arr.length;
    for(let i = 1; i<len; i++){
        let isMove = false;

        for(let j = 0; j < len - i; j++){
            if(arr[j] > arr[j+1]){
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                isMove = true;
            }
        }
        if(!isMove){
            break;
        }

    }

    return arr;
}

let arr = [5,4,2,3,8]
console.log(BubbleSort(arr))