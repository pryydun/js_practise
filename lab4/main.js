function generateArray(size) {
  let arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 1000));
  }

  return arr;
}

let normalArray = generateArray(100);
let sparseArray = [...normalArray];

sparseArray[10] = undefined;
 
sparseArray[275] = undefined;

console.log("========== ЗВИЧАЙНИЙ МАСИВ ==========");
console.log("Початковий масив:", normalArray);

console.log("Bubble Sort ASC:");
console.log(LIBRARY.bubbleSort(normalArray, "asc"));

console.log("Selection Sort ASC:");
console.log(LIBRARY.selectionSort(normalArray, "asc"));

console.log("Insertion Sort ASC:");
console.log(LIBRARY.insertionSort(normalArray, "asc"));

console.log("Shell Sort ASC:");
console.log(LIBRARY.shellSort(normalArray, "asc"));

console.log("Quick Sort ASC:");
console.log(LIBRARY.quickSort(normalArray, "asc"));

console.log("========== РОЗРІДЖЕНИЙ МАСИВ ==========");
console.log("Початковий масив:", sparseArray);

console.log("Bubble Sort DESC:");
console.log(LIBRARY.bubbleSort(sparseArray, "desc"));

console.log("Selection Sort DESC:");
console.log(LIBRARY.selectionSort(sparseArray, "desc"));

console.log("Insertion Sort DESC:");
console.log(LIBRARY.insertionSort(sparseArray, "desc"));

console.log("Shell Sort DESC:");
console.log(LIBRARY.shellSort(sparseArray, "desc"));

console.log("Quick Sort DESC:");
console.log(LIBRARY.quickSort(sparseArray, "desc"));