-- ================================================
-- cwh-todolist Database Setup Script
-- ================================================
-- 이 스크립트를 postgres 슈퍼유저 권한으로 실행하세요
-- 실행 방법:
-- psql -U postgres -d postgres -f database/setup-database.sql
-- ================================================

-- 기존 데이터베이스 삭제 (재설치 시)
-- 주의: 이 명령은 데이터베이스의 모든 데이터를 삭제합니다
DROP DATABASE IF EXISTS cwh_todolist;

-- 데이터베이스 생성
CREATE DATABASE cwh_todolist
  WITH ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  TEMPLATE = template0;

-- 연결 확인 메시지
\echo '==================================================';
\echo 'Database created successfully!';
\echo 'Database: cwh_todolist';
\echo 'Encoding: UTF8';
\echo '';
\echo 'Next steps:';
\echo '1. Update backend/.env with your connection string:';
\echo '   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cwh_todolist"';
\echo '';
\echo '2. Run Prisma migrations to create tables:';
\echo '   cd backend';
\echo '   npx prisma migrate dev --name init';
\echo '';
\echo '3. Generate Prisma Client:';
\echo '   npx prisma generate';
\echo '==================================================';

-- ================================================
-- 참고: 테이블 스키마는 Prisma Migrate로 관리됩니다
-- ================================================
-- Prisma는 backend/prisma/schema.prisma 파일을 기반으로
-- 마이그레이션을 자동 생성하고 적용합니다.
--
-- 현재 스키마:
-- - users (id, username, email, password, createdAt, updatedAt)
-- - todos (id, userId, title, description, startDate, dueDate, status, createdAt, updatedAt)
-- - public_todos (id, title, description, eventDate, type, createdAt)
-- - Status ENUM (ACTIVE, TRASHED)
--
-- 마이그레이션 파일 위치:
-- backend/prisma/migrations/
-- ================================================
