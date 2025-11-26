-- ================================================
-- cwh-todolist Database Schema
-- ================================================
-- DBMS: PostgreSQL 14+
-- Encoding: UTF-8
-- Timezone: UTC
-- Created: 2025-11-25
-- Updated: 2025-11-26
-- ================================================

-- Drop existing tables and types (for clean setup)
DROP TABLE IF EXISTS public_todos CASCADE;
DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS status CASCADE;

-- ================================================
-- EXTENSIONS
-- ================================================

-- UUID 생성을 위한 확장 (PostgreSQL 13 이상에서는 기본 내장)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- ENUMS
-- ================================================

-- 할일 상태 ENUM
CREATE TYPE status AS ENUM ('ACTIVE', 'TRASHED');

-- ================================================
-- TABLES
-- ================================================

-- ------------------------------------------------
-- users 테이블 (사용자)
-- ------------------------------------------------
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::VARCHAR,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- users 테이블 코멘트
COMMENT ON TABLE users IS '애플리케이션 사용자 정보';
COMMENT ON COLUMN users.id IS '사용자 고유 식별자 (UUID)';
COMMENT ON COLUMN users.username IS '사용자명 (3-20자, 영문/숫자/언더스코어)';
COMMENT ON COLUMN users.email IS '이메일 (로그인 ID)';
COMMENT ON COLUMN users.password IS 'bcrypt 해시된 비밀번호 (salt rounds: 10)';
COMMENT ON COLUMN users.created_at IS '계정 생성 일시';
COMMENT ON COLUMN users.updated_at IS '마지막 수정 일시';

-- ------------------------------------------------
-- todos 테이블 (할일)
-- ------------------------------------------------
CREATE TABLE todos (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::VARCHAR,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_date TIMESTAMP(3) NOT NULL,
    due_date TIMESTAMP(3) NOT NULL,
    status status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Key Constraint
    CONSTRAINT fk_todos_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- todos 테이블 코멘트
COMMENT ON TABLE todos IS '사용자 개인 할일 목록';
COMMENT ON COLUMN todos.id IS '할일 고유 식별자 (UUID)';
COMMENT ON COLUMN todos.user_id IS '소유자 사용자 ID (외래 키)';
COMMENT ON COLUMN todos.title IS '할일 제목 (1-100자 필수)';
COMMENT ON COLUMN todos.description IS '할일 상세 설명 (0-1000자 선택)';
COMMENT ON COLUMN todos.start_date IS '시작 일시';
COMMENT ON COLUMN todos.due_date IS '만료 일시 (시작일보다 이후여야 함)';
COMMENT ON COLUMN todos.status IS '상태 (ACTIVE: 활성, TRASHED: 휴지통)';
COMMENT ON COLUMN todos.created_at IS '생성 일시';
COMMENT ON COLUMN todos.updated_at IS '마지막 수정 일시';

-- ------------------------------------------------
-- public_todos 테이블 (공통 할일) - Phase 2
-- ------------------------------------------------
CREATE TABLE public_todos (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::VARCHAR,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    event_date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- public_todos 테이블 코멘트
COMMENT ON TABLE public_todos IS '모든 사용자에게 표시되는 공통 일정 (국경일, 기념일 등)';
COMMENT ON COLUMN public_todos.id IS '공통 할일 식별자 (UUID)';
COMMENT ON COLUMN public_todos.title IS '일정 제목';
COMMENT ON COLUMN public_todos.description IS '일정 설명';
COMMENT ON COLUMN public_todos.event_date IS '일정 날짜 (시간 정보 없음)';
COMMENT ON COLUMN public_todos.type IS '일정 유형 (국경일, 기념일 등)';
COMMENT ON COLUMN public_todos.created_at IS '생성 일시';

-- ================================================
-- INDEXES
-- ================================================

-- ------------------------------------------------
-- users 테이블 인덱스
-- ------------------------------------------------
-- UNIQUE 인덱스는 UNIQUE 제약 조건으로 자동 생성되므로 생략
-- CREATE UNIQUE INDEX idx_users_email ON users(email);
-- CREATE UNIQUE INDEX idx_users_username ON users(username);

-- 관리자 쿼리용 인덱스 (선택사항)
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- ------------------------------------------------
-- todos 테이블 인덱스
-- ------------------------------------------------
-- 사용자별 할일 조회 (필수)
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- 날짜순 정렬 (필수)
CREATE INDEX idx_todos_created_at ON todos(created_at DESC);

-- 복합 인덱스: 사용자별 + 상태별 조회 (최적화)
CREATE INDEX idx_todos_user_id_status ON todos(user_id, status);

-- 복합 인덱스: 사용자별 + 마감일순 정렬 (선택사항)
CREATE INDEX idx_todos_user_id_due_date ON todos(user_id, due_date);

-- ------------------------------------------------
-- public_todos 테이블 인덱스
-- ------------------------------------------------
-- 날짜 범위 조회
CREATE INDEX idx_public_todos_event_date ON public_todos(event_date);

-- 유형별 필터링
CREATE INDEX idx_public_todos_type ON public_todos(type);

-- ================================================
-- CHECK CONSTRAINTS (선택사항)
-- ================================================

-- todos 테이블: 만료일은 시작일보다 이후여야 함
ALTER TABLE todos
ADD CONSTRAINT chk_todos_date_range
CHECK (due_date > start_date);

-- todos 테이블: 제목 길이 제약
ALTER TABLE todos
ADD CONSTRAINT chk_todos_title_length
CHECK (char_length(title) >= 1 AND char_length(title) <= 100);

-- todos 테이블: 설명 길이 제약 (NULL 허용)
ALTER TABLE todos
ADD CONSTRAINT chk_todos_description_length
CHECK (description IS NULL OR char_length(description) <= 1000);

-- users 테이블: 사용자명 길이 제약
ALTER TABLE users
ADD CONSTRAINT chk_users_username_length
CHECK (char_length(username) >= 3 AND char_length(username) <= 20);

-- users 테이블: 사용자명 패턴 (영문, 숫자, 언더스코어만)
ALTER TABLE users
ADD CONSTRAINT chk_users_username_pattern
CHECK (username ~ '^[a-zA-Z0-9_]+$');

-- ================================================
-- TRIGGERS
-- ================================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- users 테이블 트리거
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- todos 테이블 트리거
CREATE TRIGGER trg_todos_updated_at
BEFORE UPDATE ON todos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- INITIAL DATA (선택사항)
-- ================================================

-- Phase 2: 대한민국 국경일 샘플 데이터
-- INSERT INTO public_todos (id, title, description, event_date, type, created_at)
-- VALUES
--     (uuid_generate_v4()::VARCHAR, '신정', '새해 첫날', '2026-01-01', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '설날', '음력 1월 1일', '2026-01-29', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '삼일절', '3·1 독립운동 기념일', '2026-03-01', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '어린이날', '어린이날', '2026-05-05', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '부처님 오신 날', '석가탄신일', '2026-05-24', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '현충일', '국가를 위해 희생한 분들을 기리는 날', '2026-06-06', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '광복절', '일제로부터의 독립 기념일', '2026-08-15', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '추석', '음력 8월 15일', '2026-09-25', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '개천절', '단군 조선 건국 기념일', '2026-10-03', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '한글날', '한글 창제 기념일', '2026-10-09', '국경일', CURRENT_TIMESTAMP),
--     (uuid_generate_v4()::VARCHAR, '크리스마스', '성탄절', '2026-12-25', '국경일', CURRENT_TIMESTAMP);

-- ================================================
-- VERIFICATION QUERIES
-- ================================================

-- 테이블 목록 확인
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- 인덱스 확인
-- SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public';

-- 제약 조건 확인
-- SELECT conname, contype, conrelid::regclass AS table_name
-- FROM pg_constraint
-- WHERE conrelid IN ('users'::regclass, 'todos'::regclass, 'public_todos'::regclass);

-- ================================================
-- CLEANUP (필요 시 사용)
-- ================================================

-- 모든 데이터 삭제 (테이블 구조는 유지)
-- TRUNCATE TABLE public_todos, todos, users RESTART IDENTITY CASCADE;

-- 모든 테이블 삭제
-- DROP TABLE IF EXISTS public_todos CASCADE;
-- DROP TABLE IF EXISTS todos CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TYPE IF EXISTS status CASCADE;

-- ================================================
-- END OF SCHEMA
-- ================================================
