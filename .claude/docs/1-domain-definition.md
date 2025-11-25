# cwh-todolist 도메인 정의서

## 1. 프로젝트 개요

**cwh-todolist**는 사용자가 개인 할일 목록을 효과적으로 관리할 수 있는 Todo 애플리케이션입니다. 할일의 일정 관리 기능과 함께 국경일과 같은 공통 일정도 함께 확인할 수 있습니다.

## 2. 핵심 도메인 개념

### 2.1 User (사용자)

- 애플리케이션을 사용하는 회원
- 회원 가입 및 로그인을 통해 인증된 사용자만 서비스 이용 가능
- 자신만의 독립적인 할일 목록을 소유

### 2.2 Todo (할일)

- 사용자가 생성하고 관리하는 개인 할일 항목
- 할일의 내용, 시작 시기, 만료 시기를 포함
- 활성 상태 또는 휴지통 상태를 가짐

### 2.3 Public Todo (공통 할일)

- 국경일과 같이 모든 사용자에게 공통으로 표시되는 일정
- 사용자가 삭제할 수 없음
- 시스템 또는 관리자에 의해 관리됨

### 2.4 Trash (휴지통)

- 삭제된 할일이 일시적으로 보관되는 공간
- 휴지통에 있는 할일은 복원 가능
- 휴지통에서 영구 삭제 수행 가능

## 3. 주요 엔티티 및 관계

```
User (1) ──── (N) Todo
             │
             └─ status: ACTIVE / TRASHED

PublicTodo ──── (모든 User에게 표시)
```

### 엔티티 속성

**User**

- userId: 사용자 식별자
- username: 사용자명
- email: 이메일
- password: 비밀번호 (암호화)

**Todo**

- todoId: 할일 식별자
- userId: 소유자 (User 참조)
- title: 할일 제목
- description: 할일 설명
- startDate: 시작 일시
- dueDate: 만료 일시
- status: 상태 (ACTIVE, TRASHED)
- createdAt: 생성 일시
- updatedAt: 수정 일시

**PublicTodo**

- publicTodoId: 공통 할일 식별자
- title: 일정 제목
- description: 설명
- eventDate: 일정 날짜
- type: 일정 유형 (국경일, 기념일 등)

## 4. 기능 요구사항

### 4.1 인증 및 회원 관리

#### [F-AUTH-001] 회원 가입
새로운 사용자 계정 생성

**입력**
- username: 사용자명
- email: 이메일 주소
- password: 비밀번호

**전제조건**
- 입력값이 섹션 5.5의 데이터 검증 규칙을 만족해야 함
- 동일한 username 또는 email이 이미 존재하지 않아야 함

**성공 조건**
- HTTP 201 Created 응답
- 새로운 userId 반환
- 사용자 정보가 데이터베이스에 저장됨 (비밀번호는 암호화되어 저장)

**실패 조건**
- HTTP 400 Bad Request: 유효성 검증 실패 (형식 오류)
- HTTP 409 Conflict: 중복된 username 또는 email 존재
- HTTP 500 Internal Server Error: 서버 오류

---

#### [F-AUTH-002] 로그인
인증된 사용자만 서비스 이용 가능

**입력**
- email 또는 username: 사용자 식별 정보
- password: 비밀번호

**전제조건**
- 가입된 사용자여야 함

**성공 조건**
- HTTP 200 OK 응답
- 인증 토큰(JWT 등) 발급
- 토큰 유효기간 정보 제공

**실패 조건**
- HTTP 401 Unauthorized: 인증 정보가 올바르지 않음
- HTTP 400 Bad Request: 필수 입력값 누락
- HTTP 500 Internal Server Error: 서버 오류

### 4.2 할일 관리

#### [F-TODO-001] 조회
로그인한 사용자의 활성 할일 목록 조회

**입력**
- 인증 토큰 (헤더)
- 선택적 필터: 날짜 범위, 정렬 기준

**전제조건**
- 로그인된 사용자여야 함 (BR-AUTH-001)

**성공 조건**
- HTTP 200 OK 응답
- 사용자의 활성(status=ACTIVE) 할일 목록 반환
- 각 할일의 모든 속성 포함 (todoId, title, description, startDate, dueDate, status, createdAt, updatedAt)
- 빈 배열 반환 가능 (할일이 없는 경우)

**실패 조건**
- HTTP 401 Unauthorized: 인증 토큰 없음 또는 만료
- HTTP 500 Internal Server Error: 서버 오류

---

#### [F-TODO-002] 추가
새로운 할일 생성

**입력**
- 인증 토큰 (헤더)
- title: 할일 제목
- description: 할일 설명 (선택)
- startDate: 시작 일시
- dueDate: 만료 일시

**전제조건**
- 로그인된 사용자여야 함 (BR-AUTH-001)
- 입력값이 섹션 5.5의 데이터 검증 규칙을 만족해야 함
- dueDate가 startDate보다 이후여야 함 (BR-TODO-001)

**성공 조건**
- HTTP 201 Created 응답
- 새로운 todoId 반환
- status는 ACTIVE로 자동 설정
- userId는 인증 토큰에서 추출하여 자동 설정
- createdAt, updatedAt 자동 생성

**실패 조건**
- HTTP 400 Bad Request: 유효성 검증 실패 (날짜 범위, 제목 길이 등)
- HTTP 401 Unauthorized: 인증 토큰 없음 또는 만료
- HTTP 500 Internal Server Error: 서버 오류

---

#### [F-TODO-003] 수정
기존 할일의 내용 및 일정 수정

**입력**
- 인증 토큰 (헤더)
- todoId: 수정할 할일 식별자
- title: 할일 제목 (선택)
- description: 할일 설명 (선택)
- startDate: 시작 일시 (선택)
- dueDate: 만료 일시 (선택)

**전제조건**
- 로그인된 사용자여야 함 (BR-AUTH-001)
- 해당 todoId의 할일이 존재해야 함
- 해당 할일의 소유자여야 함 (BR-AUTH-002)
- 수정된 dueDate가 startDate보다 이후여야 함 (BR-TODO-001)

**성공 조건**
- HTTP 200 OK 응답
- 수정된 할일 정보 반환
- updatedAt 자동 갱신

**실패 조건**
- HTTP 400 Bad Request: 유효성 검증 실패
- HTTP 401 Unauthorized: 인증 토큰 없음 또는 만료
- HTTP 403 Forbidden: 소유자가 아닌 할일 수정 시도
- HTTP 404 Not Found: 존재하지 않는 todoId
- HTTP 500 Internal Server Error: 서버 오류

---

#### [F-TODO-004] 삭제
할일을 휴지통으로 이동

**입력**
- 인증 토큰 (헤더)
- todoId: 삭제할 할일 식별자

**전제조건**
- 로그인된 사용자여야 함 (BR-AUTH-001)
- 해당 todoId의 할일이 존재해야 함
- 해당 할일의 소유자여야 함 (BR-AUTH-002)
- 할일의 status가 ACTIVE여야 함

**성공 조건**
- HTTP 200 OK 응답
- 할일의 status가 TRASHED로 변경 (BR-TODO-002)
- updatedAt 자동 갱신
- 실제 데이터는 삭제되지 않음

**실패 조건**
- HTTP 401 Unauthorized: 인증 토큰 없음 또는 만료
- HTTP 403 Forbidden: 소유자가 아닌 할일 삭제 시도
- HTTP 404 Not Found: 존재하지 않는 todoId
- HTTP 409 Conflict: 이미 휴지통에 있는 할일
- HTTP 500 Internal Server Error: 서버 오류

### 4.3 휴지통 관리

#### [F-TRASH-001] 복원
휴지통의 할일을 활성 상태로 복원

**입력**
- 인증 토큰 (헤더)
- todoId: 복원할 할일 식별자

**전제조건**
- 로그인된 사용자여야 함 (BR-AUTH-001)
- 해당 todoId의 할일이 존재해야 함
- 해당 할일의 소유자여야 함 (BR-AUTH-002)
- 할일의 status가 TRASHED여야 함

**성공 조건**
- HTTP 200 OK 응답
- 할일의 status가 ACTIVE로 변경
- updatedAt 자동 갱신
- 복원된 할일 정보 반환

**실패 조건**
- HTTP 401 Unauthorized: 인증 토큰 없음 또는 만료
- HTTP 403 Forbidden: 소유자가 아닌 할일 복원 시도
- HTTP 404 Not Found: 존재하지 않는 todoId
- HTTP 409 Conflict: 이미 활성 상태인 할일
- HTTP 500 Internal Server Error: 서버 오류

---

#### [F-TRASH-002] 영구 삭제
휴지통의 할일을 완전히 삭제 (되돌릴 수 없음)

**입력**
- 인증 토큰 (헤더)
- todoId: 영구 삭제할 할일 식별자

**전제조건**
- 로그인된 사용자여야 함 (BR-AUTH-001)
- 해당 todoId의 할일이 존재해야 함
- 해당 할일의 소유자여야 함 (BR-AUTH-002)
- 할일의 status가 TRASHED여야 함 (BR-TODO-003)

**성공 조건**
- HTTP 204 No Content 응답
- 데이터베이스에서 할일 완전히 제거
- 되돌릴 수 없음

**실패 조건**
- HTTP 401 Unauthorized: 인증 토큰 없음 또는 만료
- HTTP 403 Forbidden: 소유자가 아닌 할일 삭제 시도
- HTTP 404 Not Found: 존재하지 않는 todoId
- HTTP 409 Conflict: 활성 상태인 할일 (휴지통에 없음)
- HTTP 500 Internal Server Error: 서버 오류

### 4.4 공통 일정 표시

#### [F-PUBLIC-001] 공통 할일 조회
국경일 등 공통 할일을 사용자의 할일 목록과 함께 표시

**입력**
- 인증 토큰 (헤더)
- 선택적 필터: 날짜 범위, 일정 유형

**전제조건**
- 로그인된 사용자여야 함 (BR-AUTH-001)

**성공 조건**
- HTTP 200 OK 응답
- 지정된 기간의 공통 할일 목록 반환
- 각 공통 할일의 모든 속성 포함 (publicTodoId, title, description, eventDate, type)
- 빈 배열 반환 가능 (해당 기간에 공통 할일이 없는 경우)
- 공통 할일은 읽기 전용 (BR-PUBLIC-001)

**실패 조건**
- HTTP 401 Unauthorized: 인증 토큰 없음 또는 만료
- HTTP 500 Internal Server Error: 서버 오류

**참고사항**
- 공통 할일은 수정/삭제 불가 (BR-PUBLIC-001)
- 모든 사용자에게 동일하게 표시됨 (BR-PUBLIC-002)

## 5. 제약사항 및 비즈니스 규칙

### 5.1 인증 및 권한

- **[BR-AUTH-001]** 비로그인 사용자는 할일 관리 기능에 접근할 수 없음 (관련: F-AUTH-002)
- **[BR-AUTH-002]** 사용자는 자신의 할일만 조회/수정/삭제 가능 (관련: F-TODO-001, F-TODO-003, F-TODO-004)

### 5.2 할일 관리

- **[BR-TODO-001]** 할일의 만료 일시는 시작 일시보다 이후여야 함 (관련: F-TODO-002, F-TODO-003)
- **[BR-TODO-002]** 삭제된 할일은 즉시 제거되지 않고 휴지통으로 이동 (관련: F-TODO-004)
- **[BR-TODO-003]** 휴지통에서만 영구 삭제 수행 가능 (관련: F-TRASH-002)

### 5.3 공통 할일

- **[BR-PUBLIC-001]** 공통 할일(국경일 등)은 사용자가 수정하거나 삭제할 수 없음 (관련: F-PUBLIC-001)
- **[BR-PUBLIC-002]** 공통 할일은 모든 사용자에게 동일하게 표시됨 (관련: F-PUBLIC-001)

### 5.4 데이터 무결성

- **[BR-DATA-001]** 사용자 계정 삭제 시 해당 사용자의 모든 할일도 함께 삭제 (관련: F-AUTH-001)
- **[BR-DATA-002]** 휴지통의 할일도 사용자 소유이므로 함께 삭제됨 (관련: F-AUTH-001)

### 5.5 데이터 검증 규칙

**사용자 정보**
- 사용자명(username): 3~20자, 영문 대소문자/숫자/언더스코어(_)만 허용
- 이메일(email): RFC 5322 표준 준수, 최대 255자
- 비밀번호(password): 최소 8자, 최대 128자, 영문 대소문자/숫자/특수문자 각 1개 이상 포함

**할일 정보**
- 할일 제목(title): 1~100자, 필수 입력
- 할일 설명(description): 0~1000자, 선택 입력
- 시작 일시(startDate): 현재 시각 기준 과거 1년 ~ 미래 10년 범위, DateTime 형식
- 만료 일시(dueDate): startDate 이후 시점, 현재 시각 기준 미래 10년 이내, DateTime 형식
- 상태(status): ACTIVE 또는 TRASHED만 허용

**공통 할일 정보**
- 일정 제목(title): 1~100자, 필수 입력
- 설명(description): 0~500자, 선택 입력
- 일정 날짜(eventDate): Date 형식 (시간 정보 미포함)
- 일정 유형(type): 사전 정의된 유형만 허용 (국경일, 기념일, 법정공휴일 등)

## 6. 확장 고려사항

향후 확장 가능성을 고려한 개념:

- 할일 우선순위 (Priority)
- 할일 카테고리/태그 (Category/Tag)
- 반복 일정 (Recurring Schedule)
- 알림 기능 (Notification)
- 할일 공유 (Sharing)

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0 | 2025-11-25 | 초안 작성 | - |
| 1.1 | 2025-11-25 | 정량적 검증 규칙, 기능 식별자, 수용 기준 추가 (우선순위 1 개선사항 반영) | Claude |

---

**최종 수정일**: 2025-11-25
**현재 버전**: 1.1
**문서 상태**: 검토 중
