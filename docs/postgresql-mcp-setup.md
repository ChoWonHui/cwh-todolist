# PostgreSQL MCP 설정 가이드

## 목차
1. [사전 요구사항](#사전-요구사항)
2. [Docker로 PostgreSQL 시작](#docker로-postgresql-시작)
3. [PostgreSQL MCP 서버 설치](#postgresql-mcp-서버-설치)
4. [Claude Code MCP 설정](#claude-code-mcp-설정)
5. [연결 테스트](#연결-테스트)
6. [문제 해결](#문제-해결)

---

## 사전 요구사항

### 1. Docker Desktop 설치

**Windows:**
```powershell
# Windows용 Docker Desktop 다운로드
# https://www.docker.com/products/docker-desktop/

# 설치 후 Docker Desktop 실행 확인
docker --version
docker compose version
```

**Mac:**
```bash
# Homebrew로 설치 (선택사항)
brew install --cask docker

# 또는 https://www.docker.com/products/docker-desktop/
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# 사용자를 docker 그룹에 추가
sudo usermod -aG docker $USER
```

### 2. Node.js 설치 확인

```bash
node --version  # v20 이상 권장
npm --version
```

---

## Docker로 PostgreSQL 시작

### 1. Docker Desktop 실행

Windows에서 Docker Desktop을 실행하고 정상 작동 확인

### 2. PostgreSQL 컨테이너 시작

```bash
# 프로젝트 루트 디렉토리에서
cd C:\test\cwh-todolist

# PostgreSQL 컨테이너 시작
docker compose up -d

# 상태 확인
docker compose ps

# 로그 확인
docker compose logs -f postgres
```

**예상 출력:**
```
[+] Running 2/2
 ✔ Network cwh-todolist-network       Created
 ✔ Container cwh-todolist-postgres    Started
```

### 3. 데이터베이스 연결 확인

```bash
# psql로 직접 접속
docker compose exec postgres psql -U cwh_user -d cwh_todolist

# 테이블 목록 확인
\dt

# 종료
\q
```

### 4. 스키마 초기화

```bash
# database/schema.sql 실행
docker compose exec -T postgres psql -U cwh_user -d cwh_todolist < database/schema.sql

# 테이블 생성 확인
docker compose exec postgres psql -U cwh_user -d cwh_todolist -c "\dt"
```

---

## PostgreSQL MCP 서버 설치

### 방법 1: npx 사용 (권장)

MCP 서버는 별도 설치 없이 npx로 실행 가능합니다.

### 방법 2: 글로벌 설치

```bash
# @modelcontextprotocol/server-postgres 설치
npm install -g @modelcontextprotocol/server-postgres
```

---

## Claude Code MCP 설정

### 1. Claude Code 설정 파일 위치

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
또는
C:\Users\[사용자명]\AppData\Roaming\Claude\claude_desktop_config.json
```

**Mac:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### 2. MCP 설정 추가

`claude_desktop_config.json` 파일을 열고 다음 내용을 추가:

```json
{
  "mcpServers": {
    "postgres-cwh-todolist": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://cwh_user:cwh_password@localhost:5432/cwh_todolist"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

**설명:**
- `postgres-cwh-todolist`: MCP 서버 이름 (원하는 이름으로 변경 가능)
- `command`: npx 명령어 사용
- `args`: PostgreSQL 연결 URL (`.env` 파일의 `DATABASE_URL`과 동일)

### 3. 환경 변수 사용 (더 안전한 방법)

민감한 정보(비밀번호)를 숨기려면:

```json
{
  "mcpServers": {
    "postgres-cwh-todolist": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://cwh_user:cwh_password@localhost:5432/cwh_todolist",
        "NODE_ENV": "development"
      }
    }
  }
}
```

### 4. Claude Code 재시작

설정 파일을 저장한 후:
1. Claude Code 완전 종료
2. Claude Code 재실행
3. 새 세션 시작

---

## 연결 테스트

### 1. MCP 서버 목록 확인

Claude Code에서:
```
/mcp list
```

**예상 출력:**
```
Available MCP servers:
- postgres-cwh-todolist (status: connected)
```

### 2. 데이터베이스 쿼리 실행

```
/mcp
```

그 다음 다음과 같이 요청:
```
PostgreSQL 데이터베이스에 연결하여 다음을 확인해주세요:
1. 테이블 목록 조회
2. users 테이블 구조 확인
3. todos 테이블 구조 확인
```

### 3. 수동 테스트 (psql)

```bash
# psql 접속
docker compose exec postgres psql -U cwh_user -d cwh_todolist

# 테이블 목록
\dt

# users 테이블 구조
\d users

# todos 테이블 구조
\d todos

# 샘플 데이터 삽입
INSERT INTO users (username, email, password)
VALUES ('test_user', 'test@example.com', '$2b$10$abcdefg...');

# 데이터 조회
SELECT * FROM users;

# 종료
\q
```

---

## 문제 해결

### MCP 서버가 연결되지 않음

**증상:** `/mcp list`에서 서버가 보이지 않거나 "disconnected" 상태

**해결 방법:**

1. **Docker PostgreSQL 실행 확인**
   ```bash
   docker compose ps
   docker compose logs postgres
   ```

2. **포트 확인**
   ```bash
   # Windows
   netstat -ano | findstr :5432

   # Mac/Linux
   lsof -i :5432
   ```

3. **연결 URL 확인**
   ```bash
   # psql로 동일한 URL로 접속 시도
   psql "postgresql://cwh_user:cwh_password@localhost:5432/cwh_todolist"
   ```

4. **MCP 서버 로그 확인**

   Claude Code의 개발자 도구 (Developer Tools) 열기:
   - Windows/Linux: `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

   Console 탭에서 MCP 관련 오류 확인

5. **수동으로 MCP 서버 실행 테스트**
   ```bash
   npx -y @modelcontextprotocol/server-postgres "postgresql://cwh_user:cwh_password@localhost:5432/cwh_todolist"
   ```

### Docker가 시작되지 않음

**증상:** `docker compose up` 실패

**해결 방법:**

1. **Docker Desktop 설치 확인**
   - Docker Desktop이 실행 중인지 확인
   - 시스템 트레이에서 Docker 아이콘 확인

2. **WSL2 설정 (Windows)**
   - Docker Desktop이 WSL2를 사용하도록 설정
   - Settings → General → Use the WSL 2 based engine

3. **포트 충돌 확인**
   ```bash
   # 5432 포트 사용 중인 프로세스 확인
   netstat -ano | findstr :5432
   ```

4. **docker-compose.yml 위치 확인**
   ```bash
   cd C:\test\cwh-todolist
   ls docker-compose.yml
   ```

### 연결 URL 오류

**증상:** "connection refused" 또는 "authentication failed"

**해결 방법:**

1. **자격 증명 확인**
   - `.env` 파일의 `DATABASE_URL` 확인
   - `docker-compose.yml`의 환경 변수와 일치하는지 확인

2. **호스트 변경 시도**
   ```
   # localhost 대신
   postgresql://cwh_user:cwh_password@127.0.0.1:5432/cwh_todolist

   # 또는 Docker 호스트 IP
   postgresql://cwh_user:cwh_password@host.docker.internal:5432/cwh_todolist
   ```

3. **데이터베이스 존재 확인**
   ```bash
   docker compose exec postgres psql -U cwh_user -l
   ```

### npx 실행 오류

**증상:** "command not found" 또는 "npx is not recognized"

**해결 방법:**

1. **Node.js 재설치**
   - https://nodejs.org/ (LTS 버전)

2. **PATH 확인**
   ```bash
   echo $PATH  # Mac/Linux
   echo %PATH%  # Windows
   ```

3. **전역 설치로 대체**
   ```bash
   npm install -g @modelcontextprotocol/server-postgres
   ```

   그리고 `claude_desktop_config.json` 수정:
   ```json
   {
     "command": "postgres-mcp-server",
     "args": ["postgresql://..."]
   }
   ```

---

## 추가 설정

### Prisma 연동

```bash
# Prisma 초기화
cd backend
npm install prisma @prisma/client
npx prisma init

# DATABASE_URL 자동 감지 (.env)
npx prisma db push

# Prisma Studio 실행
npx prisma studio
```

### pgAdmin 사용 (GUI)

`docker-compose.yml`에서 pgAdmin 주석 제거 후:

```bash
docker compose up -d

# 브라우저에서 접속
# http://localhost:5050
# Email: admin@cwh-todolist.local
# Password: admin
```

서버 추가:
- Host: postgres (컨테이너 이름)
- Port: 5432
- Username: cwh_user
- Password: cwh_password
- Database: cwh_todolist

---

## 유용한 명령어

### Docker Compose

```bash
# 시작
docker compose up -d

# 중지
docker compose down

# 재시작
docker compose restart

# 로그 확인
docker compose logs -f postgres

# 완전 삭제 (데이터 포함)
docker compose down -v
```

### psql

```bash
# 접속
docker compose exec postgres psql -U cwh_user -d cwh_todolist

# SQL 파일 실행
docker compose exec -T postgres psql -U cwh_user -d cwh_todolist < schema.sql

# 백업
docker compose exec -T postgres pg_dump -U cwh_user cwh_todolist > backup.sql

# 복원
docker compose exec -T postgres psql -U cwh_user -d cwh_todolist < backup.sql
```

---

## 참고 자료

- **PostgreSQL MCP Server**: https://github.com/modelcontextprotocol/servers/tree/main/src/postgres
- **Claude Code MCP 문서**: https://docs.claude.com/en/docs/claude-code/mcp
- **Docker Compose 문서**: https://docs.docker.com/compose/
- **PostgreSQL 문서**: https://www.postgresql.org/docs/

---

**문서 버전**: 1.0
**최종 업데이트**: 2025-11-26
**작성자**: Claude
