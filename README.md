1. 아래 코드의 실행 결과와 이유를 서술해주세요
   
   ```javascript
   console.log(1);
   const list = [1,2,3];
   list.forEach(async (item) => {
    await (new Promise((resolve) => resolve()))
    console.log(3);
   })
   console.log(2);
   ```
   
   + answer
   
   + ```javascript
     1
     2
     3
     3
     3
     ```
   
   우선 console.log(1)에 의해 첫 줄에 1이 로그에 찍히게 된다.
   
   forEach는 리스트의 원소를 하나씩 불러와서 실행하는 반복문이어서 list의 원소의 개수가 3개이므로 반복문은 3번 실행된다.
   
   forEach안에는 async await 구문이 있다. 이는 forEach함수 내부는 비동기적으로 호출이 된다는 얘기이다.
   
   그러므로 반복문이 실행되면서 그 아랫줄인 console.log(2)가 병렬적으로 실행이 된다.
   
   반복문 안에는 await (new Promise((resolve) => resolve()))이 존재한다. Promise 결과를 await해야하기 때문에 바깥의 console.log(2)가 먼저 실행이 된다.
   
   따라서 두번째 줄은 2이 로그에 찍히게 된다.
   
   await문 실행이 끝나고 다음 줄은 console.log(3)이다. 이것을 3번 실행하기 때문에
   
   결과는 위와 같이 나오게 된다.
   
   

2. 아래 코드의 실행 결과와 이유를 서술해주세요.
   만약 개선해야할 점이 있다면 어떻게 수정해야 하는지도 서술해주세요.
   
   ```javascript
   class Parent {
       value = 'parent';
       method() {
           function childMethod() {
               console.log(this.value);
           }
   				childMethod();
       }
   }
   ```
   
   + answer => undefined
   
   + function으로 선언할 때의 this는 전역을 가리킨다. 전역에서 value를 찾아야하는데 전역에는 value라는 변수가 없어서 undefined가 나오게 된다.
     
     
   
   + 개선점
   
   + ```javascript
     class Parent {
       value = "parent";
       method() {
         const childMethod = () => {
           console.log(this.value);
         };
         childMethod();
       }
     }
     ```
   
   + ES6의 arrow function을 쓰게 되면 함수 안에서의 this는 자신을 둘러싼 {} 부분의 this이다 즉 Parent를 가리키게 되며 그 안에 value라는 변수가 있으므로 정상적으로 parent를 출력하게 된다.
     
     

3. 아래 코드의 실행 결과와 이유를 서술해주세요.
   
   ```javascript
   function makeAdder(x) {
     return function (y) {
       return x + y;
     };
   }
   
   const add5 = makeAdder(5);
   const add10 = makeAdder(10);
   
   console.log(add5(2));
   console.log(add10(2));
   ```
+ answer

+ ```javascript
  7
  12
  ```

자바스크립트에서 함수는 first class 취급을 받는다.

똑같이 const add10 = makeAdder(10)가 실행이 되면 add10의 결과는 다음과 같다.

```javascript
// add5 결과
function (y) {
    return 5 + y;
}

// add10 결과
function (y) {
    return 10 + y;
}
```

console.log(add5(2));
console.log(add10(2));

두 문장을 실행하면 위 함수 매개변수 y에 각각 2를 넣는다.

따라서 결과 값은 5+2 = 7, 10+2 = 12로 7과 12가 나오게 된다.
