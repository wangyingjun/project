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

// 归并排序
// 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
// 设定两个指针，最初位置分别为两个已经排序序列的起始位置；
// 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
// 重复步骤 3 直到某一指针达到序列尾；
// 将另一序列剩下的所有元素直接复制到合并序列尾。

const merge = (left, right) => {
    let arr = [];
    while(left.length>0 && right.length>0){
        if(left[0] < right[0]){
            arr.push(left.shift())
        }else{
            arr.push(right.shift())
        }
    }
    if(left.length> 0){
        arr = arr.concat(left)
    }
    if(right.length> 0){
        arr = arr.concat(right)
    }
    return arr;
};
const MergeSort = (sourceArray) => {
    if(!Array.isArray(sourceArray) || !sourceArray.length) return sourceArray;
    const arr = [...sourceArray];

    if(arr.length < 2){
        return arr;
    }

    const middleIndex = Math.floor(arr.length / 2);
    const left = arr.splice(0, middleIndex);
    const right = arr;

    return merge(MergeSort(left), MergeSort(right))

}
console.log('MergeSort',MergeSort(arr))

// 快速排序
// 从数列中挑出一个元素，称为 “基准”（pivot）;
// 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序；

const QuickSort = (sourceArray) => {
    if(!Array.isArray(sourceArray) || !sourceArray.length) return sourceArray;
    if(sourceArray.length < 1) return sourceArray;
    const arr = [...sourceArray];

    const middleIndex = Math.floor(arr.length / 2);
    const pivot = arr[middleIndex];
    const left = [];
    const right = [];
    for(let i = 0; i < arr.length; i++){
        if(i === middleIndex) continue;
        if(arr[i]>pivot){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }

    return QuickSort(left).concat(pivot).concat(QuickSort(right))

}

let arr2 = [3,5,8,9,4,1,2,6,7]
console.log('QuickSort', QuickSort(arr2))