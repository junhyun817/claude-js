// for (let i = 0; i < 10; i++) {
//   console.log('1234');
// }

// let result = '';
// for (let i = 1; i <= 100; i += 2) {
//   result += i;
// }
// console.log(result);

// let sum = 0;
// for (let i = 1; i <= 100; i++) {
//   sum += i;
// }
// console.log(sum);

// 1~100까지 중 7의 배수를 출력하세요

for (let i = 1; i <= 100; i++) {
  if (i % 7 == 0) {
    console.log(i)
  }
}

// 구구단 2단 만들기
for (let i = 1; i <= 9; i++) {
  console.log(`2 * ${i} = ${2 * i}`)
}

// 2단 ~ 9단까지 구구단 만들기
for(let i = 0; i < 8; i++){
    let dan = i + 2
    for(let j = 0; j < 9; j++){
        let value = j + 1
        console.log(`${dan} * ${value} = ${dan * value}`)
    }
}