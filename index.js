

// callback => a function passed as a argument and run after the first function finishes

a = 3
b = 5

function multiply(first, second, cb) {
  let answer = first * second
  // request to an API - 4 sec

  setTimeout(() => {
      console.log(answer);
      cb(answer);
      // return answer
  }, 2000)
}

function checkAge(age) {
  console.log(age);
  if (age > 18) {
    console.log("over 18");
  } else if (age < 18) {
    console.log("under 18");
  }
}

let age = multiply(a, b, checkAge);
