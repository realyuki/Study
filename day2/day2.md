### 1. Transpiler와 Bundler는 각각 무엇인가요?
- Transpiler: 코드의 문법을 다른 문법으로 변환하는 도구 (예: babel)
- Bundler: 여러 개의 모듈(파일)들을 하나의 파일로 묶어주는 도구 (예: webpack, rollup, esbuild)

### 2. webpack에서 loader와 plugin은 각각 무엇인가요??
- loader: 로더는 빌드 도구를 통한 빌드 과정에서 각 파일을 import 혹은 load할 때 모듈의 소스코드를 변형시키는 전처리 과정을 수행합니다.
- plugin: 번들링 과정 중에 추가적인 작업을 수행합니다.. 로더와 달리 파일을 변환하는 것이 아니라, 번들된 결과물에 대한 후처리를 수행합니다.

### 3. Webpack과 vite를 비교해 주세요.
- webpack
  - CommonJS, AMD, ES6 Module 포맷을 모두 지원합니다.
  - JS 뿐만 아니라 CSS, Image 등의 복잡한 의존성을 관리합니다.
  - Code Splitting
- esbuild
  - Go 언어로 작성되어 고성능의 빌드 속도를 자랑합니다. 
  - 여러 형식의 모듈을 지원합니다.
  - 병렬처리 최적화
  - 자체 Javascript 파서 사용
- rollup
  - rollup은 ES6 모듈 형태로 빌드할 수 있습니다.
  - webpack은 모듈들을 함수로 감싸서 평가하는 방식을 사용하지만 rollup은 모듈들을 호이스팅하여 한번에 평가하기에 성능상 이점이 있습니다.
  - 
- vite (https://ko.vitejs.dev/guide/why.html)
  - 강력한 개발서버
  - 모든 CommonJS 및 UMD 파일을 ESM으로 불러올 수 있도록 변환함
  - 별도의 설정이 없이 다양한 리소스 import 가능
  - CSS 빌드 최적화

### 4. Event Loop에 대해서 설명해 주세요.
자바스크립트 런타임 환경에서 비동기 작업을 처리하는 메커니즘입니다. 이벤트 루프는 Call Stack, Task Queue, Microtask Queue를 관리하면서 태스크를 실행하고, 비동기 작업의 콜백을 처리합니다.

#### 4-1. 마이크로 태스크 큐, 태스크 큐
- Microtask Queue: Promise의 콜백, MutationObserver의 콜백 등 마이크로태스크들이 쌓이는 큐입니다. 각 이벤트 루프 사이클의 끝에서 실행됩니다.
- Task Queue: setTimeout, setInterval 등의 콜백들이 쌓이는 큐입니다. 마이크로태스크가 모두 처리된 후 실행됩니다.
```ts
console.log('script start'); // A

setTimeout(function () { // B
  console.log('setTimeout');
}, 0);

Promise.resolve() 
  .then(function () { // C
    console.log('promise1');
  })
  .then(function () { // D
    console.log('promise2');
  });

console.log('script end'); // E

//script start
//script end
//promise1
//promise2
//setTimeout
```

### 5. var, let, const의 차이점에 대해 설명해 주세요.
- var: 함수 스코프, 변수 호이스팅, 재선언 가능
- let: 블록 스코프, 변수 호이스팅(초기화 이전 접근 불가), 재선언 불가
- const: 블록 스코프, 상수, 변수 호이스팅(초기화 이전 접근 불가), 재선언 불가, 값 변경 불가(객체의 속성은 변경 가능)

### 6. CSR, SSR, SSG, ISR에 대해서 각각 설명해 주세요.
- CSR (Client-Side Rendering): 클라이언트에서 자바스크립트를 이용해 렌더링하는 방식. 초기 로드 속도가 느리지만 이후 페이지 전환이 빠름.
- SSR (Server-Side Rendering): 서버에서 렌더링된 HTML을 클라이언트에 전달하는 방식. 초기 로드 속도가 빠르지만 서버 부하가 큼.
- SSG (Static Site Generation): 빌드 타임에 정적 HTML 파일을 생성하는 방식. 빠른 로드 속도와 낮은 서버 부하.
- ISR (Incremental Static Regeneration): SSG와 비슷하지만, 정적 페이지를 특정 주기마다 다시 생성. 새로운 데이터 반영 가능.

### 7. React Hydrate는 무엇인가요?
서버에서 렌더링된 HTML에 클라이언트에서 자바스크립트를 통해 이벤트 리스너 등을 추가하는 과정입니다. 기존 HTML 구조를 재사용하여 성능을 최적화합니다.

### 8. Next.js에서 app 라우터와 pages 라우터의 차이점은?
- App router
  - 레이아웃
  - 서버 컴포넌트
  - 스트리밍
  - Data fetching
  - 폴더명 기준으로 라우팅
  - 전체 애플리케이션에 대한 라우팅 및 탐색 처리
- Pages router
  - 클라이언트 컴포넌트
  - 폴더/파일명 기준으로 라우팅
  - 개별 페이지 내 라우팅 처리

