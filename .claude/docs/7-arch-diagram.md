# cwh-todolist 기술 아키텍처 다이어그램

> **문서 목적**: 시스템의 기술 구조를 시각화하여 전체 아키텍처를 쉽게 이해

**버전**: 1.0
**작성일**: 2025-11-26
**프로젝트**: cwh-todolist

---

## 목차

1. [전체 시스템 아키텍처](#1-전체-시스템-아키텍처)
2. [기술 스택](#2-기술-스택)
3. [API 구조](#3-api-구조)
4. [데이터베이스 스키마](#4-데이터베이스-스키마)
5. [인증 플로우](#5-인증-플로우)

---

## 1. 전체 시스템 아키텍처

### 1.1 시스템 구성도

```mermaid
graph TB
    subgraph Client["클라이언트"]
        Browser["웹 브라우저<br/>(Chrome, Safari, Firefox)"]
    end

    subgraph Vercel["Vercel Platform"]
        CDN["Vercel CDN<br/>(정적 파일 제공)"]
        SPA["React SPA<br/>(Vite + TypeScript)"]
        API["Serverless Functions<br/>(Express + TypeScript)"]
        DB["Vercel Postgres<br/>(PostgreSQL 14+)"]
    end

    Browser -->|"HTTPS 요청"| CDN
    CDN -->|"정적 파일 전송"| SPA
    SPA -->|"API 요청<br/>(REST API)"| API
    API -->|"Prisma ORM"| DB

    style Browser fill:#e1f5ff
    style SPA fill:#fff4e6
    style API fill:#e8f5e9
    style DB fill:#f3e5f5
```

### 1.2 레이어 구조

```mermaid
graph LR
    subgraph Presentation["프레젠테이션 레이어"]
        UI["React Components<br/>Tailwind CSS"]
    end

    subgraph Application["애플리케이션 레이어"]
        State["상태 관리<br/>Zustand + React Query"]
        Router["라우팅<br/>React Router v6"]
    end

    subgraph API_Layer["API 레이어"]
        Auth["인증<br/>JWT"]
        TodoAPI["Todo API<br/>CRUD"]
    end

    subgraph Data["데이터 레이어"]
        Prisma["Prisma ORM"]
        PostgreSQL["PostgreSQL"]
    end

    UI --> State
    State --> Router
    Router --> Auth
    Router --> TodoAPI
    Auth --> Prisma
    TodoAPI --> Prisma
    Prisma --> PostgreSQL

    style UI fill:#e3f2fd
    style State fill:#fff3e0
    style Auth fill:#e8f5e9
    style Prisma fill:#f3e5f5
```

---

## 2. 기술 스택

### 2.1 프론트엔드

```mermaid
graph LR
    subgraph Frontend["프론트엔드 기술 스택"]
        React["React 18+"]
        TS["TypeScript"]
        Vite["Vite"]
        Tailwind["Tailwind CSS"]
        RQ["React Query"]
        Zustand["Zustand"]
        RRouter["React Router v6"]
        Axios["Axios"]
    end

    React --> TS
    React --> Vite
    React --> Tailwind
    React --> RQ
    React --> Zustand
    React --> RRouter
    RQ --> Axios

    style React fill:#61dafb,color:#000
    style TS fill:#3178c6,color:#fff
    style Vite fill:#646cff,color:#fff
```

### 2.2 백엔드

```mermaid
graph LR
    subgraph Backend["백엔드 기술 스택"]
        Node["Node.js v20 LTS"]
        Express["Express.js"]
        TSB["TypeScript"]
        JWT["jsonwebtoken"]
        Bcrypt["bcrypt"]
        Validator["express-validator"]
        Prisma_BE["Prisma ORM"]
        PostgreSQL_BE["PostgreSQL 14+"]
    end

    Node --> Express
    Express --> TSB
    Express --> JWT
    Express --> Bcrypt
    Express --> Validator
    Express --> Prisma_BE
    Prisma_BE --> PostgreSQL_BE

    style Node fill:#339933,color:#fff
    style Express fill:#000000,color:#fff
    style PostgreSQL_BE fill:#4169e1,color:#fff
```

---

## 3. API 구조

### 3.1 API 엔드포인트

```mermaid
graph TB
    subgraph API["API Endpoints"]
        Auth_API["인증 API<br/>/api/auth"]
        Todo_API["할일 API<br/>/api/todos"]
    end

    subgraph Auth_Endpoints["인증 엔드포인트"]
        Signup["POST /signup<br/>(회원가입)"]
        Login["POST /login<br/>(로그인)"]
    end

    subgraph Todo_Endpoints["할일 엔드포인트"]
        GetTodos["GET /<br/>(목록 조회)"]
        CreateTodo["POST /<br/>(할일 추가)"]
        UpdateTodo["PUT /:id<br/>(할일 수정)"]
        DeleteTodo["DELETE /:id<br/>(할일 삭제)"]
    end

    Auth_API --> Signup
    Auth_API --> Login
    Todo_API --> GetTodos
    Todo_API --> CreateTodo
    Todo_API --> UpdateTodo
    Todo_API --> DeleteTodo

    style Auth_API fill:#e8f5e9
    style Todo_API fill:#e3f2fd
```

### 3.2 요청/응답 플로우

```mermaid
sequenceDiagram
    participant Browser as 브라우저
    participant SPA as React SPA
    participant API as Express API
    participant DB as PostgreSQL

    Browser->>SPA: 페이지 요청
    SPA->>Browser: React 앱 로드

    Browser->>SPA: 로그인 요청
    SPA->>API: POST /api/auth/login
    API->>DB: 사용자 조회
    DB-->>API: 사용자 데이터
    API-->>SPA: JWT 토큰 반환
    SPA-->>Browser: 로그인 완료

    Browser->>SPA: 할일 조회 요청
    SPA->>API: GET /api/todos<br/>(Authorization: Bearer token)
    API->>DB: 할일 목록 조회
    DB-->>API: 할일 데이터
    API-->>SPA: 할일 목록 반환
    SPA-->>Browser: 할일 목록 표시
```

---

## 4. 데이터베이스 스키마

### 4.1 ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    User ||--o{ Todo : "has many"

    User {
        string id PK
        string username UK
        string email UK
        string password
        datetime createdAt
        datetime updatedAt
    }

    Todo {
        string id PK
        string userId FK
        string title
        string description
        datetime startDate
        datetime dueDate
        enum status
        datetime createdAt
        datetime updatedAt
    }
```

### 4.2 테이블 관계

```mermaid
graph LR
    User["User<br/>(사용자)"]
    Todo["Todo<br/>(할일)"]

    User -->|"1:N"| Todo

    style User fill:#e8f5e9
    style Todo fill:#e3f2fd
```

---

## 5. 인증 플로우

### 5.1 회원가입 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant UI as React UI
    participant API as Express API
    participant DB as PostgreSQL

    User->>UI: 회원가입 정보 입력<br/>(username, email, password)
    UI->>API: POST /api/auth/signup
    API->>API: 입력값 검증<br/>(express-validator)
    API->>API: 비밀번호 해싱<br/>(bcrypt)
    API->>DB: 사용자 저장
    DB-->>API: 저장 완료
    API->>API: JWT 토큰 생성
    API-->>UI: 토큰 + 사용자 정보 반환
    UI->>UI: 토큰 저장<br/>(LocalStorage)
    UI-->>User: 자동 로그인 완료
```

### 5.2 로그인 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant UI as React UI
    participant API as Express API
    participant DB as PostgreSQL

    User->>UI: 로그인 정보 입력<br/>(email, password)
    UI->>API: POST /api/auth/login
    API->>DB: 이메일로 사용자 조회
    DB-->>API: 사용자 데이터
    API->>API: 비밀번호 검증<br/>(bcrypt.compare)

    alt 비밀번호 일치
        API->>API: JWT 토큰 생성
        API-->>UI: 토큰 + 사용자 정보 반환
        UI->>UI: 토큰 저장
        UI-->>User: 로그인 성공
    else 비밀번호 불일치
        API-->>UI: 401 Unauthorized
        UI-->>User: 에러 메시지 표시
    end
```

### 5.3 인증 미들웨어

```mermaid
graph TB
    Request["API 요청<br/>(Authorization: Bearer token)"]
    Middleware["인증 미들웨어"]
    Extract["토큰 추출"]
    Verify["JWT 검증"]
    Success["검증 성공"]
    Fail["검증 실패"]
    Handler["라우트 핸들러"]
    Error["401 에러 반환"]

    Request --> Middleware
    Middleware --> Extract
    Extract --> Verify
    Verify --> Success
    Verify --> Fail
    Success --> Handler
    Fail --> Error

    style Success fill:#c8e6c9
    style Fail fill:#ffcdd2
```

---

## 배포 구조

### Vercel 배포 플로우

```mermaid
graph LR
    subgraph Development["개발 환경"]
        LocalCode["로컬 코드"]
        Git["Git Push"]
    end

    subgraph Vercel_Platform["Vercel Platform"]
        Build["자동 빌드"]
        Deploy["배포"]
        CDN_Deploy["CDN 배포"]
    end

    subgraph Production["프로덕션"]
        Live["cwh-todolist.vercel.app"]
    end

    LocalCode --> Git
    Git --> Build
    Build --> Deploy
    Deploy --> CDN_Deploy
    CDN_Deploy --> Live

    style LocalCode fill:#e3f2fd
    style Build fill:#fff3e0
    style Live fill:#c8e6c9
```

---

## 참조 문서

- [PRD (Product Requirements Document)](./3-prd.md) - 섹션 8 기술적 고려사항
- [도메인 정의서](./1-domain-definition.md) - 엔티티 및 데이터 모델

---

**문서 버전**: 1.0
**최종 업데이트**: 2025-11-26
**작성자**: Claude

---

**End of Document**
