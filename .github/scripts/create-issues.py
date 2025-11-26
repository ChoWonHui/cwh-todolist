#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GitHub Issues 생성 스크립트

3개의 마크다운 파일에서 이슈를 파싱하여 GitHub에 생성합니다.
- Stage 1: Database (10개 이슈)
- Stage 2: Backend (20개 이슈)
- Stage 3: Frontend (28개 이슈)
"""

import re
import subprocess
import sys
import os
from pathlib import Path
from typing import List, Dict, Tuple

# Windows에서 UTF-8 출력 지원
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')


class IssueParser:
    """마크다운 파일에서 이슈를 파싱하는 클래스"""

    def __init__(self, file_path: str):
        self.file_path = Path(file_path)
        self.content = ""

    def read_file(self) -> str:
        """파일 읽기"""
        with open(self.file_path, 'r', encoding='utf-8') as f:
            self.content = f.read()
        return self.content

    def parse_issues(self) -> List[Dict[str, str]]:
        """이슈 파싱"""
        issues = []

        # ## Issue #N 패턴으로 이슈 분리
        issue_pattern = r'## Issue #\d+\n\n(.*?)(?=\n---\n\n## Issue #|\n---\n\n\*\*Total Issues:|\Z)'
        matches = re.finditer(issue_pattern, self.content, re.DOTALL)

        for match in matches:
            issue_content = match.group(1)
            issue = self._parse_single_issue(issue_content)
            if issue:
                issues.append(issue)

        return issues

    def _parse_single_issue(self, content: str) -> Dict[str, str]:
        """단일 이슈 파싱"""
        issue = {}

        # Title 추출
        title_match = re.search(r'### Title\n(.+?)\n', content)
        if title_match:
            issue['title'] = title_match.group(1).strip()
        else:
            return None

        # Labels 추출
        labels = []
        label_section = re.search(r'### Labels\n(.*?)\n\n### Description', content, re.DOTALL)
        if label_section:
            label_text = label_section.group(1)
            # - 종류:, - 영역:, - 복잡도: 추출
            kind_match = re.search(r'- 종류:\s*(.+)', label_text)
            area_match = re.search(r'- 영역:\s*(.+)', label_text)
            complexity_match = re.search(r'- 복잡도:\s*(.+)', label_text)

            if kind_match:
                labels.append(kind_match.group(1).strip())
            if area_match:
                labels.append(area_match.group(1).strip())
            if complexity_match:
                labels.append(complexity_match.group(1).strip())

        issue['labels'] = ','.join(labels) if labels else ''

        # Description (Body) 추출 - ### Description 이후 모든 내용
        desc_match = re.search(r'### Description\n\n(.*)', content, re.DOTALL)
        if desc_match:
            issue['body'] = desc_match.group(1).strip()
        else:
            issue['body'] = ''

        return issue


class GitHubIssueCreator:
    """GitHub CLI를 사용하여 이슈를 생성하는 클래스"""

    def __init__(self):
        self.created_issues = []
        self.failed_issues = []
        self.labels_created = set()

    def ensure_labels_exist(self):
        """필요한 레이블들이 존재하는지 확인하고, 없으면 생성"""
        required_labels = {
            'feature': {'color': '0e8a16', 'description': 'New feature or request'},
            'bug': {'color': 'd73a4a', 'description': 'Something is not working'},
            'documentation': {'color': '0075ca', 'description': 'Improvements or additions to documentation'},
            'database': {'color': 'fbca04', 'description': 'Database related tasks'},
            'backend': {'color': 'c5def5', 'description': 'Backend related tasks'},
            'frontend': {'color': 'bfdadc', 'description': 'Frontend related tasks'},
            'low': {'color': 'cccccc', 'description': 'Low complexity'},
            'medium': {'color': 'fbca04', 'description': 'Medium complexity'},
            'high': {'color': 'ff9800', 'description': 'High complexity'},
        }

        print("\nChecking and creating labels...")
        for label_name, label_info in required_labels.items():
            if label_name in self.labels_created:
                continue

            try:
                # 레이블 생성 시도
                cmd = [
                    'gh', 'label', 'create',
                    label_name,
                    '--color', label_info['color'],
                    '--description', label_info['description'],
                    '--force'  # 이미 존재하면 업데이트
                ]
                subprocess.run(cmd, capture_output=True, text=True, check=False)
                self.labels_created.add(label_name)
                print(f"  Label created/updated: {label_name}")
            except Exception as e:
                print(f"  Warning: Could not create label '{label_name}': {str(e)}")

        print()

    def create_issue(self, title: str, body: str, labels: str) -> Tuple[bool, str]:
        """GitHub 이슈 생성"""
        try:
            # gh issue create 명령어 구성
            cmd = [
                'gh', 'issue', 'create',
                '--title', title,
                '--body', body
            ]

            if labels:
                cmd.extend(['--label', labels])

            # 명령어 실행
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                check=True
            )

            # 생성된 이슈 URL 추출
            issue_url = result.stdout.strip()
            return True, issue_url

        except subprocess.CalledProcessError as e:
            error_msg = f"Error: {e.stderr}"
            return False, error_msg
        except Exception as e:
            error_msg = f"Exception: {str(e)}"
            return False, error_msg

    def create_issues_from_file(self, file_path: str, stage_name: str) -> int:
        """파일에서 이슈를 파싱하고 생성"""
        print(f"\n{'='*60}")
        print(f"Processing {stage_name}")
        print(f"File: {file_path}")
        print(f"{'='*60}\n")

        parser = IssueParser(file_path)
        parser.read_file()
        issues = parser.parse_issues()

        print(f"Found {len(issues)} issues to create\n")

        created_count = 0
        for idx, issue in enumerate(issues, 1):
            title = issue.get('title', '')
            body = issue.get('body', '')
            labels = issue.get('labels', '')

            print(f"[{idx}/{len(issues)}] Creating: {title[:60]}...")

            success, result = self.create_issue(title, body, labels)

            if success:
                created_count += 1
                self.created_issues.append({
                    'stage': stage_name,
                    'title': title,
                    'url': result
                })
                print(f"  [OK] Success: {result}\n")
            else:
                self.failed_issues.append({
                    'stage': stage_name,
                    'title': title,
                    'error': result
                })
                print(f"  [FAIL] Failed: {result}\n")

        return created_count

    def print_summary(self):
        """결과 요약 출력"""
        print("\n" + "="*60)
        print("SUMMARY")
        print("="*60 + "\n")

        # 총 생성된 이슈 개수
        total_created = len(self.created_issues)
        total_failed = len(self.failed_issues)
        total_attempted = total_created + total_failed

        print(f"Total Issues Attempted: {total_attempted}")
        print(f"Successfully Created: {total_created}")
        print(f"Failed: {total_failed}\n")

        # Stage별 이슈 개수
        stage_counts = {}
        for issue in self.created_issues:
            stage = issue['stage']
            stage_counts[stage] = stage_counts.get(stage, 0) + 1

        print("Issues Created by Stage:")
        for stage, count in stage_counts.items():
            print(f"  - {stage}: {count} issues")
        print()

        # 생성된 이슈 URL 목록 (처음 5개만)
        if self.created_issues:
            print("Created Issue URLs (first 5):")
            for issue in self.created_issues[:5]:
                print(f"  - {issue['title'][:50]}...")
                print(f"    {issue['url']}")
            print()

        # 실패한 이슈 목록
        if self.failed_issues:
            print("Failed Issues:")
            for issue in self.failed_issues:
                print(f"  - [{issue['stage']}] {issue['title']}")
                print(f"    Error: {issue['error']}")
            print()


def main():
    """메인 함수"""
    print("GitHub Issues Creation Script")
    print("="*60 + "\n")

    # 프로젝트 루트 디렉토리 설정
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    issues_dir = project_root / '.github' / 'issues'

    # 처리할 파일 목록 (순서대로)
    files = [
        (issues_dir / 'stage-1-database.md', 'Stage 1: Database'),
        (issues_dir / 'stage-2-backend.md', 'Stage 2: Backend'),
        (issues_dir / 'stage-3-frontend.md', 'Stage 3: Frontend'),
    ]

    # GitHub CLI 설치 확인
    try:
        subprocess.run(['gh', '--version'], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: GitHub CLI (gh) is not installed or not in PATH")
        print("Please install it from: https://cli.github.com/")
        sys.exit(1)

    # 이슈 생성기 초기화
    creator = GitHubIssueCreator()

    # 레이블 생성
    creator.ensure_labels_exist()

    # 각 파일에서 이슈 생성
    for file_path, stage_name in files:
        if not file_path.exists():
            print(f"Warning: File not found: {file_path}")
            continue

        creator.create_issues_from_file(str(file_path), stage_name)

    # 결과 요약 출력
    creator.print_summary()

    print("Script completed!")


if __name__ == '__main__':
    main()
