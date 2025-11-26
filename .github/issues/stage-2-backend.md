# Stage 2: Backend Issues (BE-1 ~ BE-20)

---

## Issue #11

### Title
[Stage 2] BE-1: Express.js 프로젝트 초기 설정

### Labels
- 종류: feature
- 영역: backend
- 복잡도: low

### Description

#### 📋 해야할 일
Node.js v20 LTS 환경에서 Express.js 백엔드 프로젝트 초기화, TypeScript 설정, 프로젝트 디렉토리 구조 구성

#### ✅ 완료 조건
- [ ] Node.js v20 LTS 설치 및 확인
- [ ] package.json 생성
- [ ] TypeScript 및 ts-node 설치
- [ ] Express.js 설치
- [ ] tsconfig.json 파일 생성 및 strict mode 활성화
- [ ] 프로젝트 디렉토리 구조 생성
- [ ] ESLint + Prettier 설정파일 생성
- [ ] 기본 Express 앱 생성
- [ ] 개발 서버 실행 가능 확인
- [ ] 환경 변수 로드를 위한 dotenv 설치 및 설정

#### 🔧 기술적 고려사항
- **기술 스택**: Node.js v20 LTS, Express.js, TypeScript
- **주요 구현 사항**:
  - Express 서버 초기 설정
  - TypeScript 컴파일러 설정
  - 개발 환경 구성
- **보안/성능 고려사항**:
  - TypeScript strict mode로 타입 안전성 확보
  - ESLint/Prettier로 코드 품질 유지

#### 🔗 의존성
- **선행 작업**: 없음
- **후행 작업**: #12 (BE-2)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-1](../../.claude/docs/8-execution-plan.md#task-be-1-expressjs-프로젝트-초기-설정)
- [PRD - 기술 스택](../../.claude/docs/3-prd.md#81-기술-스택)

---

## Issue #12

### Title
[Stage 2] BE-2: TypeScript 설정 및 타입 정의

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
프로젝트 전체에서 사용할 TypeScript 타입 정의 파일 작성

#### ✅ 완료 조건
- [ ] `src/types/` 디렉토리 생성
- [ ] User, Todo, PublicTodo 엔티티 타입 정의
- [ ] API 요청 DTO 타입 정의
- [ ] API 응답 DTO 타입 정의
- [ ] 에러 타입 정의
- [ ] JWT Payload 타입 정의
- [ ] 공통 유틸리티 타입 정의
- [ ] 모든 타입 파일이 컴파일 오류 없이 로드됨 확인

#### 🔧 기술적 고려사항
- **기술 스택**: TypeScript
- **주요 구현 사항**:
  - 엔티티 타입 정의
  - DTO 타입 정의
  - 유틸리티 타입 정의
- **보안/성능 고려사항**:
  - 타입 안전성 확보
  - 컴파일 타임 에러 검출

#### 🔗 의존성
- **선행 작업**: #11 (BE-1)
- **후행 작업**: #13 (BE-3)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-2](../../.claude/docs/8-execution-plan.md#task-be-2-typescript-설정-및-타입-정의)
- [도메인 정의서](../../.claude/docs/1-domain-definition.md)

---

## Issue #13

### Title
[Stage 2] BE-3: 데이터베이스 설정 및 Prisma ORM 구성

### Labels
- 종류: feature
- 영역: backend
- 복잡도: high

### Description

#### 📋 해야할 일
Vercel Postgres 또는 로컬 PostgreSQL 데이터베이스 연결, Prisma ORM 설치 및 초기화

#### ✅ 완료 조건
- [ ] Prisma 설치
- [ ] .env 파일에 DATABASE_URL 설정
- [ ] prisma/schema.prisma 파일 생성 및 데이터베이스 설정
- [ ] User 모델 정의
- [ ] Todo 모델 정의
- [ ] PublicTodo 모델 정의 (Phase 2용)
- [ ] Prisma 마이그레이션 실행
- [ ] Prisma 클라이언트 싱글톤 패턴 구현
- [ ] Prisma Studio에서 테이블 생성 확인

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma ORM, PostgreSQL
- **주요 구현 사항**:
  - Prisma 스키마 작성
  - 데이터베이스 연결 설정
  - Prisma Client 생성 및 싱글톤 패턴 구현
- **보안/성능 고려사항**:
  - 데이터베이스 연결 풀 관리
  - 환경 변수로 민감 정보 관리

#### 🔗 의존성
- **선행 작업**: #11 (BE-1)
- **후행 작업**: #14 (BE-4)

#### ⏱️ 예상 소요 시간
4시간

#### 📚 참고 문서
- [실행 계획서 - BE-3](../../.claude/docs/8-execution-plan.md#task-be-3-데이터베이스-설정-및-prisma-orm-구성)
- [ERD 문서](../../.claude/docs/5-erd.md)

---

## Issue #14

### Title
[Stage 2] BE-4: 회원가입 API 개발 (F-AUTH-001)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
Express.js 라우트에서 새 사용자 계정 생성 API 개발

#### ✅ 완료 조건
- [ ] bcrypt 패키지 설치
- [ ] authController.ts 생성
- [ ] signup 함수 구현
- [ ] 에러 처리 (중복 username/email, 검증 실패, 서버 오류)
- [ ] authRoutes.ts 생성
- [ ] POST /api/auth/signup 라우트 연결
- [ ] Express 앱에 라우터 등록
- [ ] Postman/Thunder Client에서 API 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, bcrypt, Prisma
- **주요 구현 사항**:
  - 회원가입 컨트롤러 및 라우트
  - 비밀번호 bcrypt 해싱
  - 중복 검증 및 에러 처리
- **보안/성능 고려사항**:
  - 비밀번호 bcrypt 해싱 (salt rounds: 10)
  - 중복 이메일/사용자명 검증
  - 에러 메시지에 민감 정보 노출 방지

#### 🔗 의존성
- **선행 작업**: #12 (BE-2), #13 (BE-3)
- **후행 작업**: #15 (BE-5)

#### ⏱️ 예상 소요 시간
4시간

#### 📚 참고 문서
- [실행 계획서 - BE-4](../../.claude/docs/8-execution-plan.md#task-be-4-회원가입-api-개발-f-auth-001)
- [PRD - 인증 기능](../../.claude/docs/3-prd.md#51-인증-및-회원-관리)

---

## Issue #15

### Title
[Stage 2] BE-5: 로그인 API 개발 (F-AUTH-002)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
사용자 인증 API 개발, 비밀번호 검증, JWT 토큰 발급

#### ✅ 완료 조건
- [ ] jsonwebtoken 패키지 설치
- [ ] JWT 유틸리티 함수 생성
- [ ] .env에 JWT 환경 변수 추가
- [ ] login 함수 구현
- [ ] POST /api/auth/login 라우트 연결
- [ ] Postman/Thunder Client에서 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, jsonwebtoken, bcrypt
- **주요 구현 사항**:
  - 로그인 컨트롤러 및 라우트
  - JWT 토큰 생성 및 발급
  - 비밀번호 검증
- **보안/성능 고려사항**:
  - JWT 시크릿 키 환경 변수 관리
  - 토큰 유효기간 설정 (24시간)
  - bcrypt.compare로 비밀번호 검증

#### 🔗 의존성
- **선행 작업**: #14 (BE-4)
- **후행 작업**: #16 (BE-6)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-5](../../.claude/docs/8-execution-plan.md#task-be-5-로그인-api-개발-f-auth-002)
- [PRD - 인증 플로우](../../.claude/docs/3-prd.md#84-인증-플로우)

---

## Issue #16

### Title
[Stage 2] BE-6: 입력 검증 미들웨어 및 express-validator 통합

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
express-validator를 사용한 요청 입력값 검증

#### ✅ 완료 조건
- [ ] express-validator 설치
- [ ] validators.ts 생성
- [ ] 사용자 정보 검증 규칙 정의
- [ ] 할일 정보 검증 규칙 정의
- [ ] 검증 함수 생성
- [ ] 검증 에러 처리 미들웨어 생성
- [ ] 라우트에 검증 미들웨어 연결
- [ ] Postman에서 검증 실패 케이스 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: express-validator
- **주요 구현 사항**:
  - 입력값 검증 규칙 정의
  - 검증 미들웨어 구현
  - 에러 처리 미들웨어
- **보안/성능 고려사항**:
  - 모든 입력값 검증
  - XSS 방지를 위한 sanitization

#### 🔗 의존성
- **선행 작업**: #14 (BE-4), #15 (BE-5)
- **후행 작업**: #17 (BE-7)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-6](../../.claude/docs/8-execution-plan.md#task-be-6-입력-검증-미들웨어-및-express-validator-통합)
- [도메인 정의서 - 데이터 검증 규칙](../../.claude/docs/1-domain-definition.md)

---

## Issue #17

### Title
[Stage 2] BE-7: 인증 미들웨어 개발

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
JWT 토큰 검증 미들웨어 개발

#### ✅ 완료 조건
- [ ] authMiddleware.ts 생성
- [ ] authenticate 함수 구현
- [ ] 에러 처리
- [ ] 미들웨어를 보호된 라우트에 적용 가능하도록 설정
- [ ] 테스트 (유효한 토큰, 만료된 토큰, 토큰 없음)

#### 🔧 기술적 고려사항
- **기술 스택**: jsonwebtoken, Express.js
- **주요 구현 사항**:
  - JWT 토큰 검증 미들웨어
  - Authorization 헤더 파싱
  - 토큰 검증 및 사용자 정보 추출
- **보안/성능 고려사항**:
  - 토큰 만료 검증
  - 잘못된 토큰에 대한 적절한 에러 처리

#### 🔗 의존성
- **선행 작업**: #15 (BE-5)
- **후행 작업**: #18 (BE-8)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-7](../../.claude/docs/8-execution-plan.md#task-be-7-인증-미들웨어-개발)
- [아키텍처 다이어그램 - 인증 플로우](../../.claude/docs/7-arch-diagram.md#5-인증-플로우)

---

## Issue #18

### Title
[Stage 2] BE-8: Todo 조회 API 개발 (F-TODO-001)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
로그인한 사용자의 활성 할일 목록 조회 API 개발

#### ✅ 완료 조건
- [ ] todoController.ts 생성
- [ ] getTodos 함수 구현
- [ ] todoRoutes.ts 생성
- [ ] GET /api/todos 라우트 생성
- [ ] 인증 미들웨어로 라우트 보호
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, Prisma
- **주요 구현 사항**:
  - Todo 조회 컨트롤러 및 라우트
  - 사용자별 할일 목록 필터링
  - 날짜순 정렬
- **보안/성능 고려사항**:
  - 인증된 사용자만 접근
  - 본인의 할일만 조회
  - 인덱스를 활용한 쿼리 최적화

#### 🔗 의존성
- **선행 작업**: #13 (BE-3), #17 (BE-7)
- **후행 작업**: #19 (BE-9)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-8](../../.claude/docs/8-execution-plan.md#task-be-8-todo-조회-api-개발-f-todo-001)
- [PRD - 할일 관리 기능](../../.claude/docs/3-prd.md#52-할일-관리-mvp-핵심)

---

## Issue #19

### Title
[Stage 2] BE-9: Todo 추가 API 개발 (F-TODO-002)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
새로운 할일 생성 API 개발

#### ✅ 완료 조건
- [ ] createTodo 함수 구현
- [ ] validateCreateTodo 검증 규칙 적용
- [ ] POST /api/todos 라우트 생성
- [ ] 인증 미들웨어로 라우트 보호
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, Prisma, express-validator
- **주요 구현 사항**:
  - Todo 생성 컨트롤러 및 라우트
  - 입력값 검증
  - 사용자 ID 자동 설정
- **보안/성능 고려사항**:
  - 입력값 검증 (제목, 설명, 날짜)
  - dueDate > startDate 검증

#### 🔗 의존성
- **선행 작업**: #18 (BE-8), #16 (BE-6)
- **후행 작업**: #20 (BE-10)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-9](../../.claude/docs/8-execution-plan.md#task-be-9-todo-추가-api-개발-f-todo-002)
- [PRD - 할일 추가](../../.claude/docs/3-prd.md#52-할일-관리-mvp-핵심)

---

## Issue #20

### Title
[Stage 2] BE-10: Todo 수정 API 개발 (F-TODO-003)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
기존 할일의 내용 및 일정 수정 API 개발

#### ✅ 완료 조건
- [ ] updateTodo 함수 구현
- [ ] validateUpdateTodo 검증 규칙 적용
- [ ] PUT /api/todos/:id 라우트 생성
- [ ] 인증 미들웨어로 라우트 보호
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, Prisma, express-validator
- **주요 구현 사항**:
  - Todo 수정 컨트롤러 및 라우트
  - 입력값 검증
  - 소유자 확인 (본인 할일만 수정)
- **보안/성능 고려사항**:
  - 소유자 확인 (userId 일치 검증)
  - 존재하지 않는 할일에 대한 에러 처리

#### 🔗 의존성
- **선행 작업**: #19 (BE-9)
- **후행 작업**: #21 (BE-11)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-10](../../.claude/docs/8-execution-plan.md#task-be-10-todo-수정-api-개발-f-todo-003)
- [PRD - 할일 수정](../../.claude/docs/3-prd.md#52-할일-관리-mvp-핵심)

---

## Issue #21

### Title
[Stage 2] BE-11: Todo 삭제 API 개발 (F-TODO-004 - MVP 버전)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: low

### Description

#### 📋 해야할 일
할일 삭제 API 개발 (MVP에서는 즉시 삭제)

#### ✅ 완료 조건
- [ ] deleteTodo 함수 구현
- [ ] DELETE /api/todos/:id 라우트 생성
- [ ] 인증 미들웨어로 라우트 보호
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, Prisma
- **주요 구현 사항**:
  - Todo 삭제 컨트롤러 및 라우트
  - 즉시 삭제 (DELETE 쿼리)
  - 소유자 확인
- **보안/성능 고려사항**:
  - 소유자 확인 (본인 할일만 삭제)
  - 존재하지 않는 할일에 대한 에러 처리

**참고**: MVP에서는 즉시 삭제. Phase 2에서 status를 TRASHED로 변경하는 soft delete로 변경 예정.

#### 🔗 의존성
- **선행 작업**: #20 (BE-10)
- **후행 작업**: #22 (BE-12)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-11](../../.claude/docs/8-execution-plan.md#task-be-11-todo-삭제-api-개발-f-todo-004---mvp-버전)
- [PRD - 할일 삭제](../../.claude/docs/3-prd.md#52-할일-관리-mvp-핵심)

---

## Issue #22

### Title
[Stage 2] BE-12: 에러 핸들링 미들웨어 및 공통 에러 처리

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
전역 에러 핸들링 미들웨어 개발

#### ✅ 완료 조건
- [ ] errorHandler.ts 생성
- [ ] 에러 응답 형식 정의
- [ ] 에러 코드 정의
- [ ] 글로벌 에러 핸들러 미들웨어 구현
- [ ] 404 핸들러
- [ ] Express 앱에 미들웨어 등록
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, TypeScript
- **주요 구현 사항**:
  - 에러 핸들링 미들웨어
  - 에러 응답 형식 표준화
  - 에러 코드 정의
- **보안/성능 고려사항**:
  - 프로덕션 환경에서 스택 트레이스 숨김
  - 명확한 에러 메시지 제공

#### 🔗 의존성
- **선행 작업**: #21 (BE-11)
- **후행 작업**: #23 (BE-13)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-12](../../.claude/docs/8-execution-plan.md#task-be-12-에러-핸들링-미들웨어-및-공통-에러-처리)
- [PRD - 에러 핸들링](../../.claude/docs/3-prd.md#85-에러-핸들링)

---

## Issue #23

### Title
[Stage 2] BE-13: API 테스트 (Postman/Thunder Client)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
모든 API 엔드포인트에 대한 통합 테스트

#### ✅ 완료 조건
- [ ] Postman 또는 Thunder Client 컬렉션 생성
- [ ] 회원가입 API 테스트
- [ ] 로그인 API 테스트
- [ ] 할일 조회 API 테스트
- [ ] 할일 추가 API 테스트
- [ ] 할일 수정 API 테스트
- [ ] 할일 삭제 API 테스트
- [ ] 테스트 결과 문서화
- [ ] API 응답 시간 측정

#### 🔧 기술적 고려사항
- **기술 스택**: Postman 또는 Thunder Client
- **주요 구현 사항**:
  - API 테스트 컬렉션 작성
  - 각 엔드포인트 테스트
  - 성공/실패 케이스 검증
- **보안/성능 고려사항**:
  - 인증 토큰 관리
  - API 응답 시간 측정 및 최적화

#### 🔗 의존성
- **선행 작업**: #22 (BE-12)
- **후행 작업**: #24 (BE-14)

#### ⏱️ 예상 소요 시간
4시간

#### 📚 참고 문서
- [실행 계획서 - BE-13](../../.claude/docs/8-execution-plan.md#task-be-13-api-테스트-postmanthunder-client)
- [PRD - API 엔드포인트](../../.claude/docs/3-prd.md#114-api-엔드포인트-목록)

---

## Issue #24

### Title
[Stage 2] BE-14: CORS 설정 및 보안 미들웨어

### Labels
- 종류: feature
- 영역: backend
- 복잡도: low

### Description

#### 📋 해야할 일
CORS 설정으로 프론트엔드 요청 허용

#### ✅ 완료 조건
- [ ] cors 패키지 설치
- [ ] CORS 미들웨어 생성 및 설정
- [ ] Express 앱에 CORS 미들웨어 등록
- [ ] 보안 헤더 설정
- [ ] 요청 크기 제한
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, cors 패키지
- **주요 구현 사항**:
  - CORS 설정
  - 보안 헤더 설정 (helmet 등)
  - 요청 크기 제한
- **보안/성능 고려사항**:
  - 허용된 origin만 접근 가능
  - 보안 헤더 설정으로 XSS, CSRF 방지

#### 🔗 의존성
- **선행 작업**: #23 (BE-13)
- **후행 작업**: #25 (BE-15)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-14](../../.claude/docs/8-execution-plan.md#task-be-14-cors-설정-및-보안-미들웨어)
- [PRD - 보안 요구사항](../../.claude/docs/3-prd.md#72-보안-요구사항)

---

## Issue #25

### Title
[Stage 2] BE-15: 환경 변수 관리 및 설정 파일

### Labels
- 종류: feature
- 영역: backend
- 복잡도: low

### Description

#### 📋 해야할 일
프로덕션 및 개발 환경에 따른 환경 변수 관리

#### ✅ 완료 조건
- [ ] .env.example 파일 생성
- [ ] environment.ts 생성
- [ ] 개발 환경 (.env) 설정
- [ ] 프로덕션 환경 (Vercel) 준비
- [ ] 환경 변수 로드
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: dotenv, TypeScript
- **주요 구현 사항**:
  - 환경 변수 관리
  - .env.example 파일
  - 환경 변수 검증
- **보안/성능 고려사항**:
  - 민감 정보는 환경 변수로 관리
  - .env 파일은 .gitignore에 포함

#### 🔗 의존성
- **선행 작업**: #11 (BE-1)
- **후행 작업**: #26 (BE-16)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - BE-15](../../.claude/docs/8-execution-plan.md#task-be-15-환경-변수-관리-및-설정-파일)
- [PRD - 환경 설정](../../.claude/docs/3-prd.md#115-환경-설정)

---

## Issue #26

### Title
[Stage 2] BE-16: 로깅 설정 및 헬스 체크 엔드포인트

### Labels
- 종류: feature
- 영역: backend
- 복잡도: low

### Description

#### 📋 해야할 일
서버 로깅 설정, 헬스 체크 엔드포인트 구현

#### ✅ 완료 조건
- [ ] logger.ts 생성
- [ ] 로그 레벨 설정
- [ ] GET /api/health 엔드포인트 구현
- [ ] healthRoutes.ts 생성
- [ ] 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Express.js, winston 또는 pino (선택)
- **주요 구현 사항**:
  - 로깅 시스템 구축
  - 헬스 체크 엔드포인트
  - 로그 레벨 설정
- **보안/성능 고려사항**:
  - 민감 정보 로깅 방지
  - 로그 레벨을 통한 성능 최적화

#### 🔗 의존성
- **선행 작업**: #24 (BE-14)
- **후행 작업**: #27 (BE-17)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-16](../../.claude/docs/8-execution-plan.md#task-be-16-로깅-설정-및-헬스-체크-엔드포인트)
- [PRD - 모니터링](../../.claude/docs/3-prd.md#74-가용성-및-안정성)

---

## Issue #27

### Title
[Stage 2] BE-17: Vercel 배포 설정

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
Vercel Serverless Functions를 위한 백엔드 배포 설정

#### ✅ 완료 조건
- [ ] vercel.json 파일 생성
- [ ] package.json에 build 스크립트 추가
- [ ] .gitignore 파일 확인
- [ ] GitHub 저장소 연결 (선택사항)
- [ ] Vercel에서 프로젝트 생성
- [ ] 로컬에서 vercel dev로 테스트
- [ ] 배포 문서 작성

#### 🔧 기술적 고려사항
- **기술 스택**: Vercel, Serverless Functions
- **주요 구현 사항**:
  - vercel.json 설정
  - Serverless Functions 구조
  - 환경 변수 설정
- **보안/성능 고려사항**:
  - 환경 변수 Vercel 대시보드에서 설정
  - Cold Start 최적화

#### 🔗 의존성
- **선행 작업**: #26 (BE-16)
- **후행 작업**: #28 (BE-18)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-17](../../.claude/docs/8-execution-plan.md#task-be-17-vercel-배포-설정)
- [PRD - 배포 및 인프라](../../.claude/docs/3-prd.md#81-기술-스택)

---

## Issue #28

### Title
[Stage 2] BE-18: 백엔드 API 문서화

### Labels
- 종류: documentation
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
API 엔드포인트 명세서 작성

#### ✅ 완료 조건
- [ ] docs/API.md 파일 생성
- [ ] API 개요 작성
- [ ] 각 엔드포인트 문서 작성
- [ ] 에러 코드 목록
- [ ] 데이터 모델 정의
- [ ] Postman/Thunder Client 컬렉션 JSON 내보내기

#### 🔧 기술적 고려사항
- **기술 스택**: Markdown
- **주요 구현 사항**:
  - API 문서 작성
  - 엔드포인트 명세
  - 에러 코드 정의
- **보안/성능 고려사항**:
  - 인증 방법 명확히 설명
  - 요청/응답 예시 제공

#### 🔗 의존성
- **선행 작업**: #23 (BE-13)
- **후행 작업**: #29 (BE-19)

#### ⏱️ 예상 소요 시간
3시간

#### 📚 참고 문서
- [실행 계획서 - BE-18](../../.claude/docs/8-execution-plan.md#task-be-18-백엔드-api-문서화)
- [PRD - API 구조](../../.claude/docs/3-prd.md#82-아키텍처-설계)

---

## Issue #29

### Title
[Stage 2] BE-19: 보안 강화 및 입력 살균 (Sanitization)

### Labels
- 종류: feature
- 영역: backend
- 복잡도: medium

### Description

#### 📋 해야할 일
XSS 방지, SQL Injection 방지, 입력값 살균

#### ✅ 완료 조건
- [ ] express-validator로 기본 입력 검증
- [ ] 특수문자 처리
- [ ] 비밀번호 보안
- [ ] JWT 토큰 보안
- [ ] 검증 및 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: express-validator, Prisma
- **주요 구현 사항**:
  - 입력값 sanitization
  - XSS 방지
  - SQL Injection 방지 (Prisma 파라미터화)
- **보안/성능 고려사항**:
  - 모든 입력값 검증 및 살균
  - Prisma ORM을 통한 SQL Injection 방지

#### 🔗 의존성
- **선행 작업**: #16 (BE-6), #22 (BE-12), #23 (BE-13)
- **후행 작업**: #30 (BE-20)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-19](../../.claude/docs/8-execution-plan.md#task-be-19-보안-강화-및-입력-살균-sanitization)
- [PRD - 보안 요구사항](../../.claude/docs/3-prd.md#72-보안-요구사항)

---

## Issue #30

### Title
[Stage 2] BE-20: README 및 개발 가이드 문서 작성

### Labels
- 종류: documentation
- 영역: backend
- 복잡도: low

### Description

#### 📋 해야할 일
프로젝트 설정 및 실행 방법, 개발 가이드 문서 작성

#### ✅ 완료 조건
- [ ] README.md 작성
- [ ] docs/DEVELOPMENT.md 작성 (선택)
- [ ] 라이센스 파일 (LICENSE)
- [ ] .gitignore 확인

#### 🔧 기술적 고려사항
- **기술 스택**: Markdown
- **주요 구현 사항**:
  - README 작성
  - 개발 가이드 문서
  - 라이센스 파일
- **보안/성능 고려사항**:
  - 민감 정보 노출 방지
  - 명확한 설정 가이드 제공

#### 🔗 의존성
- **선행 작업**: #28 (BE-18)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - BE-20](../../.claude/docs/8-execution-plan.md#task-be-20-readme-및-개발-가이드-문서-작성)

---

**Total Issues: 20**
**Total Estimated Time: 55 hours**
