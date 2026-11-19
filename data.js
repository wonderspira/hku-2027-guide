'use strict';

/* 香港大学 2027 国际招生数据（International / Non-JUPAS）
   来源：HKU International Admissions 2027 eBrochure（2026 年 10 月）与港大官网学费页，2026-11-10 核对。
   分数为预期下限（expected lower boundary），达线不保证录取。
   学费为 2027/28 每年港币。STEM 定义（2027）：工程、医学（MBBS 除外）、理学、
   生物医学工程、计算与数据科学、创新学院；MBBS / BDS 单列 590,000 档。
   fee: nonstem = 非 STEM 250,000；stem = STEM 280,000；med = MBBS/BDS 590,000。
   本地学生（有政府资助）所有专业均为 49,500/年。
   chgIb / chgAl / chgSat 为 2026→2027 年各课程的变化，无变化时为 null。 */

var HKU_DATA = {
  fees: { local: 49500, nonstem: 250000, stem: 280000, med: 590000 },
  appFee: 780,
  faculties: [
    { id: 'arts', name: '文学院', programs: [
      { name: '文学士', en: 'Bachelor of Arts', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '文学院精英课程', en: 'Bachelor of Arts Elite Programme', ib: 40, al: '2A*1A', sat: '3门AP（4分）+SAT 1500，或 5门AP（4分）', fee: 'nonstem', chgIb: '新增专业（待批）', chgAl: '新增专业（待批）', chgSat: '新增专业（待批）' },
      { name: '人文与数字科技文学士', en: 'Bachelor of Arts in Humanities and Digital Technologies', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '文学士及工学士（人工智能与数据科学）', en: 'Bachelor of Arts and Bachelor of Engineering in Artificial Intelligence and Data Science', ib: 37, al: '2A*1A', sat: '3门AP（5分）+SAT 1400，或 3门AP（5分）+2门AP（4分）', fee: 'nonstem', chgIb: null, chgAl: 'A-Level 3A→2A*1A ↑', chgSat: null }
    ]},
    { id: 'business', name: '商学院', programs: [
      { name: '工商管理学士', en: 'Bachelor of Business Administration', ib: 38, al: '3A*', sat: '4门AP（5分）+SAT 1500，或 6门AP（5分）', fee: 'nonstem', chgIb: 'IB 36→38 ↑', chgAl: 'A-Level 3A→3A* ↑', chgSat: 'SAT 1470→1500，第二档改为 6AP（5分）' },
      { name: '经济学 / 经济金融', en: 'Bachelor of Economics / Bachelor of Economics and Finance', ib: 38, al: '3A*', sat: '4门AP（5分）+SAT 1500，或 6门AP（5分）', fee: 'nonstem', chgIb: 'IB 36→38 ↑', chgAl: 'A-Level 3A→3A* ↑', chgSat: 'SAT 1470→1500，第二档改为 6AP（5分）' },
      { name: '会计与金融 / 会计数据分析', en: 'Bachelor of Business Administration in Accounting and Finance / Accounting Data Analytics', ib: 38, al: '3A*', sat: '4门AP（5分）+SAT 1500，或 6门AP（5分）', fee: 'nonstem', chgIb: 'IB 36→38 ↑', chgAl: 'A-Level 3A→3A* ↑', chgSat: 'SAT 1470→1500，第二档改为 6AP（5分）' },
      { name: '工商管理学士（商业分析）', en: 'Bachelor of Business Administration (Business Analytics)', ib: 36, al: '2A*1A', sat: '4门AP（5分）+SAT 1470，或 4门AP（5分）+2门AP（4分）', fee: 'nonstem', chgIb: null, chgAl: 'A-Level 3A→2A*1A ↑', chgSat: null },
      { name: '工商管理学士（法学）及法学士', en: 'Bachelor of Business Administration (Law) and Bachelor of Laws', ib: 41, al: '3A*', sat: '4门AP（5分）+SAT 1520，或 6门AP（5分）', fee: 'nonstem', chgIb: null, chgAl: null, chgSat: null },
      { name: '计量金融理学士', en: 'Bachelor of Science in Quantitative Finance', ib: 40, al: '3A*1A', sat: '4门AP（5分）+SAT 1520，或 6门AP（5分）', fee: 'nonstem', chgIb: null, chgAl: null, chgSat: null },
      { name: '金融学士（资产管理及私人银行）', en: 'Bachelor of Finance in Asset Management and Private Banking', ib: 40, al: '3A*1A', sat: '4门AP（5分）+SAT 1520，或 6门AP（5分）', fee: 'nonstem', chgIb: 'IB 39→40 ↑', chgAl: 'A-Level 3A*→3A*1A ↑', chgSat: null },
      { name: '工商管理学士（国际商业及环球管理）', en: 'Bachelor of Business Administration in International Business and Global Management', ib: 41, al: '3A*1A', sat: '4门AP（5分）+SAT 1560，或 7门AP（5分）', fee: 'nonstem', chgIb: null, chgAl: null, chgSat: null },
      { name: '市场分析及科技理学士', en: 'Bachelor of Science in Marketing Analytics and Technology', ib: 36, al: '2A*1A', sat: '4门AP（5分）+SAT 1470，或 4门AP（5分）+2门AP（4分）', fee: 'nonstem', chgIb: null, chgAl: 'A-Level 3A→2A*1A ↑', chgSat: null }
    ]},
    { id: 'architecture', name: '建筑学院', programs: [
      { name: '建筑学文学士', en: 'Bachelor of Arts in Architectural Studies', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: null, chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '测量学理学士', en: 'Bachelor of Science in Surveying', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '园境学文学士', en: 'Bachelor of Arts in Landscape Studies', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '城市研究文学士', en: 'Bachelor of Arts in Urban Studies', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '设计+文学士及理学士', en: 'Bachelor of Arts and Sciences in Design+', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null }
    ]},
    { id: 'dentistry', name: '牙科学院', programs: [
      { name: '牙医学士', en: 'Bachelor of Dental Surgery', ib: 41, al: '2A*1A', sat: '3门AP（5分）+SAT 1510，或 5门AP（5分）', fee: 'med', chgIb: null, chgAl: null, chgSat: null }
    ]},
    { id: 'engineering', name: '工程学院', programs: [
      { name: '工程精英课程', en: 'Bachelor of Engineering Elite Programme', ib: 40, al: '3A*1A', sat: '3门AP（5分）+SAT 1520，或 5门AP（5分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: 'SAT 1430→1520，AP 4分→5分' },
      { name: '数据与系统工程', en: 'Bachelor of Engineering in Data and Systems Engineering', ib: 34, al: '1A*2A', sat: '3门AP（4分）+SAT 1500，或 3门AP（4分）+2门AP（3分）', fee: 'stem', chgIb: null, chgAl: 'A-Level 3A→1A*2A ↑', chgSat: 'SAT 1380→1500' },
      { name: '机械工程', en: 'Bachelor of Engineering in Mechanical Engineering', ib: 34, al: '1A*2A', sat: '3门AP（4分）+SAT 1500，或 3门AP（4分）+2门AP（3分）', fee: 'stem', chgIb: null, chgAl: 'A-Level 3A→1A*2A ↑', chgSat: 'SAT 1380→1500' },
      { name: '土木工程', en: 'Bachelor of Engineering in Civil Engineering', ib: 34, al: '1A*2A', sat: '3门AP（4分）+SAT 1500，或 3门AP（4分）+2门AP（3分）', fee: 'stem', chgIb: null, chgAl: 'A-Level 3A→1A*2A ↑', chgSat: 'SAT 1380→1500' },
      { name: '机器人工程', en: 'Bachelor of Engineering in Robotics Engineering', ib: 39, al: '3A*', sat: '1门AP（5分）+2门AP（4分）+SAT 1510，或 1门AP（5分）+4门AP（4分）', fee: 'stem', chgIb: '新增专业（待批）', chgAl: '新增专业（待批）', chgSat: '新增专业（待批）' },
      { name: '工程与工程硕士（人工智能）', en: 'Bachelor of Engineering and Master of Science in Engineering in Artificial Intelligence in Engineering', ib: 39, al: '3A*', sat: '1门AP（5分）+2门AP（4分）+SAT 1510，或 1门AP（5分）+4门AP（4分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: 'SAT 1400→1510，AP 档上调' },
      { name: '环球工程与商业课程', en: 'Global Engineering and Business Programme', ib: 39, al: '3A*', sat: '1门AP（5分）+2门AP（4分）+SAT 1510，或 1门AP（5分）+4门AP（4分）', fee: 'stem', chgIb: 'IB 38→39 ↑', chgAl: null, chgSat: 'SAT 1400→1510，AP 档上调' },
      { name: '计算机 / 电机 / 电子工程', en: 'Bachelor of Engineering in Computer Engineering / Electrical Engineering / Electronic Engineering', ib: 34, al: '1A*2A', sat: '3门AP（4分）+SAT 1500，或 3门AP（4分）+2门AP（3分）', fee: 'stem', chgIb: null, chgAl: 'A-Level 3A→1A*2A ↑', chgSat: 'SAT 1380→1500' }
    ]},
    { id: 'law', name: '法学院', programs: [
      { name: '法学士', en: 'Bachelor of Laws', ib: 40, al: '3A*', sat: '3门AP（5分）+SAT 1500，或 5门AP（5分）', fee: 'nonstem', chgIb: null, chgAl: null, chgSat: null },
      { name: '文学士及法学士', en: 'Bachelor of Arts and Bachelor of Laws', ib: 41, al: '3A*', sat: '3门AP（5分）+SAT 1500，或 5门AP（5分）', fee: 'nonstem', chgIb: null, chgAl: null, chgSat: null }
    ]},
    { id: 'education', name: '教育学院', programs: [
      { name: '教育学士（幼儿教育及特殊教育）', en: 'Bachelor of Education in Early Childhood Education and Special Education', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '文学士及教育学士（英语语言教育）', en: 'Bachelor of Arts and Bachelor of Education in Language Education - English', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '文学士及教育学士（中国语言教育）', en: 'Bachelor of Arts and Bachelor of Education in Language Education - Chinese', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '教育学士及理学士', en: 'Bachelor of Education and Bachelor of Science', ib: 34, al: '1A*2A', sat: '3门AP（5分）+SAT 1400，或 3门AP（5分）+2门AP（4分）', fee: 'nonstem', chgIb: 'IB 33→34 ↑', chgAl: null, chgSat: null },
      { name: '言语语言病理学理学士', en: 'Bachelor of Science in Speech-Language Pathology', ib: 37, al: '2A*1A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: null, chgAl: 'A-Level 3A→2A*1A ↑', chgSat: null }
    ]},
    { id: 'medicine', name: '李嘉诚医学院', programs: [
      { name: '内外全科医学士', en: 'Bachelor of Medicine and Bachelor of Surgery', ib: 43, al: '4A*', sat: '6门AP（5分）+SAT 1500', fee: 'med', chgIb: null, chgAl: null, chgSat: null },
      { name: '护理学士', en: 'Bachelor of Nursing', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'stem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '护理学士高级领袖课程', en: 'Bachelor of Nursing Advanced Leadership Track', ib: 40, al: '3A*1A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'stem', chgIb: 'IB 36→40 ↑', chgAl: 'A-Level 3A→3A*1A ↑', chgSat: null },
      { name: '中医学士', en: 'Bachelor of Chinese Medicine', ib: 36, al: '2A*1A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'stem', chgIb: 'IB 34→36 ↑', chgAl: 'A-Level 3A→2A*1A ↑', chgSat: null },
      { name: '药剂学士', en: 'Bachelor of Pharmacy', ib: 39, al: '3A*', sat: '3门AP（3分）+SAT 1400，或 5门AP（3分）', fee: 'stem', chgIb: 'IB 37→39 ↑', chgAl: null, chgSat: 'SAT 1380→1400' },
      { name: '生物医学理学士', en: 'Bachelor of Biomedical Sciences', ib: 39, al: '3A*', sat: '3门AP（3分）+SAT 1400，或 5门AP（3分）', fee: 'stem', chgIb: 'IB 38→39 ↑', chgAl: 'A-Level 2A*1A→3A* ↑', chgSat: null },
      { name: '全球卫生与发展文学士及理学士', en: 'Bachelor of Arts and Sciences in Global Health and Development', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'stem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '内外全科医学士（杰出医科学者）', en: 'Bachelor of Medicine and Bachelor of Surgery (Distinguished MedScholar)', ib: null, al: null, sat: null, fee: 'med', chgIb: null, chgAl: null, chgSat: null }
    ]},
    { id: 'science', name: '理学院', programs: [
      { name: '理学士', en: 'Bachelor of Science', ib: 34, al: '1A*2A', sat: '3门AP（5分）+SAT 1400，或 3门AP（5分）+2门AP（4分）', fee: 'stem', chgIb: 'IB 33→34 ↑', chgAl: null, chgSat: null },
      { name: '理学硕士班', en: 'Science Master Class', ib: 42, al: '4A*', sat: '3门AP（5分）+SAT 1450，或 5门AP（5分）', fee: 'stem', chgIb: 'IB 40→42 ↑', chgAl: null, chgSat: null },
      { name: '理学士及法学士', en: 'Bachelor of Science and Bachelor of Laws', ib: 41, al: '3A*', sat: '3门AP（5分）+SAT 1450，或 5门AP（5分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: null }
    ]},
    { id: 'cds', name: '计算与数据科学学院', programs: [
      { name: '应用人工智能文学士及理学士', en: 'Bachelor of Arts and Sciences in Applied Artificial Intelligence', ib: 38, al: '2A*1A', sat: '3门AP（5分）+SAT 1400，或 3门AP（5分）+2门AP（4分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: null },
      { name: '金融科技文学士及理学士', en: 'Bachelor of Arts and Sciences in Financial Technology', ib: 38, al: '2A*1A', sat: '3门AP（5分）+SAT 1400，或 3门AP（5分）+2门AP（4分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: null },
      { name: '精算学理学士', en: 'Bachelor of Science in Actuarial Science', ib: 39, al: '2A*1A', sat: '3门AP（5分）+SAT 1450，或 3门AP（5分）+2门AP（4分）', fee: 'stem', chgIb: null, chgAl: 'A-Level 3A*→2A*1A ↓（唯一 A-Level 下调）', chgSat: null },
      { name: '统计决策科学', en: 'Statistical Decision Sciences', ib: 39, al: '2A*1A', sat: '3门AP（5分）+SAT 1450，或 3门AP（5分）+2门AP（4分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: null },
      { name: '计算与数据科学', en: 'Computing and Data Science', ib: 38, al: '2A*1A', sat: '3门AP（5分）+SAT 1400，或 3门AP（5分）+2门AP（4分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: null },
      { name: '计算与数据科学（Delta+）', en: 'Computing and Data Science (Delta+)', ib: 38, al: '2A*1A', sat: '3门AP（5分）+SAT 1400，或 3门AP（5分）+2门AP（4分）', fee: 'stem', chgIb: null, chgAl: null, chgSat: null }
    ]},
    { id: 'social', name: '社会科学学院', programs: [
      { name: '社会科学学士', en: 'Bachelor of Social Sciences', ib: 35, al: '1A*2A', sat: '3门AP（4分）+SAT 1460，或 5门AP（4分）', fee: 'nonstem', chgIb: 'IB 32→35 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: 'SAT 1480→1460 ↓' },
      { name: '社会工作学士', en: 'Bachelor of Social Work', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null },
      { name: '社会科学学士（政治与法律）及法学士', en: 'Bachelor of Social Sciences (Government and Laws) and Bachelor of Laws', ib: 41, al: '3A*', sat: '3门AP（5分）+SAT 1500，或 5门AP（5分）', fee: 'nonstem', chgIb: 'IB 40→41 ↑', chgAl: null, chgSat: null },
      { name: '心理学士', en: 'Bachelor of Psychology', ib: 38, al: '2A*1A', sat: '3门AP（5分）+SAT 1500，或 5门AP（5分）', fee: 'nonstem', chgIb: 'IB 35→38 ↑', chgAl: 'A-Level 3A→2A*1A ↑', chgSat: 'AP 4分→5分，SAT 1380→1500' }
    ]},
    { id: 'futuremedia', name: '未来媒体学院', programs: [
      { name: '全球创意产业文学士', en: 'Bachelor of Arts in Global Creative Industries', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1400，或 3门AP（3分）+2门AP（4分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: 'SAT 1380→1400，第二档改为 3AP（3分）+2AP（4分）' },
      { name: '新闻、媒体与人工智能学士', en: 'Bachelor of Journalism, Media and Artificial Intelligence', ib: 34, al: '1A*2A', sat: '3门AP（3分）+SAT 1380，或 5门AP（3分）', fee: 'nonstem', chgIb: 'IB 32→34 ↑', chgAl: 'A-Level 3A→1A*2A ↑', chgSat: null }
    ]},
    { id: 'bme', name: '生物医学工程学院', programs: [
      { name: '生物医学工程学士', en: 'Bachelor of Engineering in Biomedical Engineering', ib: 36, al: '2A*1A', sat: '3门AP（4分）+SAT 1400，或 5门AP（4分）', fee: 'stem', chgIb: null, chgAl: 'A-Level 3A→2A*1A ↑', chgSat: null }
    ]},
    { id: 'innovation', name: '创新学院', programs: [
      { name: '创新与科技理学士', en: 'Bachelor of Science in Innovation and Technology', ib: 34, al: '1A*2A', sat: '3门AP（4分）+SAT 1380，或 3门AP（4分）+2门AP（3分）', fee: 'stem', chgIb: 'IB 32→34 ↑', chgAl: null, chgSat: null }
    ]}
  ]
};
