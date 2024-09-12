// function fibonacci(n) {
//     let fib = [0, 1];
    
//     for (let i = 2; i < n; i++) {
//         fib[i] = fib[i - 1] + fib[i - 2];
//     }
    
//     return fib;
// }


function primeFactors(n) {
    let factors = [];
    let divisor = 2;

    while (n >= 2) {
        if (n % divisor === 0) {
            factors.push(divisor);
            n = n / divisor;
        } else {
            divisor++;
        }
    }

    return factors;
}

let n = 100;  
let factorsArray = primeFactors(n);


let positionsArray = new Array(n).fill(null);  

for (let i = 0; i < factorsArray.length; i++) {
    positionsArray[i] = factorsArray[i]; 
}

console.log("Prime factors:", factorsArray);
console.log("Array with prime factors at specific positions:", positionsArray);


// let n = 100;
// let series = fibonacci(n);
// console.log(series);

// function findMinDiff(arr, n, m)
// {
     
  
//     if (m == 0 || n == 0)
//         return 0;
  
//     
//     arr.sort(function(a, b){return a - b});
  
    
//     if (n < m)
//         return -1;
  

//     let min_diff = Number.MAX_VALUE;
  

     
//     for(let i = 0; i + m - 1 < n; i++)
//     {
//         let diff = arr[i + m - 1] - arr[i];
          
//         if (diff < min_diff)
//             min_diff = diff;
//     }
//     return min_diff;
// }
 
// // Driver code
// let arr = [ 12, 4, 7, 9, 2, 23, 25, 
//             41, 30, 40, 28, 42, 30, 
//             44, 48, 43, 50 ];
             

// let m = 7; 
// let n = arr.length;
 
// document.write("Minimum difference is " + 
//                findMinDiff(arr, n, m));