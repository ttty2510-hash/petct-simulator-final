export interface TracerStage {
  id: number;
  title: string;
  description: string;
  ttsText: string;
  progressThreshold: number;
}

export interface Tracer {
  id: string;
  name: string;
  koreanName: string;
  targetOrgans: string;
  clinicalUse: string;
  suvRanges: { organ: string; range: string }[];
  prepGuides: string[];
  waitTime: number;
  stages: TracerStage[];
  imagePath: string;
}

export const tracers: Tracer[] = [
  {
    id: "fdg",
    name: "18F-FDG",
    koreanName: "18F-플루오로디옥시글루코스",
    targetOrgans: "뇌, 심장, 종양",
    clinicalUse: "암 진단, 뇌 영상, 심장 생존능 평가",
    suvRanges: [
      { organ: "정상 뇌피질", range: "5.0 - 12.0" },
      { organ: "정상 심근 (금식 시 가변)", range: "3.0 - 8.0" },
      { organ: "악성 종양 (기준치)", range: "2.5 이상" },
      { organ: "간 (참조 장기)", range: "2.0 - 3.5" },
    ],
    prepGuides: [
      "검사 4~6시간 전부터 반드시 금식하셔야 합니다.",
      "당분이 포함된 음료나 사탕 섭취를 절대 금합니다.",
      "검사 전 과도한 신체 활동(운동 등)을 피하십시오.",
      "주사 후 약 60분 동안 안정실에서 휴식을 취합니다."
    ],
    waitTime: 60,
    imagePath: "/assets/images/ai_fdg_pet.webp",
    stages: [
      { id: 1, title: "정맥 주사", description: "팔 정맥에 18F-FDG를 주사합니다.", ttsText: "1단계. 팔 정맥에 에프디지 방사성의약품을 주사합니다. 주사 후 전신으로 퍼지기 시작합니다.", progressThreshold: 0 },
      { id: 2, title: "혈액 순환", description: "방사성 포도당 유사체가 혈류를 따라 전신으로 이동합니다.", ttsText: "2단계. 혈액 순환. 방사성 포도당이 혈류를 타고 전신 장기로 이동하고 있습니다.", progressThreshold: 20 },
      { id: 3, title: "표적 장기 집적", description: "포도당 대사가 활발한 뇌, 심장, 악성 종양 세포에 집적됩니다.", ttsText: "3단계. 표적 장기 집적. 포도당 대사가 활발한 뇌, 심장, 그리고 종양 세포에 약물이 모이게 됩니다.", progressThreshold: 50 },
      { id: 4, title: "생리적 배설", description: "대사되지 않은 FDG는 신장과 방광을 통해 소변으로 배출됩니다.", ttsText: "4단계. 배설 과정. 대사되지 않고 남은 약물은 신장을 거쳐 방광으로 배출됩니다. 검사 전 소변을 참지 않으셔도 됩니다.", progressThreshold: 80 },
      { id: 5, title: "촬영 준비 완료", description: "충분한 집적이 완료되어 PET/CT 촬영을 시작합니다.", ttsText: "5단계. 촬영 준비 완료. 체내 분포가 완료되었습니다. 이제 피이티 시티 촬영실로 이동하여 검사를 시작합니다.", progressThreshold: 100 }
    ]
  },
  {
    id: "fbb",
    name: "18F-FBB",
    koreanName: "18F-플루트메타몰 (알츠하이머 진단)",
    targetOrgans: "뇌 (베타 아밀로이드 플라크)",
    clinicalUse: "알츠하이머병 진단 및 감별",
    suvRanges: [
      { organ: "음성 스캔 (정상)", range: "백질에만 국한된 섭취" },
      { organ: "양성 스캔 (비정상)", range: "회백질 전반에 걸친 강한 섭취" }
    ],
    prepGuides: [
      "이 검사는 특별한 금식이 필요하지 않습니다.",
      "복용 중인 치매 관련 약물은 중단할 필요가 없습니다.",
      "주사 후 약 90분 동안 안정을 취해야 합니다."
    ],
    waitTime: 90,
    imagePath: "/assets/images/ai_fbb_pet.webp",
    stages: [
      { id: 1, title: "정맥 주사", description: "18F-FBB를 정맥 주사합니다.", ttsText: "1단계. 아밀로이드 결합 약물인 에프비비를 정맥 주사합니다.", progressThreshold: 0 },
      { id: 2, title: "혈류 이동", description: "약물이 혈액을 통해 뇌 기저부로 이동합니다.", ttsText: "2단계. 주사된 약물이 혈류를 타고 뇌를 향해 이동합니다.", progressThreshold: 20 },
      { id: 3, title: "뇌 조직 침투", description: "뇌혈관 장벽(BBB)을 통과하여 뇌 조직 내로 진입합니다.", ttsText: "3단계. 약물이 뇌혈관 장벽을 통과하여 뇌 조직 내부로 침투합니다.", progressThreshold: 50 },
      { id: 4, title: "아밀로이드 결합", description: "알츠하이머병의 원인 물질인 아밀로이드 플라크에 선택적으로 결합합니다.", ttsText: "4단계. 알츠하이머의 원인인 아밀로이드 플라크가 있다면, 약물이 그곳에 강력하게 결합하여 빛을 냅니다.", progressThreshold: 80 },
      { id: 5, title: "촬영 준비 완료", description: "90분이 경과하여 최적의 대조도를 확보했습니다.", ttsText: "5단계. 약 90분이 경과하여 뇌 촬영을 위한 최적의 상태가 되었습니다. 촬영을 시작합니다.", progressThreshold: 100 }
    ]
  },
  {
    id: "fpcit",
    name: "18F-FP-CIT",
    koreanName: "18F-에프피시아이티 (파킨슨 진단)",
    targetOrgans: "뇌 (선조체 도파민 운반체)",
    clinicalUse: "파킨슨병 진단 및 기타 신경퇴행성 질환 감별",
    suvRanges: [
      { organ: "정상 섭취", range: "양측 선조체에 쉼표(,) 모양의 강하고 대칭적인 섭취" },
      { organ: "비정상 섭취 (파킨슨)", range: "조가비핵(putamen) 부위 섭취 감소로 마침표(.) 모양 관찰" }
    ],
    prepGuides: [
      "검사 전 최소 4~6시간 금식해주세요.",
      "투여 전에는 당(설탕)이 들어간 음식과 음료를 피해주세요.",
      "카페인/니코틴 섭취는 가급적 자제해주세요.",
      "투여 후 약 3시간(180분) 뒤에 촬영이 진행됩니다. 시간을 꼭 지켜주세요."
    ],
    waitTime: 180,
    imagePath: "/assets/images/ai_fpcit_pet.webp",
    stages: [
      { id: 1, title: "정맥 주사", description: "18F-FP-CIT를 정맥 주사합니다.", ttsText: "1단계. 도파민 운반체 결합 약물인 에프피씨아이티를 정맥 주사합니다.", progressThreshold: 0 },
      { id: 2, title: "혈류 이동", description: "약물이 뇌혈관을 향해 순환합니다.", ttsText: "2단계. 혈류를 통해 약물이 뇌 조직으로 이동합니다.", progressThreshold: 20 },
      { id: 3, title: "뇌 조직 및 선조체 침투", description: "뇌혈관 장벽을 통과하여 뇌의 선조체(striatum) 부위에 도달합니다.", ttsText: "3단계. 약물이 뇌 중심부의 선조체 부위에 도달합니다.", progressThreshold: 50 },
      { id: 4, title: "도파민 운반체 결합", description: "도파민 신경세포 말단의 도파민 운반체(DAT)에 특이적으로 결합합니다.", ttsText: "4단계. 파킨슨병과 관련된 도파민 신경세포 말단에 약물이 선택적으로 결합합니다. 신경세포가 손상되었다면 약물 결합도 감소합니다.", progressThreshold: 80 },
      { id: 5, title: "촬영 준비 완료", description: "충분한 결합이 이루어져 대조도가 극대화되었습니다. (약 3시간 소요)", ttsText: "5단계. 약 3시간이 경과하여 촬영 준비가 완료되었습니다. 피이티 시티 촬영을 시작합니다.", progressThreshold: 100 }
    ]
  },
  {
    id: "psma",
    name: "68Ga-PSMA",
    koreanName: "68갈륨-PSMA-11",
    targetOrgans: "전립선, 림프절, 뼈",
    clinicalUse: "전립선암 진단, 병기 결정, 재발 평가, 치료 계획",
    suvRanges: [
      { organ: "전립선 종양 (과발현)", range: "5.0 - 40.0" },
      { organ: "전이 림프절", range: "3.0 - 20.0" },
      { organ: "골 전이", range: "4.0 - 25.0" },
      { organ: "신장 (생리적 배설)", range: "20.0 - 60.0" }
    ],
    prepGuides: [
      "검사 전 최소 4~6시간 금식해주세요.",
      "복용 중인 약물(특히 호르몬 치료제)이 있으면 사전에 의료진에게 알려주세요.",
      "충분한 수분 섭취를 권장하며, 촬영 직전 방광은 꼭 비워주세요.",
      "투여 후 약 60분 뒤에 촬영이 진행됩니다. 시간을 꼭 지켜주세요."
    ],
    waitTime: 60,
    imagePath: "/assets/images/ai_psma_pet.webp",
    stages: [
      { id: 1, title: "정맥 주사", description: "68Ga-PSMA를 정맥 주사합니다.", ttsText: "1단계. 전립선암 표적 약물인 피에스엠에이를 정맥 주사합니다. 주사 후 60분간 안정을 취합니다.", progressThreshold: 0 },
      { id: 2, title: "혈류 순환", description: "혈액을 통해 전신으로 분포됩니다.", ttsText: "2단계. 약물이 전신 혈류를 따라 순환하기 시작합니다.", progressThreshold: 20 },
      { id: 3, title: "표적 세포 도달", description: "전립선암 세포 표면에 발현된 PSMA 항원에 도달합니다.", ttsText: "3단계. 약물이 전립선암 세포 표면에 존재하는 특이 항원에 도달합니다.", progressThreshold: 50 },
      { id: 4, title: "항원 결합 및 내부화", description: "세포막의 PSMA 수용체와 강하게 결합 후, 세포 내부로 유입됩니다.", ttsText: "4단계. 암세포 표면 수용체와 강력하게 결합하며, 주변 림프절이나 뼈에 전이된 세포에도 동일하게 결합합니다.", progressThreshold: 80 },
      { id: 5, title: "촬영 준비 완료", description: "전립선 및 전이 병소에 약물 집적이 완료되었습니다.", ttsText: "5단계. 촬영 준비가 완료되었습니다. 잔여 약물 배출을 위해 촬영 직전 소변을 보고 피이티 시티 촬영을 시작합니다.", progressThreshold: 100 }
    ]
  }
];
