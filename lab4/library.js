const LIBRARY = {
  bubbleSort(arr, order) {
    let countOperations = 0;
    let countComparisons = 0;

    let undefinedCount = arr.filter(item => item === undefined).length;
    let result = arr.filter(item => item !== undefined);

    if (order === "asc") {
      for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
          countComparisons++;
          if (result[j] > result[j + 1]) {
            let temp = result[j];
            result[j] = result[j + 1];
            result[j + 1] = temp;
            countOperations++;
          }
        }
      }
    } else if (order === "desc") {
      for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
          countComparisons++;
          if (result[j] < result[j + 1]) {
            let temp = result[j];
            result[j] = result[j + 1];
            result[j + 1] = temp;
            countOperations++;
          }
        }
      }
    }

    for (let i = 0; i < undefinedCount; i++) {
      result.push(undefined);
    }

    console.log("Кількість порівнянь:", countComparisons);
    console.log("Кількість обмінів:", countOperations);
    return result;
  },

  selectionSort(arr, order) {
    let countOperations = 0;
    let countComparisons = 0;

    let undefinedCount = arr.filter(item => item === undefined).length;
    let result = arr.filter(item => item !== undefined);

    if (order === "asc") {
      for (let i = 0; i < result.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < result.length; j++) {
          countComparisons++;
          if (result[j] < result[min]) {
            min = j;
          }
        }

        if (min !== i) {
          let temp = result[i];
          result[i] = result[min];
          result[min] = temp;
          countOperations++;
        }
      }
    } else if (order === "desc") {
      for (let i = 0; i < result.length - 1; i++) {
        let max = i;

        for (let j = i + 1; j < result.length; j++) {
          countComparisons++;
          if (result[j] > result[max]) {
            max = j;
          }
        }

        if (max !== i) {
          let temp = result[i];
          result[i] = result[max];
          result[max] = temp;
          countOperations++;
        }
      }
    }

    for (let i = 0; i < undefinedCount; i++) {
      result.push(undefined);
    }

    console.log("Кількість порівнянь:", countComparisons);
    console.log("Кількість обмінів:", countOperations);
    return result;
  },

  insertionSort(arr, order) {
    let countOperations = 0;
    let countComparisons = 0;

    let undefinedCount = arr.filter(item => item === undefined).length;
    let result = arr.filter(item => item !== undefined);

    if (order === "asc") {
      for (let i = 1; i < result.length; i++) {
        let element = result[i];
        let j = i;

        while (j > 0) {
          countComparisons++;
          if (result[j - 1] > element) {
            result[j] = result[j - 1];
            j = j - 1;
            countOperations++;
          } else {
            break;
          }
        }

        result[j] = element;
      }
    } else if (order === "desc") {
      for (let i = 1; i < result.length; i++) {
        let element = result[i];
        let j = i;

        while (j > 0) {
          countComparisons++;
          if (result[j - 1] < element) {
            result[j] = result[j - 1];
            j = j - 1;
            countOperations++;
          } else {
            break;
          }
        }

        result[j] = element;
      }
    }

    for (let i = 0; i < undefinedCount; i++) {
      result.push(undefined);
    }

    console.log("Кількість порівнянь:", countComparisons);
    console.log("Кількість переміщень:", countOperations);
    return result;
  },

  shellSort(arr, order) {
    let countOperations = 0;
    let countComparisons = 0;

    let undefinedCount = arr.filter(item => item === undefined).length;
    let result = arr.filter(item => item !== undefined);

    let gap = Math.floor(result.length / 2);

    if (order === "asc") {
      while (gap > 0) {
        for (let i = gap; i < result.length; i++) {
          let temp = result[i];
          let j = i;

          while (j >= gap) {
            countComparisons++;
            if (result[j - gap] > temp) {
              result[j] = result[j - gap];
              j = j - gap;
              countOperations++;
            } else {
              break;
            }
          }

          result[j] = temp;
        }

        gap = Math.floor(gap / 2);
      }
    } else if (order === "desc") {
      while (gap > 0) {
        for (let i = gap; i < result.length; i++) {
          let temp = result[i];
          let j = i;

          while (j >= gap) {
            countComparisons++;
            if (result[j - gap] < temp) {
              result[j] = result[j - gap];
              j = j - gap;
              countOperations++;
            } else {
              break;
            }
          }

          result[j] = temp;
        }

        gap = Math.floor(gap / 2);
      }
    }

    for (let i = 0; i < undefinedCount; i++) {
      result.push(undefined);
    }

    console.log("Кількість порівнянь:", countComparisons);
    console.log("Кількість переміщень:", countOperations);
    return result;
  },

  quickSort(arr, order) {
    let countOperations = 0;
    let countComparisons = 0;

    let undefinedCount = arr.filter(item => item === undefined).length;
    let result = arr.filter(item => item !== undefined);

    function sort(left, right) {
      let i = left;
      let j = right;
      let pivot = result[Math.floor((left + right) / 2)];

      while (i <= j) {
        if (order === "asc") {
          while (result[i] < pivot) {
            countComparisons++;
            i++;
          }
          countComparisons++;

          while (result[j] > pivot) {
            countComparisons++;
            j--;
          }
          countComparisons++;
        } else if (order === "desc") {
          while (result[i] > pivot) {
            countComparisons++;
            i++;
          }
          countComparisons++;

          while (result[j] < pivot) {
            countComparisons++;
            j--;
          }
          countComparisons++;
        }

        if (i <= j) {
          let temp = result[i];
          result[i] = result[j];
          result[j] = temp;
          i++;
          j--;
          countOperations++;
        }
      }

      if (left < j) sort(left, j);
      if (i < right) sort(i, right);
    }

    if (result.length > 1) {
      sort(0, result.length - 1);
    }

    for (let i = 0; i < undefinedCount; i++) {
      result.push(undefined);
    }

    console.log("Кількість порівнянь:", countComparisons);
    console.log("Кількість обмінів:", countOperations);
    return result;
  }
};









