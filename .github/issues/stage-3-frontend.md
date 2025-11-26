# Stage 3: Frontend Issues (FE-1 ~ FE-28)

---

## Issue #31

### Title
[Stage 3] FE-1: React + Vite 프로젝트 초기 설정

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
Vite를 사용하여 React 프로젝트를 초기화하고, 기본 프로젝트 구조를 설정합니다.

#### ✅ 완료 조건
- [ ] React + TypeScript + Vite 프로젝트 생성
- [ ] Node.js v20 LTS 설치 및 확인
- [ ] 기본 의존성 설치
- [ ] 프로젝트 폴더 구조 생성
- [ ] 개발 서버 정상 작동 확인
- [ ] .gitignore 파일 설정
- [ ] package.json 스크립트 설정
- [ ] README.md 기본 작성

#### 🔧 기술적 고려사항
- **기술 스택**: React 18+, Vite, TypeScript
- **주요 구현 사항**:
  - Vite 프로젝트 초기화
  - 기본 디렉토리 구조 설정
  - 개발 환경 구성
- **보안/성능 고려사항**:
  - .gitignore 설정으로 민감 파일 제외
  - Vite의 빠른 HMR 활용

#### 🔗 의존성
- **선행 작업**: 없음
- **후행 작업**: #32 (FE-2)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - FE-1](../../.claude/docs/8-execution-plan.md#task-fe-1-react--vite-프로젝트-초기-설정)
- [PRD - 기술 스택](../../.claude/docs/3-prd.md#81-기술-스택)

---

## Issue #32

### Title
[Stage 3] FE-2: TypeScript 설정 및 타입 정의

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
TypeScript strict 모드를 활성화하고, 프로젝트에 필요한 전역 타입 정의파일을 작성합니다.

#### ✅ 완료 조건
- [ ] tsconfig.json에서 strict mode 설정
- [ ] src/types/ 폴더 생성
- [ ] 전역 타입 정의 작성
- [ ] API 에러 타입 정의
- [ ] 페이지 컴포넌트 Props 타입 정의
- [ ] TypeScript 컴파일 에러 없음 확인

#### 🔧 기술적 고려사항
- **기술 스택**: TypeScript
- **주요 구현 사항**:
  - 타입 정의 파일 작성
  - strict mode 설정
  - API 타입 정의
- **보안/성능 고려사항**:
  - 타입 안전성 확보
  - 컴파일 타임 에러 검출

#### 🔗 의존성
- **선행 작업**: #31 (FE-1)
- **후행 작업**: #33 (FE-3)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-2](../../.claude/docs/8-execution-plan.md#task-fe-2-typescript-설정-및-타입-정의)
- [도메인 정의서](../../.claude/docs/1-domain-definition.md)

---

## Issue #33

### Title
[Stage 3] FE-3: Tailwind CSS 설정

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
Tailwind CSS를 프로젝트에 설치하고 설정합니다.

#### ✅ 완료 조건
- [ ] Tailwind CSS 설치
- [ ] tailwind.config.js, postcss.config.js 생성
- [ ] content 경로 설정
- [ ] 커스텀 색상 정의
- [ ] 커스텀 폰트 설정
- [ ] Tailwind 디렉티브 추가
- [ ] 전역 스타일 정의
- [ ] CSS 정상 번들링 확인

#### 🔧 기술적 고려사항
- **기술 스택**: Tailwind CSS, PostCSS
- **주요 구현 사항**:
  - Tailwind CSS 설정
  - 커스텀 테마 정의
  - 전역 스타일 설정
- **보안/성능 고려사항**:
  - PurgeCSS를 통한 최적화 (Tailwind 기본)
  - 미사용 CSS 제거

#### 🔗 의존성
- **선행 작업**: #31 (FE-1)
- **후행 작업**: #34 (FE-4)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-3](../../.claude/docs/8-execution-plan.md#task-fe-3-tailwind-css-설정)
- [PRD - UI/UX 가이드라인](../../.claude/docs/3-prd.md#6-uiux-가이드라인-uiux-guidelines)

---

## Issue #34

### Title
[Stage 3] FE-4: React Router 설정

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
React Router v6를 프로젝트에 설치하고, 라우팅 구조를 설정합니다.

#### ✅ 완료 조건
- [ ] react-router-dom 설치
- [ ] 라우터 설정
- [ ] 라우트 정의
- [ ] ProtectedRoute 컴포넌트 구현
- [ ] 라우트 변경 시 리다이렉트 처리
- [ ] 404 Not Found 페이지 추가
- [ ] 라우팅 정상 작동 확인

#### 🔧 기술적 고려사항
- **기술 스택**: React Router v6
- **주요 구현 사항**:
  - 라우팅 구조 설정
  - ProtectedRoute 컴포넌트
  - 404 페이지
- **보안/성능 고려사항**:
  - 인증 라우트 보호
  - 코드 스플리팅 (React.lazy)

#### 🔗 의존성
- **선행 작업**: #31 (FE-1), #32 (FE-2)
- **후행 작업**: #35 (FE-5)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - FE-4](../../.claude/docs/8-execution-plan.md#task-fe-4-react-router-설정)
- [PRD - 화면 플로우](../../.claude/docs/3-prd.md#4-화면-플로우-screen-flow)

---

## Issue #35

### Title
[Stage 3] FE-5: 회원가입 페이지 구현

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
회원가입 페이지를 구현합니다.

#### ✅ 완료 조건
- [ ] SignupPage.tsx 컴포넌트 생성
- [ ] 폼 레이아웃 구성
- [ ] Tailwind CSS 스타일 적용
- [ ] 클라이언트 측 입력값 검증 구현
- [ ] 폼 제출 처리
- [ ] 에러 메시지 표시
- [ ] 로그인 페이지 링크
- [ ] 로딩 중 상태 표시
- [ ] 반응형 확인

#### 🔧 기술적 고려사항
- **기술 스택**: React, TypeScript, Tailwind CSS
- **주요 구현 사항**:
  - 회원가입 폼 구현
  - 클라이언트 측 검증
  - 에러 처리
- **보안/성능 고려사항**:
  - 비밀번호 강도 검증
  - 입력값 검증

#### 🔗 의존성
- **선행 작업**: #33 (FE-3), #34 (FE-4)
- **후행 작업**: #39 (FE-9)

#### ⏱️ 예상 소요 시간
2.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-5](../../.claude/docs/8-execution-plan.md#task-fe-5-회원가입-페이지-구현)
- [PRD - 회원가입 페이지](../../.claude/docs/3-prd.md#41-주요-화면-목록)

---

## Issue #36

### Title
[Stage 3] FE-6: 로그인 페이지 구현

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
로그인 페이지를 구현합니다.

#### ✅ 완료 조건
- [ ] LoginPage.tsx 컴포넌트 생성
- [ ] 폼 레이아웃 구성
- [ ] Tailwind CSS 스타일 적용
- [ ] 클라이언트 측 입력값 검증
- [ ] 폼 제출 처리
- [ ] 에러 메시지 표시
- [ ] 회원가입 페이지 링크
- [ ] 로딩 중 상태 표시
- [ ] 반응형 확인

#### 🔧 기술적 고려사항
- **기술 스택**: React, TypeScript, Tailwind CSS
- **주요 구현 사항**:
  - 로그인 폼 구현
  - 클라이언트 측 검증
  - 에러 처리
- **보안/성능 고려사항**:
  - 입력값 검증
  - 에러 메시지 명확성

#### 🔗 의존성
- **선행 작업**: #33 (FE-3), #34 (FE-4)
- **후행 작업**: #40 (FE-10)

#### ⏱️ 예상 소요 시간
2.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-6](../../.claude/docs/8-execution-plan.md#task-fe-6-로그인-페이지-구현)
- [PRD - 로그인 페이지](../../.claude/docs/3-prd.md#41-주요-화면-목록)

---

## Issue #37

### Title
[Stage 3] FE-7: 인증 상태 관리 (Zustand)

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
Zustand를 사용하여 글로벌 인증 상태를 관리합니다.

#### ✅ 완료 조건
- [ ] Zustand 설치
- [ ] authStore.ts 생성
- [ ] Zustand 스토어 정의
- [ ] LocalStorage 토큰 저장/로드 기능 구현
- [ ] 페이지 새로고침 시 토큰 자동 로드
- [ ] TypeScript 타입 안전성 확인
- [ ] 스토어 사용 예제 작성

#### 🔧 기술적 고려사항
- **기술 스택**: Zustand, TypeScript
- **주요 구현 사항**:
  - 인증 상태 스토어
  - LocalStorage 연동
  - 토큰 관리
- **보안/성능 고려사항**:
  - 토큰 보안 (LocalStorage vs HttpOnly Cookie)
  - 자동 로그아웃 (토큰 만료)

#### 🔗 의존성
- **선행 작업**: #32 (FE-2)
- **후행 작업**: #38 (FE-8)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - FE-7](../../.claude/docs/8-execution-plan.md#task-fe-7-인증-상태-관리-zustand)
- [PRD - 인증 플로우](../../.claude/docs/3-prd.md#84-인증-플로우)

---

## Issue #38

### Title
[Stage 3] FE-8: Axios 설정 및 API 클라이언트

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
Axios를 설정하여 API 통신을 구현합니다.

#### ✅ 완료 조건
- [ ] Axios 설치
- [ ] axiosInstance.ts 생성
- [ ] 인증 관련 API 함수 정의
- [ ] 할일 관련 API 함수 정의
- [ ] 에러 처리 유틸리티 작성
- [ ] API 함수 타입 안전성 확인

#### 🔧 기술적 고려사항
- **기술 스택**: Axios, TypeScript
- **주요 구현 사항**:
  - Axios 인스턴스 설정
  - API 함수 정의
  - 인터셉터 설정
- **보안/성능 고려사항**:
  - Authorization 헤더 자동 설정
  - 에러 처리 및 재시도 로직

#### 🔗 의존성
- **선행 작업**: #32 (FE-2), #37 (FE-7)
- **후행 작업**: #39 (FE-9), #40 (FE-10)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - FE-8](../../.claude/docs/8-execution-plan.md#task-fe-8-axios-설정-및-api-클라이언트)
- [PRD - API 구조](../../.claude/docs/3-prd.md#82-아키텍처-설계)

---

## Issue #39

### Title
[Stage 3] FE-9: 회원가입 API 연동

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
회원가입 페이지를 API와 연결합니다.

#### ✅ 완료 조건
- [ ] 회원가입 페이지 수정
- [ ] signup 함수 호출
- [ ] API 응답 성공 시 처리
- [ ] API 응답 실패 시 처리
- [ ] 네트워크 요청 중 로딩 상태 관리
- [ ] 폼 초기화 처리
- [ ] 에러 로그 확인

#### 🔧 기술적 고려사항
- **기술 스택**: React, Axios
- **주요 구현 사항**:
  - API 연동
  - 응답 처리
  - 에러 핸들링
- **보안/성능 고려사항**:
  - 에러 메시지 표시
  - 성공 시 자동 로그인

#### 🔗 의존성
- **선행 작업**: #35 (FE-5), #38 (FE-8)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-9](../../.claude/docs/8-execution-plan.md#task-fe-9-회원가입-api-연동)
- [BE-4 이슈](#14) (백엔드 API)

---

## Issue #40

### Title
[Stage 3] FE-10: 로그인 API 연동

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
로그인 페이지를 API와 연결합니다.

#### ✅ 완료 조건
- [ ] 로그인 페이지 수정
- [ ] login 함수 호출
- [ ] API 응답 성공 시 처리
- [ ] API 응답 실패 시 처리
- [ ] 네트워크 요청 중 로딩 상태 관리
- [ ] 폼 초기화 처리

#### 🔧 기술적 고려사항
- **기술 스택**: React, Axios, Zustand
- **주요 구현 사항**:
  - API 연동
  - 토큰 저장
  - 리다이렉트 처리
- **보안/성능 고려사항**:
  - 토큰 안전하게 저장
  - 로그인 성공 시 할일 목록으로 이동

#### 🔗 의존성
- **선행 작업**: #36 (FE-6), #38 (FE-8)
- **후행 작업**: #42 (FE-12)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-10](../../.claude/docs/8-execution-plan.md#task-fe-10-로그인-api-연동)
- [BE-5 이슈](#15) (백엔드 API)

---

## Issue #41

### Title
[Stage 3] FE-11: React Query 설정

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
React Query (TanStack Query)를 설치하고 설정합니다.

#### ✅ 완료 조건
- [ ] React Query 설치
- [ ] QueryClient 생성
- [ ] QueryClientProvider로 앱 감싸기
- [ ] React Query DevTools 설치 및 설정

#### 🔧 기술적 고려사항
- **기술 스택**: React Query (TanStack Query)
- **주요 구현 사항**:
  - QueryClient 설정
  - Provider 설정
  - DevTools 설정
- **보안/성능 고려사항**:
  - 캐싱 전략 설정
  - staleTime, cacheTime 설정

#### 🔗 의존성
- **선행 작업**: #31 (FE-1)
- **후행 작업**: #42 (FE-12)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - FE-11](../../.claude/docs/8-execution-plan.md#task-fe-11-react-query-설정)
- [PRD - 기술 스택](../../.claude/docs/3-prd.md#81-기술-스택)

---

## Issue #42

### Title
[Stage 3] FE-12: 할일 목록 페이지 구현 (API 연동)

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: high

### Description

#### 📋 해야할 일
할일 목록 페이지를 구현하고 React Query를 사용하여 API와 연동합니다.

#### ✅ 완료 조건
- [ ] TodosPage.tsx 컴포넌트 생성
- [ ] 레이아웃 구성
- [ ] useQuery 훅으로 할일 목록 조회
- [ ] 로딩 상태 표시
- [ ] 에러 상태 표시
- [ ] 빈 상태 메시지 표시
- [ ] 할일 카드 컴포넌트 구현
- [ ] 반응형 스타일
- [ ] 날짜순 정렬 확인

#### 🔧 기술적 고려사항
- **기술 스택**: React, React Query, Tailwind CSS
- **주요 구현 사항**:
  - 할일 목록 페이지
  - React Query를 통한 데이터 페칭
  - 할일 카드 컴포넌트
- **보안/성능 고려사항**:
  - 캐싱을 통한 성능 최적화
  - 로딩/에러 상태 처리

#### 🔗 의존성
- **선행 작업**: #38 (FE-8), #41 (FE-11)
- **후행 작업**: #43 (FE-13), #49 (FE-19)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - FE-12](../../.claude/docs/8-execution-plan.md#task-fe-12-할일-목록-페이지-구현-api-연동)
- [PRD - 할일 목록 페이지](../../.claude/docs/3-prd.md#41-주요-화면-목록)

---

## Issue #43

### Title
[Stage 3] FE-13: 할일 추가 모달/폼 구현

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
할일을 추가하기 위한 모달 또는 폼을 구현합니다.

#### ✅ 완료 조건
- [ ] TodoModal.tsx 또는 TodoForm.tsx 컴포넌트 생성
- [ ] 폼 필드 구성
- [ ] 입력값 검증
- [ ] 저장/취소 버튼
- [ ] 모달/폼 스타일
- [ ] 모달 열기/닫기 상태 관리
- [ ] 모달 배경 클릭 시 닫기

#### 🔧 기술적 고려사항
- **기술 스택**: React, Tailwind CSS
- **주요 구현 사항**:
  - 모달 컴포넌트
  - 폼 필드 구성
  - 상태 관리
- **보안/성능 고려사항**:
  - 입력값 검증
  - ESC 키로 모달 닫기

#### 🔗 의존성
- **선행 작업**: #33 (FE-3)
- **후행 작업**: #44 (FE-14)

#### ⏱️ 예상 소요 시간
2.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-13](../../.claude/docs/8-execution-plan.md#task-fe-13-할일-추가-모달폼-구현)
- [PRD - 할일 추가 모달](../../.claude/docs/3-prd.md#41-주요-화면-목록)

---

## Issue #44

### Title
[Stage 3] FE-14: 할일 추가 API 연동

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
할일 추가 모달을 API와 연동합니다.

#### ✅ 완료 조건
- [ ] 모달에 API 호출 추가
- [ ] useMutation 훅 사용
- [ ] 로딩 중 버튼 비활성화
- [ ] 성공 시 모달 자동 닫기 및 폼 초기화
- [ ] 낙관적 업데이트 구현 (선택사항)
- [ ] 에러 메시지 표시

#### 🔧 기술적 고려사항
- **기술 스택**: React Query, Axios
- **주요 구현 사항**:
  - useMutation 훅 사용
  - API 연동
  - 캐시 무효화
- **보안/성능 고려사항**:
  - 성공 시 캐시 무효화로 목록 자동 갱신
  - 낙관적 업데이트로 UX 개선

#### 🔗 의존성
- **선행 작업**: #38 (FE-8), #43 (FE-13)
- **후행 작업**: #45 (FE-15)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-14](../../.claude/docs/8-execution-plan.md#task-fe-14-할일-추가-api-연동)
- [BE-9 이슈](#19) (백엔드 API)

---

## Issue #45

### Title
[Stage 3] FE-15: 할일 수정 모달/폼 구현

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
할일 수정을 위한 모달/폼을 구현합니다.

#### ✅ 완료 조건
- [ ] TodoEditModal.tsx 또는 기존 TodoModal 컴포넌트 수정
- [ ] 할일 ID를 props로 받아서 기존 데이터 로드
- [ ] 폼 필드에 기존 값 미리 채우기
- [ ] FE-13과 동일한 필드 구성
- [ ] 저장/취소 버튼
- [ ] 입력값 변경 감지
- [ ] Tailwind CSS 스타일 적용

#### 🔧 기술적 고려사항
- **기술 스택**: React, Tailwind CSS
- **주요 구현 사항**:
  - 수정 모달 컴포넌트
  - 기존 데이터 로드
  - 변경 감지
- **보안/성능 고려사항**:
  - 초기값 설정
  - 변경사항이 없으면 저장 불가

#### 🔗 의존성
- **선행 작업**: #33 (FE-3), #43 (FE-13)
- **후행 작업**: #46 (FE-16)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-15](../../.claude/docs/8-execution-plan.md#task-fe-15-할일-수정-모달폼-구현)
- [PRD - 할일 수정 모달](../../.claude/docs/3-prd.md#41-주요-화면-목록)

---

## Issue #46

### Title
[Stage 3] FE-16: 할일 수정 API 연동

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
할일 수정 모달을 API와 연동합니다.

#### ✅ 완료 조건
- [ ] 모달에 API 호출 추가
- [ ] useMutation 훅 사용
- [ ] 로딩 중 버튼 비활성화
- [ ] 성공 시 모달 자동 닫기
- [ ] 변경사항이 없으면 제출 불가능 (선택사항)
- [ ] 에러 메시지 표시

#### 🔧 기술적 고려사항
- **기술 스택**: React Query, Axios
- **주요 구현 사항**:
  - useMutation 훅 사용
  - API 연동
  - 캐시 무효화
- **보안/성능 고려사항**:
  - 성공 시 캐시 무효화
  - 낙관적 업데이트 (선택)

#### 🔗 의존성
- **선행 작업**: #38 (FE-8), #45 (FE-15)
- **후행 작업**: #47 (FE-17)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-16](../../.claude/docs/8-execution-plan.md#task-fe-16-할일-수정-api-연동)
- [BE-10 이슈](#20) (백엔드 API)

---

## Issue #47

### Title
[Stage 3] FE-17: 할일 삭제 확인 다이얼로그

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
할일 삭제 전 확인 다이얼로그를 구현합니다.

#### ✅ 완료 조건
- [ ] ConfirmDialog.tsx 또는 DeleteConfirmModal.tsx 컴포넌트 생성
- [ ] 다이얼로그 구성
- [ ] 다이얼로그 열기/닫기 상태 관리
- [ ] 배경 클릭 또는 취소 버튼으로 닫기
- [ ] Tailwind CSS 스타일
- [ ] 삭제할 할일 ID를 props로 받기
- [ ] onConfirm 콜백 함수 제공

#### 🔧 기술적 고려사항
- **기술 스택**: React, Tailwind CSS
- **주요 구현 사항**:
  - 확인 다이얼로그 컴포넌트
  - 콜백 함수 패턴
  - 상태 관리
- **보안/성능 고려사항**:
  - 실수로 삭제 방지
  - ESC 키로 닫기

#### 🔗 의존성
- **선행 작업**: #33 (FE-3)
- **후행 작업**: #48 (FE-18)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-17](../../.claude/docs/8-execution-plan.md#task-fe-17-할일-삭제-확인-다이얼로그)
- [PRD - 사용자 스토리](../../.claude/docs/3-prd.md#3-사용자-스토리-user-stories)

---

## Issue #48

### Title
[Stage 3] FE-18: 할일 삭제 API 연동

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
할일 삭제 다이얼로그를 API와 연동합니다.

#### ✅ 완료 조건
- [ ] 다이얼로그의 onConfirm 콜백에 API 호출 추가
- [ ] useMutation 훅 사용
- [ ] 로딩 중 버튼 비활성화
- [ ] 성공 시 할일 목록에서 삭제된 항목 제거
- [ ] 에러 메시지 표시
- [ ] 삭제 후 확인 메시지 (선택사항)

#### 🔧 기술적 고려사항
- **기술 스택**: React Query, Axios
- **주요 구현 사항**:
  - useMutation 훅 사용
  - API 연동
  - 캐시 무효화
- **보안/성능 고려사항**:
  - 성공 시 캐시 무효화
  - 낙관적 업데이트 (선택)

#### 🔗 의존성
- **선행 작업**: #38 (FE-8), #47 (FE-17)
- **후행 작업**: #49 (FE-19)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - FE-18](../../.claude/docs/8-execution-plan.md#task-fe-18-할일-삭제-api-연동)
- [BE-11 이슈](#21) (백엔드 API)

---

## Issue #49

### Title
[Stage 3] FE-19: 반응형 UI - 데스크톱 레이아웃

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
할일 목록 페이지의 데스크톱 레이아웃을 완성합니다.

#### ✅ 완료 조건
- [ ] 헤더 컴포넌트 구현
- [ ] 사이드바 컴포넌트 구현
- [ ] 메인 콘텐츠 영역
- [ ] 전체 레이아웃 (Header + Sidebar + Main)
- [ ] 색상 및 폰트 일관성 유지
- [ ] 데스크톱 화면 (1024px 이상) 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: React, Tailwind CSS
- **주요 구현 사항**:
  - 데스크톱 레이아웃
  - 헤더/사이드바 컴포넌트
  - 네이버 캘린더 스타일 적용
- **보안/성능 고려사항**:
  - 반응형 디자인 원칙 준수
  - Tailwind 브레이크포인트 활용

#### 🔗 의존성
- **선행 작업**: #33 (FE-3), #42 (FE-12)
- **후행 작업**: #50 (FE-20)

#### ⏱️ 예상 소요 시간
2.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-19](../../.claude/docs/8-execution-plan.md#task-fe-19-반응형-ui---데스크톱-레이아웃)
- [PRD - UI/UX 가이드라인](../../.claude/docs/3-prd.md#6-uiux-가이드라인-uiux-guidelines)

---

## Issue #50

### Title
[Stage 3] FE-20: 반응형 UI - 태블릿 레이아웃

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
할일 목록 페이지를 태블릿 화면에 맞게 조정합니다.

#### ✅ 완료 조건
- [ ] Tailwind 브레이크포인트 사용
- [ ] 태블릿 화면에서 사이드바 축소 또는 오버레이
- [ ] 메인 콘텐츠 너비 조정
- [ ] 할일 카드 레이아웃 조정
- [ ] 헤더와 네비게이션 조정
- [ ] 터치 친화적 버튼 크기 유지
- [ ] 태블릿 화면 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Tailwind CSS
- **주요 구현 사항**:
  - 태블릿 레이아웃 조정
  - 브레이크포인트 활용
  - 터치 UI 최적화
- **보안/성능 고려사항**:
  - 터치 대응 버튼 크기 (최소 44px)
  - 반응형 이미지

#### 🔗 의존성
- **선행 작업**: #49 (FE-19)
- **후행 작업**: #51 (FE-21)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-20](../../.claude/docs/8-execution-plan.md#task-fe-20-반응형-ui---태블릿-레이아웃)
- [PRD - 반응형 디자인](../../.claude/docs/3-prd.md#65-반응형-디자인)

---

## Issue #51

### Title
[Stage 3] FE-21: 반응형 UI - 모바일 레이아웃

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
할일 목록 페이지를 모바일 화면에 맞게 조정합니다.

#### ✅ 완료 조건
- [ ] Tailwind 브레이크포인트 사용
- [ ] 모바일 헤더에 햄버거 메뉴 버튼 추가
- [ ] 사이드바를 오버레이 모달로 변경
- [ ] 메인 콘텐츠 전체 너비 사용
- [ ] 할일 카드 레이아웃
- [ ] 모바일 최적화
- [ ] 모바일 화면 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Tailwind CSS, React
- **주요 구현 사항**:
  - 모바일 레이아웃
  - 햄버거 메뉴
  - 터치 UI 최적화
- **보안/성능 고려사항**:
  - 터치 대응 최적화
  - 작은 화면에서의 가독성

#### 🔗 의존성
- **선행 작업**: #49 (FE-19), #50 (FE-20)
- **후행 작업**: #55 (FE-25)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - FE-21](../../.claude/docs/8-execution-plan.md#task-fe-21-반응형-ui---모바일-레이아웃)
- [PRD - 반응형 디자인](../../.claude/docs/3-prd.md#65-반응형-디자인)

---

## Issue #52

### Title
[Stage 3] FE-22: 환경 변수 설정

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
프로젝트의 환경 변수를 설정합니다.

#### ✅ 완료 조건
- [ ] .env.example 파일 작성
- [ ] .env.local 파일 생성
- [ ] .env.production 파일 생성
- [ ] env.ts 파일에서 환경 변수 로드 및 검증
- [ ] Axios 설정에서 API_URL 사용
- [ ] .env.local을 .gitignore에 추가

#### 🔧 기술적 고려사항
- **기술 스택**: Vite, TypeScript
- **주요 구현 사항**:
  - 환경 변수 파일 설정
  - VITE_ 접두사 사용
  - 환경 변수 검증
- **보안/성능 고려사항**:
  - 민감 정보는 .env 파일로 관리
  - .gitignore에 .env.local 추가

#### 🔗 의존성
- **선행 작업**: #31 (FE-1)
- **후행 작업**: #53 (FE-23)

#### ⏱️ 예상 소요 시간
0.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-22](../../.claude/docs/8-execution-plan.md#task-fe-22-환경-변수-설정)
- [PRD - 환경 설정](../../.claude/docs/3-prd.md#115-환경-설정)

---

## Issue #53

### Title
[Stage 3] FE-23: 빌드 및 프로덕션 최적화

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
프로젝트 빌드 설정을 최적화하고, 번들 크기를 확인합니다.

#### ✅ 완료 조건
- [ ] pnpm build 명령 실행 성공
- [ ] 빌드 결과 확인
- [ ] 번들 크기 확인
- [ ] 빌드 설정 최적화
- [ ] 코드 스플리팅 확인
- [ ] pnpm preview로 프로덕션 빌드 로컬 테스트
- [ ] 번들 분석 도구 사용 (선택사항)

#### 🔧 기술적 고려사항
- **기술 스택**: Vite
- **주요 구현 사항**:
  - 빌드 설정 최적화
  - 번들 크기 분석
  - 코드 스플리팅
- **보안/성능 고려사항**:
  - 번들 크기 최적화 (< 500KB gzip)
  - Tree shaking 확인

#### 🔗 의존성
- **선행 작업**: #31 (FE-1), #33 (FE-3)
- **후행 작업**: #54 (FE-24)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - FE-23](../../.claude/docs/8-execution-plan.md#task-fe-23-빌드-및-프로덕션-최적화)
- [PRD - 성능 최적화](../../.claude/docs/3-prd.md#86-성능-최적화)

---

## Issue #54

### Title
[Stage 3] FE-24: Vercel 배포 설정

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
프로젝트를 Vercel에 배포합니다.

#### ✅ 완료 조건
- [ ] Vercel 계정 생성 및 로그인
- [ ] GitHub 저장소 연결
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정
- [ ] 배포 버튼 클릭 또는 Git 푸시 시 자동 배포 확인
- [ ] 배포된 URL 확인 및 테스트
- [ ] 커스텀 도메인 설정 (선택사항)

#### 🔧 기술적 고려사항
- **기술 스택**: Vercel, Git
- **주요 구현 사항**:
  - Vercel 프로젝트 설정
  - 환경 변수 설정
  - 자동 배포 설정
- **보안/성능 고려사항**:
  - 환경 변수 Vercel 대시보드에서 설정
  - HTTPS 자동 적용

#### 🔗 의존성
- **선행 작업**: #53 (FE-23)
- **후행 작업**: #55 (FE-25)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - FE-24](../../.claude/docs/8-execution-plan.md#task-fe-24-vercel-배포-설정)
- [PRD - 배포 및 인프라](../../.claude/docs/3-prd.md#81-기술-스택)

---

## Issue #55

### Title
[Stage 3] FE-25: 통합 테스트 및 QA

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: high

### Description

#### 📋 해야할 일
프로덕션 환경에서 전체 앱의 기능을 테스트합니다.

#### ✅ 완료 조건
- [ ] 회원가입 기능 테스트
- [ ] 로그인 기능 테스트
- [ ] 할일 관리 기능 테스트
- [ ] 인증 유지 테스트
- [ ] 반응형 디자인 테스트
- [ ] 성능 테스트 (Lighthouse)
- [ ] 에러 처리 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Lighthouse, Chrome DevTools
- **주요 구현 사항**:
  - 기능 테스트
  - 성능 테스트
  - 크로스 브라우저 테스트
- **보안/성능 고려사항**:
  - Lighthouse 점수 90 이상
  - 모든 주요 브라우저 테스트

#### 🔗 의존성
- **선행 작업**: #54 (FE-24)
- **후행 작업**: #56 (FE-26)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - FE-25](../../.claude/docs/8-execution-plan.md#task-fe-25-통합-테스트-및-qa)
- [PRD - 성공 지표](../../.claude/docs/3-prd.md#10-성공-지표-success-metrics)

---

## Issue #56

### Title
[Stage 3] FE-26: 버그 수정 및 UX 개선

### Labels
- 종류: bug
- 영역: frontend
- 복잡도: medium

### Description

#### 📋 해야할 일
QA 과정에서 발견된 버그를 수정하고, 사용자 경험을 개선합니다.

#### ✅ 완료 조건
- [ ] 발견된 모든 버그 수정
- [ ] 에러 메시지 명확성 개선
- [ ] 로딩 상태 UX 개선
- [ ] 빈 상태 메시지 개선
- [ ] 모바일 터치 대응 확인
- [ ] 접근성 개선
- [ ] 코드 리뷰 및 정리
- [ ] 최종 테스트 통과

#### 🔧 기술적 고려사항
- **기술 스택**: React, Tailwind CSS
- **주요 구현 사항**:
  - 버그 수정
  - UX 개선
  - 접근성 개선
- **보안/성능 고려사항**:
  - WCAG 2.1 AA 준수
  - 키보드 내비게이션 지원

#### 🔗 의존성
- **선행 작업**: #55 (FE-25)
- **후행 작업**: #57 (FE-27)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - FE-26](../../.claude/docs/8-execution-plan.md#task-fe-26-버그-수정-및-ux-개선)
- [PRD - 접근성](../../.claude/docs/3-prd.md#67-접근성-accessibility)

---

## Issue #57

### Title
[Stage 3] FE-27: README 및 문서 작성

### Labels
- 종류: documentation
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
프로젝트 README와 개발자 문서를 작성합니다.

#### ✅ 완료 조건
- [ ] README.md 작성
- [ ] 기여 가이드 (선택사항)
- [ ] 환경 변수 설정 가이드
- [ ] API 문서 링크
- [ ] 프로젝트 구조 설명
- [ ] 주요 의존성 설명

#### 🔧 기술적 고려사항
- **기술 스택**: Markdown
- **주요 구현 사항**:
  - README 작성
  - 개발 가이드 문서
  - 프로젝트 구조 설명
- **보안/성능 고려사항**:
  - 민감 정보 노출 방지
  - 명확한 설정 가이드

#### 🔗 의존성
- **선행 작업**: #56 (FE-26)
- **후행 작업**: #58 (FE-28)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - FE-27](../../.claude/docs/8-execution-plan.md#task-fe-27-readme-및-문서-작성)

---

## Issue #58

### Title
[Stage 3] FE-28: 성능 모니터링 및 로깅 (선택사항)

### Labels
- 종류: feature
- 영역: frontend
- 복잡도: low

### Description

#### 📋 해야할 일
프로덕션 환경에서 성능 및 에러를 모니터링합니다.

#### ✅ 완료 조건
- [ ] 성능 모니터링 도구 선택
- [ ] 도구 설치 및 설정
- [ ] 에러 로깅 구현
- [ ] 성능 메트릭 추적
- [ ] 대시보드 설정 및 알림 규칙 정의
- [ ] 처음 1주일 모니터링 후 분석

#### 🔧 기술적 고려사항
- **기술 스택**: Sentry, Google Analytics (선택)
- **주요 구현 사항**:
  - 에러 모니터링
  - 성능 메트릭 추적
  - 대시보드 설정
- **보안/성능 고려사항**:
  - 민감 정보 로깅 방지
  - 성능 영향 최소화

#### 🔗 의존성
- **선행 작업**: #54 (FE-24)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - FE-28](../../.claude/docs/8-execution-plan.md#task-fe-28-성능-모니터링-및-로깅-선택사항)
- [PRD - 모니터링](../../.claude/docs/3-prd.md#74-가용성-및-안정성)

---

**Total Issues: 28**
**Total Estimated Time: 40-45 hours**
