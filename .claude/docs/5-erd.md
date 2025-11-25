# cwh-todolist Entity-Relationship Diagram (ERD)

> **문서 목적**: 데이터베이스 구조 설계 및 엔티티 간 관계 정의

**버전**: 1.0
**작성일**: 2025-11-25
**DBMS**: PostgreSQL 14+
**ORM**: Prisma
**프로젝트**: cwh-todolist
**기반 문서**: [PRD](./3-prd.md), [도메인 정의서](./1-domain-definition.md)

---

## 목차

1. [개요](#1-개요)
2. [ERD 다이어그램](#2-erd-다이어그램)
3. [엔티티 정의](#3-엔티티-정의)
4. [관계 정의](#4-관계-정의)
5. [제약 조건 및 인덱스](#5-제약-조건-및-인덱스)
6. [Prisma 스키마](#6-prisma-스키마)
7. [샘플 데이터](#7-샘플-데이터)
8. [마이그레이션 전략](#8-마이그레이션-전략)

---

## 1. 개요

### 1.1 데이터베이스 개요

**데이터베이스명**: `cwh_todolist`
**문자 인코딩**: UTF-8
**타임존**: UTC
**환경**:
- 개발: Docker Compose (PostgreSQL 14)
- 프로덕션: Vercel Postgres (PostgreSQL 14+)

### 1.2 설계 원칙

1. **정규화**: 제3정규형 (3NF) 준수
2. **명명 규칙**:
   - 테이블명: snake_case (예: `users`, `todos`)
   - 컬럼명: camelCase (Prisma 모델에서는 camelCase, DB에서는 snake_case로 매핑)
3. **UUID 사용**: 모든 Primary Key는 UUID (보안 및 확장성)
4. **Soft Delete**: Status 필드를 통한 논리적 삭제 (휴지통 기능)
5. **Timestamp**: 생성/수정 시간 자동 관리

### 1.3 MVP vs Phase 2

**MVP (Phase 1)**:
- `users` 테이블
- `todos` 테이블
- Status: ACTIVE만 사용 (즉시 삭제)

**Phase 2**:
- Status: TRASHED 활용 (휴지통)
- `public_todos` 테이블 추가 (국경일)

---

## 2. ERD 다이어그램

### 2.1 전체 ERD (Mermaid)

```mermaid
erDiagram
    users ||--o{ todos : "has many"

    users {
        uuid id PK
        string username UK
        string email UK
        string password
        timestamp createdAt
        timestamp updatedAt
    }

    todos {
        uuid id PK
        uuid userId FK
        string title
        string description
        timestamp startDate
        timestamp dueDate
        enum status
        timestamp createdAt
        timestamp updatedAt
    }

    public_todos {
        uuid id PK
        string title
        string description
        date eventDate
        string type
        timestamp createdAt
    }
```

### 2.2 텍스트 기반 ERD

```
┌─────────────────────────────────────────┐
│               users                     │
├─────────────────────────────────────────┤
│ PK  id             UUID                 │
│ UK  username       VARCHAR(20)          │
│ UK  email          VARCHAR(255)         │
│     password       VARCHAR(255)         │
│     createdAt      TIMESTAMP            │
│     updatedAt      TIMESTAMP            │
└─────────────────────────────────────────┘
                    │
                    │ 1
                    │
                    │
                    │ N
                    ▼
┌─────────────────────────────────────────┐
│               todos                     │
├─────────────────────────────────────────┤
│ PK  id             UUID                 │
│ FK  userId         UUID                 │
│     title          VARCHAR(100)         │
│     description    TEXT                 │
│     startDate      TIMESTAMP            │
│     dueDate        TIMESTAMP            │
│     status         ENUM                 │
│     createdAt      TIMESTAMP            │
│     updatedAt      TIMESTAMP            │
│                                         │
│ INDEX: idx_todos_userId                │
│ INDEX: idx_todos_createdAt             │
└─────────────────────────────────────────┘


┌─────────────────────────────────────────┐
│          public_todos (Phase 2)         │
├─────────────────────────────────────────┤
│ PK  id             UUID                 │
│     title          VARCHAR(100)         │
│     description    VARCHAR(500)         │
│     eventDate      DATE                 │
│     type           VARCHAR(50)          │
│     createdAt      TIMESTAMP            │
└─────────────────────────────────────────┘
```

---

## 3. 엔티티 정의

### 3.1 users (사용자)

**설명**: 애플리케이션 사용자 정보

| 컬럼명 | 타입 | 제약 조건 | 기본값 | 설명 |
|--------|------|-----------|--------|------|
| id | UUID | PRIMARY KEY | uuid_generate_v4() | 사용자 고유 식별자 |
| username | VARCHAR(20) | NOT NULL, UNIQUE | - | 사용자명 (3-20자) |
| email | VARCHAR(255) | NOT NULL, UNIQUE | - | 이메일 (RFC 5322) |
| password | VARCHAR(255) | NOT NULL | - | bcrypt 해시 (60자) |
| createdAt | TIMESTAMP | NOT NULL | now() | 계정 생성 일시 |
| updatedAt | TIMESTAMP | NOT NULL | now() | 마지막 수정 일시 |

**비즈니스 규칙**:
- username: 영문 대소문자, 숫자, 언더스코어(_)만 허용
- email: 유효한 이메일 형식
- password: bcrypt 해시 (salt rounds: 10), 원본 비밀번호는 저장하지 않음

**인덱스**:
- PRIMARY KEY: `id`
- UNIQUE INDEX: `username`
- UNIQUE INDEX: `email` (로그인 성능 향상)

---

### 3.2 todos (할일)

**설명**: 사용자가 관리하는 개인 할일 목록

| 컬럼명 | 타입 | 제약 조건 | 기본값 | 설명 |
|--------|------|-----------|--------|------|
| id | UUID | PRIMARY KEY | uuid_generate_v4() | 할일 고유 식별자 |
| userId | UUID | NOT NULL, FOREIGN KEY | - | 소유자 (users.id) |
| title | VARCHAR(100) | NOT NULL | - | 할일 제목 |
| description | TEXT | NULLABLE | NULL | 할일 상세 설명 |
| startDate | TIMESTAMP | NOT NULL | - | 시작 일시 |
| dueDate | TIMESTAMP | NOT NULL | - | 만료 일시 |
| status | ENUM | NOT NULL | ACTIVE | 상태 (ACTIVE, TRASHED) |
| createdAt | TIMESTAMP | NOT NULL | now() | 생성 일시 |
| updatedAt | TIMESTAMP | NOT NULL | now() | 마지막 수정 일시 |

**비즈니스 규칙**:
- title: 1-100자 필수
- description: 0-1000자 선택
- dueDate > startDate (BR-TODO-001)
- status: MVP에서는 ACTIVE만 사용, Phase 2에서 TRASHED 추가

**인덱스**:
- PRIMARY KEY: `id`
- INDEX: `userId` (사용자별 조회 성능)
- INDEX: `createdAt` (날짜순 정렬 성능)
- COMPOSITE INDEX (선택): `(userId, status)` (활성 할일 조회)

**외래 키**:
- `userId` REFERENCES `users(id)` ON DELETE CASCADE
  - 사용자 삭제 시 모든 할일도 함께 삭제

---

### 3.3 Status ENUM

**설명**: 할일의 상태를 나타내는 열거형

```sql
CREATE TYPE status AS ENUM ('ACTIVE', 'TRASHED');
```

| 값 | 설명 | 사용 시점 |
|----|------|-----------|
| ACTIVE | 활성 상태 | 할일 생성 시 기본값, 사용자가 볼 수 있는 상태 |
| TRASHED | 휴지통 상태 | Phase 2: F-TODO-004 삭제 시, 복원 가능 |

**MVP 변경사항**:
- MVP에서는 삭제 시 즉시 DELETE 쿼리 실행
- Phase 2부터 status를 TRASHED로 변경하여 soft delete

---

### 3.4 public_todos (공통 할일) - Phase 2

**설명**: 모든 사용자에게 표시되는 공통 일정 (국경일, 기념일 등)

| 컬럼명 | 타입 | 제약 조건 | 기본값 | 설명 |
|--------|------|-----------|--------|------|
| id | UUID | PRIMARY KEY | uuid_generate_v4() | 공통 할일 식별자 |
| title | VARCHAR(100) | NOT NULL | - | 일정 제목 |
| description | VARCHAR(500) | NULLABLE | NULL | 일정 설명 |
| eventDate | DATE | NOT NULL | - | 일정 날짜 (시간 정보 없음) |
| type | VARCHAR(50) | NOT NULL | - | 일정 유형 (국경일, 기념일 등) |
| createdAt | TIMESTAMP | NOT NULL | now() | 생성 일시 |

**비즈니스 규칙**:
- 사용자가 수정/삭제 불가 (BR-PUBLIC-001)
- 모든 사용자에게 동일하게 표시 (BR-PUBLIC-002)
- 관리자 또는 시스템이 관리

**인덱스**:
- PRIMARY KEY: `id`
- INDEX: `eventDate` (날짜별 조회)
- INDEX: `type` (유형별 필터링)

---

## 4. 관계 정의

### 4.1 users ↔ todos (1:N)

**관계 유형**: One-to-Many (일대다)

**설명**:
- 한 명의 사용자(User)는 여러 개의 할일(Todo)을 가질 수 있음
- 하나의 할일(Todo)은 정확히 한 명의 사용자에게만 속함

**구현**:
```prisma
model User {
  id    String @id @default(uuid())
  // ... 다른 필드
  todos Todo[] // 1:N 관계
}

model Todo {
  id     String @id @default(uuid())
  userId String
  // ... 다른 필드
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**외래 키 제약**:
- `todos.userId` → `users.id`
- `ON DELETE CASCADE`: 사용자 삭제 시 모든 할일도 함께 삭제 (BR-DATA-001)
- `ON UPDATE CASCADE`: 사용자 ID 변경 시 자동 업데이트 (일반적으로 UUID는 변경하지 않음)

**카디널리티**:
- User: 0개 이상의 Todo (신규 사용자는 할일 0개)
- Todo: 정확히 1개의 User (필수)

---

### 4.2 users ↔ public_todos (N:N - 논리적)

**관계 유형**: Many-to-Many (논리적, 실제로는 독립적)

**설명**:
- 공통 할일은 모든 사용자에게 표시됨
- 실제 외래 키 관계는 없음 (독립적인 테이블)
- 애플리케이션 레벨에서 모든 사용자에게 조회 결과 병합

**구현**:
- 데이터베이스 레벨: 관계 없음
- 애플리케이션 레벨: 사용자 할일 + 공통 할일 병합 조회

```sql
-- 사용자의 개인 할일 + 공통 할일 조회 (Phase 2)
SELECT id, title, description, startDate as date, 'personal' as source
FROM todos
WHERE userId = $1 AND status = 'ACTIVE'

UNION ALL

SELECT id, title, description, eventDate as date, 'public' as source
FROM public_todos
WHERE eventDate BETWEEN $2 AND $3

ORDER BY date ASC;
```

---

## 5. 제약 조건 및 인덱스

### 5.1 Primary Key 제약

| 테이블 | Primary Key | 타입 |
|--------|-------------|------|
| users | id | UUID |
| todos | id | UUID |
| public_todos | id | UUID |

**UUID 사용 이유**:
1. **보안**: 순차적 ID보다 예측 불가능
2. **확장성**: 분산 환경에서 충돌 없이 생성 가능
3. **마이그레이션**: 데이터 병합 시 ID 충돌 방지

---

### 5.2 Unique 제약

| 테이블 | 컬럼 | 제약 이름 | 목적 |
|--------|------|-----------|------|
| users | username | uk_users_username | 중복 사용자명 방지 |
| users | email | uk_users_email | 중복 이메일 방지, 로그인 |

---

### 5.3 Foreign Key 제약

| 테이블 | 컬럼 | 참조 | ON DELETE | ON UPDATE |
|--------|------|------|-----------|-----------|
| todos | userId | users(id) | CASCADE | CASCADE |

**CASCADE 정책**:
- 사용자 삭제 시 모든 관련 할일도 함께 삭제 (데이터 무결성 보장)

---

### 5.4 Check 제약 (애플리케이션 레벨)

Prisma는 Check 제약을 직접 지원하지 않으므로 애플리케이션 레벨에서 검증:

```sql
-- PostgreSQL에서 직접 추가 가능 (선택사항)
ALTER TABLE todos
ADD CONSTRAINT chk_todos_date_range
CHECK (dueDate > startDate);

ALTER TABLE todos
ADD CONSTRAINT chk_todos_title_length
CHECK (char_length(title) >= 1 AND char_length(title) <= 100);
```

---

### 5.5 인덱스 전략

#### 5.5.1 users 테이블

```sql
-- Prisma에서 자동 생성
CREATE UNIQUE INDEX uk_users_email ON users(email);
CREATE UNIQUE INDEX uk_users_username ON users(username);

-- createdAt 인덱스 (관리자 쿼리용, 선택사항)
CREATE INDEX idx_users_createdAt ON users(createdAt DESC);
```

**사용 쿼리**:
- 로그인: `SELECT * FROM users WHERE email = ?`
- 회원가입 검증: `SELECT * FROM users WHERE username = ? OR email = ?`

---

#### 5.5.2 todos 테이블

```sql
-- userId 인덱스 (필수)
CREATE INDEX idx_todos_userId ON todos(userId);

-- createdAt 인덱스 (정렬용, 필수)
CREATE INDEX idx_todos_createdAt ON todos(createdAt DESC);

-- 복합 인덱스 (최적화, 선택사항)
CREATE INDEX idx_todos_userId_status ON todos(userId, status);
CREATE INDEX idx_todos_userId_dueDate ON todos(userId, dueDate);
```

**사용 쿼리**:
- 사용자별 활성 할일 조회:
  ```sql
  SELECT * FROM todos
  WHERE userId = ? AND status = 'ACTIVE'
  ORDER BY createdAt DESC;
  ```
- 마감일 순 정렬:
  ```sql
  SELECT * FROM todos
  WHERE userId = ?
  ORDER BY dueDate ASC;
  ```

---

#### 5.5.3 public_todos 테이블 (Phase 2)

```sql
-- eventDate 인덱스 (날짜 범위 조회)
CREATE INDEX idx_public_todos_eventDate ON public_todos(eventDate);

-- type 인덱스 (유형별 필터링)
CREATE INDEX idx_public_todos_type ON public_todos(type);
```

**사용 쿼리**:
- 특정 기간 공통 할일 조회:
  ```sql
  SELECT * FROM public_todos
  WHERE eventDate BETWEEN ? AND ?
  ORDER BY eventDate ASC;
  ```

---

## 6. Prisma 스키마

### 6.1 전체 스키마 (schema.prisma)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================================
// Enums
// ========================================

enum Status {
  ACTIVE
  TRASHED
}

// ========================================
// Models
// ========================================

model User {
  id        String   @id @default(uuid())
  username  String   @unique @db.VarChar(20)
  email     String   @unique @db.VarChar(255)
  password  String   @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  todos Todo[]

  @@map("users")
}

model Todo {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  title       String   @db.VarChar(100)
  description String?  @db.Text
  startDate   DateTime @map("start_date")
  dueDate     DateTime @map("due_date")
  status      Status   @default(ACTIVE)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Indexes
  @@index([userId])
  @@index([createdAt])
  @@index([userId, status])
  @@map("todos")
}

// ========================================
// Phase 2 Models
// ========================================

model PublicTodo {
  id          String   @id @default(uuid())
  title       String   @db.VarChar(100)
  description String?  @db.VarChar(500)
  eventDate   DateTime @map("event_date") @db.Date
  type        String   @db.VarChar(50)
  createdAt   DateTime @default(now()) @map("created_at")

  // Indexes
  @@index([eventDate])
  @@index([type])
  @@map("public_todos")
}
```

### 6.2 스키마 설명

**@map 지시어**:
- Prisma 모델에서는 camelCase 사용
- 데이터베이스에서는 snake_case 사용
- `@map("created_at")`: createdAt → created_at

**@db 지시어**:
- PostgreSQL 특정 타입 지정
- `@db.VarChar(100)`: VARCHAR(100)
- `@db.Text`: TEXT
- `@db.Date`: DATE (시간 정보 없음)

**@default 지시어**:
- `@default(uuid())`: UUID 자동 생성
- `@default(now())`: 현재 시각 자동 입력
- `@default(ACTIVE)`: 기본값 ACTIVE

**@updatedAt 지시어**:
- 레코드 수정 시 자동으로 현재 시각으로 업데이트

---

## 7. 샘플 데이터

### 7.1 users 샘플

```sql
INSERT INTO users (id, username, email, password, created_at, updated_at)
VALUES
  (
    '550e8400-e29b-41d4-a716-446655440000',
    'minji_kim',
    'minji@example.com',
    '$2b$10$rQZ9X.K9zJ4Y7vQ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J', -- bcrypt hash of 'Password123!'
    '2025-11-20 10:00:00',
    '2025-11-20 10:00:00'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'joonho_park',
    'joonho@example.com',
    '$2b$10$rQZ9X.K9zJ4Y7vQ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J',
    '2025-11-21 14:30:00',
    '2025-11-21 14:30:00'
  );
```

### 7.2 todos 샘플

```sql
INSERT INTO todos (id, user_id, title, description, start_date, due_date, status, created_at, updated_at)
VALUES
  -- 민지의 할일
  (
    '660e8400-e29b-41d4-a716-446655440100',
    '550e8400-e29b-41d4-a716-446655440000',
    '경영학 레포트 작성',
    '마케팅 전략 사례 분석 5페이지',
    '2025-11-25 00:00:00',
    '2025-12-02 23:59:59',
    'ACTIVE',
    '2025-11-25 14:30:00',
    '2025-11-25 14:30:00'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440101',
    '550e8400-e29b-41d4-a716-446655440000',
    '통계학 과제 제출',
    NULL,
    '2025-11-25 00:00:00',
    '2025-11-27 23:59:59',
    'ACTIVE',
    '2025-11-25 14:35:00',
    '2025-11-25 14:35:00'
  ),

  -- 준호의 할일
  (
    '660e8400-e29b-41d4-a716-446655440200',
    '550e8400-e29b-41d4-a716-446655440001',
    '클라이언트 미팅 준비',
    '발표 자료 최종 검토 및 인쇄',
    '2025-11-25 00:00:00',
    '2025-11-25 10:00:00',
    'ACTIVE',
    '2025-11-24 18:00:00',
    '2025-11-24 18:00:00'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440201',
    '550e8400-e29b-41d4-a716-446655440001',
    '팀 빌딩 장소 예약',
    '강남 근처 음식점, 20명 예약',
    '2025-11-25 00:00:00',
    '2025-11-26 18:00:00',
    'ACTIVE',
    '2025-11-25 16:00:00',
    '2025-11-25 20:00:00'
  );
```

### 7.3 public_todos 샘플 (Phase 2)

```sql
INSERT INTO public_todos (id, title, description, event_date, type, created_at)
VALUES
  (
    '770e8400-e29b-41d4-a716-446655440300',
    '크리스마스',
    '성탄절',
    '2025-12-25',
    '국경일',
    '2025-01-01 00:00:00'
  ),
  (
    '770e8400-e29b-41d4-a716-446655440301',
    '신정',
    '새해 첫날',
    '2026-01-01',
    '국경일',
    '2025-01-01 00:00:00'
  ),
  (
    '770e8400-e29b-41d4-a716-446655440302',
    '설날',
    '음력 1월 1일',
    '2026-01-29',
    '국경일',
    '2025-01-01 00:00:00'
  );
```

---

## 8. 마이그레이션 전략

### 8.1 초기 마이그레이션 (Phase 1)

#### Step 1: Prisma 스키마 작성
- `schema.prisma` 파일에 User, Todo, Status 정의

#### Step 2: 마이그레이션 생성
```bash
npx prisma migrate dev --name init
```

**생성되는 SQL**:
```sql
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'TRASHED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "todos_user_id_idx" ON "todos"("user_id");
CREATE INDEX "todos_created_at_idx" ON "todos"("created_at");
CREATE INDEX "todos_user_id_status_idx" ON "todos"("user_id", "status");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

#### Step 3: Prisma Client 생성
```bash
npx prisma generate
```

#### Step 4: 마이그레이션 적용 (프로덕션)
```bash
npx prisma migrate deploy
```

---

### 8.2 Phase 2 마이그레이션

#### Step 1: PublicTodo 모델 추가

**schema.prisma 수정**:
```prisma
model PublicTodo {
  // ... (위 스키마 참조)
}
```

#### Step 2: 마이그레이션 생성
```bash
npx prisma migrate dev --name add_public_todos
```

**생성되는 SQL**:
```sql
-- CreateTable
CREATE TABLE "public_todos" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "event_date" DATE NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "public_todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "public_todos_event_date_idx" ON "public_todos"("event_date");
CREATE INDEX "public_todos_type_idx" ON "public_todos"("type");
```

#### Step 3: 초기 데이터 시딩
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 국경일 데이터 삽입
  await prisma.publicTodo.createMany({
    data: [
      {
        title: '신정',
        description: '새해 첫날',
        eventDate: new Date('2026-01-01'),
        type: '국경일',
      },
      {
        title: '설날',
        description: '음력 1월 1일',
        eventDate: new Date('2026-01-29'),
        type: '국경일',
      },
      // ... 더 많은 국경일
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

```bash
npx prisma db seed
```

---

### 8.3 롤백 전략

#### 최근 마이그레이션 롤백
```bash
# 마이그레이션 히스토리 확인
npx prisma migrate status

# 마이그레이션 롤백 (수동)
# Prisma는 자동 롤백을 지원하지 않음
# 이전 마이그레이션 SQL을 수동으로 작성해야 함
```

**롤백 SQL 예시** (add_public_todos 롤백):
```sql
DROP INDEX IF EXISTS "public_todos_type_idx";
DROP INDEX IF EXISTS "public_todos_event_date_idx";
DROP TABLE IF EXISTS "public_todos";
```

---

### 8.4 데이터 백업 및 복구

#### 백업
```bash
# PostgreSQL 덤프
pg_dump -h localhost -U postgres -d cwh_todolist > backup_$(date +%Y%m%d_%H%M%S).sql

# Vercel Postgres (프로덕션)
# Vercel 대시보드에서 자동 백업 (일일)
```

#### 복구
```bash
# 로컬 복구
psql -h localhost -U postgres -d cwh_todolist < backup_20251125_120000.sql

# Vercel Postgres
# Vercel 대시보드에서 복구 진행
```

---

## 9. 쿼리 예시

### 9.1 사용자 인증

#### 회원가입
```typescript
// Prisma
const user = await prisma.user.create({
  data: {
    username: 'minji_kim',
    email: 'minji@example.com',
    password: hashedPassword, // bcrypt hash
  },
});
```

```sql
-- Raw SQL
INSERT INTO users (id, username, email, password, created_at, updated_at)
VALUES (uuid_generate_v4(), 'minji_kim', 'minji@example.com', $1, NOW(), NOW())
RETURNING *;
```

#### 로그인
```typescript
// Prisma
const user = await prisma.user.findUnique({
  where: { email: 'minji@example.com' },
});
```

```sql
-- Raw SQL
SELECT * FROM users WHERE email = 'minji@example.com' LIMIT 1;
```

---

### 9.2 할일 관리

#### 할일 목록 조회 (사용자별)
```typescript
// Prisma
const todos = await prisma.todo.findMany({
  where: {
    userId: user.id,
    status: 'ACTIVE',
  },
  orderBy: {
    createdAt: 'desc',
  },
});
```

```sql
-- Raw SQL
SELECT * FROM todos
WHERE user_id = $1 AND status = 'ACTIVE'
ORDER BY created_at DESC;
```

#### 할일 추가
```typescript
// Prisma
const todo = await prisma.todo.create({
  data: {
    userId: user.id,
    title: '경영학 레포트 작성',
    description: '마케팅 전략 사례 분석',
    startDate: new Date('2025-11-25'),
    dueDate: new Date('2025-12-02'),
  },
});
```

```sql
-- Raw SQL
INSERT INTO todos (id, user_id, title, description, start_date, due_date, status, created_at, updated_at)
VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, 'ACTIVE', NOW(), NOW())
RETURNING *;
```

#### 할일 수정
```typescript
// Prisma
const updated = await prisma.todo.update({
  where: { id: todoId },
  data: {
    title: '수정된 제목',
    dueDate: new Date('2025-12-09'),
  },
});
```

```sql
-- Raw SQL
UPDATE todos
SET title = $1, due_date = $2, updated_at = NOW()
WHERE id = $3 AND user_id = $4
RETURNING *;
```

#### 할일 삭제 (MVP - 즉시 삭제)
```typescript
// Prisma
await prisma.todo.delete({
  where: { id: todoId },
});
```

```sql
-- Raw SQL
DELETE FROM todos
WHERE id = $1 AND user_id = $2;
```

#### 할일 삭제 (Phase 2 - Soft Delete)
```typescript
// Prisma
const trashed = await prisma.todo.update({
  where: { id: todoId },
  data: { status: 'TRASHED' },
});
```

```sql
-- Raw SQL
UPDATE todos
SET status = 'TRASHED', updated_at = NOW()
WHERE id = $1 AND user_id = $2
RETURNING *;
```

---

### 9.3 복잡한 쿼리

#### 마감일 임박 할일 조회
```typescript
// Prisma
const urgentTodos = await prisma.todo.findMany({
  where: {
    userId: user.id,
    status: 'ACTIVE',
    dueDate: {
      gte: new Date(), // 오늘 이후
      lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3일 이내
    },
  },
  orderBy: {
    dueDate: 'asc',
  },
});
```

```sql
-- Raw SQL
SELECT * FROM todos
WHERE user_id = $1
  AND status = 'ACTIVE'
  AND due_date >= NOW()
  AND due_date <= NOW() + INTERVAL '3 days'
ORDER BY due_date ASC;
```

#### 사용자와 할일 조인
```typescript
// Prisma
const userWithTodos = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    todos: {
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    },
  },
});
```

```sql
-- Raw SQL
SELECT
  u.*,
  t.id as todo_id,
  t.title,
  t.description,
  t.start_date,
  t.due_date,
  t.status,
  t.created_at as todo_created_at
FROM users u
LEFT JOIN todos t ON u.id = t.user_id AND t.status = 'ACTIVE'
WHERE u.id = $1
ORDER BY t.created_at DESC
LIMIT 10;
```

---

## 10. 성능 최적화

### 10.1 인덱스 활용

**느린 쿼리 식별**:
```sql
-- PostgreSQL Slow Query 로깅 활성화
SET log_min_duration_statement = 100; -- 100ms 이상 쿼리 로깅

-- 쿼리 실행 계획 확인
EXPLAIN ANALYZE
SELECT * FROM todos WHERE user_id = '...' AND status = 'ACTIVE';
```

**결과 예시**:
```
Index Scan using idx_todos_userId_status on todos  (cost=0.29..8.31 rows=1 width=...)
  Index Cond: ((user_id = '...') AND (status = 'ACTIVE'))
```

### 10.2 Connection Pooling

Prisma는 기본적으로 연결 풀 관리:

```typescript
// prisma/client.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**Vercel Serverless 최적화**:
```env
# .env
DATABASE_URL="postgresql://user:password@host:5432/db?connection_limit=5&pool_timeout=10"
```

---

## 11. 보안 고려사항

### 11.1 SQL Injection 방지

**Prisma 자동 방어**:
```typescript
// ✅ 안전 (파라미터화)
const todos = await prisma.todo.findMany({
  where: { userId: userInput },
});

// ❌ 위험 (Raw SQL 사용 시)
const todos = await prisma.$queryRaw`
  SELECT * FROM todos WHERE user_id = ${userInput}
`; // Prisma는 이것도 파라미터화함

// ❌ 매우 위험 (절대 사용 금지)
const todos = await prisma.$queryRawUnsafe(
  `SELECT * FROM todos WHERE user_id = '${userInput}'`
);
```

### 11.2 데이터 암호화

**비밀번호**:
- bcrypt 해시 (salt rounds: 10)
- 원본 비밀번호는 절대 저장하지 않음

**민감 정보**:
- 이메일: 평문 저장 (로그인 필요)
- 할일 내용: 평문 저장 (검색 필요)
- Phase 3: End-to-End 암호화 고려 가능

---

## 12. 향후 확장 고려사항

### 12.1 Phase 3 이후

**할일 우선순위**:
```prisma
model Todo {
  // ... 기존 필드
  priority Priority @default(MEDIUM)
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}
```

**카테고리/태그**:
```prisma
model Category {
  id        String @id @default(uuid())
  userId    String
  name      String
  color     String

  user      User   @relation(fields: [userId], references: [id])
  todos     Todo[]
}

model Todo {
  // ... 기존 필드
  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])
}
```

**반복 일정**:
```prisma
model Todo {
  // ... 기존 필드
  isRecurring Boolean @default(false)
  recurrenceRule String? // iCal RRULE 형식
}
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0 | 2025-11-25 | ERD 문서 초안 작성 | Claude |

---

**문서 버전**: 1.0
**최종 업데이트**: 2025-11-25
**관련 문서**: [PRD](./3-prd.md), [도메인 정의서](./1-domain-definition.md)

---

**End of Document**
