import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Paperclip,
  Search,
  Plus,
  Award,
  BookOpen,
  User,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Send,
  CheckCircle2,
  Sparkles,
  Download,
  Building2,
  Filter,
  GraduationCap,
  TrendingUp,
  Bell,
  FileText,
  X,
  CornerDownRight,
  Shield,
  Zap,
  Briefcase
} from 'lucide-react';

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================

export interface UserProfile {
  id: string;
  name: string;
  jobGroup: '제조직군' | '비제조직군';
  avatarBg: string;
  avatarText: string;
  currentLevel: 'G1' | 'G2' | 'G3';
  neededForG2: number;
  neededForG3: number;
  badgeMessage: string;
  acquiredBadges: string[];
}

export interface Comment {
  id: string;
  authorName: string;
  authorJobGroup: string;
  authorAvatarBg: string;
  content: string;
  createdAt: string;
  likes: number;
  likedByMe?: boolean;
  parentId?: string | null; // For nested replies
  replies?: Comment[];
}

export interface PostItem {
  id: string;
  type: 'admin' | 'user';
  category: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatarBg: string;
  createdAt: string;
  views: number;
  likes: number;
  likedByMe?: boolean;
  attachments?: { name: string; size: string; type: 'csv' | 'pptx' | 'pdf' | 'xlsx' }[];
  comments: Comment[];
  badgeEarned?: string;
  financialImpact?: string;
  isImportant?: boolean;
}

// 5 Preset Users
const USERS: UserProfile[] = [
  {
    id: 'user_son',
    name: '손흥민',
    jobGroup: '제조직군',
    avatarBg: 'bg-emerald-600',
    avatarText: 'text-white',
    currentLevel: 'G1',
    neededForG2: 2,
    neededForG3: 8,
    badgeMessage: 'G2를 위해 2개의 배지, G3를 위해 8개의 배지가 추가로 필요합니다.',
    acquiredBadges: ['탐색적데이터분석 그린배지', '파이썬기초 인증']
  },
  {
    id: 'user_lee',
    name: '이영표',
    jobGroup: '제조직군',
    avatarBg: 'bg-blue-600',
    avatarText: 'text-white',
    currentLevel: 'G2',
    neededForG2: 0,
    neededForG3: 1,
    badgeMessage: 'G2를 위해 0개의 배지, G3를 위해 1개의 배지가 추가로 필요합니다.',
    acquiredBadges: ['G2 역량인증', '머신러닝 실버크라운', '미니탭실습 인증', '빅데이터기사']
  },
  {
    id: 'user_park_js',
    name: '박지성',
    jobGroup: '제조직군',
    avatarBg: 'bg-amber-600',
    avatarText: 'text-white',
    currentLevel: 'G1',
    neededForG2: 2,
    neededForG3: 8,
    badgeMessage: 'G2를 위해 2개의 배지, G3를 위해 8개의 배지가 추가로 필요합니다.',
    acquiredBadges: ['기초통계 그린배지', 'GDX입문 수료']
  },
  {
    id: 'user_park_ch',
    name: '박찬호',
    jobGroup: '비제조직군',
    avatarBg: 'bg-indigo-600',
    avatarText: 'text-white',
    currentLevel: 'G3',
    neededForG2: 0,
    neededForG3: 0,
    badgeMessage: 'G2를 위해 0개의 배지, G3를 위해 0개의 배지가 추가로 필요합니다.',
    acquiredBadges: ['G3 마스터배지', 'AI모델링 골드크라운', '바이브코딩 사내강사', 'DX혁신 리더']
  },
  {
    id: 'user_ryu',
    name: '류현진',
    jobGroup: '비제조직군',
    avatarBg: 'bg-purple-600',
    avatarText: 'text-white',
    currentLevel: 'G3',
    neededForG2: 0,
    neededForG3: 0,
    badgeMessage: 'G2를 위해 0개의 배지, G3를 위해 0개의 배지가 추가로 필요합니다.',
    acquiredBadges: ['G3 마스터배지', '데이터기획 전문가', 'LLM프롬프트 마스터', '비즈니스DX 특급']
  }
];

// Initial Admin Posts
const INITIAL_ADMIN_POSTS: PostItem[] = [
  {
    id: 'admin_1',
    type: 'admin',
    category: '과제등록',
    title: '아라미드생산2팀에서 새로운 GDX 본부과제를 등록하였습니다.',
    content: '아라미드생산2팀에서 방적 공정의 인장강도 예측 및 열처리 최적화를 위한 GDX 본부과제를 새롭게 등록하였습니다. 프로젝트의 성공적인 추진과 데이터 기반 혁신을 위해 팀원분들께 많은 관심과 응원 부탁드립니다!',
    authorName: 'GDX 사무국',
    authorRole: '시스템 관리자',
    authorAvatarBg: 'bg-rose-600',
    createdAt: '2026-08-09 10:15',
    views: 342,
    likes: 28,
    isImportant: true,
    comments: [
      {
        id: 'c_adm_1_1',
        authorName: '손흥민',
        authorJobGroup: '제조직군',
        authorAvatarBg: 'bg-emerald-600',
        content: '아라미드2팀 화이팅입니다! 공정 데이터 관련해서 도움이 필요하시면 언제든 지원하겠습니다.',
        createdAt: '2026-08-09 10:30',
        likes: 5
      },
      {
        id: 'c_adm_1_2',
        authorName: '이영표',
        authorJobGroup: '제조직군',
        authorAvatarBg: 'bg-blue-600',
        content: 'G2 실무 과제모델로도 아주 훌륭한 사례가 될 것 같네요. 성과가 기대됩니다!',
        createdAt: '2026-08-09 11:05',
        likes: 3
      }
    ]
  },
  {
    id: 'admin_2',
    type: 'admin',
    category: '과제완료',
    title: '코오드생산팀에서 GDX 본부과제를 완료하였습니다. 재무성과가 무려 2.1억원 이라고 하네요.',
    content: '축하합니다! 코오드생산팀에서 센서 데이터 이상탐지 및 방직속도 자동 제어 AI 모델 구축 과제를 성공적으로 마쳤습니다. 검증된 재무성과는 무려 연간 2.1억원에 달합니다. 팀원 여러분의 노고에 진심으로 감사드립니다.',
    authorName: 'GDX 사무국',
    authorRole: '시스템 관리자',
    authorAvatarBg: 'bg-rose-600',
    createdAt: '2026-08-08 16:40',
    views: 512,
    likes: 64,
    financialImpact: '2.1억원',
    comments: [
      {
        id: 'c_adm_2_1',
        authorName: '박찬호',
        authorJobGroup: '비제조직군',
        authorAvatarBg: 'bg-indigo-600',
        content: '대단한 성과입니다! 비제조직군에서도 이런 정량적 성과 창출 사례를 벤치마킹하고 싶습니다.',
        createdAt: '2026-08-08 17:00',
        likes: 8
      }
    ]
  },
  {
    id: 'admin_3',
    type: 'admin',
    category: '앱배포',
    title: 'GDX 수강신청 앱이 새롭게 배포 되었습니다. 이제 보다 쉽게 수강신청 하세요.',
    content: '사내 GDX 교육 수강신청 모바일/웹 지원 앱이 정식 출시되었습니다. 개인별 배지 획득 현황과 승진 필수 조건을 실시간 연동하여 맞춤형 추천 교육을 바로 신청할 수 있습니다.',
    authorName: 'IT혁신팀',
    authorRole: '시스템 관리자',
    authorAvatarBg: 'bg-slate-700',
    createdAt: '2026-08-07 14:00',
    views: 420,
    likes: 39,
    comments: []
  },
  {
    id: 'admin_4',
    type: 'admin',
    category: '교육개설',
    title: 'GDX 미니탭실습과정이 오픈되었습니다. 이론과 실무를 겸비한 엄유범 강사님의 강의를 맛보세요.',
    content: '제조 현장의 품질 통계 분석 필수 도구인 Minitab 실습 과정이 오픈되었습니다. 풍부한 산업 실무 경력의 엄유범 강사님께서 수율 분석부터 ANOVA, 공정능력분석까지 차근차근 안내합니다.',
    authorName: 'AX교육센터',
    authorRole: '교육 담당자',
    authorAvatarBg: 'bg-amber-700',
    createdAt: '2026-08-06 09:30',
    views: 290,
    likes: 22,
    comments: [
      {
        id: 'c_adm_4_1',
        authorName: '박지성',
        authorJobGroup: '제조직군',
        authorAvatarBg: 'bg-amber-600',
        content: 'G2 배지 획득에 Minitab 실습 과정이 필수인데, 드디어 개설되었네요! 바로 신청했습니다.',
        createdAt: '2026-08-06 10:12',
        likes: 4
      }
    ]
  },
  {
    id: 'admin_5',
    type: 'admin',
    category: '교육개설',
    title: '바이브코딩 오프라인 과정이 새롭게 개설 되었습니다. 이젠 실무에 바로 쓸 수 있는 실습과정으로 배워보세요.',
    content: 'AI 어시스턴트를 활용하여 코드 한 줄 직접 치지 않고도 업무 자동화 프로그램과 대시보드를 구축하는 "바이브 코딩(Vibe Coding)" 오프라인 정규 과정이 신설되었습니다.',
    authorName: 'AX교육센터',
    authorRole: '교육 담당자',
    authorAvatarBg: 'bg-amber-700',
    createdAt: '2026-08-05 11:20',
    views: 610,
    likes: 53,
    comments: [
      {
        id: 'c_adm_5_1',
        authorName: '류현진',
        authorJobGroup: '비제조직군',
        authorAvatarBg: 'bg-purple-600',
        content: '비제조 직군 업무 자동화에 정말 강력 추천합니다. 꼭 수강해보세요!',
        createdAt: '2026-08-05 13:00',
        likes: 6
      }
    ]
  },
  {
    id: 'admin_6',
    type: 'admin',
    category: '교육안내',
    title: '통계학의 이해 과정이 폐강 되었습니다. 통계학의 이해 과정은 기술통계와 추론통계로 분할되어 실습형 교육으로 재탄생 할 예정입니다.',
    content: '기존 이론 중심의 "통계학의 이해" 과정이 수강생 피드백을 반영하여 개편됩니다. [기초 기술통계 실습]과 [현장 추론통계 응용] 2개 단기 실습 과정으로 분리하여 9월 중 재개설될 예정입니다.',
    authorName: 'AX교육센터',
    authorRole: '교육 담당자',
    authorAvatarBg: 'bg-amber-700',
    createdAt: '2026-08-04 15:45',
    views: 215,
    likes: 12,
    comments: []
  },
  {
    id: 'admin_7',
    type: 'admin',
    category: '배지획득',
    title: '축하합니다. 지덱수 프로님이 머신러닝 모델링 과정의 실버크라운 배지를 획득 하셨습니다.',
    content: '지덱수 프로님께서 머신러닝 모델링 심화 과정 최종 평가에서 우수한 성적으로 실버크라운(Silver Crown) 배지를 획득하셨습니다. 지속적인 자기개발과 실무 적용 노력에 열렬한 박수를 보냅니다!',
    authorName: 'GDX 사무국',
    authorRole: '시스템 관리자',
    authorAvatarBg: 'bg-rose-600',
    createdAt: '2026-08-03 10:00',
    views: 380,
    likes: 47,
    badgeEarned: '머신러닝 실버크라운',
    comments: []
  },
  {
    id: 'admin_8',
    type: 'admin',
    category: '인사연동',
    title: 'GDX 배지시스템이 인사시스템과 연동 됩니다. G2, G3 가 되기위한 필수 배지 조건을 확인하세요.',
    content: '2026년 하반기부터 GDX 배지 획득 내역이 사내 인사HR 시스템 승진 가산점 및 직급(G2, G3) 요건으로 실시간 자동 연동됩니다. 직군별(제조/비제조) 이수 필요 배지 개수를 개인 프로필에서 꼭 확인해주세요.',
    authorName: '인사기획팀',
    authorRole: 'HR 담당자',
    authorAvatarBg: 'bg-indigo-700',
    createdAt: '2026-08-02 14:10',
    views: 890,
    likes: 71,
    isImportant: true,
    comments: []
  },
  {
    id: 'admin_9',
    type: 'admin',
    category: '사내강사',
    title: '빤히 프로님이 바이브 코딩 과정의 사내강사로 위촉 되셨습니다. 앞으로 많은 활동 기대합니다.',
    content: '현장 업무 자동화 프롬프트 엔지니어링 전문가이신 빤히 프로님께서 2026년도 사내 GDX 바이브 코딩 실습 전담 강사로 위촉되셨습니다. 빤히 프로님과 함께하는 다채로운 실무 워크숍에 많은 참여 부탁드립니다.',
    authorName: 'AX교육센터',
    authorRole: '교육 담당자',
    authorAvatarBg: 'bg-amber-700',
    createdAt: '2026-08-01 11:00',
    views: 310,
    likes: 38,
    comments: []
  }
];

// Initial User Q&A Posts
const INITIAL_USER_POSTS: PostItem[] = [
  {
    id: 'user_post_1',
    type: 'user',
    category: '데이터분석 요청',
    title: '[데이터분석 요청] 중합수율 최적화를 위한 변수를 검토중입니다. 고수님의 도움을 요청 드립니다.',
    content: '현재 아라미드 중합 공정에서 온도(TIC 212)와 입고 원료 반응 압력(PIC-201) 간의 상관관계를 파악하여 반응 수율을 최적화하려고 합니다. 수집된 3개월치 센서 데이터 첨부파일을 확인해주시고, 다중회귀분석이나 XGBoost 모델링 접근법에 대해 고수분들의 조언 부탁드립니다!',
    authorName: '손흥민',
    authorRole: '제조직군 / 아라미드2팀',
    authorAvatarBg: 'bg-emerald-600',
    createdAt: '2026-08-09 11:20',
    views: 185,
    likes: 14,
    attachments: [
      { name: 'PIC-201.csv', size: '1.4 MB', type: 'csv' },
      { name: 'TIC_212.csv', size: '2.8 MB', type: 'csv' }
    ],
    comments: [
      {
        id: 'c_u1_1',
        authorName: '류현진',
        authorJobGroup: '비제조직군',
        authorAvatarBg: 'bg-purple-600',
        content: '시계열 데이터 전처리가 먼저 필요해보입니다. Lag 변수를 5분 단위로 생성하여 Correlation 히트맵을 그려보시는 것을 추천합니다!',
        createdAt: '2026-08-09 11:45',
        likes: 4
      },
      {
        id: 'c_u1_2',
        authorName: '이영표',
        authorJobGroup: '제조직군',
        authorAvatarBg: 'bg-blue-600',
        content: '저희 코오드팀에서 유사하게 온도 센서 지연시간 감안한 머신러닝 스크립트 작성해둔 게 있습니다. 메일로 스크립트 공유해 드릴게요.',
        createdAt: '2026-08-09 12:10',
        likes: 6
      }
    ]
  },
  {
    id: 'user_post_2',
    type: 'user',
    category: '과제 전문가',
    title: '[GDX 완료보고서 전문가 구함] 본부과제 완료보고서를 작성 중입니다. 보고서 작성 흐름에 대해 도움 주실 분 계신가요?',
    content: '이번 3분기 GDX 본부과제 최종 완료보고서 심사를 앞두고 있습니다. 정량적 재무성과 검증 산식 표기법과 AI 모델 성능 비교(Before vs After) 장표 구성에 대해 피드백해주실 G3 선배님 계신가요? 맛있는 커피 사드리겠습니다!',
    authorName: '박지성',
    authorRole: '제조직군 / 타이어코드팀',
    authorAvatarBg: 'bg-amber-600',
    createdAt: '2026-08-08 15:10',
    views: 240,
    likes: 19,
    attachments: [
      { name: '공정최적화 과제 완료 보고서.pptx', size: '14.2 MB', type: 'pptx' }
    ],
    comments: [
      {
        id: 'c_u2_1',
        authorName: '박찬호',
        authorJobGroup: '비제조직군',
        authorAvatarBg: 'bg-indigo-600',
        content: '첨부하신 pptx 슬라이드 8번째의 재무 성과 산출 로직에서 제조원가 절감액 인덱스 산식만 보완하면 무난히 최우수과제 선정되실 것 같습니다. 내일 오전에 메신저 주세요!',
        createdAt: '2026-08-08 16:00',
        likes: 7
      }
    ]
  },
  {
    id: 'user_post_3',
    type: 'user',
    category: '교육문의',
    title: '[교육문의] 바이브코딩 오프라인 과정 가장 빨리 들을 수 있는 일정 알려주세요.',
    content: '최근 소식에 올라온 바이브코딩 오프라인 실습 과정 수강하고 싶습니다. 8월 중 추가 개설 일정이나 대기 신청이 가능한지 궁금합니다.',
    authorName: '손흥민',
    authorRole: '제조직군 / 아라미드2팀',
    authorAvatarBg: 'bg-emerald-600',
    createdAt: '2026-08-07 10:05',
    views: 142,
    likes: 9,
    comments: [
      {
        id: 'c_u3_1',
        authorName: 'AX교육센터',
        authorJobGroup: '교육 담당자',
        authorAvatarBg: 'bg-amber-700',
        content: '손흥민 프로님! 8월 21일(금) 차수가 추가 개설 예정입니다. 상단 [GDX 수강신청 바로가기] 버튼을 누르시면 대기 등록이 가능합니다!',
        createdAt: '2026-08-07 10:30',
        likes: 5
      }
    ]
  },
  {
    id: 'user_post_4',
    type: 'user',
    category: '배지문의',
    title: '[배지문의] 빅데이터분석기사 자격을 취득하면 머신러닝 모델링 과정의 실버크라운 배지 취득이 인정되나요?',
    content: '국가공인 빅데이터분석기사 자격증을 이번에 취득했습니다! 사내 GDX 배지 체계에서 머신러닝 모델링 실버크라운 배지로 대체 인정이 가능한지 문의드립니다.',
    authorName: '이영표',
    authorRole: '제조직군 / 코오드생산팀',
    authorAvatarBg: 'bg-blue-600',
    createdAt: '2026-08-06 13:50',
    views: 298,
    likes: 21,
    comments: [
      {
        id: 'c_u4_1',
        authorName: 'GDX 사무국',
        authorJobGroup: '시스템 관리자',
        authorAvatarBg: 'bg-rose-600',
        content: '네, 가능합니다! 자격증 사본을 GDX 사무국 이메일로 제출해주시면 머신러닝 모델링 실버크라운 배지 자동 수여 및 HR 시스템에 반영됩니다.',
        createdAt: '2026-08-06 14:15',
        likes: 12
      }
    ]
  },
  {
    id: 'user_post_5',
    type: 'user',
    category: '포상문의',
    title: '[포상문의] 탐색적데이터분석 과정의 그린배지 취득 시 어떤 보상이 주어지나요?',
    content: '이번 달 탐색적데이터분석(EDA) 그린배지를 획득했습니다. 사내 포상 포인트나 웰컴 굿즈 지급 기준이 알고 싶습니다.',
    authorName: '박지성',
    authorRole: '제조직군 / 타이어코드팀',
    authorAvatarBg: 'bg-amber-600',
    createdAt: '2026-08-05 16:30',
    views: 180,
    likes: 11,
    comments: [
      {
        id: 'c_u5_1',
        authorName: '인사기획팀',
        authorJobGroup: 'HR 담당자',
        authorAvatarBg: 'bg-indigo-700',
        content: '그린배지 획득 시 복지포인트 5만P 지급 및 자기개발 도서 구매권(3만원)이 제공됩니다! 축하드립니다.',
        createdAt: '2026-08-05 17:00',
        likes: 8
      }
    ]
  },
  {
    id: 'user_post_6',
    type: 'user',
    category: '인사제도문의',
    title: '[인사제도문의] G2로 승진하기 위해 필요한 필수 배지를 알려주세요.',
    content: '제조직군 기준으로 G2 승진 요건을 충족하기 위해서 꼭 획득해야 하는 배지 리스트와 인정 과제수를 명확히 확인하고 싶습니다.',
    authorName: '손흥민',
    authorRole: '제조직군 / 아라미드2팀',
    authorAvatarBg: 'bg-emerald-600',
    createdAt: '2026-08-04 11:15',
    views: 310,
    likes: 25,
    comments: [
      {
        id: 'c_u6_1',
        authorName: '인사기획팀',
        authorJobGroup: 'HR 담당자',
        authorAvatarBg: 'bg-indigo-700',
        content: '제조직군 G2 승진 요건은 1) 공정데이터분석 그린배지, 2) Minitab 실습 수료배지, 3) GDX 본부과제 참여 1건입니다. 상단 프로필 영역에서 손흥민 프로님의 남아있는 필요 배지 개수(2개)를 실시간 확인하실 수 있습니다.',
        createdAt: '2026-08-04 11:40',
        likes: 15
      }
    ]
  }
];

// External Course Registration URL
const COURSE_REGISTRATION_URL = 'https://test14-wyc8.vercel.app/';

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  // Current user randomly chosen on refresh / initial mount
  const [currentUser, setCurrentUser] = useState<UserProfile>(USERS[0]);
  
  // Posts state
  const [adminPosts, setAdminPosts] = useState<PostItem[]>(INITIAL_ADMIN_POSTS);
  const [userPosts, setUserPosts] = useState<PostItem[]>(INITIAL_USER_POSTS);

  // Filters & Search
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<string>('전체');
  const [userCategoryFilter, setUserCategoryFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [isAdminNoticeModalOpen, setIsAdminNoticeModalOpen] = useState<boolean>(false);
  
  // New User Question Form State
  const [newPostCategory, setNewPostCategory] = useState<string>('데이터분석 요청');
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostFileName, setNewPostFileName] = useState<string>('');

  // New Admin Notice Form State
  const [newAdminCategory, setNewAdminCategory] = useState<string>('과제등록');
  const [newAdminTitle, setNewAdminTitle] = useState<string>('');
  const [newAdminContent, setNewAdminContent] = useState<string>('');

  // Active Selected Post Modal (for detailed view & thread reading)
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  // Randomize user on page load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * USERS.length);
    setCurrentUser(USERS[randomIndex]);
  }, []);

  // Function to switch to next random or specific user
  const handleRandomizeUser = () => {
    const otherUsers = USERS.filter((u) => u.id !== currentUser.id);
    const randomIndex = Math.floor(Math.random() * otherUsers.length);
    setCurrentUser(otherUsers[randomIndex]);
  };

  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
  };

  // Like Toggle Function
  const handleToggleLike = (postId: string, isAdmin: boolean) => {
    const updatePosts = (posts: PostItem[]) =>
      posts.map((post) => {
        if (post.id === postId) {
          const liked = post.likedByMe;
          return {
            ...post,
            likedByMe: !liked,
            likes: liked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      });

    if (isAdmin) {
      setAdminPosts(updatePosts);
    } else {
      setUserPosts(updatePosts);
    }

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              likedByMe: !prev.likedByMe,
              likes: prev.likedByMe ? prev.likes - 1 : prev.likes + 1
            }
          : null
      );
    }
  };

  // Add Comment/Reply to Post
  const handleAddComment = (postId: string, isAdmin: boolean, text: string) => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      authorName: currentUser.name,
      authorJobGroup: currentUser.jobGroup,
      authorAvatarBg: currentUser.avatarBg,
      content: text.trim(),
      createdAt: '방금 전',
      likes: 0
    };

    const updatePosts = (posts: PostItem[]) =>
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      });

    if (isAdmin) {
      setAdminPosts(updatePosts);
    } else {
      setUserPosts(updatePosts);
    }

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, newComment]
            }
          : null
      );
    }
  };

  // Create User Post
  const handleCreateUserPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: PostItem = {
      id: `user_p_${Date.now()}`,
      type: 'user',
      category: newPostCategory,
      title: `[${newPostCategory}] ${newPostTitle}`,
      content: newPostContent,
      authorName: currentUser.name,
      authorRole: `${currentUser.jobGroup} / 현장 구성원`,
      authorAvatarBg: currentUser.avatarBg,
      createdAt: '방금 전',
      views: 1,
      likes: 0,
      attachments: newPostFileName.trim()
        ? [{ name: newPostFileName.trim(), size: '1.2 MB', type: 'csv' }]
        : undefined,
      comments: []
    };

    setUserPosts([newPost, ...userPosts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostFileName('');
    setIsWriteModalOpen(false);
  };

  // Create Admin Post
  const handleCreateAdminPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminTitle.trim() || !newAdminContent.trim()) return;

    const newNotice: PostItem = {
      id: `admin_p_${Date.now()}`,
      type: 'admin',
      category: newAdminCategory,
      title: newAdminTitle,
      content: newAdminContent,
      authorName: `${currentUser.name} (관리자 권한)`,
      authorRole: 'GDX 관리자',
      authorAvatarBg: currentUser.avatarBg,
      createdAt: '방금 전',
      views: 1,
      likes: 0,
      comments: []
    };

    setAdminPosts([newNotice, ...adminPosts]);
    setNewAdminTitle('');
    setNewAdminContent('');
    setIsAdminNoticeModalOpen(false);
  };

  // Open Post Detail Modal & increment views
  const handleOpenPostDetail = (post: PostItem) => {
    const updatedPost = { ...post, views: post.views + 1 };
    setSelectedPost(updatedPost);

    // Increment in list
    if (post.type === 'admin') {
      setAdminPosts((list) =>
        list.map((item) => (item.id === post.id ? { ...item, views: item.views + 1 } : item))
      );
    } else {
      setUserPosts((list) =>
        list.map((item) => (item.id === post.id ? { ...item, views: item.views + 1 } : item))
      );
    }
  };

  // Filter lists (All posts ordered by newest first)
  const filteredAdminPosts = adminPosts.filter((post) => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredUserPosts = userPosts.filter((post) => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-['Pretendard','sans-serif']">
      
      {/* ==========================================
          HEADER 1: BRANDING & APP TITLE
      ========================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
              AX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  AXage Playground
                </h1>
                <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  v2.5 Live
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 font-medium">
                "이것은 노는 것인가, 일하는 것인가" — GDX 지식 & 성취 공유 커뮤니티
              </p>
            </div>
          </div>

          {/* Quick Search & External Registration CTA */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Global Search Bar */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="과제, 교육, 배지 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 text-xs text-white placeholder-slate-400 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* GDX 수강신청 바로가기 Button */}
            <a
              href={COURSE_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4 text-slate-950" />
              <span>GDX 수강신청 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ==========================================
          HEADER 2: USER PROFILE & BADGE STATUS BAR
      ========================================== */}
      <section className="bg-white border-b border-slate-200 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* User Info Card */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:px-4 sm:py-3 flex-1">
            <div className={`w-11 h-11 rounded-full ${currentUser.avatarBg} ${currentUser.avatarText} font-bold text-base flex items-center justify-center shadow-md shrink-0 ring-2 ring-white`}>
              {currentUser.name.slice(0, 1)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900">{currentUser.name} 프로</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                  <Briefcase className="w-3 h-3" />
                  {currentUser.jobGroup}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  currentUser.currentLevel === 'G3'
                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                    : currentUser.currentLevel === 'G2'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  현재 등급: {currentUser.currentLevel}
                </span>
              </div>

              {/* Badge Message */}
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-indigo-900 bg-indigo-50/80 border border-indigo-100 px-2.5 py-1 rounded-lg">
                <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">{currentUser.badgeMessage}</span>
              </div>
            </div>
          </div>



        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT: 2-COLUMN LAYOUT
      ========================================== */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ------------------------------------------
            COLUMN 1: 관리자의 공간 (Admin / News Space)
        ------------------------------------------ */}
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden">
          
          {/* Column Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-rose-50/70 via-red-50/40 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                  <Bell className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  새로운 소식
                </h2>
                <span className="text-xs font-semibold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  공식 소식 ({filteredAdminPosts.length})
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                GDX 과제, 교육프로그램, 성취, 인사제도 안내 뉴스 공유
              </p>
            </div>

            {/* Admin Add Notice Button */}
            <button
              onClick={() => setIsAdminNoticeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>관리자 소식 등록</span>
            </button>
          </div>

          {/* Admin Posts Feed List */}
          <div className="p-4 flex-1 space-y-3.5 overflow-y-auto max-h-[720px]">
            {filteredAdminPosts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">조건에 맞는 관리자 소식이 없습니다.</p>
              </div>
            ) : (
              filteredAdminPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/80 rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer group"
                  onClick={() => handleOpenPostDetail(post)}
                >
                  {/* Top Bar: Category & Badge/Impact Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-rose-100 text-rose-800 font-bold text-[11px] px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      {post.isImportant && (
                        <span className="bg-amber-100 text-amber-800 font-bold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Zap className="w-3 h-3 text-amber-600" /> Important
                        </span>
                      )}
                      {post.financialImpact && (
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3 text-emerald-600" /> 재무성과 {post.financialImpact}
                        </span>
                      )}
                      {post.badgeEarned && (
                        <span className="bg-purple-100 text-purple-800 font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-0.5">
                          <Award className="w-3 h-3 text-purple-600" /> {post.badgeEarned}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{post.createdAt}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug mb-1.5">
                    {post.title}
                  </h3>

                  {/* Content snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {post.content}
                  </p>

                  {/* Bottom Footer: Author & Interaction Counters */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/60 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full ${post.authorAvatarBg} text-white font-bold text-[10px] flex items-center justify-center`}>
                        {post.authorName.slice(0, 1)}
                      </div>
                      <span className="font-semibold text-slate-700">{post.authorName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-slate-700">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{post.views}</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleLike(post.id, true);
                        }}
                        className={`flex items-center gap-1 transition-colors ${
                          post.likedByMe ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.likes}</span>
                      </button>
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{post.comments.length}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ------------------------------------------
            COLUMN 2: 사용자들의 공간 (User Q&A Space)
        ------------------------------------------ */}
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden">
          
          {/* Column Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50/70 via-blue-50/40 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  질문있어요/도와주세요
                </h2>
                <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                  자유 질의응답 ({filteredUserPosts.length})
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                GDX 과제, 데이터분석, 교육, 배지, 인사제도에 대해 문의하고 답변하는 소통 공간
              </p>
            </div>

            {/* User Write Question Button */}
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>질문 / 글 작성하기</span>
            </button>
          </div>

          {/* User Posts Feed List */}
          <div className="p-4 flex-1 space-y-3.5 overflow-y-auto max-h-[720px]">
            {filteredUserPosts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">조건에 맞는 질문 게시글이 없습니다.</p>
              </div>
            ) : (
              filteredUserPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/80 rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer group"
                  onClick={() => handleOpenPostDetail(post)}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-800 font-bold text-[11px] px-2 py-0.5 rounded-md">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{post.createdAt}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-1.5">
                    {post.title}
                  </h3>

                  {/* Content Snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2.5">
                    {post.content}
                  </p>

                  {/* Attachments indicators */}
                  {post.attachments && post.attachments.length > 0 && (
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {post.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1 bg-white border border-slate-200 text-[11px] text-slate-700 px-2 py-0.5 rounded-md shadow-2xs font-medium"
                        >
                          <Paperclip className="w-3 h-3 text-indigo-500" />
                          <span>{att.name}</span>
                          <span className="text-[10px] text-slate-400">({att.size})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Footer: Author & Action Buttons */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/60 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full ${post.authorAvatarBg} text-white font-bold text-[10px] flex items-center justify-center`}>
                        {post.authorName.slice(0, 1)}
                      </div>
                      <span className="font-semibold text-slate-700">{post.authorName}</span>
                      <span className="text-[10px] text-slate-400">({post.authorRole})</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="flex items-center gap-1 hover:text-slate-700">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{post.views}</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleLike(post.id, false);
                        }}
                        className={`flex items-center gap-1 transition-colors ${
                          post.likedByMe ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.likes}</span>
                      </button>

                      {/* Reply Button Highlight */}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200/80 rounded font-bold text-[11px] group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <MessageSquare className="w-3 h-3" />
                        <span>답변하기 ({post.comments.length})</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </main>

      {/* ==========================================
          BOTTOM BANNER & FOOTER
      ========================================== */}
      <footer className="mt-8 bg-slate-900 text-slate-300 border-t border-slate-800 pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-black text-xl text-white font-['Plus_Jakarta_Sans']">AXage Playground</span>
              <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700 font-semibold">
                GDX DX Platform
              </span>
            </div>
            <p className="text-xs text-slate-400">
              우리 구성원 모두가 데이터와 AI 기술을 놀이처럼 즐기며 함께 성장하는 통합 커뮤니티입니다.
            </p>
          </div>

          {/* Prominent Footer CTA Button */}
          <a
            href={COURSE_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all transform active:scale-95"
          >
            <GraduationCap className="w-5 h-5 text-slate-950" />
            <span>GDX 수강신청 바로가기 (공식 포털)</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>© 2026 AXage Playground. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>GDX 배지 시스템 연동 완료</span>
            <span>·</span>
            <span>인사HR 가산점 시스템</span>
          </div>
        </div>
      </footer>

      {/* ==========================================
          MODAL 1: POST DETAIL & THREADED COMMENTS
      ========================================== */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  selectedPost.type === 'admin'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {selectedPost.type === 'admin' ? '1열 : 관리자 소식' : '2열 : 사용자 질문'} · {selectedPost.category}
                </span>
                <span className="text-xs text-slate-400">{selectedPost.createdAt}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {selectedPost.title}
              </h2>

              {/* Author Card */}
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className={`w-9 h-9 rounded-full ${selectedPost.authorAvatarBg} text-white font-bold text-sm flex items-center justify-center shadow-sm`}>
                  {selectedPost.authorName.slice(0, 1)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{selectedPost.authorName}</div>
                  <div className="text-xs text-slate-500">{selectedPost.authorRole}</div>
                </div>
              </div>

              {/* Main Content */}
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line py-2">
                {selectedPost.content}
              </div>

              {/* Attachments Section if present */}
              {selectedPost.attachments && selectedPost.attachments.length > 0 && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Paperclip className="w-4 h-4 text-indigo-600" />
                    <span>첨부파일 ({selectedPost.attachments.length}개)</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedPost.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs"
                      >
                        <span className="font-semibold text-slate-800">{file.name}</span>
                        <button
                          onClick={() => alert(`${file.name} 시뮬레이션 다운로드가 완료되었습니다.`)}
                          className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>다운로드 ({file.size})</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Like / View Info Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>조회수 {selectedPost.views}</span>
                </span>
                <button
                  onClick={() => handleToggleLike(selectedPost.id, selectedPost.type === 'admin')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    selectedPost.likedByMe
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>좋아요 {selectedPost.likes}</span>
                </button>
              </div>

              {/* Comments / Thread Section */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>답변 및 스레드 댓글 ({selectedPost.comments.length})</span>
                </h3>

                {/* Comment Input */}
                <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className={`w-8 h-8 rounded-full ${currentUser.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5`}>
                    {currentUser.name.slice(0, 1)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <textarea
                      rows={2}
                      placeholder={`${currentUser.name} 프로로 답변/댓글 작성하기...`}
                      id="modal-comment-input"
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          const input = document.getElementById('modal-comment-input') as HTMLTextAreaElement;
                          if (input && input.value) {
                            handleAddComment(selectedPost.id, selectedPost.type === 'admin', input.value);
                            input.value = '';
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>답변 등록</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comment Thread List */}
                <div className="space-y-2.5 pt-2">
                  {selectedPost.comments.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">
                      아직 등록된 답변이나 댓글이 없습니다. 첫 번째 답변을 작성해보세요!
                    </p>
                  ) : (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${comment.authorAvatarBg} text-white font-bold text-[10px] flex items-center justify-center`}>
                              {comment.authorName.slice(0, 1)}
                            </div>
                            <span className="font-bold text-slate-800">{comment.authorName}</span>
                            <span className="text-[10px] text-slate-400">({comment.authorJobGroup})</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                        </div>
                        <p className="text-slate-700 pl-8 text-xs leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">연관 과정 수강이 필요한 경우 신청 가능합니다</span>
              <a
                href={COURSE_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:underline"
              >
                <span>GDX 수강신청</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: USER WRITE QUESTION FORM
      ========================================== */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <span>2열 사용자 공간 질문/글 작성</span>
              </h2>
              <button onClick={() => setIsWriteModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserPost} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">카테고리 선택</label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="데이터분석 요청">데이터분석 요청</option>
                  <option value="과제 전문가">과제 전문가 구함</option>
                  <option value="교육문의">교육문의</option>
                  <option value="배지문의">배지문의</option>
                  <option value="포상문의">포상문의</option>
                  <option value="인사제도문의">인사제도문의</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">제목</label>
                <input
                  type="text"
                  placeholder="궁금한 내용을 요약하여 작성해 주세요."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">상세 내용</label>
                <textarea
                  rows={4}
                  placeholder="자세한 질문 사안, 공정 변수명, 교육 수강 목적 등을 적어주세요."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">첨부파일 파일명 (선택사항)</label>
                <input
                  type="text"
                  placeholder="예: PIC-201.csv 또는 과제보고서.pptx"
                  value={newPostFileName}
                  onChange={(e) => setNewPostFileName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm"
                >
                  게시글 올리기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 3: ADMIN NOTICE FORM
      ========================================== */}
      {isAdminNoticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-600" />
                <span>1열 관리자 소식 등록</span>
              </h2>
              <button onClick={() => setIsAdminNoticeModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdminPost} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">소식 유형</label>
                <select
                  value={newAdminCategory}
                  onChange={(e) => setNewAdminCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-rose-500"
                >
                  <option value="과제등록">과제등록</option>
                  <option value="과제완료">과제완료 (재무성과)</option>
                  <option value="교육개설">교육개설</option>
                  <option value="교육안내">교육안내 / 폐강</option>
                  <option value="배지획득">배지획득 축하</option>
                  <option value="인사연동">인사제도 연동안내</option>
                  <option value="사내강사">사내강사 위촉</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">소식 제목</label>
                <input
                  type="text"
                  placeholder="예: [과제등록] OO팀에서 새로운 GDX 본부과제를 등록하였습니다."
                  value={newAdminTitle}
                  onChange={(e) => setNewAdminTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">소식 본문</label>
                <textarea
                  rows={4}
                  placeholder="전 사원에 알릴 공식 소식 내용을 입력하세요."
                  value={newAdminContent}
                  onChange={(e) => setNewAdminContent(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdminNoticeModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 shadow-sm"
                >
                  공식 소식 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
