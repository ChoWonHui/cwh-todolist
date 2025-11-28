# cwh-todolist Frontend

할일 관리 애플리케이션의 프론트엔드입니다. React, TypeScript, Vite, Tailwind CSS를 사용하여 구현되었습니다.

## 기능

- 회원가입 및 로그인
- 할일 생성, 수정, 삭제
- 할일 목록 보기
- 반응형 웹 디자인 (데스크톱, 태블릿, 모바일 지원)

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Zustand (상태 관리)
- React Query (TanStack Query)
- Axios (API 통신)

## 프로젝트 구조

```
frontend/
├── public/
├── src/
│   ├── assets/           # 정적 자원
│   ├── components/       # React 컴포넌트
│   │   ├── common/       # 공통 컴포넌트
│   │   └── todo/         # 할일 관련 컴포넌트
│   ├── config/           # 설정 파일
│   ├── hooks/            # 커스텀 훅
│   ├── pages/            # 페이지 컴포넌트
│   ├── services/         # API 서비스
│   ├── store/            # 전역 상태 관리
│   ├── styles/           # 전역 스타일
│   ├── test/             # 테스트 파일
│   ├── types/            # TypeScript 타입 정의
│   ├── utils/            # 유틸리티 함수
│   ├── App.tsx           # 메인 애플리케이션 컴포넌트
│   ├── main.tsx          # 애플리케이션 진입점
│   └── providers/        # React Providers
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── tsconfig.json
└── vite.config.ts
```

## 설치 및 실행

### 사전 준비

- Node.js (v20 이상)
- npm 또는 yarn

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd frontend

# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# 백엔드 API URL
VITE_API_URL=http://localhost:3000/api
# 또는 배포 환경의 백엔드 URL
# VITE_API_URL=https://your-backend-url.com/api

# API 요청 타임아웃 (밀리초)
VITE_API_TIMEOUT=10000

# 애플리케이션 환경
VITE_APP_ENV=development
```

### 실행

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 빌드 미리보기
npm run preview

# 코드 포맷팅
npm run format

# ESLint 검사
npm run lint

# 타입 검사
npm run type-check
```

## API 연동

프론트엔드는 백엔드 API와 연동되어 작동합니다. API 연동은 `src/services/api.ts` 파일에서 관리됩니다.

### 인증
- 로그인/회원가입 시 JWT 토큰을 받아 `localStorage`에 저장
- 이후 API 요청 시 요청 헤더에 자동으로 토큰이 포함됨

### 인터셉터
- 요청 인터셉터: 인증 토큰을 요청 헤더에 자동 추가
- 응답 인터셉터: 401 에러 시 자동 로그아웃 처리

## 상태 관리

- 인증 상태: Zustand를 사용한 전역 상태 관리 (`src/store/authStore.ts`)
- API 데이터: React Query를 사용한 서버 상태 관리

## 라우팅

- 인증이 필요한 페이지는 `ProtectedRoute` 컴포넌트를 통해 보호
- `/login`, `/signup`: 비로그인 상태에서 접근 가능
- `/todos`: 로그인 상태에서만 접근 가능

## 컴포넌트

### 공통 컴포넌트
- `Layout.tsx`: 레이아웃 컴포넌트 (헤더, 사이드바 포함)
- 기타 공통 컴포넌트는 `src/components/common` 디렉토리에 위치

### 할일 관련 컴포넌트
- `TodoAddModal.tsx`: 할일 추가 모달
- `TodoEditModal.tsx`: 할일 수정 모달
- `TodoDeleteConfirmation.tsx`: 할일 삭제 확인 대화상자

## 스타일링

- Tailwind CSS를 사용한 유틸리티 우선 CSS 프레임워크
- 반응형 디자인 구현
- 일관된 디자인 시스템 유지

## 주요 기능 구현

### 회원가입
- 유효성 검사 (이메일 형식, 비밀번호 정책 등)
- API 연동
- 오류 처리 및 사용자 피드백

### 로그인
- 자격 증명 검증
- 인증 토큰 저장
- 인증 상태 관리

### 할일 관리
- 할일 생성, 수정, 삭제 기능
- React Query를 통한 서버 상태 관리
- 낙관적 업데이트 (선택적 구현)
- 로딩 상태 표시

## 개발 가이드

### 새로운 페이지 추가
1. `src/pages` 디렉토리에 새로운 페이지 컴포넌트 생성
2. `App.tsx`에 라우트 추가
3. 필요한 경우 `ProtectedRoute`로 보호

### 새로운 컴포넌트 추가
1. `src/components`에 적절한 하위 디렉토리에 컴포넌트 파일 생성
2. TypeScript 인터페이스 정의 (필요 시)
3. Tailwind CSS 클래스 사용

### API 호출 추가
1. `src/services/api.ts`에 새로운 API 함수 추가
2. `src/types/index.ts`에 필요한 타입 정의
3. 컴포넌트에서 React Query 훅 사용

## 린팅 및 포맷팅

- ESLint: 코드 품질 및 일관성 유지
- Prettier: 코드 포맷팅 자동화
- 커밋 전에 `npm run format` 및 `npm run lint` 실행 권장

## 빌드 및 배포

- Vite를 사용한 빠른 빌드
- 정적 파일로 배포 가능
- Vercel, Netlify 등에 배포 가능

## 문제 해결

### 공통 이슈
- 환경 변수가 로드되지 않는 경우 `.env.local` 파일 확인
- API 연결이 실패하는 경우 백엔드 서버 상태 및 URL 확인
- 빌드 오류 발생 시 TypeScript 타입 확인

### 디버깅
- 브라우저 개발자 도구에서 Network 탭으로 API 요청 확인
- React DevTools로 컴포넌트 상태 확인
- Zustand DevTools로 전역 상태 확인

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.