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

// 选择排序
// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
// 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
// 重复第二步，直到所有元素均排序完毕。
 
const SelectionSort = (sourceArray) => {
    if(!Array.isArray(sourceArray) || !sourceArray.length) return sourceArray;
    const arr = [...sourceArray];
    const len = arr.length;
    for(let i = 0; i<len; i++){
        let minIndex = i;
        for(let j = i+1; j < len; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        if(minIndex !== i){
            const temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }

    }

    return arr;
}

console.log(SelectionSort(arr))

// 插入排序
// 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
// 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）
 
const InsertSort = (sourceArray) => {
    if(!Array.isArray(sourceArray) || !sourceArray.length) return sourceArray;
    const arr = [...sourceArray];
    const len = arr.length;
    for(let i = 1; i<len; i++){
        
        const temp = arr[i];
        let j = i;
        while(j>0 && temp < arr[j - 1]){
            arr[j] = arr[j - 1];
            j--
        }
        if(j !== i){
            arr[j] = temp
        }

    }

    return arr;
}


console.log(InsertSort(arr))