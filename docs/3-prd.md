# cwh-todolist Product Requirements Document (PRD)

> **문서 목적**: 개발팀 가이드 - 개발자와 디자이너가 제품을 구현하기 위한 상세 명세서

**버전**: 1.0
**작성일**: 2025-11-25
**최종 수정일**: 2025-11-25
**문서 상태**: 검토 중
**프로젝트**: cwh-todolist

---

## 목차

1. [제품 개요](#1-제품-개요-product-overview)
2. [사용자 페르소나](#2-사용자-페르소나-user-personas)
3. [사용자 스토리](#3-사용자-스토리-user-stories)
4. [화면 플로우](#4-화면-플로우-screen-flow)
5. [기능 요구사항](#5-기능-요구사항-functional-requirements)
6. [UI/UX 가이드라인](#6-uiux-가이드라인-uiux-guidelines)
7. [비기능 요구사항](#7-비기능-요구사항-non-functional-requirements)
8. [기술적 고려사항](#8-기술적-고려사항-technical-considerations)
9. [개발 로드맵](#9-개발-로드맵-development-roadmap)
10. [성공 지표](#10-성공-지표-success-metrics)
11. [부록](#11-부록-appendix)

---

## 1. 제품 개요 (Product Overview)

### 1.1 제품 소개

**cwh-todolist**는 개인 사용자를 위한 웹 기반 할일 관리 애플리케이션입니다. 네이버 캘린더와 같은 직관적인 UI/UX를 제공하며, 일상 생활의 할일과 일정을 효과적으로 관리할 수 있습니다.

**한 줄 설명**: "간단하고 깔끔한 개인 할일 관리 서비스"

### 1.2 비즈니스 목표

- **목표**: 상용 B2C 웹 서비스 출시
- **비즈니스 모델**: 완전 무료 서비스
- **타겟**: 개인 사용자 (일상 생활의 할일 관리)
- **플랫폼**: 웹 애플리케이션 (브라우저 기반, 모바일 반응형)

### 1.3 MVP 범위

**Phase 1 - MVP** (우선순위: 높음)

- 회원 가입 및 로그인 (F-AUTH-001, F-AUTH-002)
- 할일 CRUD 기능 (F-TODO-001~004)
  - 할일 조회
  - 할일 추가
  - 할일 수정
  - 할일 삭제 (즉시 삭제, 휴지통 없음)

**Phase 2** (향후 기능)

- 휴지통 기능 (F-TRASH-001, F-TRASH-002)
- 국경일 표시 (F-PUBLIC-001)

**Phase 3** (확장 기능)

- 할일 우선순위
- 카테고리/태그
- 반복 일정
- 알림 기능

### 1.4 핵심 가치 제안

1. **단순함**: 복잡하지 않고 직관적인 UI
2. **속도**: 빠른 로딩과 즉각적인 반응
3. **익숙함**: 네이버 캘린더와 유사한 친숙한 인터페이스
4. **접근성**: 웹 브라우저만 있으면 어디서나 사용 가능

---

## 2. 사용자 페르소나 (User Personas)

### 2.1 페르소나 #1: 민지 (대학생)

<table>
<tr>
<td><strong>기본 정보</strong></td>
<td>
- 이름: 김민지<br>
- 나이: 23세<br>
- 직업: 대학생 (경영학과 3학년)<br>
- 거주지: 서울
</td>
</tr>
<tr>
<td><strong>기술 수준</strong></td>
<td>중상 - 스마트폰과 웹 서비스에 익숙함</td>
</tr>
<tr>
<td><strong>주요 목표</strong></td>
<td>
- 과제 마감일을 놓치지 않기<br>
- 시험 일정 관리<br>
- 동아리 활동 일정 정리
</td>
</tr>
<tr>
<td><strong>니즈</strong></td>
<td>
- 간단하고 직관적인 할일 관리<br>
- 모바일에서도 편리하게 사용<br>
- 빠른 입력과 수정
</td>
</tr>
<tr>
<td><strong>페인 포인트</strong></td>
<td>
- 기존 Todo 앱이 너무 복잡함<br>
- 설정할 것이 많아서 귀찮음<br>
- 과제 마감을 자주 잊어버림
</td>
</tr>
<tr>
<td><strong>사용 시나리오</strong></td>
<td>
아침에 강의실로 이동하면서 스마트폰으로 오늘 할 과제를 확인하고,
교수님이 새로운 과제를 내주시면 즉시 추가합니다.
저녁에 집에서 과제를 완료하면 체크하고 삭제합니다.
</td>
</tr>
</table>

### 2.2 페르소나 #2: 준호 (직장인)

<table>
<tr>
<td><strong>기본 정보</strong></td>
<td>
- 이름: 박준호<br>
- 나이: 32세<br>
- 직업: IT 기업 프로젝트 매니저<br>
- 거주지: 경기도
</td>
</tr>
<tr>
<td><strong>기술 수준</strong></td>
<td>고급 - 다양한 생산성 도구 사용 경험</td>
</tr>
<tr>
<td><strong>주요 목표</strong></td>
<td>
- 업무 태스크 관리<br>
- 개인 일정과 업무 분리<br>
- 효율적인 시간 관리
</td>
</tr>
<tr>
<td><strong>니즈</strong></td>
<td>
- 빠른 입력과 조회<br>
- 마감 일자 명확한 표시<br>
- 데스크톱과 모바일 모두 지원
</td>
</tr>
<tr>
<td><strong>페인 포인트</strong></td>
<td>
- 시간 낭비 없이 효율적으로 관리하고 싶음<br>
- 여러 앱을 쓰면 헷갈림<br>
- 중요한 업무를 놓칠까 걱정됨
</td>
</tr>
<tr>
<td><strong>사용 시나리오</strong></td>
<td>
출근하면서 오늘 해야 할 업무를 확인하고,
회의 중 새로운 업무가 생기면 스마트폰으로 빠르게 추가합니다.
업무를 완료하면 즉시 체크하여 진행 상황을 파악합니다.
</td>
</tr>
</table>

---

## 3. 사용자 스토리 (User Stories)

### 3.1 인증 및 회원 관리

#### US-001: 회원가입

```
As a 신규 사용자
I want 이메일과 비밀번호로 회원가입하기
So that 나만의 할일 목록을 만들 수 있다

관련 기능: F-AUTH-001
수용 기준:
- 사용자명, 이메일, 비밀번호를 입력하여 가입할 수 있다
- 비밀번호는 8자 이상이어야 한다
- 중복된 이메일은 사용할 수 없다
- 가입 후 자동으로 로그인된다
```

#### US-002: 로그인

```
As a 등록된 사용자
I want 이메일과 비밀번호로 로그인하기
So that 내 할일 목록에 접근할 수 있다

관련 기능: F-AUTH-002
수용 기준:
- 이메일과 비밀번호로 로그인할 수 있다
- 로그인 후 24시간 동안 세션이 유지된다
- 잘못된 정보 입력 시 명확한 에러 메시지를 표시한다
```

### 3.2 할일 관리

#### US-003: 할일 목록 조회

```
As a 로그인한 사용자
I want 내 할일 목록을 보기
So that 오늘 해야 할 일을 확인할 수 있다

관련 기능: F-TODO-001
수용 기준:
- 로그인 후 자동으로 할일 목록이 표시된다
- 제목, 마감일, 상태를 한눈에 볼 수 있다
- 할일이 없으면 "할일이 없습니다" 메시지가 표시된다
- 날짜순으로 정렬된다
```

#### US-004: 할일 추가

```
As a 로그인한 사용자
I want 새로운 할일을 추가하기
So that 잊지 않고 관리할 수 있다

관련 기능: F-TODO-002
수용 기준:
- "+" 버튼 또는 "할일 추가" 버튼을 클릭하여 추가할 수 있다
- 제목, 설명, 시작일, 마감일을 입력할 수 있다
- 제목은 필수, 나머지는 선택사항이다
- 추가 후 목록에 즉시 표시된다
```

#### US-005: 할일 수정

```
As a 로그인한 사용자
I want 할일 내용을 수정하기
So that 변경된 계획을 반영할 수 있다

관련 기능: F-TODO-003
수용 기준:
- 할일을 클릭하면 수정 모드로 전환된다
- 모든 필드를 수정할 수 있다
- 수정 후 "저장" 버튼으로 변경사항을 저장한다
- "취소" 버튼으로 수정을 취소할 수 있다
```

#### US-006: 할일 삭제

```
As a 로그인한 사용자
I want 완료한 할일을 삭제하기
So that 목록을 깔끔하게 유지할 수 있다

관련 기능: F-TODO-004
수용 기준:
- 할일의 "삭제" 버튼을 클릭하여 삭제할 수 있다
- MVP에서는 즉시 삭제된다 (휴지통 없음)
- 삭제 전 확인 메시지를 표시한다
- 삭제 후 목록에서 즉시 사라진다
```

---

## 4. 화면 플로우 (Screen Flow)

### 4.1 주요 화면 목록

#### MVP Phase 1 화면 (5개)

1. **회원가입 페이지** (`/signup`)

   - 사용자명, 이메일, 비밀번호 입력 폼
   - 회원가입 버튼
   - "이미 계정이 있나요? 로그인" 링크

2. **로그인 페이지** (`/login`)

   - 이메일, 비밀번호 입력 폼
   - 로그인 버튼
   - "계정이 없나요? 회원가입" 링크

3. **할일 목록 페이지** (`/todos`) - **메인 페이지**

   - 헤더 (로고, 사용자명, 로그아웃)
   - 사이드바 (할일 추가 버튼, 필터)
   - 할일 목록 (카드 형식)
   - 각 할일 카드 (제목, 설명, 날짜, 수정/삭제 버튼)

4. **할일 추가 모달/폼**

   - 제목 입력 (필수)
   - 설명 입력 (선택)
   - 시작일 선택
   - 마감일 선택
   - 저장/취소 버튼

5. **할일 수정 모달/폼**
   - 할일 추가와 동일한 구조
   - 기존 값이 채워진 상태
   - 저장/취소 버튼

### 4.2 화면 플로우 다이어그램

```
[시작]
  │
  ├─→ [회원가입 페이지] ──→ [로그인 페이지] ──→ [할일 목록 페이지]
  │                                            (메인)
  └─→ [로그인 페이지] ───────────────────────→ [할일 목록 페이지]
                                                  │
                                                  ├─→ [할일 추가 모달]
                                                  │     └─→ 저장 → 목록 갱신
                                                  │
                                                  ├─→ [할일 수정 모달]
                                                  │     └─→ 저장 → 목록 갱신
                                                  │
                                                  └─→ 할일 삭제 확인
                                                        └─→ 확인 → 목록 갱신
```

### 4.3 내비게이션 구조

```
네이버 캘린더 스타일 레이아웃:

┌─────────────────────────────────────────────────────┐
│  Header (로고, 사용자명, 로그아웃)                    │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Sidebar  │  Main Content (할일 목록)                │
│          │                                          │
│ • 할일   │  ┌─────────────────────────────────┐    │
│   추가   │  │ [할일 1]                        │    │
│          │  │ 제목: 프로젝트 회의 준비        │    │
│ • 전체   │  │ 마감: 2025-11-28               │    │
│   할일   │  │ [수정] [삭제]                  │    │
│          │  └─────────────────────────────────┘    │
│ • 오늘   │                                          │
│   할일   │  ┌─────────────────────────────────┐    │
│          │  │ [할일 2]                        │    │
│          │  │ ...                             │    │
│          │  └─────────────────────────────────┘    │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

---

## 5. 기능 요구사항 (Functional Requirements)

> **참고**: 상세한 기능 명세는 [도메인 정의서](./1-domain-definition.md)를 참조하세요.

### 5.1 인증 및 회원 관리

상세 명세는 [도메인 정의서 섹션 4.1](./1-domain-definition.md#41-인증-및-회원-관리) 참조

**MVP 포함 기능**:

- **[F-AUTH-001] 회원 가입**: 사용자명, 이메일, 비밀번호로 신규 계정 생성
- **[F-AUTH-002] 로그인**: JWT 토큰 기반 인증

**관련 비즈니스 규칙**:

- [BR-AUTH-001] 비로그인 사용자는 할일 관리 기능에 접근 불가
- [BR-AUTH-002] 사용자는 자신의 할일만 조회/수정/삭제 가능

### 5.2 할일 관리 (MVP 핵심)

상세 명세는 [도메인 정의서 섹션 4.2](./1-domain-definition.md#42-할일-관리) 참조

**MVP 포함 기능**:

- **[F-TODO-001] 조회**: 로그인한 사용자의 활성 할일 목록 조회
- **[F-TODO-002] 추가**: 새로운 할일 생성 (제목, 설명, 시작/만료 일시)
- **[F-TODO-003] 수정**: 기존 할일의 내용 및 일정 수정
- **[F-TODO-004] 삭제**: MVP에서는 즉시 삭제 (휴지통 기능 없음)

**MVP 변경사항**:

- F-TODO-004는 MVP에서 즉시 삭제로 구현 (status를 TRASHED로 변경하지 않고 직접 DELETE)
- 휴지통 기능(F-TRASH-001, F-TRASH-002)은 Phase 2로 연기

**관련 비즈니스 규칙**:

- [BR-TODO-001] 할일의 만료 일시는 시작 일시보다 이후여야 함

**데이터 검증 규칙** ([도메인 정의서 섹션 5.5](./1-domain-definition.md#55-데이터-검증-규칙)):

- 제목: 1~100자, 필수
- 설명: 0~1000자, 선택
- 날짜: 과거 1년 ~ 미래 10년

### 5.3 Phase 2 기능 (향후)

**휴지통 관리** (도메인 정의서 섹션 4.3):

- [F-TRASH-001] 복원
- [F-TRASH-002] 영구 삭제

**공통 일정 표시** (도메인 정의서 섹션 4.4):

- [F-PUBLIC-001] 국경일 등 공통 할일 조회

---

## 6. UI/UX 가이드라인 (UI/UX Guidelines)

### 6.1 디자인 원칙

#### 1. Simple & Clean (단순하고 깔끔함)

- 불필요한 요소 제거
- 여백을 충분히 활용
- 한 화면에 하나의 주요 작업에 집중

#### 2. Fast Input (빠른 입력)

- 최소 클릭으로 할일 추가
- 키보드 단축키 지원 (선택사항)
- 즉각적인 피드백 제공

#### 3. Clear Status (명확한 상태 표시)

- 할일의 상태가 한눈에 보임
- 마감일이 가까운 할일 강조
- 색상으로 우선순위/상태 구분

#### 4. Familiar (익숙한 인터페이스)

- 네이버 캘린더와 유사한 레이아웃
- 일반적인 UI 패턴 사용
- 예측 가능한 인터랙션

### 6.2 색상 가이드

**메인 컬러**:

- Primary Blue: `#5B76F7` (버튼, 링크, 선택된 항목)
- Primary Hover: `#4A62E6`

**액센트 컬러**:

- Red: `#FF4D4D` (기한 초과, 삭제)
- Green: `#00C73C` (완료)
- Orange: `#FF8C42` (마감 임박)

**중립 컬러**:

- White: `#FFFFFF` (배경)
- Gray-50: `#F9FAFB` (사이드바 배경)
- Gray-100: `#F3F4F6` (카드 배경)
- Gray-600: `#666666` (보조 텍스트)
- Gray-900: `#222222` (주요 텍스트)

### 6.3 타이포그래피

**폰트 패밀리**:

```css
font-family: -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕",
  sans-serif;
```

**폰트 크기**:

- 제목 (H1): 24px, 700
- 부제목 (H2): 20px, 600
- 본문: 14px, 400
- 작은 텍스트: 12px, 400

### 6.4 주요 컴포넌트 스타일

#### 버튼

- **Primary Button** (할일 추가, 저장)

  - 배경: #5B76F7
  - 텍스트: White
  - 패딩: 12px 24px
  - Border Radius: 6px
  - Hover: #4A62E6

- **Secondary Button** (취소)
  - 배경: White
  - 텍스트: #666666
  - Border: 1px solid #E5E7EB
  - 패딩: 12px 24px
  - Border Radius: 6px

#### 할일 카드

- 배경: White
- Border: 1px solid #E5E7EB
- Border Radius: 8px
- 패딩: 16px
- 마진: 8px 0
- Hover: 약간의 그림자 효과

#### 입력 필드

- Border: 1px solid #E5E7EB
- Border Radius: 6px
- 패딩: 12px 16px
- Focus: Border color #5B76F7

### 6.5 반응형 디자인

**데스크톱** (> 1024px):

- 사이드바 표시 (240px 고정)
- 메인 영역 가변 너비
- 2단 레이아웃

**태블릿** (768px - 1024px):

- 사이드바 축소 또는 오버레이
- 1단 레이아웃

**모바일** (< 768px):

- 사이드바 햄버거 메뉴로 전환
- 전체 화면 사용
- 터치 최적화 (버튼 크기 최소 44px)

### 6.6 인터랙션 패턴

**할일 추가**:

1. "+" 버튼 클릭
2. 모달 또는 인라인 폼 표시
3. 제목 입력 후 Enter 또는 저장 버튼
4. 목록에 즉시 추가 (낙관적 업데이트)

**할일 수정**:

1. 할일 카드 클릭
2. 수정 모달 표시 (기존 값 채워짐)
3. 수정 후 저장
4. 목록 즉시 갱신

**할일 삭제**:

1. 삭제 버튼 클릭
2. 확인 다이얼로그 표시
3. 확인 시 삭제
4. 목록에서 제거 (애니메이션)

### 6.7 접근성 (Accessibility)

- **색상 대비**: WCAG 2.1 AA 준수 (4.5:1 이상)
- **키보드 내비게이션**: Tab, Enter, Esc 지원
- **포커스 표시**: 명확한 포커스 인디케이터
- **스크린 리더**: aria-label 적절히 사용
- **반응형 폰트**: 사용자 브라우저 설정 존중

---

## 7. 비기능 요구사항 (Non-Functional Requirements)

### 7.1 성능 요구사항

#### 페이지 로딩

- **초기 로딩 시간**: < 2초 (3G 네트워크 기준)
- **Time to Interactive (TTI)**: < 3초
- **First Contentful Paint (FCP)**: < 1.5초

#### API 응답 시간

- **할일 조회 (GET)**: < 300ms
- **할일 추가/수정 (POST/PUT)**: < 500ms
- **할일 삭제 (DELETE)**: < 500ms
- **인증 (로그인/회원가입)**: < 1초

#### 프론트엔드 성능

- **번들 크기**: < 500KB (gzip 압축 후)
- **JavaScript 실행**: < 1초
- **메모리 사용**: < 100MB

### 7.2 보안 요구사항

#### 인증 및 권한

- **비밀번호**: bcrypt 해싱 (salt rounds: 10)
- **인증 토큰**: JWT (유효기간: 24시간)
- **토큰 저장**: HttpOnly 쿠키 또는 LocalStorage
- **세션 관리**: 리프레시 토큰 미사용 (MVP)

#### 데이터 보호

- **통신**: HTTPS 전용 (Vercel 기본 제공)
- **SQL Injection**: Prisma ORM 파라미터화 쿼리
- **XSS 방지**: 입력값 sanitization, React 자동 이스케이핑
- **CORS**: 허용된 origin만 (Vercel 도메인)

#### 개인정보 보호

- **최소 수집**: 사용자명, 이메일, 비밀번호만
- **암호화 저장**: 비밀번호는 bcrypt로 암호화
- **개인정보 처리방침**: 간략한 약관 작성

### 7.3 확장성 요구사항

#### 사용자 확장성

- **동시 접속자**: 최소 100명 지원
- **총 사용자 수**: 최대 1,000명 지원 (MVP)
- **사용자당 할일 수**: 최대 1,000개

#### 데이터베이스

- **연결 풀**: Prisma 연결 풀 관리
- **쿼리 최적화**: 인덱스 활용 (userId, createdAt)
- **데이터 크기**: Vercel Postgres 무료 티어 (500MB)

#### 서버리스 제약

- **실행 시간**: < 10초 (Vercel Function 제한)
- **메모리**: < 1024MB
- **Cold Start**: < 2초

### 7.4 가용성 및 안정성

#### 가용성

- **서비스 가동률**: 99% (Vercel 기본 SLA)
- **다운타임**: 월 최대 7.2시간

#### 에러 처리

- **400 에러**: 명확한 에러 메시지 사용자에게 표시
- **500 에러**: 로그 기록 + "일시적인 오류" 메시지
- **네트워크 오류**: 재시도 로직 (최대 3회)

#### 모니터링

- **로그**: Vercel 기본 로깅
- **에러 추적**: 선택사항 (Sentry 등)
- **헬스 체크**: `/api/health` 엔드포인트

### 7.5 브라우저 호환성

**지원 브라우저**:

- Chrome (최신 2버전)
- Firefox (최신 2버전)
- Safari (최신 2버전)
- Edge (최신 2버전)

**미지원**:

- Internet Explorer (모든 버전)

**모바일 브라우저**:

- iOS Safari (최신 2버전)
- Android Chrome (최신 2버전)

### 7.6 데이터 백업

- **자동 백업**: Vercel Postgres 자동 백업 (일일)
- **보존 기간**: 7일
- **복구 시간**: 24시간 이내

---

## 8. 기술적 고려사항 (Technical Considerations)

### 8.1 기술 스택

#### 프론트엔드

```
- Framework: React 18+
- Language: TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- Routing: React Router v6
- HTTP Client: Axios
- State Management:
  - Server State: React Query (TanStack Query)
  - Client State: Zustand
- Form: React Hook Form (선택사항)
- Date Picker: react-datepicker 또는 네이티브 input[type="date"]
```

#### 백엔드

```
- Runtime: Node.js v20 LTS
- Framework: Express.js
- Language: TypeScript
- Authentication: jsonwebtoken (JWT)
- Password: bcrypt
- Validation: express-validator
- CORS: cors middleware
```

#### 데이터베이스

```
- Database: PostgreSQL 14+
- Migration: Prisma Migrate
- Indexes:
  - userId (Todo 테이블)
  - createdAt (Todo 테이블)
  - email (User 테이블, UNIQUE)
```

#### 배포 및 인프라

```
- Hosting: Vercel
- API: Vercel Serverless Functions
- Database: Vercel Postgres (무료 티어)
- Domain: cwh-todolist.vercel.app
- CI/CD: Vercel (Git push 자동 배포)
- Environment: .env (Vercel 환경 변수)
```

### 8.2 아키텍처 설계

#### 전체 아키텍처

```
[브라우저]
    │
    │ HTTPS
    │
[Vercel CDN] ──→ [React SPA (정적 파일)]
    │
    │ API 요청
    │
[Vercel Serverless Functions]
    │
    │ Prisma
    │
[Vercel Postgres]
```

#### API 구조

```
RESTful API 설계:

/api/auth
  POST /signup      - 회원가입
  POST /login       - 로그인
  GET  /me          - 현재 사용자 정보 (선택사항)

/api/todos
  GET    /          - 할일 목록 조회
  POST   /          - 할일 추가
  GET    /:id       - 특정 할일 조회 (선택사항)
  PUT    /:id       - 할일 수정
  DELETE /:id       - 할일 삭제

Phase 2:
/api/todos/:id/restore  - 복원 (휴지통)
/api/public-todos       - 공통 할일 조회
```

### 8.3 데이터베이스 스키마

#### Prisma Schema (간략)

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  email     String   @unique
  password  String   // bcrypt hashed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  todos     Todo[]

  @@map("users")
}

model Todo {
  id          String   @id @default(uuid())
  userId      String
  title       String
  description String?
  startDate   DateTime
  dueDate     DateTime
  status      Status   @default(ACTIVE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([createdAt])
  @@map("todos")
}

enum Status {
  ACTIVE
  TRASHED
}

// Phase 2:
model PublicTodo {
  id          String   @id @default(uuid())
  title       String
  description String?
  eventDate   DateTime
  type        String
  createdAt   DateTime @default(now())

  @@map("public_todos")
}
```

### 8.4 인증 플로우

```
[회원가입]
1. 사용자 입력 (username, email, password)
2. 서버 검증 (express-validator)
3. 비밀번호 bcrypt 해싱
4. DB 저장
5. JWT 토큰 생성 및 반환

[로그인]
1. 사용자 입력 (email, password)
2. 서버에서 사용자 조회
3. bcrypt.compare로 비밀번호 검증
4. JWT 토큰 생성 및 반환

[인증 미들웨어]
1. 요청 헤더에서 JWT 토큰 추출
   Authorization: Bearer <token>
2. jwt.verify로 토큰 검증
3. 토큰에서 userId 추출
4. req.userId에 저장
5. 다음 핸들러로 전달
```

### 8.5 에러 핸들링

#### 에러 응답 형식

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "제목은 1-100자여야 합니다",
    "details": [
      {
        "field": "title",
        "message": "제목은 필수입니다"
      }
    ]
  }
}
```

#### 에러 코드 정의

```
400 - VALIDATION_ERROR: 입력값 검증 실패
401 - UNAUTHORIZED: 인증 실패
403 - FORBIDDEN: 권한 없음
404 - NOT_FOUND: 리소스 없음
409 - CONFLICT: 중복 (이메일 등)
500 - INTERNAL_ERROR: 서버 오류
```

### 8.6 성능 최적화

#### 프론트엔드

- **코드 스플리팅**: React.lazy + Suspense
- **이미지 최적화**: WebP 포맷 (아이콘은 SVG)
- **번들 최적화**: Tree shaking, Minification
- **캐싱**: React Query 캐시 (5분)
- **가상화**: 할일이 많을 경우 react-window (선택사항)

#### 백엔드

- **데이터베이스 쿼리**:
  - 인덱스 활용 (userId, createdAt)
  - N+1 문제 방지 (Prisma include/select)
- **응답 압축**: gzip (Vercel 자동)
- **Connection Pooling**: Prisma 자동 관리

### 8.7 개발 환경 세팅

#### 로컬 개발

```bash
# 프론트엔드
cd frontend
pnpm install
pnpm dev  # localhost:5173

# 백엔드
cd backend
pnpm install
pnpm dev  # localhost:3000

# 데이터베이스 (Docker Compose)
docker-compose up -d

# Prisma 마이그레이션
cd backend
npx prisma migrate dev
npx prisma generate
```

#### 환경 변수

```env
# 백엔드 (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/cwh_todolist"
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="24h"
NODE_ENV="development"

# 프론트엔드 (.env)
VITE_API_URL="http://localhost:3000/api"
```

---

## 9. 개발 로드맵 (Development Roadmap)

### 9.1 Phase 1 - MVP (우선순위: 높음)

**목표 출시일**: 2026년 2월 28일

#### Milestone 1: 기획 및 설계 완료 (2025-11-30)

- [x] 도메인 정의서 작성
- [x] PRD 작성
- [x] 스타일 가이드 작성
- [ ] 데이터베이스 스키마 설계
- [ ] API 명세서 작성

#### Milestone 2: 백엔드 API 개발 (2025-12-31)

- [ ] 프로젝트 초기 설정 (Express, TypeScript, Prisma)
- [ ] 데이터베이스 마이그레이션
- [ ] 인증 API (회원가입, 로그인)
  - POST /api/auth/signup
  - POST /api/auth/login
- [ ] 할일 CRUD API
  - GET /api/todos
  - POST /api/todos
  - PUT /api/todos/:id
  - DELETE /api/todos/:id
- [ ] API 테스트 (Postman/Thunder Client)
- [ ] Vercel 배포 설정

#### Milestone 3: 프론트엔드 개발 (2026-01-31)

- [ ] 프로젝트 초기 설정 (React, TypeScript, Vite, Tailwind)
- [ ] 라우팅 설정 (React Router)
- [ ] 인증 페이지
  - 회원가입 페이지
  - 로그인 페이지
  - 인증 상태 관리 (Zustand)
- [ ] 할일 관리 페이지
  - 할일 목록 조회 (React Query)
  - 할일 추가 모달
  - 할일 수정 모달
  - 할일 삭제 확인
- [ ] 레이아웃 (헤더, 사이드바)
- [ ] 반응형 UI (모바일 최적화)
- [ ] Vercel 배포

#### Milestone 4: 테스트 및 버그 수정 (2026-02-15)

- [ ] 기능 테스트 (수동)
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 테스트
- [ ] 성능 테스트 (Lighthouse)
- [ ] 버그 수정
- [ ] UX 개선

#### Milestone 5: MVP 출시 (2026-02-28)

- [ ] 최종 QA
- [ ] 프로덕션 배포 (Vercel)
- [ ] 도메인 설정 (cwh-todolist.vercel.app)
- [ ] README 작성
- [ ] 사용자 피드백 수집 준비

### 9.2 Phase 2 - 향후 기능 (우선순위: 중간)

**예상 시작일**: 2026년 3월 1일
**목표 완료일**: 2026년 3월 31일

#### 추가 기능

- [ ] 휴지통 기능
  - F-TRASH-001: 복원
  - F-TRASH-002: 영구 삭제
  - 휴지통 페이지/탭 추가
- [ ] 국경일 표시
  - F-PUBLIC-001: 공통 할일 조회
  - PublicTodo 테이블 생성
  - 국경일 데이터 추가
  - 목록에 국경일 표시 (빨간색)
- [ ] UI/UX 개선
  - 애니메이션 추가
  - 드래그 앤 드롭 (선택사항)
  - 정렬/필터 기능

### 9.3 Phase 3 - 확장 (우선순위: 낮음)

**예상 시작일**: 2026년 4월 이후

#### 확장 기능

- [ ] 할일 우선순위 (Priority: High/Medium/Low)
- [ ] 카테고리/태그 시스템
- [ ] 반복 일정 (Recurring)
- [ ] 알림 기능 (이메일 또는 브라우저 알림)
- [ ] PWA 지원 (오프라인 모드)
- [ ] 다크 모드
- [ ] 다국어 지원 (i18n)
- [ ] 팀 협업 기능 (공유)

---

## 10. 성공 지표 (Success Metrics)

### 10.1 사용자 지표

#### 가입 및 활성 사용자

- **목표 가입자 수**: 출시 3개월 내 100명
- **월간 활성 사용자(MAU)**: 50명
- **일간 활성 사용자(DAU)**: 20명
- **DAU/MAU 비율**: 40% 이상

#### 사용자 유지율

- **재방문율 (주간)**: 60% 이상
- **재방문율 (월간)**: 40% 이상
- **이탈률**: 60% 미만

### 10.2 사용자 행동 지표

#### 할일 관리 활동

- **사용자당 평균 할일 생성 수**: 5개/주
- **할일 완료율**: 70% 이상
- **평균 할일 수명**: 3일 (생성~완료)

#### 세션 지표

- **평균 세션 시간**: 3-5분
- **페이지뷰**: 사용자당 평균 10 페이지/세션
- **바운스율**: 30% 미만

### 10.3 기술 지표

#### 성능

- **Lighthouse 점수**:
  - Performance: 90 이상
  - Accessibility: 90 이상
  - Best Practices: 90 이상
  - SEO: 80 이상
- **API 응답 시간 (P95)**: < 500ms
- **에러율**: < 1%

#### 안정성

- **서비스 가동률**: 99% 이상
- **크래시율**: < 0.1%
- **치명적 버그**: 0건

### 10.4 만족도 지표

#### 정성적 목표

- **개인 사용 만족도**: 본인 및 지인 피드백 긍정적
- **포트폴리오 완성도**: 프로젝트 설명, 코드 품질, 문서화 우수
- **GitHub Star 수**: 10개 이상 (오픈소스 시)

#### 피드백 수집

- 지인 테스트 (5명 이상)
- 피드백 폼 제공
- 버그 리포트 접수

### 10.5 비즈니스 지표 (참고)

**참고**: 완전 무료 서비스이므로 수익 지표는 없음

- **개발 비용**: $0 (Vercel 무료 티어)
- **유지보수 비용**: $0/월
- **개발 시간**: 약 120시간 (3개월, 주 10시간)

---

## 11. 부록 (Appendix)

### 11.1 참조 문서

#### 프로젝트 문서

- [도메인 정의서](./1-domain-definition.md) - 엔티티, 기능, 비즈니스 규칙
- [추가 정보 템플릿](./0-prd-additional-info-filled.md) - 기술 스택, 일정 등
- [스타일 가이드](./3-style-guide.md) - UI/UX 디자인 가이드 (작성 예정)

#### 외부 참조

- [네이버 캘린더](https://calendar.naver.com/) - 벤치마크 서비스
- [Todoist](https://todoist.com/) - 할일 관리 UX 참고
- [Google Calendar](https://calendar.google.com/) - 캘린더 뷰 참고

### 11.2 용어집

| 용어   | 설명                                              |
| ------ | ------------------------------------------------- |
| MVP    | Minimum Viable Product, 최소 기능 제품            |
| CRUD   | Create, Read, Update, Delete                      |
| JWT    | JSON Web Token, 인증 토큰 표준                    |
| ORM    | Object-Relational Mapping                         |
| SPA    | Single Page Application                           |
| API    | Application Programming Interface                 |
| UI     | User Interface                                    |
| UX     | User Experience                                   |
| 할일   | Todo, 사용자가 관리하는 작업 항목                 |
| 마감일 | Due Date, 할일의 완료 기한                        |
| 휴지통 | Trash, 삭제된 할일을 임시 보관하는 공간 (Phase 2) |

### 11.3 기능 식별자 매핑

**MVP (Phase 1)**:

- F-AUTH-001: 회원 가입
- F-AUTH-002: 로그인
- F-TODO-001: 할일 조회
- F-TODO-002: 할일 추가
- F-TODO-003: 할일 수정
- F-TODO-004: 할일 삭제 (MVP: 즉시 삭제)

**Phase 2**:

- F-TRASH-001: 휴지통 복원
- F-TRASH-002: 영구 삭제
- F-PUBLIC-001: 공통 할일 조회

**비즈니스 규칙**:

- BR-AUTH-001: 비로그인 접근 불가
- BR-AUTH-002: 본인 할일만 접근
- BR-TODO-001: 만료일 > 시작일
- BR-TODO-002: 삭제 시 휴지통 이동 (Phase 2)
- BR-PUBLIC-001: 공통 할일 수정/삭제 불가

### 11.4 API 엔드포인트 목록

#### 인증

```
POST /api/auth/signup
  Body: { username, email, password }
  Response: { token, user: { id, username, email } }

POST /api/auth/login
  Body: { email, password }
  Response: { token, user: { id, username, email } }
```

#### 할일 관리

```
GET /api/todos
  Headers: { Authorization: Bearer <token> }
  Query: { startDate?, endDate?, sort? }
  Response: { todos: Todo[] }

POST /api/todos
  Headers: { Authorization: Bearer <token> }
  Body: { title, description?, startDate, dueDate }
  Response: { todo: Todo }

PUT /api/todos/:id
  Headers: { Authorization: Bearer <token> }
  Body: { title?, description?, startDate?, dueDate? }
  Response: { todo: Todo }

DELETE /api/todos/:id
  Headers: { Authorization: Bearer <token> }
  Response: { success: true }
```

### 11.5 환경 설정

#### 개발 환경

```bash
# Node.js 버전
node -v  # v20 LTS

# Package Manager
pnpm -v  # 최신 버전

# Docker (로컬 DB)
docker -v
docker-compose -v

# Git
git -v
```

#### 권장 IDE 설정 (VS Code)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### 11.6 리스크 관리

#### 주요 리스크 및 완화 전략

| 리스크                | 영향도 | 발생 가능성 | 완화 전략                          |
| --------------------- | ------ | ----------- | ---------------------------------- |
| 개발 일정 지연        | 높음   | 중간        | MVP 범위 최소화, 우선순위 명확화   |
| Vercel 무료 티어 초과 | 중간   | 낮음        | 사용량 모니터링, 필요 시 유료 전환 |
| 1인 개발 부담         | 중간   | 높음        | 단순한 기능 구현, 라이브러리 활용  |
| 버그 및 품질 문제     | 중간   | 중간        | 철저한 테스트, 단계적 배포         |
| 사용자 확보 어려움    | 낮음   | 높음        | 포트폴리오 목적, 마케팅 없음       |

### 11.7 변경 이력

| 버전 | 날짜       | 변경 내용     | 작성자 |
| ---- | ---------- | ------------- | ------ |
| 1.0  | 2025-11-25 | PRD 초안 작성 | Claude |

### 11.8 문서 승인

| 역할   | 이름   | 날짜       | 서명 |
| ------ | ------ | ---------- | ---- |
| 작성자 | Claude | 2025-11-25 | -    |
| 검토자 | -      | -          | -    |
| 승인자 | -      | -          | -    |

---

## 추가 참고 사항

### 개발 시작 전 체크리스트

- [ ] 도메인 정의서 리뷰 완료
- [ ] PRD 리뷰 완료
- [ ] 기술 스택 확정
- [ ] 개발 환경 세팅
- [ ] Git 저장소 생성
- [ ] Vercel 계정 생성
- [ ] 데이터베이스 설계 확정
- [ ] API 명세서 작성

### 개발 중 주의사항

1. **코드 품질 유지**

   - TypeScript strict mode 사용
   - ESLint/Prettier 설정
   - 의미 있는 커밋 메시지

2. **문서화**

   - README 지속적 업데이트
   - API 문서 작성
   - 코드 주석 (복잡한 로직만)

3. **테스트**

   - 주요 기능은 수동 테스트 필수
   - 크로스 브라우저 테스트
   - 모바일 반응형 테스트

4. **배포**
   - 개발 환경에서 충분한 테스트 후 배포
   - 프로덕션 환경 변수 확인
   - 배포 후 smoke test

---

**문서 버전**: 1.0
**최종 업데이트**: 2025-11-25
**문서 상태**: 검토 중
**다음 리뷰 예정일**: 개발 시작 전

---

**End of Document**
