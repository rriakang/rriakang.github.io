const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const metaDesc = document.querySelector('meta[name="description"]');
let activeProjectId = null;
let activeSlideIndex = 0;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const topbar = document.querySelector(".topbar");
  const offset = ((topbar && topbar.getBoundingClientRect().height) || 0) + 24;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ behavior: "smooth", top: Math.max(0, top) });
  history.replaceState(null, "", "#" + id);
}

$$('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => scrollToId(btn.dataset.scroll));
});

const navHome = $("#nav-home");
if (navHome) {
  navHome.addEventListener("click", (e) => {
    const profileSection = document.getElementById("profile");
    if (!profileSection) return;
    e.preventDefault();
    scrollToId("profile");
  });
}

const themeBtn = $("#theme-toggle");
const root = document.documentElement;

function setTheme(t) {
  root.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const curr = root.getAttribute("data-theme") || "light";
    setTheme(curr === "light" ? "dark" : "light");
  });
}

const langToggle = $("#lang-toggle");
const langMenu = $("#lang-menu");
const langLabel = $("#lang-label");

function openLangMenu(open) {
  if (!langMenu || !langToggle) return;
  langMenu.classList.toggle("open", open);
  langToggle.setAttribute("aria-expanded", String(open));
}

if (langToggle && langMenu) {
  langToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    openLangMenu(!langMenu.classList.contains("open"));
  });
}

document.addEventListener("click", () => openLangMenu(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    openLangMenu(false);
    closeProjectModal();
    closeGalleryModal();
    return;
  }

  if (galleryModal && galleryModal.classList.contains("open")) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      shiftGallery(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      shiftGallery(1);
    }
  }
});

const I18N = {
  ko: {
    page_title: "Portfolio | 강리라",
    page_desc: "근거와 문서화로 설명하는 AI 개발자 포트폴리오 — 멀티모달·시계열 예측, 연합학습 최적화, 서비스 구현",
    nav_profile: "프로필",
    nav_values: "가치관",
    nav_projects: "프로젝트",
    nav_certs: "자격증",
    nav_papers: "논문",
    nav_qa: "Q&A",
    profile_name_label: "Name",
    profile_role_text: "AI 개발자 / AI Research Engineer",
    profile_edu_label: "Education",
    profile_edu_bs: "가천대학교 컴퓨터공학과 학사",
    profile_edu_ms: "가천대학교 컴퓨터공학과 석사",
    profile_github_label: "GitHub",
    profile_linkedin_label: "LinkedIn",
    profile_email_label: "Email",
    hero_kicker: "AI Developer Portfolio",
    hero_title: "AI 개발자 포트폴리오",
    hero_desc:
      "의료·헬스케어 도메인의 멀티모달/시계열 예측 문제를 중심으로, 실험 설계–검증–문서화까지 재현 가능한 형태로 정리합니다.",
    hero_keywords:
      "핵심 키워드: Multimodal · Time-series · Risk Prediction · Wearable · TFT · CNN-GRU · Federated Learning · DBSCAN · Optuna · GA · FastAPI",
    hero_cta_primary: "프로젝트 보기",
    hero_cta_secondary: "논문 보기",
    profile_focus_label: "Focus",
    profile_focus_desc: "임상/현장 문제를 예측 모델로 풀고 검증까지 연결합니다.",
    profile_stack_label: "Stack",
    profile_stack_desc: "학습·평가·리포팅 파이프라인을 end-to-end로 구성합니다.",
    profile_value_label: "Value",
    profile_value_desc: "설명 가능성과 재현성을 기준으로 의사결정합니다.",
    values_title: "가치관",
    values_desc: "일의 기준과 의사결정 원칙을 명확히 합니다.",
    value_1_title: "끈기 있는 문제 해결 능력",
    value_1_desc:
      "Temporal Fusion Transformer 기반 자타해 위험 예측 모델 개발 초기, 성능이 기대치에 미치지 못하는 상황을 마주하였습니다. 저는 섣불리 모델 구조를 전체적으로 바꾸기보다 그 전 단계인 데이터 전처리 과정을 우선 의심하며 점검하였습니다.\n\n위치, 센서, 환자 정보 등 데이터 퓨전 과정을 단계별로 다시 검토하였고, 그 결과 데이터 퓨전 단계에서 발생한 데이터 누락을 식별하여 수정함으로써 성능을 개선할 수 있었습니다.\n\n이 경험을 통해 저는 문제를 감으로 처리하기보다 원인을 구조적으로 파악하고 끝까지 완성하는 끈기를 모델링 과정에서의 핵심 가치로 삼게 되었습니다.",
    value_2_title: "협업 기반 문제 해결",
    value_2_desc:
      "자타해 위험 예측 프로젝트에서 백엔드 엔지니어와 데이터 및 예측 결과를 API로 어떻게 주고받을지 논의하며 연동 방식을 함께 설계했습니다. 또한 서울대병원 전문의와 병동 현장을 직접 확인하며 데이터가 생성되는 상황과 운영 흐름을 이해했습니다.\n\n저는 모델 성능을 높이고 알고리즘을 연구하는 것만큼, 개발자와 실무자가 같은 문제를 같은 기준으로 바라보도록 합의하는 과정이 중요하다고 생각합니다. 이를 위해 데이터 수집 방식, 로그 구조, 전처리 기준을 팀과 협업자들과 함께 점검하며 기준을 정렬했습니다.\n\n그 과정에서 급성 흥분이나 행동 격화 상황에서는 착용형 기기가 이탈하거나 미착용 상태로 전환되어 결측이 증가할 수 있음을 파악했고, 이를 근거로 데이터 수집 방식과 전처리, 평가 기준을 현실에 맞게 재정렬했습니다. 그 결과 개발과 현업이 같은 기준에서 결과를 검토할 수 있었고, 논의가 빠르게 개선 과제로 연결되도록 만들었습니다.",
    value_3_title: "검증하는 태도",
    value_3_desc:
      "모델 성능이 잘 나왔을 때도 저는 먼저 원인을 확인합니다. 우연, 데이터 누수, 분포 편향, 특정 집단에만 유리한 학습 등으로 인해 겉보기 성능이 좋아 보일 수 있기 때문입니다.\n\n그래서 좋은 결과가 나올수록 교차검증, 시간 기준 분리, 외부 검증, 에러 분석을 통해 일반화 가능성을 점검하고, 실험 설정과 전처리 과정의 타당성을 다시 확인합니다.\n\n저는 이 습관이 단기적인 점수보다 장기적으로 신뢰할 수 있는 모델을 만든다고 믿습니다.",
    projects_title: "프로젝트",
    projects_desc: "핵심 문제, 나의 역할, 검증 방식(지표/프로토콜)을 중심으로 정리했습니다.",
    project_title_platform: "웨어러블·임상 데이터 기반 정신증상/자·타해 위험 모니터링 플랫폼 연동",
    project_title_multimodal: "정신과 병동 위험행동 예측 (Real-time Risk Prediction)",
    project_title_wearable: "웨어러블 기반 증상 악화/중증도 예측 (Multi-task)",
    project_title_cohort: "코호트 기반 자살시도 위험 예측 (단·중·장기)",
    project_title_fedops: "FedOps(연합학습 운영 프레임워크) 1.2 릴리즈 업그레이드 참여",
    project_title_fastapi: "FastAPI 기반 실시간 채팅/서비스 프로토타입",
    project_title_iot: "자원절약 및 보안강화를 위한 자동화 IoT 스마트홈 개발",
    certs_title: "자격증",
    certs_desc: "취득 자격증 목록입니다.",
    cert_item_1: "SQLD 개발자",
    cert_item_2: "운전면허자격증 2급 보통",
    papers_title: "논문",
    papers_desc: "연구 주제와 기여를 핵심만 요약했습니다. (표기: 저자/저널 정보는 실제 게재 기준으로 정리 권장)",
    paper_group_sci: "SCI / SCIE",
    paper_group_kci: "KCI",
    paper_journal_1: "International Journal of Medical Informatics (Q1) · 제1저자",
    paper_journal_2: "Asian Journal of Psychiatry · 제1저자 (공동1저자)",
    paper_journal_3: "JMIR · 제2저자",
    paper_journal_4: "한국융합기술학회 · 제1저자",
    paper_summary_link: "요약 보기",
    footer_text: "근거 중심으로 결과를 설명하는 포트폴리오.",
    modal_project_label: "Project",
    modal_role_title: "역할",
    modal_background_title: "배경",
    modal_highlights_title: "주요 하이라이트",
    modal_tech_title: "기술 스택",
    modal_paper_title: "논문 링크",
    modal_repo_title: "깃허브",
    project_paper_link: "논문 링크 (Google Scholar)",
    project_repo_link: "깃허브 링크",
    qa_title: "Q&A",
    qa_desc: "정적 호스팅 버전에서는 Q&A가 비활성화되어 있어요.",
    qa_placeholder: "질문을 입력하세요",
    qa_send: "전송",
    qa_hint: "예: 최근 프로젝트, 논문, 기술 스택, 역할 등",
    qa_chip_1: "최근 프로젝트 요약해줘",
    qa_chip_2: "주요 기술 스택 알려줘",
    qa_chip_3: "논문/연구 기여 요약해줘",
    qa_chip_4: "희망 역할과 강점은?",
    qa_bot_greeting: "안녕하세요! 이 페이지는 정적 호스팅 버전이라 Q&A가 비활성화되어 있습니다.",
    qa_bot_fallback: "정적 호스팅에서는 Q&A 기능이 제공되지 않습니다.",
    qa_bot_loading: "답변을 생성 중입니다...",
    misc_title: "기타",
    misc_global_title: "글로벌 프로그램",
    misc_global_item: "해외 교육 프로그램 수료(Poland Summer School) — Biometrics & Intelligent Systems",
    misc_gallery_title: "활동 사진",
    misc_conf_title: "학술대회",
    misc_conf_item: "2023년도 한국인터넷정보학회 추계학술발표대회",
    misc_lang_title: "어학 자격증",
    misc_lang_item: "토익 750 · 토익스피킹 IM2",
  },
  en: {
    page_title: "Portfolio | Rira Kang",
    page_desc: "An evidence-driven AI developer portfolio — multimodal/time-series prediction, federated optimization, and service delivery.",
    nav_profile: "Profile",
    nav_values: "Principles",
    nav_projects: "Projects",
    nav_certs: "Certifications",
    nav_papers: "Publications",
    nav_qa: "Q&A",
    profile_name_label: "Name",
    profile_role_text: "AI Engineer / AI Research Engineer",
    profile_edu_label: "Education",
    profile_edu_bs: "Gachon University, B.S. in Computer Engineering",
    profile_edu_ms: "Gachon University, M.S. in Computer Engineering",
    profile_github_label: "GitHub",
    profile_linkedin_label: "LinkedIn",
    profile_email_label: "Email",
    hero_kicker: "AI Developer Portfolio",
    hero_title: "An AI developer portfolio",
    hero_desc:
      "Focused on multimodal/time-series prediction in healthcare, I document experiments, validation, and reporting in a reproducible way.",
    hero_keywords:
      "Keywords: Multimodal · Time-series · Risk Prediction · Wearable · TFT · CNN-GRU · Federated Learning · DBSCAN · Optuna · GA · FastAPI",
    hero_cta_primary: "View projects",
    hero_cta_secondary: "View papers",
    profile_focus_label: "Focus",
    profile_focus_desc: "Solving clinical/field problems with validated predictive modeling.",
    profile_stack_label: "Stack",
    profile_stack_desc: "End-to-end pipelines for training, evaluation, and reporting.",
    profile_value_label: "Value",
    profile_value_desc: "Decisions grounded in explainability and reproducibility.",
    values_title: "Principles",
    values_desc: "How I decide and execute.",
    value_1_title: "Persistent problem solving",
    value_1_desc:
      "Early in a TFT-based self/other-harm risk model, performance fell short. I focused on preprocessing first, rechecking fusion steps for location, sensor, and patient data.\n\nFixing missing data in fusion improved results.\n\nI value structural diagnosis and finishing with persistence.",
    value_2_title: "Collaboration-driven problem solving",
    value_2_desc:
      "I co-designed API integration with backend engineers and visited the ward with SNUH specialists to understand data generation and operations.\n\nWe aligned collection, logging, and preprocessing standards.\n\nWe identified missingness from wearable drop-off during acute agitation and realigned criteria to reality so dev and ops could review on the same basis.",
    value_3_title: "Verification-first mindset",
    value_3_desc:
      "Even when performance is strong, I verify causes—chance, leakage, bias, or subgroup effects can mislead.\n\nI use cross-validation, time splits, external validation, and error analysis, and re-audit settings and preprocessing to prioritize long-term reliability.",
    projects_title: "Projects",
    projects_desc: "Organized around the core problem, my role, and evaluation protocol.",
    project_title_platform: "Wearable + Clinical Integrated Mental Symptom / Self-Harm Risk Monitoring Platform",
    project_title_multimodal: "Psychiatric Ward Risk Behavior Prediction (Real-time Risk Prediction)",
    project_title_wearable: "Wearable-based Symptom Deterioration/Severity Prediction (Multi-task)",
    project_title_cohort: "Cohort-based Suicide Attempt Risk Prediction (Short/Mid/Long-term)",
    project_title_fedops: "FedOps (FL Operations Framework) v1.2 Release Upgrade",
    project_title_fastapi: "FastAPI Real-time Chat/Service Prototype",
    project_title_iot: "Automated IoT Smart Home for Resource Saving & Security",
    certs_title: "Certifications",
    certs_desc: "List of certifications.",
    cert_item_1: "SQLD (Developer)",
    cert_item_2: "Driver's license (Class 2, standard)",
    papers_title: "Publications",
    papers_desc: "Key research contributions summarized concisely.",
    paper_group_sci: "SCI / SCIE",
    paper_group_kci: "KCI",
    paper_journal_1: "International Journal of Medical Informatics (Q1) · First author",
    paper_journal_2: "Asian Journal of Psychiatry · First author (co-first)",
    paper_journal_3: "JMIR · Second author",
    paper_journal_4: "Korean Society of Convergence Technology · First author",
    paper_summary_link: "Read summary",
    footer_text: "Explaining outcomes with evidence.",
    modal_project_label: "Project",
    modal_role_title: "Role",
    modal_background_title: "Background",
    modal_highlights_title: "Key highlights",
    modal_tech_title: "Tech stack",
    modal_paper_title: "Paper link",
    modal_repo_title: "GitHub",
    project_paper_link: "Paper link (Google Scholar)",
    project_repo_link: "GitHub link",
    qa_title: "Q&A",
    qa_desc: "Q&A is disabled in the static-hosted version.",
    qa_placeholder: "Type your question",
    qa_send: "Send",
    qa_hint: "e.g., recent projects, publications, tech stack, roles",
    qa_chip_1: "Summarize recent projects",
    qa_chip_2: "What is the main tech stack?",
    qa_chip_3: "Summarize publications/contributions",
    qa_chip_4: "Desired role and strengths?",
    qa_bot_greeting: "Hi! This static site does not provide live Q&A responses.",
    qa_bot_fallback: "Q&A is disabled on the static site.",
    qa_bot_loading: "Generating an answer...",
    misc_title: "Other",
    misc_global_title: "Global Programs",
    misc_global_item: "Overseas program completion (Poland Summer School) — Biometrics & Intelligent Systems",
    misc_gallery_title: "Activity photos",
    misc_conf_title: "Conferences",
    misc_conf_item: "Korea Internet Information Society Fall Conference 2023",
    misc_lang_title: "Language certificates",
    misc_lang_item: "TOEIC 750 · TOEIC Speaking IM2",
  },
  zh: {
    page_title: "作品集 | 姜莉拉",
    page_desc: "以证据与文档为基础的 AI 开发者作品集 —— 多模态/时序预测、联邦优化与服务实现。",
    nav_profile: "个人信息",
    nav_values: "原则",
    nav_projects: "项目",
    nav_certs: "证书",
    nav_papers: "论文",
    nav_qa: "问答",
    hero_title: "AI 开发者作品集",
    hero_cta_primary: "查看项目",
    hero_cta_secondary: "查看论文",
    hero_keywords: "关键词: Multimodal · Time-series · Risk Prediction · Wearable · TFT · CNN-GRU · Federated Learning · DBSCAN · Optuna · GA · FastAPI",
    values_title: "原则",
    values_desc: "明确工作的标准与决策原则。",
    profile_edu_bs: "嘉泉大学 计算机工程学 学士",
    profile_edu_ms: "嘉泉大学 计算机工程学 硕士",
    value_1_title: "坚持不懈的问题解决",
    value_1_desc:
      "在 TFT 自他伤风险预测模型初期，性能未达预期。我先检查预处理而不是重构模型。\n\n逐步复查位置、传感器与患者信息的融合流程，发现并修复融合阶段的缺失，从而提升性能。",
    value_2_title: "基于协作的问题解决",
    value_2_desc:
      "我与后端工程师共同设计 API 交互，并与首尔大学医院专业医师到病房现场确认数据生成与流程。\n\n我们对齐采集、日志与前处理标准，发现急性激动时穿戴设备脱落导致缺失上升，并据此调整标准，让研发与现场在同一基准下评审结果。",
    value_3_title: "验证的态度",
    value_3_desc:
      "即使性能很好也先确认原因，防止偶然、数据泄漏或偏差造成的假象。\n\n通过交叉验证、时间切分、外部验证与错误分析检查泛化，并重新审视实验与前处理。",
    projects_title: "项目",
    project_title_platform: "可穿戴与临床信息整合的精神症状/自他伤风险监测平台",
    project_title_multimodal: "精神科病房危险行为预测（实时风险预测）",
    project_title_wearable: "基于可穿戴的症状恶化/严重度预测（多任务）",
    project_title_cohort: "基于队列的自杀未遂风险预测（短/中/长期）",
    project_title_fedops: "FedOps（联邦学习运维框架）v1.2 版本升级参与",
    project_title_fastapi: "基于 FastAPI 的实时聊天/服务原型",
    project_title_iot: "面向节能与安防的自动化 IoT 智能家居开发",
    papers_title: "论文",
    certs_title: "证书",
    certs_desc: "证书清单。",
    cert_item_1: "SQLD 开发者",
    cert_item_2: "驾照 2级普通",
    paper_group_sci: "SCI / SCIE",
    paper_group_kci: "KCI",
    paper_journal_1: "International Journal of Medical Informatics (Q1) · 第一作者",
    paper_journal_2: "Asian Journal of Psychiatry · 第一作者（共同第一作者）",
    paper_journal_3: "JMIR · 第二作者",
    paper_journal_4: "韩国融合技术学会 · 第一作者",
    paper_summary_link: "查看摘要",
    modal_project_label: "项目",
    modal_role_title: "角色",
    modal_background_title: "背景",
    modal_highlights_title: "主要亮点",
    modal_tech_title: "技术栈",
    modal_paper_title: "论文链接",
    modal_repo_title: "GitHub",
    project_paper_link: "论文链接（Google Scholar）",
    project_repo_link: "GitHub 链接",
    profile_linkedin_label: "LinkedIn",
    qa_title: "问答",
    qa_desc: "静态托管版本中，Q&A 功能已禁用。",
    qa_placeholder: "请输入问题",
    qa_send: "发送",
    qa_hint: "例如：近期项目、论文、技术栈、角色等",
    qa_chip_1: "概述近期项目",
    qa_chip_2: "主要技术栈是什么？",
    qa_chip_3: "概述论文/研究贡献",
    qa_chip_4: "期望角色与优势？",
    qa_bot_greeting: "你好！此静态站点不提供实时问答。",
    qa_bot_fallback: "静态站点已禁用问答功能。",
    qa_bot_loading: "正在生成回答...",
    misc_title: "其他",
    misc_global_title: "全球项目",
    misc_global_item: "海外教育项目结业（Poland Summer School）— Biometrics & Intelligent Systems",
    misc_gallery_title: "活动照片",
    misc_conf_title: "学术会议",
    misc_conf_item: "2023年韩国互联网信息学会秋季学术发表大会",
    misc_lang_title: "语言证书",
    misc_lang_item: "托业 750 · 托业口语 IM2",
    footer_text: "用证据解释结果的作品集。",
  },
  ja: {
    page_title: "ポートフォリオ | カン・リラ",
    page_desc: "根拠と文書化で説明する AI 開発者ポートフォリオ — マルチモーダル/時系列予測、連合学習最適化、サービス実装。",
    nav_profile: "プロフィール",
    nav_values: "価値観",
    nav_projects: "プロジェクト",
    nav_certs: "資格",
    nav_papers: "論文",
    nav_qa: "Q&A",
    hero_title: "AI 開発者ポートフォリオ",
    hero_cta_primary: "プロジェクトを見る",
    hero_cta_secondary: "論文を見る",
    hero_keywords: "キーワード: Multimodal · Time-series · Risk Prediction · Wearable · TFT · CNN-GRU · Federated Learning · DBSCAN · Optuna · GA · FastAPI",
    values_title: "価値観",
    values_desc: "仕事の基準と意思決定の原則を明確にします。",
    profile_edu_bs: "嘉泉大学 コンピュータ工学 学士",
    profile_edu_ms: "嘉泉大学 コンピュータ工学 修士",
    value_1_title: "粘り強い問題解決",
    value_1_desc:
      "TFT ベースの自他害リスク予測モデル初期に性能が不足したため、構造変更ではなく前処理を点検しました。\n\n位置・センサー・患者情報の融合手順を再確認し、欠損を修正して性能を改善しました。",
    value_2_title: "協働による問題解決",
    value_2_desc:
      "バックエンドと API 連携を共同設計し、病棟現場も確認してデータ生成と運用を理解しました。\n\n収集・ログ・前処理基準を整合し、急性興奮時の装着外れによる欠損増加を踏まえて基準を再調整しました。",
    value_3_title: "検証する姿勢",
    value_3_desc:
      "良い結果ほど原因を確認し、偶然・データリーク・偏りを排除します。\n\n交差検証、時間分割、外部検証、エラー分析で汎化を確認し、実験設定と前処理を再点検します。",
    projects_title: "プロジェクト",
    project_title_platform: "ウェアラブル・臨床統合の精神症状/自他害リスクモニタリングプラットフォーム",
    project_title_multimodal: "精神科病棟の危険行動予測（リアルタイムリスク予測）",
    project_title_wearable: "ウェアラブルによる症状悪化/重症度予測（マルチタスク）",
    project_title_cohort: "コホートベースの自殺企図リスク予測（短・中・長期）",
    project_title_fedops: "FedOps（連合学習運用フレームワーク）v1.2 リリースアップグレード参加",
    project_title_fastapi: "FastAPI ベースのリアルタイムチャット/サービスプロトタイプ",
    project_title_iot: "省エネと安全性を高める自動化 IoT スマートホーム開発",
    papers_title: "論文",
    certs_title: "資格",
    certs_desc: "取得した資格の一覧です。",
    cert_item_1: "SQLD 開発者",
    cert_item_2: "運転免許 2種普通",
    paper_group_sci: "SCI / SCIE",
    paper_group_kci: "KCI",
    paper_journal_1: "International Journal of Medical Informatics (Q1) · 第一著者",
    paper_journal_2: "Asian Journal of Psychiatry · 第一著者（共同第一著者）",
    paper_journal_3: "JMIR · 第二著者",
    paper_journal_4: "韓国融合技術学会 · 第一著者",
    paper_summary_link: "要約を見る",
    modal_project_label: "プロジェクト",
    modal_role_title: "役割",
    modal_background_title: "背景",
    modal_highlights_title: "主なハイライト",
    modal_tech_title: "技術スタック",
    modal_paper_title: "論文リンク",
    modal_repo_title: "GitHub",
    project_paper_link: "論文リンク（Google Scholar）",
    project_repo_link: "GitHub リンク",
    profile_linkedin_label: "LinkedIn",
    qa_title: "Q&A",
    qa_desc: "静的ホスティング版ではQ&Aは無効です。",
    qa_placeholder: "質問を入力してください",
    qa_send: "送信",
    qa_hint: "例：最近のプロジェクト、論文、技術スタック、役割 など",
    qa_chip_1: "最近のプロジェクトを要約して",
    qa_chip_2: "主な技術スタックは？",
    qa_chip_3: "論文/研究の貢献を要約して",
    qa_chip_4: "希望する役割と強みは？",
    qa_bot_greeting: "こんにちは。この静的サイトではQ&Aは提供されません。",
    qa_bot_fallback: "静的サイトではQ&A機能は無効です。",
    qa_bot_loading: "回答を生成中です...",
    misc_title: "その他",
    misc_global_title: "グローバルプログラム",
    misc_global_item: "海外教育プログラム修了（Poland Summer School）— Biometrics & Intelligent Systems",
    misc_gallery_title: "活動写真",
    misc_conf_title: "学会・大会",
    misc_conf_item: "2023年度 韓国インターネット情報学会 秋季学術発表大会",
    misc_lang_title: "語学資格",
    misc_lang_item: "TOEIC 750 · TOEIC Speaking IM2",
    footer_text: "根拠をもって成果を説明するポートフォリオ。",
  },
};

let activeLang = "ko";

function getI18nValue(key) {
  const dict = I18N[activeLang] || I18N.ko;
  return dict[key] || I18N.ko[key] || "";
}

function applyI18n(lang) {
  const dict = I18N[lang] || I18N.ko;
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const val = dict[key];
    if (typeof val === 'string') el.textContent = val;
  });
  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const val = dict[key];
    if (typeof val === 'string') el.setAttribute('placeholder', val);
  });

  const labelMap = { ko: "Korean", en: "English", zh: "中文", ja: "日本語" };
  if (langLabel) langLabel.textContent = labelMap[lang] || "Korean";
  if (typeof dict.page_title === "string") document.title = dict.page_title;
  if (metaDesc && typeof dict.page_desc === "string") {
    metaDesc.setAttribute("content", dict.page_desc);
  }
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  activeLang = lang;
  if (activeProjectId && projectModal && projectModal.classList.contains("open")) {
    openProjectModal(activeProjectId);
  }
}

const projectCards = $$(".projectCard");
const projectViewport = $("#project-viewport");
const projectTrack = $("#project-track");
const projectPrev = $("#proj-prev");
const projectNext = $("#proj-next");
const projectModal = $("#project-modal");
const projectModalTitle = $("#project-modal-title");
const projectModalClose = $("#project-modal-close");
const projectSlideImage = $("#project-slide-image");
const projectSlideNote = $("#project-slide-note");
const projectSlideLink = $("#project-slide-link");
const projectSlideIndicator = $("#project-slide-indicator");
const projectSlidePrev = $("#project-slide-prev");
const projectSlideNext = $("#project-slide-next");
const projectSummary = $("#project-summary");
const projectRole = $("#project-role");
const projectBackground = $("#project-background");
const projectHighlights = $("#project-highlights");
const projectTech = $("#project-tech");
const projectPaperSection = $("#project-paper-section");
const projectPaperLink = $("#project-paper-link");
const projectRepoSection = $("#project-repo-section");
const projectRepoLink = $("#project-repo-link");
const savedLang = localStorage.getItem("lang") || "ko";
applyI18n(savedLang);

const projectModalData = {
  "iot-smart-home": {
    title: "자원절약 및 보안강화를 위한 자동화 IoT 스마트홈 개발",
    summary:
      "컴퓨터공학과 졸업작품으로 IoT 기반 스마트홈 시스템을 기획·구현했습니다.",
    role:
      "팀장으로 프로젝트 발표를 주도했으며, Python을 활용한 라즈베리파이와 데이터베이스 연동을 담당했습니다. 또한 웹 기능 구현에도 참여했습니다.",
    background:
      "컴퓨터공학과 졸업작품으로 IoT 기반 스마트홈 시스템을 기획·구현했습니다. 딥러닝을 공부하며 데이터가 실제 환경에서 어떻게 생성되고 수집되는지에 대한 궁금증이 있었고, 이를 직접 경험하기 위해 센서 데이터를 수집해 앱과 서버로 전달하는 전체 흐름을 설계했습니다. 실제 주거 환경에 설치하는 수준의 구현은 제약이 있어 모형 환경으로 대체했으며, 외출 중에도 모바일 앱으로 집 상태를 확인하고 가전 및 설비를 제어해 보안 강화와 자원 절약을 동시에 달성하는 것을 목표로 했습니다.",
    highlights: [
      "라즈베리파이 3B+와 조도, 온습도, 초음파 센서 및 LED 연동",
      "관리자 웹페이지를 통한 회원 및 사용자 관리 기능 구현",
      "모바일 앱에서 조명, 윈도우, 경보음 제어 및 상태 확인 기능 구현",
      "스마트 전등, 도어, 에어컨 제어와 침입자 감지 및 경보 기능 구현",
    ],
    tech:
      "Java, Python, Node.js, Express, EJS, Android Java, MySQL, REST API, Git, Raspberry Pi 3B+",
    repoLink: "https://github.com/rriakang/graduate_project",
    slides: [
      {
        img: "/img/projects/smarthome1.png",
        alt: "IoT smart home overview",
      },
      {
        img: "/img/projects/smarthome2.png",
        alt: "IoT admin web",
      },
      {
        img: "/img/projects/smarthome3.png",
        alt: "IoT mobile app",
      },
      {
        img: "/img/projects/smarthome4.png",
        alt: "IoT system screen",
      },
    ],
  },
  "risk-monitor-platform": {
    title: "웨어러블·임상 데이터 기반 정신증상/자·타해 위험 모니터링 플랫폼 연동",
    summary:
      "정부 지원 과제의 일환으로 웨어러블 데이터와 임상 정보를 통합 수집·정제하고, 이를 기반으로 정신증상 악화 및 자·타해 위험을 예측/모니터링하여 의료진에게 제공하는 시스템을 목표로 수행했습니다.",
    role: "정신증상 악화 예측 모델과 자·타해 위험 예측 모델(분류)을 개발하고, Flask 기반 Inference API 및 PyPI 패키지 형태로 배포해 모기업 플랫폼과 연동을 완료했습니다.",
    background:
      "상용 환경에서 활용 가능한 형태로 예측 결과를 제공하기 위해 백엔드와 데이터 계약(API 명세/JSON 스키마)을 정의하고, 플랫폼에서 신규 환자 데이터로 예측을 호출·출력하는 흐름을 설계했습니다.",
    highlights: [
      "웨어러블 데이터·임상 변수 통합 전처리 및 학습 데이터셋 구성",
      "정신증상 악화 및 자·타해 위험 예측/모니터링·알림 흐름 정의",
      "Flask 기반 Inference API 서비스화 및 PyPI 패키지 배포",
      "플랫폼 연동을 위한 API 명세 및 JSON 스키마 정의",
    ],
    tech: "Python, Flask, PyPI, REST API, JSON Schema, Wearable Data, Clinical Variables",
    slides: [
      {
        img: "/img/projects/platform-1.png",
        alt: "Platform overview",
      },
      {
        img: "/img/projects/platform-2.png",
        alt: "Platform overview",
      },
      {
        img: "/img/projects/platform-3.png",
        alt: "Risk monitoring flow",
      },
      {
        img: "/img/projects/platform-4.png",
        alt: "Platform integration",
      },
    ],
  },
  "multimodal-risk": {
    title: "정신과 병동 위험행동 예측 (Real-time Risk Prediction)",
    summary:
      "정신과 병동에서 발생할 수 있는 위험행동을 사전에 예측하여, 의료진의 안전 대응과 의사결정을 지원하기 위한 모델을 개발했습니다.",
    role: "데이터 특성에 따른 적합 알고리즘 탐색 및 선정, 데이터 정제, 전처리, 병합, 모델 구축과 학습, 성능 평가 및 개선 과정을 수행했습니다.",
    background:
      "정신과 병동에서 발생할 수 있는 위험행동을 사전에 예측하여, 의료진의 안전 대응과 의사결정을 지원하기 위한 모델을 개발했습니다.",
    highlights: [
      "결측치와 이상치 처리 전략 수립 및 적용",
      "Temporal Fusion Transformer 기반 멀티모달 시계열 모델 설계와 학습",
      "현장 적용 관점에서 실패 케이스와 리스크 요인 분석, 개선 방향 도출",
    ],
    tech: "Python, PyTorch, Temporal Fusion Transformer, Multimodal Time-series",
    paperLink:
      "https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=0m_7B20AAAAJ&citation_for_view=0m_7B20AAAAJ:9yKSN-GCB0IC",
    slides: [
      {
        img: "/img/projects/multimodal-1.png",
        alt: "Multimodal preprocessing",
      },
      {
        img: "/img/projects/multimodal-2.png",
        alt: "TFT modeling",
      },
      {
        img: "/img/projects/multimodal-3.png",
        alt: "Clinical validation",
      },
       {
        img: "/img/projects/multimodal-4.png",
        alt: "Clinical validation",
      },
    ],
  },
  "wearable-cnn-gru": {
    title: "웨어러블 기반 증상 악화/중증도 예측 (Multi-task)",
    summary:
      "입원 환자의 상태 변화를 조기에 감지하고, 증상 악화 및 중증도 변화를 선제적으로 파악할 수 있는 예측 모델 구축이 필요했습니다.",
    role:
      "웨어러블 데이터 전처리 파이프라인 구축과 모델링을 수행했으며, 실험 설계와 학습·평가 프로토콜 수립을 담당했습니다.",
    background:
      "입원 환자의 상태 변화를 조기에 감지하고, 증상 악화 및 중증도 변화를 선제적으로 파악할 수 있는 예측 모델 구축이 필요했습니다.",
    highlights: [
      "CNN-GRU 기반 멀티태스크 학습 구조 설계 및 구현",
      "윈도잉, 정규화 등 입력 전처리 파이프라인 구축과 재현성 확보",
      "학습·평가 결과 리포팅 자동화로 실험 반복 효율 개선",
    ],
    tech: "Python, CNN-GRU, Multitask Learning, Time-series",
    paperLink:
      "https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=0m_7B20AAAAJ&citation_for_view=0m_7B20AAAAJ:u5HHmVD_uO8C",
    slides: [
      {
        img: "/img/projects/wearable-1.png",
        alt: "Wearable preprocessing",
      },
      {
        img: "/img/projects/wearable-2.png",
        alt: "CNN-GRU multitask",
      },
      {
        img: "/img/projects/wearable-3.png",
        alt: "Evaluation reporting",
      },
    ],
  },
  "cohort-risk": {
    title: "코호트 기반 자살시도 위험 예측 (단·중·장기)",
    summary:
      "코호트 기반 임상 데이터를 활용해 예측 시점에 따라 위험도가 달라지는 자살시도 위험을 기간별로 정량화하고, 임상적으로 해석 가능한 형태로 제공할 모델이 필요했습니다.",
    role:
      "단기·중기·장기 예측을 위한 타깃 정의와 평가 설계를 주도하고, Logistic Regression, Cox, XGBoost 모델 비교 실험과 결과 해석 및 문서화를 담당했습니다.",
    background:
      "코호트 기반 임상 데이터를 활용해 예측 시점에 따라 위험도가 달라지는 자살시도 위험을 기간별로 정량화하고, 임상적으로 해석 가능한 형태로 제공할 모델이 필요했습니다.",
    highlights: [
      "단기·중기·장기 타깃 정의 및 평가 체계 수립",
      "Logistic Regression, Cox, XGBoost 비교 실험을 통한 성능 및 특성 영향 분석",
      "임상 해석 기준을 반영한 결과 정리와 재현 가능한 문서화",
    ],
    tech: "Python, Logistic Regression, Cox, XGBoost",
    paperLink:
      "https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=0m_7B20AAAAJ&citation_for_view=0m_7B20AAAAJ:d1gkVwhDpl0C",
    slides: [
      {
        img: "/img/projects/cohort-1.png",
        alt: "Target definition",
      },
      {
        img: "/img/projects/cohort-2.png",
        alt: "Model comparison",
      },

    ],
  },
  "federated-optimization": {
    title: "FedOps Clustering Tuning",
    summary:
      "연합학습은 각 클라이언트가 데이터를 외부로 공유하지 않고 로컬 학습 결과인 모델 업데이트만 집계합니다. 그러나 Non-IID 환경에서는 단일 글로벌 집계와 고정 하이퍼파라미터로 인해 클라이언트별 학습 특성이 반영되지 않아 성능 저하가 발생할 수 있습니다. 따라서 클라이언트 특성에 따라 그룹을 나누고, 그룹 단위로 튜닝하는 운영 전략이 필요했습니다.",
    role:
      "Non-IID 환경의 성능 저하 문제를 해결하기 위해 클러스터링 기반 하이퍼파라미터 최적화 기법을 설계하고, 이를 연구실 Federated Learning 운영 프레임워크인 FedOps에 기능으로 통합했습니다. 구체적으로 클러스터링 입력 피처 정의, DBSCAN 설정과 노이즈 처리 기준 수립, 클러스터별 HPO 수행 흐름 구성, FedOps v1.2 업그레이드 반영 및 문서화를 담당했습니다.",
    background:
      "연합학습은 각 클라이언트가 데이터를 외부로 공유하지 않고 로컬 학습 결과인 모델 업데이트만 집계합니다. 그러나 Non-IID 환경에서는 단일 글로벌 집계와 고정 하이퍼파라미터로 인해 클라이언트별 학습 특성이 반영되지 않아 성능 저하가 발생할 수 있습니다. 따라서 클라이언트 특성에 따라 그룹을 나누고, 그룹 단위로 튜닝하는 운영 전략이 필요했습니다.",
    highlights: [
      "학습률, 배치 크기, 로컬 loss를 로그 스케일 피처로 구성해 DBSCAN 클러스터링 적용",
      "eps 0.2, min_samples 2 설정 기반 군집화와 노이즈 클라이언트 처리 기준 수립",
      "노이즈 클라이언트를 독립 클러스터로 승격해 튜닝과 집계에서 제외되지 않도록 설계",
      "클러스터별 Optuna Study ask tell 방식으로 하이퍼파라미터 최적화 수행",
      "FedAvg 기반 글로벌 집계에 주기적 클러스터링과 클러스터별 튜닝을 결합한 운영 플로우 구축",
      "FedOps v1.2 업그레이드에 신규 플로우를 반영하고, 재현 가능한 운영 절차로 문서화",
    ],
    tech: "FedOps v1.2, Federated Learning, DBSCAN, Optuna, FedAvg, Python",
    slideNote:
      "Federated Learning : 데이터를 중앙 서버로 모으지 않고, 각 클라이언트가 로컬 데이터로 모델을 학습한 뒤 학습 결과인 파라미터 업데이트 또는 그래디언트만 서버에 공유하여 집계하는 분산 학습 방식입니다.\n\nFedOps : 개인정보를 보호하면서 분산된 데이터로 AI 모델을 학습시키는 Federated Learning의 전 과정을 체계적으로 관리하고 자동화하며 운영하기 위한 프레임워크이자 플랫폼입니다. 석사 과정 동안 연구실에서 운영하던 홈페이지 기반 플랫폼으로, 연합 학습 환경에 MLOps 개념을 적용해 데이터 비중앙화, 비동질적 데이터 분포, 이기종 컴퓨팅 환경에서 발생하는 복잡성을 줄이고 효율적인 모델 개발과 배포를 지원합니다.\n\nNon-IID 환경 조치가 필요한 이유: 클라이언트별 데이터 분포가 달라 단일 집계/고정 하이퍼파라미터로는 성능 편차가 커지기 때문에, 그룹별 튜닝과 운영 전략이 필요합니다.",
    slideLinks: [
      {
        label: "fedops homepage",
        url: "https://ccl.gachon.ac.kr/fedops",
      },
      {
        label: "fedops Clustering document",
        url: "https://gachon-cclab.github.io/docs/FedOps-Clustering-Tuning",
      },
      {
        label: "깃허브",
        url: "https://github.com/gachon-CCLab/FedOps",
      },
    ],
    slides: [
      {
        img: "/img/projects/fedops-0.png",
        alt: "FedOps clustering overview",
      },
      {
        img: "/img/projects/fedops-1.png",
        alt: "Clustering feature pipeline",
      },
      {
        img: "/img/projects/fedops-2.png",
        alt: "Cluster-wise HPO flow",
      },
      {
        img: "/img/projects/fedops-3.png",
        alt: "Global aggregation step",
      },
      {
        img: "/img/projects/fedops-4.png",
        alt: "Global aggregation step",
      },
    ],
  },
  "fastapi-service": {
    title: "FastAPI 기반 실시간 채팅/서비스 프로토타입",
    summary:
      "실시간 통신 구조와 상태 관리 기반을 구성해 서비스 형태로 연결했습니다.",
    role: "백엔드 구조 설계 및 WebSocket/REST 구현을 담당했습니다.",
    background:
      "모델 결과를 실제 서비스로 연결하기 위한 실시간 통신 구조가 필요했습니다.",
    highlights: [
      "WebSocket/REST 혼합 구조 설계",
      "대화 로그/세션 상태 관리",
      "운영 관점(에러 처리, 입력 검증, 관측성) 기준 정리",
    ],
    tech: "FastAPI, WebSocket, REST API",
    slides: [
      {
        img: "/img/projects/fastapi-1.svg",
        alt: "WebSocket REST",
      },
      {
        img: "/img/projects/fastapi-2.svg",
        alt: "Session logging",
      },
      {
        img: "/img/projects/fastapi-3.svg",
        alt: "Operational readiness",
      },
    ],
  },
};

const PROJECT_I18N = {
  "risk-monitor-platform": {
    ko: {
      title: "웨어러블·임상 데이터 기반 정신증상/자·타해 위험 모니터링 플랫폼 연동",
      summary:
        "정부 지원 과제의 일환으로 웨어러블 데이터와 임상 정보를 통합 수집·정제하고, 이를 기반으로 정신증상 악화 및 자·타해 위험을 예측/모니터링하여 의료진에게 제공하는 시스템을 목표로 수행했습니다.",
      role:
        "정신증상 악화 예측 모델과 자·타해 위험 예측 모델(분류)을 개발하고, Flask 기반 Inference API 및 PyPI 패키지 형태로 배포해 모기업 플랫폼과 연동을 완료했습니다.",
      background:
        "상용 환경에서 활용 가능한 형태로 예측 결과를 제공하기 위해 백엔드와 데이터 계약(API 명세/JSON 스키마)을 정의하고, 플랫폼에서 신규 환자 데이터로 예측을 호출·출력하는 흐름을 설계했습니다.",
      highlights: [
        "웨어러블 데이터·임상 변수 통합 전처리 및 학습 데이터셋 구성",
        "정신증상 악화 및 자·타해 위험 예측/모니터링·알림 흐름 정의",
        "Flask 기반 Inference API 서비스화 및 PyPI 패키지 배포",
        "플랫폼 연동을 위한 API 명세 및 JSON 스키마 정의",
      ],
      tech: "Python, Flask, PyPI, REST API, JSON Schema, Wearable Data, Clinical Variables",
    },
    en: {
      title:
        "Wearable + Clinical Data-Based Psychiatric Symptom / Self-Other Harm Risk Monitoring Platform Integration",
      summary:
        "As part of a government-funded project, we integrated and cleaned wearable data and clinical information, and built a system to predict/monitor symptom deterioration and self/other-harm risk for clinicians.",
      role:
        "Developed symptom deterioration and self/other-harm risk classification models, and deployed a Flask-based inference API and PyPI package to integrate with the parent company's platform.",
      background:
        "To deliver predictions in a production setting, we defined backend and data contracts (API specs/JSON schemas) and designed the flow for calling and displaying predictions with new patient data.",
      highlights: [
        "Integrated preprocessing for wearable data and clinical variables",
        "Defined prediction/monitoring/alert flow for symptom deterioration and self/other-harm risk",
        "Productized with a Flask-based inference API and PyPI package",
        "Defined API specs and JSON schema for platform integration",
      ],
      tech: "Python, Flask, PyPI, REST API, JSON Schema, Wearable Data, Clinical Variables",
    },
    zh: {
      title: "基于可穿戴与临床数据的精神症状/自他伤风险监测平台对接",
      summary:
        "作为政府支持课题的一部分，整合并清洗可穿戴数据与临床信息，用于预测/监测精神症状恶化与自他伤风险，并向医护提供结果。",
      role:
        "构建精神症状恶化与自他伤风险分类模型，并通过 Flask 推理 API 与 PyPI 包完成母公司平台对接。",
      background:
        "为在商用环境中提供预测结果，定义后端与数据契约（API 规范/JSON Schema），并设计平台调用与展示预测的流程。",
      highlights: [
        "整合可穿戴数据与临床变量的预处理与数据集构建",
        "定义精神症状恶化及自他伤风险的预测/监测/告警流程",
        "Flask 推理 API 服务化与 PyPI 包发布",
        "平台对接所需的 API 规范与 JSON Schema 定义",
      ],
      tech: "Python, Flask, PyPI, REST API, JSON Schema, Wearable Data, Clinical Variables",
    },
    ja: {
      title:
        "ウェアラブル・臨床データに基づく精神症状/自他害リスクモニタリングプラットフォーム連携",
      summary:
        "政府支援課題の一環として、ウェアラブルデータと臨床情報を統合・精製し、精神症状の悪化と自他害リスクを予測/モニタリングして医療者に提供するシステムを目指しました。",
      role:
        "精神症状悪化と自他害リスクの分類モデルを開発し、Flask ベースの推論 API と PyPI パッケージで親会社プラットフォームと連携しました。",
      background:
        "商用環境で予測結果を提供するため、バックエンドとデータ契約（API 仕様/JSON スキーマ）を定義し、新規患者データで予測を呼び出して表示するフローを設計しました。",
      highlights: [
        "ウェアラブルデータ・臨床変数の統合前処理と学習データセット構成",
        "精神症状悪化/自他害リスクの予測・モニタリング・アラートフロー定義",
        "Flask ベース推論 API のサービス化と PyPI パッケージ配布",
        "連携用 API 仕様と JSON スキーマ定義",
      ],
      tech: "Python, Flask, PyPI, REST API, JSON Schema, Wearable Data, Clinical Variables",
    },
  },
  "multimodal-risk": {
    ko: {
      title: "정신과 병동 위험행동 예측 (Real-time Risk Prediction)",
      summary:
        "정신과 병동에서 발생할 수 있는 위험행동을 사전에 예측하여, 의료진의 안전 대응과 의사결정을 지원하기 위한 모델을 개발했습니다.",
      role:
        "데이터 특성에 따른 적합 알고리즘 탐색 및 선정, 데이터 정제, 전처리, 병합, 모델 구축과 학습, 성능 평가 및 개선 과정을 수행했습니다.",
      background:
        "정신과 병동에서 발생할 수 있는 위험행동을 사전에 예측하여, 의료진의 안전 대응과 의사결정을 지원하기 위한 모델을 개발했습니다.",
      highlights: [
        "결측치와 이상치 처리 전략 수립 및 적용",
        "Temporal Fusion Transformer 기반 멀티모달 시계열 모델 설계와 학습",
        "현장 적용 관점에서 실패 케이스와 리스크 요인 분석, 개선 방향 도출",
      ],
      tech: "Python, PyTorch, Temporal Fusion Transformer, Multimodal Time-series",
    },
    en: {
      title: "Psychiatric Ward Risk Behavior Prediction (Real-time Risk Prediction)",
      summary:
        "Developed a model to predict risk behaviors in psychiatric wards to support clinician safety response and decision-making.",
      role:
        "Led algorithm selection by data characteristics, data cleaning/preprocessing/merging, model training, and performance evaluation and improvement.",
      background:
        "Developed a model to predict risk behaviors in psychiatric wards to support clinician safety response and decision-making.",
      highlights: [
        "Established and applied missing/outlier handling strategies",
        "Designed and trained a multimodal time-series model based on Temporal Fusion Transformer",
        "Analyzed failure cases and risk factors for real-world deployment and defined improvements",
      ],
      tech: "Python, PyTorch, Temporal Fusion Transformer, Multimodal Time-series",
    },
    zh: {
      title: "精神科病房危险行为预测（实时风险预测）",
      summary:
        "开发用于提前预测精神科病房风险行为的模型，以支持医护人员的安全应对和决策。",
      role:
        "根据数据特性选择算法，负责数据清洗、预处理、合并、模型构建训练及性能评估改进。",
      background:
        "开发用于提前预测精神科病房风险行为的模型，以支持医护人员的安全应对和决策。",
      highlights: [
        "制定并应用缺失值/异常值处理策略",
        "设计并训练基于 Temporal Fusion Transformer 的多模态时序模型",
        "从现场应用角度分析失败案例与风险因素，提出改进方向",
      ],
      tech: "Python, PyTorch, Temporal Fusion Transformer, Multimodal Time-series",
    },
    ja: {
      title: "精神科病棟の危険行動予測（リアルタイムリスク予測）",
      summary:
        "精神科病棟で起こり得る危険行動を事前予測し、医療者の安全対応と意思決定を支援するモデルを開発しました。",
      role:
        "データ特性に応じたアルゴリズム選定、データ整備・前処理・統合、モデル構築と学習、性能評価・改善を担当しました。",
      background:
        "精神科病棟で起こり得る危険行動を事前予測し、医療者の安全対応と意思決定を支援するモデルを開発しました。",
      highlights: [
        "欠損・外れ値処理方針の策定と適用",
        "Temporal Fusion Transformer ベースのマルチモーダル時系列モデル設計と学習",
        "現場適用観点で失敗ケース/リスク要因を分析し改善方針を導出",
      ],
      tech: "Python, PyTorch, Temporal Fusion Transformer, Multimodal Time-series",
    },
  },
  "wearable-cnn-gru": {
    ko: {
      title: "웨어러블 기반 증상 악화/중증도 예측 (Multi-task)",
      summary:
        "입원 환자의 상태 변화를 조기에 감지하고, 증상 악화 및 중증도 변화를 선제적으로 파악할 수 있는 예측 모델 구축이 필요했습니다.",
      role:
        "웨어러블 데이터 전처리 파이프라인 구축과 모델링을 수행했으며, 실험 설계와 학습·평가 프로토콜 수립을 담당했습니다.",
      background:
        "입원 환자의 상태 변화를 조기에 감지하고, 증상 악화 및 중증도 변화를 선제적으로 파악할 수 있는 예측 모델 구축이 필요했습니다.",
      highlights: [
        "CNN-GRU 기반 멀티태스크 학습 구조 설계 및 구현",
        "윈도잉, 정규화 등 입력 전처리 파이프라인 구축과 재현성 확보",
        "학습·평가 결과 리포팅 자동화로 실험 반복 효율 개선",
      ],
      tech: "Python, CNN-GRU, Multitask Learning, Time-series",
    },
    en: {
      title: "Wearable-based Symptom Deterioration/Severity Prediction (Multi-task)",
      summary:
        "Built a model to proactively detect inpatient status changes and predict symptom deterioration and severity.",
      role:
        "Built the wearable preprocessing pipeline and modeling, and designed experiments and training/evaluation protocols.",
      background:
        "Built a model to proactively detect inpatient status changes and predict symptom deterioration and severity.",
      highlights: [
        "Designed and implemented CNN-GRU multitask learning architecture",
        "Built windowing/normalization preprocessing pipeline with reproducibility",
        "Automated training/evaluation reporting to improve iteration efficiency",
      ],
      tech: "Python, CNN-GRU, Multitask Learning, Time-series",
    },
    zh: {
      title: "基于可穿戴的症状恶化/严重度预测（多任务）",
      summary:
        "需要构建能够提前识别住院患者状态变化并预测症状恶化与严重度变化的模型。",
      role:
        "构建可穿戴数据预处理管线与模型，并负责实验设计及训练/评估协议制定。",
      background:
        "需要构建能够提前识别住院患者状态变化并预测症状恶化与严重度变化的模型。",
      highlights: [
        "设计并实现 CNN-GRU 多任务学习结构",
        "构建窗口化、归一化等输入预处理管线并确保可复现",
        "自动化训练/评估结果报告以提升实验迭代效率",
      ],
      tech: "Python, CNN-GRU, Multitask Learning, Time-series",
    },
    ja: {
      title: "ウェアラブルによる症状悪化/重症度予測（マルチタスク）",
      summary:
        "入院患者の状態変化を早期に検知し、症状悪化と重症度変化を先行的に把握できる予測モデルが必要でした。",
      role:
        "ウェアラブル前処理パイプラインとモデル構築を行い、実験設計および学習・評価プロトコル策定を担当しました。",
      background:
        "入院患者の状態変化を早期に検知し、症状悪化と重症度変化を先行的に把握できる予測モデルが必要でした。",
      highlights: [
        "CNN-GRU ベースのマルチタスク学習構造を設計・実装",
        "ウィンドウ化/正規化など前処理パイプラインを構築し再現性を確保",
        "学習・評価のレポート自動化で反復効率を改善",
      ],
      tech: "Python, CNN-GRU, Multitask Learning, Time-series",
    },
  },
  "cohort-risk": {
    ko: {
      title: "코호트 기반 자살시도 위험 예측 (단·중·장기)",
      summary:
        "코호트 기반 임상 데이터를 활용해 예측 시점에 따라 위험도가 달라지는 자살시도 위험을 기간별로 정량화하고, 임상적으로 해석 가능한 형태로 제공할 모델이 필요했습니다.",
      role:
        "단기·중기·장기 예측을 위한 타깃 정의와 평가 설계를 주도하고, Logistic Regression, Cox, XGBoost 모델 비교 실험과 결과 해석 및 문서화를 담당했습니다.",
      background:
        "코호트 기반 임상 데이터를 활용해 예측 시점에 따라 위험도가 달라지는 자살시도 위험을 기간별로 정량화하고, 임상적으로 해석 가능한 형태로 제공할 모델이 필요했습니다.",
      highlights: [
        "단기·중기·장기 타깃 정의 및 평가 체계 수립",
        "Logistic Regression, Cox, XGBoost 비교 실험을 통한 성능 및 특성 영향 분석",
        "임상 해석 기준을 반영한 결과 정리와 재현 가능한 문서화",
      ],
      tech: "Python, Logistic Regression, Cox, XGBoost",
    },
    en: {
      title: "Cohort-based Suicide Attempt Risk Prediction (Short/Mid/Long-term)",
      summary:
        "We needed a model that quantifies suicide-attempt risk by horizon using cohort clinical data and presents results in a clinically interpretable form.",
      role:
        "Led target definition and evaluation design for short/mid/long-term horizons, and ran comparative experiments with Logistic Regression, Cox, and XGBoost with interpretation and documentation.",
      background:
        "We needed a model that quantifies suicide-attempt risk by horizon using cohort clinical data and presents results in a clinically interpretable form.",
      highlights: [
        "Defined short/mid/long-term targets and evaluation framework",
        "Compared Logistic Regression, Cox, and XGBoost to analyze performance and feature impact",
        "Documented results with clinical interpretation and reproducibility",
      ],
      tech: "Python, Logistic Regression, Cox, XGBoost",
    },
    zh: {
      title: "基于队列的自杀未遂风险预测（短/中/长期）",
      summary:
        "需要利用队列临床数据按预测时点量化自杀未遂风险，并以临床可解释形式提供结果。",
      role:
        "主导短/中/长期目标定义与评估设计，开展 Logistic Regression、Cox、XGBoost 的对比实验并进行结果解读与文档化。",
      background:
        "需要利用队列临床数据按预测时点量化自杀未遂风险，并以临床可解释形式提供结果。",
      highlights: [
        "建立短/中/长期目标定义与评估体系",
        "通过 Logistic Regression、Cox、XGBoost 比较实验分析性能与特征影响",
        "结合临床解读标准进行结果整理并形成可复现文档",
      ],
      tech: "Python, Logistic Regression, Cox, XGBoost",
    },
    ja: {
      title: "コホートベースの自殺企図リスク予測（短・中・長期）",
      summary:
        "コホート臨床データを用いて予測時点ごとの自殺企図リスクを定量化し、臨床的に解釈可能な形で提供するモデルが必要でした。",
      role:
        "短・中・長期のターゲット定義と評価設計を主導し、Logistic Regression/Cox/XGBoost の比較実験と結果解釈・文書化を担当しました。",
      background:
        "コホート臨床データを用いて予測時点ごとの自殺企図リスクを定量化し、臨床的に解釈可能な形で提供するモデルが必要でした。",
      highlights: [
        "短・中・長期ターゲット定義と評価体系の構築",
        "Logistic Regression/Cox/XGBoost 比較で性能と特徴影響を分析",
        "臨床解釈基準を反映した結果整理と再現可能な文書化",
      ],
      tech: "Python, Logistic Regression, Cox, XGBoost",
    },
  },
  "federated-optimization": {
    ko: {
      title: "FedOps Clustering Tuning",
      summary:
        "연합학습은 각 클라이언트가 데이터를 외부로 공유하지 않고 로컬 학습 결과인 모델 업데이트만 집계합니다. 그러나 Non-IID 환경에서는 단일 글로벌 집계와 고정 하이퍼파라미터로 인해 클라이언트별 학습 특성이 반영되지 않아 성능 저하가 발생할 수 있습니다. 따라서 클라이언트 특성에 따라 그룹을 나누고, 그룹 단위로 튜닝하는 운영 전략이 필요했습니다.",
      role:
        "Non-IID 환경의 성능 저하 문제를 해결하기 위해 클러스터링 기반 하이퍼파라미터 최적화 기법을 설계하고, 이를 연구실 Federated Learning 운영 프레임워크인 FedOps에 기능으로 통합했습니다. 구체적으로 클러스터링 입력 피처 정의, DBSCAN 설정과 노이즈 처리 기준 수립, 클러스터별 HPO 수행 흐름 구성, FedOps v1.2 업그레이드 반영 및 문서화를 담당했습니다.",
      background:
        "연합학습은 각 클라이언트가 데이터를 외부로 공유하지 않고 로컬 학습 결과인 모델 업데이트만 집계합니다. 그러나 Non-IID 환경에서는 단일 글로벌 집계와 고정 하이퍼파라미터로 인해 클라이언트별 학습 특성이 반영되지 않아 성능 저하가 발생할 수 있습니다. 따라서 클라이언트 특성에 따라 그룹을 나누고, 그룹 단위로 튜닝하는 운영 전략이 필요했습니다.",
      highlights: [
        "학습률, 배치 크기, 로컬 loss를 로그 스케일 피처로 구성해 DBSCAN 클러스터링 적용",
        "eps 0.2, min_samples 2 설정 기반 군집화와 노이즈 클라이언트 처리 기준 수립",
        "노이즈 클라이언트를 독립 클러스터로 승격해 튜닝과 집계에서 제외되지 않도록 설계",
        "클러스터별 Optuna Study ask tell 방식으로 하이퍼파라미터 최적화 수행",
        "FedAvg 기반 글로벌 집계에 주기적 클러스터링과 클러스터별 튜닝을 결합한 운영 플로우 구축",
        "FedOps v1.2 업그레이드에 신규 플로우를 반영하고, 재현 가능한 운영 절차로 문서화",
      ],
      tech: "FedOps v1.2, Federated Learning, DBSCAN, Optuna, FedAvg, Python",
      slideNote:
        "Federated Learning : 데이터를 중앙 서버로 모으지 않고, 각 클라이언트가 로컬 데이터로 모델을 학습한 뒤 학습 결과인 파라미터 업데이트 또는 그래디언트만 서버에 공유하여 집계하는 분산 학습 방식입니다.\n\nFedOps : 개인정보를 보호하면서 분산된 데이터로 AI 모델을 학습시키는 Federated Learning의 전 과정을 체계적으로 관리하고 자동화하며 운영하기 위한 프레임워크이자 플랫폼입니다. 석사 과정 동안 연구실에서 운영하던 홈페이지 기반 플랫폼으로, 연합 학습 환경에 MLOps 개념을 적용해 데이터 비중앙화, 비동질적 데이터 분포, 이기종 컴퓨팅 환경에서 발생하는 복잡성을 줄이고 효율적인 모델 개발과 배포를 지원합니다.\n\nNon-IID 환경 조치가 필요한 이유: 클라이언트별 데이터 분포가 달라 단일 집계/고정 하이퍼파라미터로는 성능 편차가 커지기 때문에, 그룹별 튜닝과 운영 전략이 필요합니다.",
      slideLinks: [
        { label: "fedops homepage", url: "https://ccl.gachon.ac.kr/fedops" },
        { label: "fedops Clustering document", url: "https://gachon-cclab.github.io/docs/FedOps-Clustering-Tuning" },
        { label: "깃허브", url: "https://github.com/gachon-CCLab/FedOps" },
      ],
    },
    en: {
      title: "FedOps Clustering Tuning",
      summary:
        "In federated learning, clients do not share raw data—only local model updates are aggregated. In Non-IID settings, a single global aggregation with fixed hyperparameters can underperform because client-specific characteristics are ignored. We needed a group-wise tuning strategy.",
      role:
        "Designed a clustering-based hyperparameter optimization approach for Non-IID performance drop and integrated it into the lab's Federated Learning operations framework, FedOps. Defined clustering features, DBSCAN settings and noise handling, cluster-level HPO flow, and documented the FedOps v1.2 upgrade.",
      background:
        "In federated learning, clients do not share raw data—only local model updates are aggregated. In Non-IID settings, a single global aggregation with fixed hyperparameters can underperform because client-specific characteristics are ignored. We needed a group-wise tuning strategy.",
      highlights: [
        "Applied DBSCAN clustering using log-scale features of learning rate, batch size, and local loss",
        "Set eps 0.2 / min_samples 2 and established noise-client handling criteria",
        "Promoted noise clients to independent clusters to keep them in tuning and aggregation",
        "Performed cluster-wise HPO with Optuna Study ask-tell",
        "Built an ops flow combining periodic clustering, cluster-wise tuning, and FedAvg aggregation",
        "Integrated the new flow into FedOps v1.2 and documented reproducible procedures",
      ],
      tech: "FedOps v1.2, Federated Learning, DBSCAN, Optuna, FedAvg, Python",
      slideNote:
        "Federated Learning: a distributed learning paradigm where clients train locally and only share parameter updates or gradients to a server for aggregation.\n\nFedOps: a framework and platform that systematizes, automates, and operates the full lifecycle of federated learning while protecting privacy. It applied MLOps concepts to the lab's homepage-based platform to reduce complexity from decentralized data, non-IID distributions, and heterogeneous compute, enabling efficient model development and deployment.\n\nWhy Non-IID measures matter: client data distributions differ, so a single aggregation with fixed hyperparameters can lead to large performance gaps; group-wise tuning and ops strategies are needed.",
      slideLinks: [
        { label: "FedOps homepage", url: "https://ccl.gachon.ac.kr/fedops" },
        { label: "FedOps clustering document", url: "https://gachon-cclab.github.io/docs/FedOps-Clustering-Tuning" },
        { label: "GitHub", url: "https://github.com/gachon-CCLab/FedOps" },
      ],
    },
    zh: {
      title: "FedOps 聚类调优",
      summary:
        "在联邦学习中，客户端不共享原始数据，只汇聚本地模型更新。在 Non-IID 场景下，单一全局聚合与固定超参数会忽略客户端差异，导致性能下降，因此需要按群组调参的策略。",
      role:
        "设计基于聚类的超参数优化方法以解决 Non-IID 性能下降，并将其集成到实验室的联邦学习运维框架 FedOps 中。负责聚类特征定义、DBSCAN 设置与噪声处理标准、集群级 HPO 流程以及 FedOps v1.2 升级与文档化。",
      background:
        "在联邦学习中，客户端不共享原始数据，只汇聚本地模型更新。在 Non-IID 场景下，单一全局聚合与固定超参数会忽略客户端差异，导致性能下降，因此需要按群组调参的策略。",
      highlights: [
        "使用学习率、批大小、局部 loss 的对数尺度特征进行 DBSCAN 聚类",
        "设置 eps 0.2 / min_samples 2 并建立噪声客户端处理标准",
        "将噪声客户端提升为独立簇，避免在调参与聚合中被排除",
        "采用 Optuna Study ask-tell 进行簇级超参数优化",
        "构建周期性聚类 + 簇级调参 + FedAvg 聚合的运维流程",
        "将新流程纳入 FedOps v1.2 并文档化为可复现流程",
      ],
      tech: "FedOps v1.2, Federated Learning, DBSCAN, Optuna, FedAvg, Python",
      slideNote:
        "Federated Learning：一种分布式学习方式，客户端在本地训练，仅共享参数更新或梯度到服务器聚合。\n\nFedOps：在保护隐私前提下，对联邦学习全流程进行系统化管理、自动化与运营的框架与平台。它将 MLOps 概念应用于实验室的主页平台，降低数据去中心化、非 IID 分布和异构计算带来的复杂性，支持高效开发与部署。\n\nNon-IID 需要措施的原因：客户端数据分布差异大，单一聚合与固定超参数会导致性能差距扩大，需要分组调参与运维策略。",
      slideLinks: [
        { label: "FedOps 主页", url: "https://ccl.gachon.ac.kr/fedops" },
        { label: "FedOps 聚类文档", url: "https://gachon-cclab.github.io/docs/FedOps-Clustering-Tuning" },
        { label: "GitHub", url: "https://github.com/gachon-CCLab/FedOps" },
      ],
    },
    ja: {
      title: "FedOps クラスタリング・チューニング",
      summary:
        "連合学習では各クライアントが生データを共有せず、ローカル更新のみを集約します。Non-IID 環境では単一集約と固定ハイパーパラメータではクライアント差異が反映されず性能低下が起きるため、グループ単位のチューニングが必要でした。",
      role:
        "Non-IID による性能低下を解決するクラスタリングベースの HPO を設計し、研究室の連合学習運用フレームワーク FedOps に統合しました。クラスタ入力特徴定義、DBSCAN 設定とノイズ処理、クラスタ別 HPO フロー、FedOps v1.2 反映と文書化を担当しました。",
      background:
        "連合学習では各クライアントが生データを共有せず、ローカル更新のみを集約します。Non-IID 環境では単一集約と固定ハイパーパラメータではクライアント差異が反映されず性能低下が起きるため、グループ単位のチューニングが必要でした。",
      highlights: [
        "学習率・バッチサイズ・ローカル loss を対数スケール特徴として DBSCAN を適用",
        "eps 0.2 / min_samples 2 を設定しノイズクライアント処理基準を策定",
        "ノイズクライアントを独立クラスタに昇格し、調整・集約から除外されないよう設計",
        "Optuna Study ask-tell によるクラスタ別 HPO を実施",
        "定期クラスタリング + クラスタ別チューニング + FedAvg 集約の運用フロー構築",
        "FedOps v1.2 に新フローを反映し再現可能な運用として文書化",
      ],
      tech: "FedOps v1.2, Federated Learning, DBSCAN, Optuna, FedAvg, Python",
      slideNote:
        "Federated Learning：各クライアントがローカルで学習し、パラメータ更新や勾配のみをサーバに共有して集約する分散学習方式。\n\nFedOps：プライバシーを保護しつつ連合学習の全工程を体系的に管理・自動化・運用するためのフレームワーク/プラットフォーム。研究室のホームページ基盤に MLOps を適用し、データ非中央化・非 IID 分布・異種計算環境の複雑性を低減して効率的な開発と配布を支援。\n\nNon-IID 対策が必要な理由：クライアントのデータ分布が異なるため、単一集約と固定ハイパーパラメータでは性能差が大きくなり、グループ別チューニングが必要です。",
      slideLinks: [
        { label: "FedOps ホームページ", url: "https://ccl.gachon.ac.kr/fedops" },
        { label: "FedOps クラスタリング文書", url: "https://gachon-cclab.github.io/docs/FedOps-Clustering-Tuning" },
        { label: "GitHub", url: "https://github.com/gachon-CCLab/FedOps" },
      ],
    },
  },
  "fastapi-service": {
    ko: {
      title: "FastAPI 기반 실시간 채팅/서비스 프로토타입",
      summary:
        "실시간 통신 구조와 상태 관리 기반을 구성해 서비스 형태로 연결했습니다.",
      role: "백엔드 구조 설계 및 WebSocket/REST 구현을 담당했습니다.",
      background:
        "모델 결과를 실제 서비스로 연결하기 위한 실시간 통신 구조가 필요했습니다.",
      highlights: [
        "WebSocket/REST 혼합 구조 설계",
        "대화 로그/세션 상태 관리",
        "운영 관점(에러 처리, 입력 검증, 관측성) 기준 정리",
      ],
      tech: "FastAPI, WebSocket, REST API",
    },
    en: {
      title: "FastAPI Real-time Chat/Service Prototype",
      summary:
        "Built a real-time communication and state management base to connect to a service.",
      role: "Designed the backend structure and implemented WebSocket/REST.",
      background:
        "A real-time communication structure was needed to connect model outputs to a service.",
      highlights: [
        "Designed a mixed WebSocket/REST architecture",
        "Managed conversation logs and session state",
        "Defined operational criteria (error handling, input validation, observability)",
      ],
      tech: "FastAPI, WebSocket, REST API",
    },
    zh: {
      title: "基于 FastAPI 的实时聊天/服务原型",
      summary:
        "构建实时通信结构与状态管理基础，连接到服务形态。",
      role: "负责后端结构设计与 WebSocket/REST 实现。",
      background:
        "需要实时通信结构将模型结果接入服务。",
      highlights: [
        "设计 WebSocket/REST 混合架构",
        "对话日志与会话状态管理",
        "定义运营视角标准（错误处理、输入校验、可观测性）",
      ],
      tech: "FastAPI, WebSocket, REST API",
    },
    ja: {
      title: "FastAPI ベースのリアルタイムチャット/サービスプロトタイプ",
      summary:
        "リアルタイム通信と状態管理の基盤を構築しサービスに接続しました。",
      role: "バックエンド構成設計と WebSocket/REST 実装を担当しました。",
      background:
        "モデル結果を実サービスに接続するためのリアルタイム通信が必要でした。",
      highlights: [
        "WebSocket/REST 混合アーキテクチャを設計",
        "会話ログ/セッション状態管理",
        "運用観点（エラー処理、入力検証、可観測性）の基準整理",
      ],
      tech: "FastAPI, WebSocket, REST API",
    },
  },
  "iot-smart-home": {
    ko: {
      title: "자원절약 및 보안강화를 위한 자동화 IoT 스마트홈 개발",
      summary:
        "컴퓨터공학과 졸업작품으로 IoT 기반 스마트홈 시스템을 기획·구현했습니다.",
      role:
        "팀장으로 프로젝트 발표를 주도했으며, Python을 활용한 라즈베리파이와 데이터베이스 연동을 담당했습니다. 또한 웹 기능 구현에도 참여했습니다.",
      background:
        "컴퓨터공학과 졸업작품으로 IoT 기반 스마트홈 시스템을 기획·구현했습니다. 딥러닝을 공부하며 데이터가 실제 환경에서 어떻게 생성되고 수집되는지에 대한 궁금증이 있었고, 이를 직접 경험하기 위해 센서 데이터를 수집해 앱과 서버로 전달하는 전체 흐름을 설계했습니다. 실제 주거 환경에 설치하는 수준의 구현은 제약이 있어 모형 환경으로 대체했으며, 외출 중에도 모바일 앱으로 집 상태를 확인하고 가전 및 설비를 제어해 보안 강화와 자원 절약을 동시에 달성하는 것을 목표로 했습니다.",
      highlights: [
        "라즈베리파이 3B+와 조도, 온습도, 초음파 센서 및 LED 연동",
        "관리자 웹페이지를 통한 회원 및 사용자 관리 기능 구현",
        "모바일 앱에서 조명, 윈도우, 경보음 제어 및 상태 확인 기능 구현",
        "스마트 전등, 도어, 에어컨 제어와 침입자 감지 및 경보 기능 구현",
      ],
      tech:
        "Java, Python, Node.js, Express, EJS, Android Java, MySQL, REST API, Git, Raspberry Pi 3B+",
    },
    en: {
      title: "Automated IoT Smart Home for Resource Saving & Security",
      summary:
        "Planned and implemented an IoT-based smart home system as a computer engineering capstone.",
      role:
        "Led the project presentation as team lead and handled Raspberry Pi–database integration in Python. Also contributed to web features.",
      background:
        "Planned and implemented an IoT-based smart home system as a capstone. While studying deep learning, I wanted to experience how data is generated and collected in real environments, so I designed the full flow from sensor collection to app/server delivery. Because a real home deployment was constrained, we built a mock environment. The goal was to check home status remotely and control appliances to improve security and save resources.",
      highlights: [
        "Integrated Raspberry Pi 3B+ with illumination, temperature/humidity, ultrasonic sensors, and LED",
        "Implemented member/user management via admin web page",
        "Implemented lighting/window/alarm control and status checks in the mobile app",
        "Implemented smart lighting, door, air conditioner control, and intruder detection/alarm",
      ],
      tech:
        "Java, Python, Node.js, Express, EJS, Android Java, MySQL, REST API, Git, Raspberry Pi 3B+",
    },
    zh: {
      title: "面向节能与安防的自动化 IoT 智能家居开发",
      summary:
        "作为计算机工程系毕业作品，规划并实现了 IoT 智能家居系统。",
      role:
        "担任组长主导项目 발표，负责 Python 的树莓派与数据库联动，并参与 Web 功能实现。",
      background:
        "作为毕业作品规划并实现 IoT 智能家居系统。学习深度学习时，我希望亲自体验真实环境中的数据生成与采集，于是设计了从传感器采集到 App/服务器传递的完整流程。受限于真实住宅部署条件，采用模型环境替代，目标是通过移动端远程查看家中状态并控制家电与设施，以同时提升安防与节能。",
      highlights: [
        "树莓派 3B+ 联动光照、温湿度、超声波传感器与 LED",
        "通过管理员网页实现会员与用户管理功能",
        "在移动端实现照明/窗户/警报控制与状态查看",
        "实现智能灯、门、空调控制与入侵检测报警",
      ],
      tech:
        "Java, Python, Node.js, Express, EJS, Android Java, MySQL, REST API, Git, Raspberry Pi 3B+",
    },
    ja: {
      title: "省エネと安全性を高める自動化 IoT スマートホーム開発",
      summary:
        "コンピュータ工学科の卒業制作として IoT スマートホームを企画・実装しました。",
      role:
        "チーム長として発表を主導し、Python による Raspberry Pi と DB 連携を担当。Web 機能にも参加しました。",
      background:
        "卒業制作として IoT スマートホームを企画・実装。深層学習を学ぶ中で実環境のデータ生成・収集を体験したく、センサ収集からアプリ/サーバ連携までの全フローを設計しました。実住宅への設置は制約があるため模型環境で実装し、外出時でもアプリで状態確認と機器制御を行い、防犯と省資源の両立を目指しました。",
      highlights: [
        "Raspberry Pi 3B+ と照度/温湿度/超音波センサーおよび LED を連携",
        "管理者 Web で会員・ユーザー管理機能を実装",
        "モバイルアプリで照明/窓/警報制御と状態確認を実装",
        "スマート照明・ドア・エアコン制御と侵入検知・警報機能を実装",
      ],
      tech:
        "Java, Python, Node.js, Express, EJS, Android Java, MySQL, REST API, Git, Raspberry Pi 3B+",
    },
  },
};

function getProjectData(projectId) {
  const base = projectModalData[projectId];
  if (!base) return null;
  const localeData = (PROJECT_I18N[projectId] || {})[activeLang] || (PROJECT_I18N[projectId] || {}).ko || {};
  return { ...base, ...localeData };
}

function renderProjectSlide() {
  if (!activeProjectId || !projectModalData[activeProjectId]) return;
  const slides = projectModalData[activeProjectId].slides;
  const slide = slides[activeSlideIndex];
  if (!slide) return;
  projectSlideImage.src = slide.img;
  projectSlideImage.alt = slide.alt;
  projectSlideIndicator.textContent = `${activeSlideIndex + 1} / ${slides.length}`;
}

function openProjectModal(projectId) {
  const data = getProjectData(projectId);
  if (!data || !projectModal) return;
  activeProjectId = projectId;
  activeSlideIndex = 0;
  if (projectModalTitle) projectModalTitle.textContent = data.title;
  if (projectSummary) projectSummary.textContent = data.summary || "";
  if (projectRole) projectRole.textContent = data.role || "";
  if (projectBackground) projectBackground.textContent = data.background || "";
  if (projectHighlights) {
    projectHighlights.innerHTML = "";
    (data.highlights || []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      projectHighlights.appendChild(li);
    });
  }
  if (projectTech) projectTech.textContent = data.tech || "";
  if (projectSlideNote) {
    if (data.slideNote) {
      projectSlideNote.textContent = data.slideNote;
      projectSlideNote.hidden = false;
    } else {
      projectSlideNote.hidden = true;
    }
  }
  if (projectSlideLink) {
    const links = Array.isArray(data.slideLinks) ? data.slideLinks : [];
    projectSlideLink.innerHTML = "";
    links.forEach(({ label, url }) => {
      const anchor = document.createElement("a");
      anchor.className = "link muted";
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.textContent = label ? `${label} : ${url}` : url;
      projectSlideLink.appendChild(anchor);
    });
    projectSlideLink.hidden = links.length === 0;
  }
  if (projectPaperSection && projectPaperLink) {
    if (data.paperLink) {
      projectPaperLink.href = data.paperLink;
      projectPaperLink.textContent = getI18nValue("project_paper_link") || "Paper link";
      projectPaperSection.hidden = false;
    } else {
      projectPaperSection.hidden = true;
    }
  }
  if (projectRepoSection && projectRepoLink) {
    if (data.repoLink) {
      projectRepoLink.href = data.repoLink;
      projectRepoLink.textContent = data.repoLink || getI18nValue("project_repo_link");
      projectRepoSection.hidden = false;
    } else {
      projectRepoSection.hidden = true;
    }
  }
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  renderProjectSlide();
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  activeProjectId = null;
}

if (projectCards.length) {
  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      projectCards.forEach(c => c.classList.remove("is-active"));
      card.classList.add("is-active");
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

      const modalId = card.dataset.modalId;
      if (modalId && projectModalData[modalId]) {
        openProjectModal(modalId);
      }
    });
  });
}

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) closeProjectModal();
  });
}

if (projectSlidePrev && projectSlideNext) {
  projectSlidePrev.addEventListener("click", () => {
    if (!activeProjectId) return;
    const total = projectModalData[activeProjectId].slides.length;
    activeSlideIndex = (activeSlideIndex - 1 + total) % total;
    renderProjectSlide();
  });
  projectSlideNext.addEventListener("click", () => {
    if (!activeProjectId) return;
    const total = projectModalData[activeProjectId].slides.length;
    activeSlideIndex = (activeSlideIndex + 1) % total;
    renderProjectSlide();
  });
}

if (projectViewport && projectPrev && projectNext) {
  const getProjectStep = () => {
    const firstCard = projectCards[0];
    if (!firstCard) return projectViewport.clientWidth;
    const gap = parseFloat(getComputedStyle(projectTrack).gap) || 16;
    return firstCard.offsetWidth + gap;
  };

  const scrollProjectsBy = (dir, behavior = "smooth") => {
    const step = getProjectStep();
    if (!step) return;
    const maxIndex = Math.max(0, Math.round((projectViewport.scrollWidth - projectViewport.clientWidth) / step));
    const currentIndex = Math.round(projectViewport.scrollLeft / step);
    let nextIndex = currentIndex + dir;
    if (nextIndex < 0) nextIndex = maxIndex;
    if (nextIndex > maxIndex) nextIndex = 0;
    projectViewport.scrollTo({ left: nextIndex * step, behavior });
  };

  projectPrev.addEventListener("click", () => scrollProjectsBy(-1));
  projectNext.addEventListener("click", () => scrollProjectsBy(1));
}

function updateProjectCardWidth() {
  if (!projectViewport || !projectTrack) return;
  const styles = getComputedStyle(projectTrack);
  const gap = parseFloat(styles.getPropertyValue("--slider-gap")) || 16;
  const columns = window.matchMedia("(max-width: 640px)").matches
    ? 1
    : (window.matchMedia("(max-width: 980px)").matches ? 2 : 3);
  const width = projectViewport.clientWidth;
  const cardWidth = Math.max(220, Math.floor((width - gap * (columns - 1)) / columns));
  projectTrack.style.setProperty("--project-card-width", `${cardWidth}px`);
}

if (projectViewport) {
  updateProjectCardWidth();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    let resumeTimer = null;
    let autoTimer = null;
    const autoInterval = 3200;

    const pauseAutoScroll = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };
    const resumeAutoScroll = () => {
      if (autoTimer) return;
      autoTimer = setInterval(() => {
        const firstCard = projectCards[0];
        const gap = parseFloat(getComputedStyle(projectTrack).gap) || 16;
        const step = firstCard ? firstCard.offsetWidth + gap : projectViewport.clientWidth;
        const maxIndex = Math.max(0, Math.round((projectViewport.scrollWidth - projectViewport.clientWidth) / step));
        const currentIndex = Math.round(projectViewport.scrollLeft / step);
        const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        projectViewport.scrollTo({ left: nextIndex * step, behavior: "smooth" });
      }, autoInterval);
    };

    projectViewport.addEventListener("mouseenter", pauseAutoScroll);
    projectViewport.addEventListener("mouseleave", resumeAutoScroll);
    projectViewport.addEventListener("pointerdown", pauseAutoScroll);
    projectViewport.addEventListener("pointerup", resumeAutoScroll);
    projectViewport.addEventListener("touchstart", pauseAutoScroll, { passive: true });
    projectViewport.addEventListener("touchend", resumeAutoScroll);
    projectViewport.addEventListener("focusin", pauseAutoScroll);
    projectViewport.addEventListener("focusout", resumeAutoScroll);
    projectViewport.addEventListener("wheel", () => {
      pauseAutoScroll();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(resumeAutoScroll, 1200);
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pauseAutoScroll();
      } else {
        resumeAutoScroll();
      }
    });

    resumeAutoScroll();
  }
}

$$('.langopt').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const lang = btn.dataset.lang || 'ko';
    applyI18n(lang);
    openLangMenu(false);
  });
});

const openQA = $("#open-qa");
const chatLog = $("#qa-chat-log");
const chatForm = $("#qa-chat-form");
const chatInput = $("#qa-chat-input");
const chatChips = $$(".chatChip");
const galleryModal = $("#gallery-modal");
const galleryModalImage = $("#gallery-modal-image");
const galleryModalClose = $("#gallery-modal-close");
const galleryModalPrev = $("#gallery-modal-prev");
const galleryModalNext = $("#gallery-modal-next");
const galleryThumbs = $$(".galleryThumb");
const chatState = { messages: [] };
const galleryState = { items: [], index: -1 };
const STATIC_QA = document.documentElement.dataset.staticQa === "true";

if (STATIC_QA) {
  if (chatInput) {
    chatInput.setAttribute("disabled", "true");
    chatInput.setAttribute("aria-disabled", "true");
  }
  if (chatForm) {
    chatForm.setAttribute("aria-disabled", "true");
    const submitBtn = chatForm.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.setAttribute("disabled", "true");
  }
  if (chatChips.length) {
    chatChips.forEach((chip) => chip.setAttribute("disabled", "true"));
  }
}

function appendChatMessage(text, role) {
  if (!chatLog) return;
  const msg = document.createElement("div");
  msg.className = `chatMessage ${role}`;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
  return msg;
}

async function sendChatMessage(rawText) {
  const text = (rawText || "").trim();
  if (!text) return;
  appendChatMessage(text, "user");
  chatState.messages.push({ role: "user", content: text });

  const pending = appendChatMessage(getI18nValue("qa_bot_loading"), "bot");
  if (!pending) return;

  if (STATIC_QA) {
    const fallback = getI18nValue("qa_bot_fallback");
    pending.textContent = fallback;
    chatState.messages.push({ role: "assistant", content: fallback });
    return;
  }

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mode: "HR",
        messages: chatState.messages,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error((data && data.error) || "Chat request failed.");
    }

    const answer = (data && data.answer) || getI18nValue("qa_bot_fallback");
    pending.textContent = answer;
    chatState.messages.push({ role: "assistant", content: answer });
  } catch (err) {
    const fallback = getI18nValue("qa_bot_fallback");
    pending.textContent = err && err.message ? `${fallback} (${err.message})` : fallback;
  }
}

function getGalleryItems() {
  if (!galleryThumbs.length) return [];
  return galleryThumbs.map((thumb) => ({
    src: thumb.dataset.full || thumb.src,
    alt: thumb.alt || "Gallery image",
  }));
}

function showGalleryAt(index) {
  if (!galleryModal || !galleryModalImage) return;
  if (!galleryState.items.length) galleryState.items = getGalleryItems();
  if (!galleryState.items.length) return;

  const count = galleryState.items.length;
  const safeIndex = ((index % count) + count) % count;
  const item = galleryState.items[safeIndex];

  galleryState.index = safeIndex;
  galleryModalImage.src = item.src;
  galleryModalImage.alt = item.alt || "Gallery image";
  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");
}

function openGalleryModal(src, alt) {
  if (!galleryModal || !galleryModalImage) return;
  galleryState.items = getGalleryItems();
  const idx = galleryState.items.findIndex((item) => item.src === src);
  galleryState.index = idx >= 0 ? idx : 0;
  showGalleryAt(galleryState.index);
}

function shiftGallery(delta) {
  if (!galleryState.items.length) return;
  showGalleryAt(galleryState.index + delta);
}

function closeGalleryModal() {
  if (!galleryModal) return;
  galleryModal.classList.remove("open");
  galleryModal.setAttribute("aria-hidden", "true");
}

if (openQA && openQA.tagName === "BUTTON") {
  openQA.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/qa.html";
  });
}

if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!chatInput) return;
    sendChatMessage(chatInput.value);
    chatInput.value = "";
  });
}

if (chatChips.length) {
  chatChips.forEach(chip => {
    chip.addEventListener("click", () => {
      sendChatMessage(chip.textContent || "");
    });
  });
}

if (galleryThumbs.length) {
  galleryState.items = getGalleryItems();
  galleryThumbs.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => {
      const src = thumb.dataset.full || thumb.src;
      galleryState.index = idx;
      openGalleryModal(src, thumb.alt);
    });
  });
}

if (galleryModalClose) {
  galleryModalClose.addEventListener("click", closeGalleryModal);
}

if (galleryModalPrev) {
  galleryModalPrev.addEventListener("click", () => shiftGallery(-1));
}

if (galleryModalNext) {
  galleryModalNext.addEventListener("click", () => shiftGallery(1));
}

if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });
}

$$(".paperDownload").forEach(link => {
  link.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function resetInitialScroll() {
  if (location.hash) {
    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      scrollToId(id);
      return;
    }
    history.replaceState(null, "", location.pathname + location.search);
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 120);
}

window.addEventListener("load", () => {
  resetInitialScroll();
  if (chatInput && location.pathname.endsWith("/qa.html")) chatInput.focus();
  updateProjectCardWidth();
});

window.addEventListener("pageshow", () => {
  resetInitialScroll();
});

window.addEventListener("resize", () => {
  updateProjectCardWidth();
});
