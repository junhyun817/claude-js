// 학생 정보와 점수를 변수에 저장
const name = "김철수";
const koreanScore = 85;
const mathScore = 92;
const englishScore = 78;

// 평균 계산
const average = (koreanScore + mathScore + englishScore) / 3;

// 합격/불합격 판정
if (average >= 60) {
  console.log(`${name}님의 평균점수: ${average.toFixed(2)}점`);
  console.log("결과: 합격");
} else {
  console.log(`${name}님의 평균점수: ${average.toFixed(2)}점`);
  console.log("결과: 불합격");
}
