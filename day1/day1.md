### 1. W3C는 뭐하는 곳인가요?
W3C(World Wide Web Consortium)는 웹 기술 표준을 개발하고 관리하는 국제적인 기구입니다. 웹의 장기적인 성장과 안정성을 보장하기 위해 HTML, CSS, XML, 그리고 다른 웹 기술에 대한 표준을 개발합니다.

#### 1-1. 표준이 정의되는 단계는?
W3C 표준은 다음과 같은 단계로 정의됩니다:

1. **Working Draft (WD)**: 초기 초안.
2. **Candidate Recommendation (CR)**: 실험 및 피드백을 위한 후보 추천.
3. **Proposed Recommendation (PR)**: 최종 검토 단계.
4. **Recommendation (REC)**: 최종 표준으로 채택.

#### 1-2 웹 표준이란? 웹 접근성이란?
웹 표준은 W3C와 같은 기구에서 제정한 기술적 명세로, 웹 페이지와 웹 애플리케이션의 호환성과 접근성을 보장합니다.  
웹 접근성은 장애를 가진 사람들이 웹 콘텐츠에 접근하고 이용할 수 있도록 보장하는 것을 의미합니다. 이는 시각, 청각, 이동성 등의 다양한 장애를 포함합니다.

### 2. 자바스크립트 표준은??
자바스크립트 표준은 ECMAScript(ES)라는 이름으로 정의됩니다. 이는 자바스크립트의 문법과 기능을 정의하는 명세입니다.

#### 2-1. ES6 란??

ES6(ECMAScript 2015)는 자바스크립트의 주요 업데이트 버전으로, 다음과 같은 새로운 기능들이 포함되어 있습니다:

- 화살표 함수
- 클래스
- 모듈
- 템플릿 리터럴
- 기본 매개변수
- let과 const

#### 2-2. ES7 이후
ES7(ECMAScript 2016) 이후, ECMAScript는 매년 새로운 버전을 출시합니다. 주요 업데이트는 다음과 같습니다:

- **ES7 (2016)**: 지수 연산자(거듭제곱), Array.prototype.includes
- **ES8 (2017)**: async/await, Object.values, Object.entries
- **ES9 (2018)**: Rest/Spread properties, Asynchronous Iteration
- **ES10 (2019)**: Array.prototype.flat, Object.fromEntries

### 3. 브라우저에 https://www.naver.com 입력 후 화면에 렌더링 되기까지의 모든 과정
1. **DNS 조회**: 도메인 네임을 IP 주소로 변환.
2. **TCP 연결**: 3-way handshake 과정을 통해 서버와 연결.
3. **HTTP/HTTPS 요청**: 브라우저가 서버에 요청 전송.
4. **응답 수신**: 서버가 HTML, CSS, JavaScript 등을 응답.
5. **HTML 파싱**: DOM 트리 생성.
6. **CSS 파싱**: CSSOM 트리 생성.
7. **렌더 트리 생성**: DOM과 CSSOM을 결합하여 렌더 트리 생성.
8. **레이아웃**: 각 요소의 위치와 크기 계산.
9. **페인트**: 화면에 픽셀을 그리기 시작.
10. **자바스크립트 실행**: 추가적인 동적 콘텐츠 처리.


### 4. Virtual DOM이란?
Virtual DOM은 실제 DOM을 추상화한 가벼운 사본입니다. React와 같은 라이브러리는 Virtual DOM을 사용하여 실제 DOM 변경을 최소화하고 성능을 최적화합니다.

### 5. Svelte는 Virtual DOM을 사용하지 않는데 차이점은??
Svelte는 컴파일 타임에 실제 DOM 변경을 미리 계산하여 업데이트를 직접 적용합니다. 이는 런타임에 Virtual DOM 비교가 필요 없음을 의미하며, 성능 이점이 있습니다.

### 6. CORS란?
CORS(Cross-Origin Resource Sharing)는 다른 출처의 리소스에 대한 접근을 제어하는 메커니즘입니다. 서버에서 적절한 헤더를 설정하여 해결할 수 있습니다.

#### 6-1 해결하는 방법은??
- **Access-Control-Allow-Origin** 헤더를 사용하여 특정 도메인을 허용.
- 프록시 서버를 사용하여 동일 출처 정책 우회.

### 7. CommonJS와 ESM의 차이점은??
- CommonJS: Node.js 환경에서 사용되는 모듈 시스템.
- ESM (ECMAScript Modules): 표준화된 자바스크립트 모듈 시스템.
```js
// CJS
const module = require('module');
module.exports = {};

// ESM
import module from 'module';
export default {};
```

### 8. null과 undefined의 차이점은?
- **null**: 의도적으로 값이 없음을 나타내기 위해 사용.
- **undefined**: 변수가 선언되었지만 값이 할당되지 않은 경우 자동으로 할당되는 값.
```js
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null
```
