# 데이터베이스 설정 가이드

## 준비사항

PostgreSQL 15가 설치되어 있고 서비스가 실행 중이어야 합니다.

```powershell
# PostgreSQL 서비스 확인
Get-Service -Name postgresql-x64-15
```

## 데이터베이스 설정 단계

### 1. 데이터베이스 및 사용자 생성

postgres 슈퍼유저 권한으로 setup-database.sql을 실행합니다:

```bash
cd C:\test\cwh-todolist
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d postgres -f database\setup-database.sql
```

### 2. 스키마 및 테이블 생성

cwh_user로 연결하여 schema.sql을 실행합니다:

```bash
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U cwh_user -d cwh_todolist -f database\schema.sql
```

### 3. 연결 확인

```bash
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U cwh_user -d cwh_todolist -c "\dt"
```

다음 테이블들이 표시되어야 합니다:
- users
- todos
- public_todos

## 환경 변수

`.env` 파일에 다음 설정이 이미 구성되어 있습니다:

```env
DATABASE_URL="postgresql://cwh_user:cwh_password@localhost:5432/cwh_todolist"
DB_HOST=localhost
DB_PORT=5432
DB_USER=cwh_user
DB_PASSWORD=cwh_password
DB_NAME=cwh_todolist
```

## 문제 해결

### 인증 실패 (password authentication failed)

postgres 슈퍼유저의 비밀번호가 필요합니다. PostgreSQL 설치 시 설정한 비밀번호를 사용하세요.

### 연결 거부 (connection refused)

PostgreSQL 서비스가 실행 중인지 확인:

```powershell
Get-Service postgresql-x64-15 | Start-Service
```

### 포트 충돌

PostgreSQL이 5432 포트에서 실행 중인지 확인:

```bash
netstat -an | findstr :5432
```
