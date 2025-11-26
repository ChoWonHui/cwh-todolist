# Stage 1: Database Issues (DB-1 ~ DB-10)

---

## Issue #1

### Title
[Stage 1] DB-1: PostgreSQL 개발 환경 구성 및 Docker 설정

### Labels
- 종류: feature
- 영역: database
- 복잡도: low

### Description

#### 📋 해야할 일
Docker Compose를 통해 로컬 개발 환경에서 PostgreSQL 14 인스턴스를 구동하고, 환경 변수 및 연결 설정을 완료합니다.

#### ✅ 완료 조건
- [x] Docker Compose 파일(docker-compose.yml) 작성
- [x] 로컬 .env 파일에 DATABASE_URL 설정
- [x] 로컬 PostgreSQL 인스턴스 실행 확인 (postgresql-x64-15 서비스 Running)
- [x] 데이터베이스 설정 스크립트 작성 및 실행 (cwh_user, cwh_todolist 생성 완료)
- [x] 스키마 실행 완료 (users, todos, public_todos 테이블 생성)
- [ ] Vercel Postgres 데이터베이스 생성 및 환경 변수 설정
- [ ] 개발/프로덕션 환경 간 데이터베이스 연결 모두 작동 확인

#### 🔧 기술적 고려사항
- **기술 스택**: Docker, PostgreSQL 14+, Vercel Postgres
- **주요 구현 사항**:
  - Docker Compose를 통한 로컬 PostgreSQL 구동
  - 환경 변수 설정 (.env 파일)
  - 데이터베이스 초기 설정 스크립트
- **보안/성능 고려사항**:
  - 비밀번호는 환경 변수로 관리
  - .env 파일은 .gitignore에 포함

#### 🔗 의존성
- **선행 작업**: 없음
- **후행 작업**: #2 (DB-2)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - 3. 데이터베이스 작업](../../.claude/docs/8-execution-plan.md#3-데이터베이스-작업)
- [ERD 문서](../../.claude/docs/5-erd.md)

---

## Issue #2

### Title
[Stage 1] DB-2: Prisma 초기 설정 및 스키마 작성 (MVP Phase 1)

### Labels
- 종류: feature
- 영역: database
- 복잡도: medium

### Description

#### 📋 해야할 일
Prisma ORM을 프로젝트에 설치 및 구성하고, MVP 단계에 필요한 User, Todo 모델 및 Status ENUM을 정의합니다.

#### ✅ 완료 조건
- [ ] Prisma CLI 및 @prisma/client 패키지 설치
- [ ] prisma/schema.prisma 파일 작성
- [ ] User 모델 정의: id(UUID), username, email, password, createdAt, updatedAt
- [ ] Todo 모델 정의: id, userId, title, description, startDate, dueDate, status, createdAt, updatedAt
- [ ] Status ENUM 정의: ACTIVE, TRASHED
- [ ] 관계 설정: User.todos (1:N), Todo.user (N:1) with CASCADE delete
- [ ] @map 지시어로 필드명 snake_case 매핑 설정
- [ ] 초기 인덱스 정의: userId, createdAt, (userId, status) 복합 인덱스

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma ORM, TypeScript
- **주요 구현 사항**:
  - Prisma 스키마 파일 작성
  - 엔티티 모델 정의 (User, Todo)
  - 관계 매핑 및 외래 키 제약 조건
  - 인덱스 설정
- **보안/성능 고려사항**:
  - CASCADE delete로 데이터 무결성 보장
  - 인덱스를 통한 쿼리 성능 최적화

**참고**: 현재 `database/schema.sql` 파일에 직접 SQL 스키마가 작성되어 있습니다. Prisma 설정은 백엔드 개발 시작 시점(BE-3)에 진행 예정입니다.

#### 🔗 의존성
- **선행 작업**: #1 (DB-1)
- **후행 작업**: #3 (DB-3)

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - DB-2](../../.claude/docs/8-execution-plan.md#task-db-2-prisma-초기-설정-및-스키마-작성-mvp-phase-1)
- [ERD 문서 - Prisma 스키마](../../.claude/docs/5-erd.md#61-전체-스키마-schemaprisma)

---

## Issue #3

### Title
[Stage 1] DB-3: 초기 마이그레이션 생성 및 실행

### Labels
- 종류: feature
- 영역: database
- 복잡도: medium

### Description

#### 📋 해야할 일
Prisma 스키마를 기반으로 초기 데이터베이스 마이그레이션을 생성하고, 로컬 및 프로덕션 환경에 적용합니다.

#### ✅ 완료 조건
- [ ] `npx prisma migrate dev --name init` 실행으로 초기 마이그레이션 생성
- [ ] prisma/migrations/[timestamp]_init/migration.sql 파일 검토
- [ ] 생성된 마이그레이션에 외래 키 제약(ON DELETE CASCADE) 포함 확인
- [ ] 로컬 개발 환경에 마이그레이션 적용 및 테이블 생성 확인
- [ ] Prisma Client 생성: `npx prisma generate`
- [ ] 프로덕션 환경(Vercel Postgres)에 마이그레이션 배포
- [ ] Vercel 대시보드에서 프로덕션 데이터베이스 테이블 생성 확인

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma Migrate, PostgreSQL
- **주요 구현 사항**:
  - Prisma 마이그레이션 파일 생성
  - 로컬 환경 마이그레이션 적용
  - 프로덕션 환경 마이그레이션 배포
  - Prisma Client 생성
- **보안/성능 고려사항**:
  - 마이그레이션 파일 버전 관리
  - 프로덕션 배포 전 충분한 테스트

**참고**: 현재 `database/schema.sql` 파일 사용 중. Prisma 마이그레이션은 백엔드 개발 단계에서 진행 예정.

#### 🔗 의존성
- **선행 작업**: #2 (DB-2)
- **후행 작업**: #4 (DB-4), #5 (DB-5), #6 (DB-6)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - DB-3](../../.claude/docs/8-execution-plan.md#task-db-3-초기-마이그레이션-생성-및-실행)
- [ERD 문서 - 마이그레이션 전략](../../.claude/docs/5-erd.md#8-마이그레이션-전략)

---

## Issue #4

### Title
[Stage 1] DB-4: 초기 데이터 시딩 (테스트 데이터 및 국경일)

### Labels
- 종류: feature
- 영역: database
- 복잡도: low

### Description

#### 📋 해야할 일
MVP 테스트 및 향후 Phase 2 개발을 위해 샘플 사용자, 할일 데이터를 시딩합니다.

#### ✅ 완료 조건
- [ ] prisma/seed.ts 파일 생성
- [ ] 테스트 사용자 2명 생성: bcrypt 해시된 테스트 비밀번호 포함
- [ ] 테스트 사용자별 할일 데이터 4~5개 생성
- [ ] package.json에 "prisma.seed" 설정 추가
- [ ] `npx prisma db seed` 실행으로 로컬 환경 시딩
- [ ] 시딩 완료 후 데이터 검증
- [ ] Phase 2 대비: 시딩 스크립트에 국경일 데이터 추가 가능하도록 구조 준비

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma, TypeScript, bcrypt
- **주요 구현 사항**:
  - 시딩 스크립트 작성
  - 테스트 사용자 및 할일 데이터 생성
  - bcrypt를 사용한 비밀번호 해싱
- **보안/성능 고려사항**:
  - 테스트 비밀번호도 bcrypt로 해싱
  - 실제 프로덕션 데이터와 구분

#### 🔗 의존성
- **선행 작업**: #3 (DB-3)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - DB-4](../../.claude/docs/8-execution-plan.md#task-db-4-초기-데이터-시딩-테스트-데이터-및-국경일)
- [ERD 문서 - 샘플 데이터](../../.claude/docs/5-erd.md#7-샘플-데이터)

---

## Issue #5

### Title
[Stage 1] DB-5: 필수 인덱스 검증 및 최적화

### Labels
- 종류: feature
- 영역: database
- 복잡도: medium

### Description

#### 📋 해야할 일
마이그레이션에서 자동 생성된 인덱스와 추가 필요한 인덱스를 검증하고, 데이터베이스 쿼리 성능 최적화를 위해 필요한 인덱스를 추가합니다.

#### ✅ 완료 조건
- [ ] users 테이블 인덱스 확인: PRIMARY KEY, UNIQUE INDEX (username, email)
- [ ] todos 테이블 인덱스 확인: PRIMARY KEY, INDEX (userId, createdAt), COMPOSITE INDEX (userId, status)
- [ ] 인덱스 목록 조회 및 확인
- [ ] 필요 시 인덱스 생성 마이그레이션 추가
- [ ] EXPLAIN ANALYZE로 주요 쿼리 성능 계획 검증

#### 🔧 기술적 고려사항
- **기술 스택**: PostgreSQL, Prisma
- **주요 구현 사항**:
  - 인덱스 검증 및 추가
  - 쿼리 성능 분석 (EXPLAIN ANALYZE)
  - 필요 시 추가 마이그레이션 생성
- **보안/성능 고려사항**:
  - 적절한 인덱스로 쿼리 성능 향상
  - 과도한 인덱스는 쓰기 성능 저하 유발

#### 🔗 의존성
- **선행 작업**: #3 (DB-3)
- **후행 작업**: #6 (DB-6)

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - DB-5](../../.claude/docs/8-execution-plan.md#task-db-5-필수-인덱스-검증-및-최적화)
- [ERD 문서 - 인덱스 전략](../../.claude/docs/5-erd.md#55-인덱스-전략)

---

## Issue #6

### Title
[Stage 1] DB-6: 데이터 검증 및 제약 조건 구현

### Labels
- 종류: feature
- 영역: database
- 복잡도: medium

### Description

#### 📋 해야할 일
애플리케이션 레벨의 비즈니스 규칙 및 데이터 길이 제약을 구현합니다.

#### ✅ 완료 조건
- [ ] Prisma 스키마 업데이트: 데이터 타입 및 길이 제약 확인
- [ ] PostgreSQL CHECK 제약 생성 마이그레이션 추가(선택)
- [ ] 마이그레이션 생성 및 적용
- [ ] 애플리케이션 레벨 검증 규칙 문서화
- [ ] 제약 조건 위반 테스트

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma, PostgreSQL
- **주요 구현 사항**:
  - 데이터 타입 및 길이 제약 확인
  - CHECK 제약 조건 추가 (선택)
  - 검증 규칙 문서화
- **보안/성능 고려사항**:
  - 데이터 무결성 보장
  - 잘못된 데이터 입력 방지

#### 🔗 의존성
- **선행 작업**: #3 (DB-3), #5 (DB-5)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - DB-6](../../.claude/docs/8-execution-plan.md#task-db-6-데이터-검증-및-제약-조건-구현)
- [PRD - 기능 요구사항](../../.claude/docs/3-prd.md#5-기능-요구사항-functional-requirements)

---

## Issue #7

### Title
[Stage 1] DB-7: Phase 2 PublicTodo 모델 및 마이그레이션 준비

### Labels
- 종류: feature
- 영역: database
- 복잡도: low

### Description

#### 📋 해야할 일
MVP 출시 후 Phase 2에서 구현할 공통 할일(국경일 등) 기능을 위해 PublicTodo 모델과 마이그레이션을 미리 정의합니다.

#### ✅ 완료 조건
- [ ] Prisma 스키마에 PublicTodo 모델 추가
- [ ] PublicTodo 인덱스 정의
- [ ] Phase 2 마이그레이션 파일 사전 생성
- [ ] 마이그레이션 파일 검토 및 저장
- [ ] Phase 2 시작 전 체크리스트에 "마이그레이션 배포" 항목 추가

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma, PostgreSQL
- **주요 구현 사항**:
  - PublicTodo 모델 정의
  - Phase 2 마이그레이션 준비
  - 인덱스 설정
- **보안/성능 고려사항**:
  - Phase 2 기능 배포 시 빠른 전환 가능

#### 🔗 의존성
- **선행 작업**: #2 (DB-2)
- **후행 작업**: 없음 (Phase 2 배포 시 사용)

#### ⏱️ 예상 소요 시간
1시간

#### 📚 참고 문서
- [실행 계획서 - DB-7](../../.claude/docs/8-execution-plan.md#task-db-7-phase-2-publictodo-모델-및-마이그레이션-준비)
- [ERD 문서 - PublicTodo](../../.claude/docs/5-erd.md#34-public_todos-공통-할일---phase-2)

---

## Issue #8

### Title
[Stage 1] DB-8: 백업 및 복구 전략 구현

### Labels
- 종류: feature
- 영역: database
- 복잡도: medium

### Description

#### 📋 해야할 일
프로덕션 데이터 안정성을 위해 자동 백업, 수동 백업 절차, 그리고 복구 전략을 수립합니다.

#### ✅ 완료 조건
- [ ] Vercel Postgres 자동 백업 설정 확인
- [ ] 로컬 개발 환경용 수동 백업 스크립트 작성
- [ ] 백업 저장 경로 설정
- [ ] 백업 및 복구 절차 문서화
- [ ] 테스트: 백업 파일 생성 후 로컬 데이터베이스에서 복구 테스트
- [ ] 프로덕션 긴급 복구 절차 문서화
- [ ] .gitignore에 백업 파일 패턴 추가

#### 🔧 기술적 고려사항
- **기술 스택**: PostgreSQL, Vercel Postgres, Bash/Shell
- **주요 구현 사항**:
  - 백업 스크립트 작성 (pg_dump)
  - 복구 절차 문서화
  - Vercel Postgres 자동 백업 확인
- **보안/성능 고려사항**:
  - 백업 파일 보안 (Git에 포함하지 않음)
  - 정기적인 백업 및 복구 테스트

#### 🔗 의존성
- **선행 작업**: #1 (DB-1)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - DB-8](../../.claude/docs/8-execution-plan.md#task-db-8-백업-및-복구-전략-구현)
- [ERD 문서 - 백업 및 복구](../../.claude/docs/5-erd.md#84-데이터-백업-및-복구)

---

## Issue #9

### Title
[Stage 1] DB-9: 데이터베이스 마이그레이션 히스토리 관리 및 롤백 전략 수립

### Labels
- 종류: documentation
- 영역: database
- 복잡도: medium

### Description

#### 📋 해야할 일
향후 데이터베이스 스키마 변경 시를 대비하여 마이그레이션 버전 관리 및 롤백 전략을 정의합니다.

#### ✅ 완료 조건
- [ ] prisma/migrations/ 디렉토리 구조 확인 및 마이그레이션 명명 규칙 정의
- [ ] 마이그레이션 상태 확인 명령어 문서화
- [ ] 롤백 전략 수립 및 롤백 SQL 템플릿 작성
- [ ] 롤백 테스트 절차 문서화
- [ ] 마이그레이션 히스토리 추적 문서 작성
- [ ] 팀/향후 개발자를 위한 마이그레이션 작성 가이드 문서화

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma Migrate, PostgreSQL
- **주요 구현 사항**:
  - 마이그레이션 히스토리 관리
  - 롤백 전략 및 템플릿
  - 문서화
- **보안/성능 고려사항**:
  - 안전한 롤백 절차
  - 데이터 손실 방지

#### 🔗 의존성
- **선행 작업**: #3 (DB-3)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
1.5시간

#### 📚 참고 문서
- [실행 계획서 - DB-9](../../.claude/docs/8-execution-plan.md#task-db-9-데이터베이스-마이그레이션-히스토리-관리-및-롤백-전략-수립)
- [ERD 문서 - 롤백 전략](../../.claude/docs/5-erd.md#83-롤백-전략)

---

## Issue #10

### Title
[Stage 1] DB-10: 데이터베이스 문서화 및 성능 모니터링 설정

### Labels
- 종류: documentation
- 영역: database
- 복잡도: medium

### Description

#### 📋 해야할 일
데이터베이스 스키마, 쿼리 최적화, 성능 모니터링을 위한 문서 및 도구를 준비합니다.

#### ✅ 완료 조건
- [ ] docs/DATABASE.md 파일 작성
- [ ] Prisma Studio 사용 가이드
- [ ] PostgreSQL 느린 쿼리 로깅 설정
- [ ] 성능 벤치마크 계획
- [ ] 개발팀 온보딩 체크리스트에 "DATABASE.md 읽기" 항목 추가

#### 🔧 기술적 고려사항
- **기술 스택**: Prisma Studio, PostgreSQL
- **주요 구현 사항**:
  - 데이터베이스 문서 작성
  - Prisma Studio 가이드
  - 성능 모니터링 설정
- **보안/성능 고려사항**:
  - 느린 쿼리 식별 및 최적화
  - 성능 벤치마크 기준 설정

#### 🔗 의존성
- **선행 작업**: #1, #2, #3, #4, #5, #6, #7, #8, #9 (모든 DB 작업)
- **후행 작업**: 없음

#### ⏱️ 예상 소요 시간
2시간

#### 📚 참고 문서
- [실행 계획서 - DB-10](../../.claude/docs/8-execution-plan.md#task-db-10-데이터베이스-문서화-및-성능-모니터링-설정)
- [ERD 문서](../../.claude/docs/5-erd.md)

---

**Total Issues: 10**
**Total Estimated Time: 15 hours**
