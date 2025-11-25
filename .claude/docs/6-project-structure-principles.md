# cwh-todolist 프로젝트 구조 설계 원칙

> **문서 목적**: 일관성 있고 확장 가능하며 유지보수하기 쉬운 코드베이스를 구축하기 위한 설계 원칙과 표준을 정의합니다. 모든 개발자는 이 문서를 숙지하고 준수해야 합니다.

**버전**: 1.0
**작성일**: 2025-11-25
**프로젝트**: cwh-todolist
**기반 문서**: [PRD](./3-prd.md), [도메인 정의서](./1-domain-definition.md), [ERD](./5-erd.md)

---

## 목차

1. [모든 스택에 공통인 최상위 원칙](#1-모든-스택에-공통인-최상위-원칙)
2. [의존성/레이어 원칙](#2-의존성레이어-원칙)
3. [코드/네이밍 원칙](#3-코드네이밍-원칙)
4. [테스트/품질 원칙](#4-테스트품질-원칙)
5. [설정/보안/운영 원칙](#5-설정보안운영-원칙)
6. [디렉토리 구조](#6-디렉토리-구조)

---

## 1. 모든 스택에 공통인 최상위 원칙

cwh-todolist 프로젝트의 핵심 가치와 디자인 원칙에서 파생된 최상위 원칙입니다.

### 1.1. 단순함 (Simplicity)

- **Simple & Clean**: 불필요한 복잡성을 제거하고, 한 가지 요소는 한 가지 기능만 수행하도록 설계합니다. (KISS 원칙)
- **최소 기능 구현 (MVP)**: 현재 단계에 꼭 필요한 기능만 구현하고, 과도한 추상화나 오버엔지니어링을 지양합니다.

### 1.2. 명확성 (Clarity)

- **가독성 우선**: 코드는 컴퓨터뿐만 아니라 동료 개발자가 쉽게 이해할 수 있어야 합니다. 명확한 변수명, 함수명을 사용하고 일관된 스타일을 유지합니다.
- **예측 가능성**: 코드는 예측 가능한 방식으로 동작해야 합니다. 일반적인 디자인 패턴과 라이브러리 사용법을 따릅니다.

### 1.3. 개발 속도와 사용자 경험의 균형

- **빠른 입력 (Fast Input)**: 사용자의 액션을 최소화하고 즉각적인 피드백을 제공하는 방향으로 UI/UX를 설계합니다.
- **빠른 로딩 (Fast Loading)**: 사용자가 서비스를 인지하는 속도(FCP, TTI)를 최우선으로 고려하며, 번들 크기와 API 응답 시간을 최적화합니다.

### 1.4. 관심사 분리 (Separation of Concerns)

- 각 모듈, 컴포넌트, 함수는 명확하게 정의된 하나의 책임만 가집니다.
- 프론트엔드(표현), 백엔드(비즈니스 로직), 데이터베이스(데이터 저장)의 역할을 명확히 구분합니다.

---

## 2. 의존성/레이어 원칙

### 2.1. 단방향 의존성

- 의존성의 방향은 항상 **상위 레이어 → 하위 레이어**로 흐릅니다.
- **프론트엔드 → 백엔드 API → 데이터베이스** 순서로 의존하며, 역방향 의존은 허용되지 않습니다.
  - 예: 백엔드 코드가 프론트엔드 컴포넌트를 직접 참조할 수 없습니다.

### 2.2. 레이어 아키텍처

- **Presentation Layer (Frontend)**
  - 사용자와의 상호작용, UI 렌더링, 사용자 입력 처리를 담당합니다.
  - 비즈니스 로직을 포함하지 않으며, 모든 데이터 처리는 백엔드 API를 통해 요청합니다.
  - 기술 스택: React, Vite, Tailwind CSS

- **Application Layer (Backend API)**
  - 비즈니스 로직, 데이터 검증, 인증/권한 부여를 처리합니다.
  - 프론트엔드에 필요한 데이터 형식을 가공하여 제공(DTO)합니다.
  - 데이터 영속성은 Persistence Layer에 위임합니다.
  - 기술 스택: Express.js, Prisma

- **Persistence Layer (Database)**
  - 데이터의 저장, 조회, 수정을 담당합니다.
  - 데이터의 무결성과 일관성을 보장합니다.
  - 기술 스택: Vercel Postgres (PostgreSQL)

### 2.3. 라이브러리/프레임워크 의존성

- **최소화 원칙**: 새로운 라이브러리 도입은 신중하게 결정합니다. 표준 웹 API나 기존 라이브러리로 해결할 수 있다면 우선적으로 고려합니다.
- **일관성 유지**: 동일한 기능에는 동일한 라이브러리를 사용합니다. (예: HTTP 클라이언트는 `axios`로 통일)
- **버전 관리**: `package.json`의 버전 범위를 일관되게 관리하여 의존성 지옥(Dependency Hell)을 방지합니다. (`^` 사용 권장)

---

## 3. 코드/네이밍 원칙

### 3.1. 언어 및 스타일

- **언어**: 프론트엔드와 백엔드 모두 **TypeScript**를 사용하며, `strict` 모드를 활성화합니다.
- **스타일 가이드**: **Prettier**로 코드 포맷을 통일하고, **ESLint**로 잠재적 오류와 코드 스타일을 검사합니다.
- **커밋 메시지**: "Feat: 할일 추가 기능 구현", "Fix: 로그인 시 이메일 검증 오류 수정"과 같이 [Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다.

### 3.2. 네이밍 컨벤션

#### 일반 원칙
- **의도가 드러나는 이름**: 변수, 함수, 클래스명은 그 역할과 의도를 명확히 드러내야 합니다. (예: `userList` 대신 `users`)
- **축약 금지**: 명확성을 해치는 축약어는 사용하지 않습니다. (예: `u` 대신 `user`)

#### 파일 및 디렉토리
- **`kebab-case`**: `my-component.tsx`, `api-client.ts`
- **컴포넌트**: `PascalCase` (예: `TodoCard.tsx`)

#### TypeScript
- **변수/함수**: `camelCase` (예: `getUserTodos`, `isLoading`)
- **클래스/타입/인터페이스/Enum**: `PascalCase` (예: `class ApiClient`, `interface User`, `type TodoStatus`)
- **상수**: `UPPER_SNAKE_CASE` (예: `const MAX_TODO_LIMIT = 100;`)
- **Private 변수/메서드**: `_` 접두사 사용 (예: `private _validateInput() {}`)

#### 데이터베이스 (ERD 기반)
- **테이블**: `snake_case`, 복수형 (예: `users`, `todos`)
- **컬럼**: `camelCase` (Prisma 모델) / `snake_case` (DB 실제 컬럼, `@map` 사용)

#### API 엔드포인트
- **RESTful 원칙**: `GET /todos`, `POST /todos`, `PUT /todos/:id`
- **`kebab-case`** 사용, 소문자 및 복수형 명사 사용

---

## 4. 테스트/품질 원칙

### 4.1. 품질 목표

- **Lighthouse 점수**: 모든 항목 90점 이상 (성능, 접근성, 모범 사례)
- **API 응답 시간 (P95)**: 500ms 미만
- **서비스 가동률**: 99% 이상

### 4.2. 테스트 범위 및 전략

- **수동 테스트**: MVP 단계에서는 핵심 기능에 대한 수동 테스트를 우선 진행합니다.
  - 사용자 시나리오 기반 테스트 (참조: `4-user-scenarios.md`)
  - 기능 명세 기반 테스트 (참조: `1-domain-definition.md`)
- **크로스 브라우저 테스트**: Chrome, Firefox, Safari, Edge 최신 2개 버전을 지원합니다.
- **반응형 테스트**: 모바일, 태블릿, 데스크톱 해상도에서 레이아웃이 깨지지 않는지 확인합니다.
- **API 테스트**: Postman 또는 Thunder Client와 같은 도구를 사용하여 백엔드 API의 정합성을 검증합니다.

### 4.3. 코드 품질 관리

- **정적 분석**: ESLint와 Prettier를 `lint-staged`와 `husky`를 이용해 커밋 전에 자동으로 실행하여 일관된 코드 품질을 유지합니다.
- **코드 리뷰**: 모든 코드는 `main` 브랜치에 병합되기 전 동료 리뷰를 거치는 것을 원칙으로 합니다. (1인 개발 시 자체 검토)
- **리팩토링**: 중복 코드나 비효율적인 로직은 발견 즉시 리팩토링합니다. "동작하는 코드를 먼저, 그 다음 깨끗하게" 원칙을 따릅니다.

---

## 5. 설정/보안/운영 원칙

### 5.1. 설정 (Configuration)

- **환경 변수 분리**: 환경별 설정(로컬, 개발, 프로덕션)은 `.env` 파일을 통해 관리합니다. `.env` 파일은 Git에 포함하지 않습니다.
- **민감 정보 관리**: API 키, JWT 시크릿, 데이터베이스 URL 등 민감 정보는 Vercel의 환경 변수 기능을 통해 안전하게 주입합니다.

### 5.2. 보안 (Security)

- **HTTPS 강제**: 모든 통신은 Vercel을 통해 HTTPS로 암호화됩니다.
- **비밀번호 저장**: 비밀번호는 `bcrypt`를 사용하여 단방향 해시 암호화 후 저장합니다.
- **인증**: 상태 비저장(Stateless) JWT(JSON Web Token) 기반 인증을 사용합니다.
- **XSS 방지**: React는 JSX에서 기본적으로 출력을 이스케이프 처리하여 XSS 공격을 방지합니다. 입력값에 대한 추가적인 Sanitize는 필요 시 적용합니다.
- **SQL Injection 방지**: Prisma ORM은 모든 쿼리를 파라미터화하여 SQL Injection을 원천적으로 방지합니다.
- **CORS**: 백엔드 API는 허용된 프론트엔드 오리진(`cwh-todolist.vercel.app`)에 대해서만 요청을 허용합니다.

### 5.3. 운영 (Operations)

- **배포**: Vercel을 사용하여 Git `main` 브랜치 푸시 시 자동으로 CI/CD 파이프라인이 실행되어 배포됩니다.
- **모니터링**: Vercel의 기본 로깅 및 분석 기능을 사용하여 서비스 상태와 에러를 모니터링합니다. (필요 시 Sentry 도입 고려)
- **데이터베이스 백업**: Vercel Postgres는 일일 자동 백업을 제공하며, 7일간 보존됩니다.

---

## 6. 디렉토리 구조

프로젝트는 프론트엔드와 백엔드를 분리한 모노레포 형식의 구조를 가집니다.

### 6.1. 최상위 구조

```
cwh-todolist/
├── backend/         # Express.js 백엔드
├── frontend/         # React 프론트엔드
├── .claude/          # 기획/설계 문서
├── .git/
├── .gitignore
└── README.md
```

### 6.2. 프론트엔드 (React + Vite)

```
frontend/
├── public/           # 정적 에셋 (favicon 등)
├── src/
│   ├── api/          # API 클라이언트 (axios 인스턴스, API 호출 함수)
│   │   └── index.ts
│   ├── assets/       # 이미지, SVG, 폰트 등
│   ├── components/   # 재사용 가능한 UI 컴포넌트
│   │   ├── common/   # 범용 컴포넌트 (Button, Input, Modal 등)
│   │   └── todo/     # Todo 도메인 관련 컴포넌트 (TodoCard, TodoForm 등)
│   ├── config/       # 환경 변수 등 설정 관련
│   ├── constants/    # 공통 상수
│   ├── hooks/        # 커스텀 훅 (useAuth, useTodos 등)
│   ├── pages/        # 라우팅 단위 페이지 컴포넌트 (Login, Signup, TodoList)
│   ├── services/     # 비즈니스 로직을 포함하지 않는 순수 서비스 로직
│   ├── store/        # 상태 관리 (Zustand)
│   │   ├── authStore.ts
│   │   └── todoStore.ts
│   ├── styles/       # 전역 CSS, Tailwind 설정
│   │   └── index.css
│   ├── types/        # 전역 타입 정의
│   │   └── index.ts
│   ├── utils/        # 순수 함수 유틸리티 (date-fns, validators 등)
│   ├── App.tsx       # 애플리케이션 최상위 컴포넌트
│   ├── main.tsx      # 애플리케이션 진입점
│   └── routes.tsx    # 라우팅 설정
├── .env.development  # 개발 환경 변수
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 6.3. 백엔드 (Express + Prisma)

```
backend/
├── prisma/
│   ├── migrations/   # Prisma 마이그레이션 히스토리
│   ├── schema.prisma # Prisma 스키마 파일
│   └── seed.ts       # 시드 데이터
├── src/
│   ├── api/          # API 라우트 및 컨트롤러
│   │   ├── auth/     # 인증 관련 (auth.controller.ts, auth.routes.ts)
│   │   └── todos/    # 할일 관련 (todos.controller.ts, todos.routes.ts)
│   ├── config/       # 환경 변수, DB 연결 등 설정
│   ├── constants/    # 공통 상수
│   ├── dto/          # Data Transfer Objects
│   ├── interfaces/   # 타입 및 인터페이스 정의
│   ├── middlewares/  # Express 미들웨어 (authMiddleware, errorMiddleware)
│   ├── services/     # 비즈니스 로직
│   │   ├── auth.service.ts
│   │   └── todos.service.ts
│   ├── utils/        # 유틸리티 함수
│   └── app.ts        # Express 애플리케이션 설정
├── .env
├── package.json
└── tsconfig.json
```
