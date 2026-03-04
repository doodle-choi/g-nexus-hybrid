# G-Nexus (Quality Operations Management System)

본 문서는 G-Nexus 프로젝트의 PoC(Proof of Concept) 및 전체 서비스 확장을 위한 공식 컨텍스트 및 설계 문서입니다.

## 1. 프로젝트 개요 (Overview)
- **프로젝트명:** G-Nexus (Quality Operations Management System)
- **목적:** 파편화된 품질(QA), 서비스, 비용 데이터를 통합 수집 및 매핑하여 시각화하고, 비즈니스 현황을 진단 및 예측함.
- **핵심 가치:** 
  - 신뢰성(Reliability): 데이터 출처 추적(Lineage)을 통한 명확한 수치 근거 제시
  - 통찰력(Insight): 단순 통계를 넘어선 RAG/ML 기반의 성과 예측 및 시뮬레이션
  - 전문성(Professionalism): 진중하고 신뢰감 있는 엔터프라이즈 솔루션 UI/UX

## 2. 기술 스택 (Tech Stack)
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **UI Framework:** shadcn/ui (삼성 로고의 블루 `#1428A0` + 다크 그레이 조합의 'Simple & Clear' 테마)
- **Backend:** Python FastAPI, Pydantic, asyncpg (SQLAlchemy 제거 후 순수 PostgreSQL 쿼리 사용)
- **Package Management:** Poetry (Python 환경 의존성 관리)
- **Database:** PostgreSQL (정형 데이터 및 JSONB를 활용한 유동적 데이터 통합 저장)
- **Charting:** Recharts 또는 Chart.js

## 3. PoC 핵심 요구사항 및 제약 사항 (Scope)
초기 PoC 버전은 핵심 가치 검증에 집중하며, 복잡한 ML 기능을 배제한 **'점진적 확장(Progressive Enhancement)'** 전략을 취합니다.

1. **Universal Ingestion (JSON/Markdown 중심):** 외부 변환 기술(API)을 통해 1차 정제된 JSON 또는 Markdown 형식의 데이터를 우선적으로 입력받아 파싱 처리함. (Excel, Word 등 원본 파일 파싱은 확장성으로 고려)
2. **Dynamic Mapping:** 업로드된 비정형 데이터의 속성을 시스템 표준 메트릭(날짜, 비용, 수량, 카테고리 등)으로 매핑하는 동적 UI/UX 제공.
3. **Enterprise Visualization:** 매핑된 데이터를 바탕으로 주요 지표(Trend Chart) 현황판 생성.
4. **Mandatory Security (JWT Auth):** 데이터 소유권 및 시스템 격리를 위해 초기부터 JWT 기반 인증을 도입함. 단, 회원가입은 막고 관리자가 SSO 환경 구축을 대비해 수동으로 유저(SSO ID 연동 구조)를 프로비저닝함.

## 4. UI/UX 디자인 가이드라인 (Design Direction)
- **테마 (Silent & Solid):** 화이트/그레이 기반의 엔터프라이즈풍 디자인. (Primary: Slate Gray / Navy Blue)
- **컨셉 결합 (Hybrid Data Grid + Custom Dashboard):**
  - **Data 수정 뷰 (Bottom):** 데이터 조작을 위한 **Hybrid 전략** (디자인 일관성을 위한 `TanStack Table` 커스텀을 기본으로 하되, 엑셀 수준의 기능이 필수적인 영역에 한해 `AG Grid` 혼용).
  - **Dashboard (Top):** 방문자에게 직관적인 전달력을 주도록 자체 디자인/개발된 대시보드 노출. (추후 **Apache Superset**을 연동하여 커스텀 Self-Service BI 확장 구조)
- **레이아웃:** 고밀도 그리드 화면 구성. 좌측 사이드바 + 다중 탭 아키텍처 지원.
- **Micro-Copy & Emotion:** 초기 로딩 시 콘솔창 느낌의 ASCII 로고(`Global CS Team`) 노출 리퀘스트 반영.

## 5. 시스템 아키텍처 (Technical Layer)
| 계층 | 구성 요소 | 역할 및 상세 |
| --- | --- | --- |
| **Data Ingestion** | FastAPI Endpoint | JSON, Markdown 형태의 외부 변환 데이터 수신 및 유효성 검사 |
| **Data Storage** | PostgreSQL Hybrid | RDBMS 구조화 + JSONB를 활용한 스키마리스(schema-less) 데이터 저장 |
| **Analysis Layer** | Python Pandas/NumPy | 산술 통계 및 데이터 정규화 처리 로직 |
| **Application** | FastAPI + React (TS) | JWT 인증 기반 고성능 백엔드 API + 고밀도 데이터 시각화 프론트엔드 |

## 6. 개발 로드맵 (Master Plan)

### Phase 1: 코어 파운데이션 & MVP
- Poetry 기반 FastAPI 서버 + 순수 SQL 기반 DB Migration 셋업
- JWT 기반 사용자 인증 및 권한 모델 구축 (Manual Provisioning)
- Vite + React + shadcn/ui 프론트엔드 스캐폴딩 및 라우팅 (Auth Guard 포함)
- JSON/Markdown 데이터 초기 적재 (Ingestion/Upload) API

### Phase 2: 데이터 매핑 및 시각화
- 수집된 원본 데이터를 표준 스키마 템플릿과 연결하는 매핑 인터페이스 구현
- 데이터 변환/적재 후 통계 테이블 및 차트(Recharts) 대시보드 구축

### Phase 3 & Beyond: 인텔리전스 레이어 (향후 확장 고도화)
- **Apache Superset 도입:** 사용자 정의형 Self-Service BI 대시보드 하이브리드 통합
- What-if 시뮬레이션: 변수 조정에 따른 성과 변화 예측 샌드박스
- Data Lineage 제공 및 ML/RAG 기반 자동 리포팅 도구 연계
