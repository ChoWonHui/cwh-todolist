-- ================================================
-- cwh-todolist Database Setup Script
-- ================================================
-- 이 스크립트를 postgres 슈퍼유저 권한으로 실행하세요
-- 실행 방법:
-- psql -U postgres -d postgres -f setup-database.sql
-- ================================================

-- 기존 데이터베이스 및 사용자 삭제 (재설치 시)
DROP DATABASE IF EXISTS cwh_todolist;
DROP USER IF EXISTS cwh_user;

-- 사용자 생성
CREATE USER cwh_user WITH PASSWORD 'cwh_password';

-- 데이터베이스 생성
CREATE DATABASE cwh_todolist OWNER cwh_user;

-- 사용자에게 데이터베이스 권한 부여
GRANT ALL PRIVILEGES ON DATABASE cwh_todolist TO cwh_user;

-- 연결 확인 메시지
\echo '==================================================';
\echo 'Database and user created successfully!';
\echo 'Database: cwh_todolist';
\echo 'User: cwh_user';
\echo 'Next step: Connect to cwh_todolist and run schema.sql';
\echo 'Command: psql -U cwh_user -d cwh_todolist -f database/schema.sql';
\echo '==================================================';
