# SUN PICTURES 홈페이지

(주)썬픽처스 공식 홈페이지. 순수 HTML/CSS/JS로 만든 **정적 반응형 원페이지**로,
**호스팅 비용 0원**(GitHub Pages)으로 운영할 수 있습니다.

- 도메인: `www.sunpictures.co.kr` (카페24 관리, 그대로 유지)
- 이메일: `sunpic@sunpictures.co.kr` (네이버웍스, 그대로 유지)
- 폰트: Noto Sans / Noto Sans KR · 컬러: `#f75d33`(포인트) · `#2a2827`(다크)

---

## 폴더 구조
```
sunpictures homepage/
├─ index.html            # 전체 페이지
├─ css/style.css         # 스타일
├─ js/main.js            # 스크롤·메뉴·마퀴·문의폼
├─ assets/
│  ├─ img/               # 포트폴리오 배경 4장
│  ├─ logo/logo.png      # 로고
│  ├─ client/            # 클라이언트 로고 (자동 슬라이딩)
│  └─ favicon.ico
├─ CNAME                 # 커스텀 도메인 (www.sunpictures.co.kr)
└─ README.md
```

---

## 페이지 구성 (마우스 휠 1번 = 1화면)
1. **메인(Hero)** — 헤더 + 배경영상 + 핵심카피 2줄
2. **About Us** — 핵심카피 + 상세 설명
3~6. **Portfolio 1~4**
7. **Client + Contact** — 클라이언트 로고 슬라이딩 + 문의 폼 + 회사정보(푸터)

> PC에서는 휠을 내릴 때마다 한 화면씩 넘어가고, 모바일에서는 일반 스크롤로 부드럽게 이어집니다.

---

## 내용 수정 방법 (비개발자용)

거의 모든 텍스트는 `index.html` 안에서 바로 고칠 수 있습니다.

- **포트폴리오 문구**: `<!-- 포트폴리오1 설명: ... -->` 주석 아래의 `<p class="pf-desc">` 내용을 교체.
  ※ 포트폴리오 3번 설명은 원문 판독이 어려워 **초벌로 작성**해 두었으니 실제 문구로 바꿔주세요.
- **포트폴리오 이미지 교체**: `assets/img/portfolio_1.png` ~ `portfolio_4.png` 파일을 같은 이름으로 덮어쓰기.
- **클라이언트 로고 추가/삭제**: `assets/client/` 에 이미지(4:1.5 비율 권장)를 넣고,
  `index.html`의 `<div class="marquee-track">` 안에 `<img src="assets/client/파일명.png" alt="회사명" />` 한 줄 추가.
- **대표전화**: 푸터에 0108-5124-2723 반영 완료 (변경 시 index.html 푸터에서 수정).

---

## ⭐ 배포 전 필수 설정 2가지

### 1) 문의 폼 이메일 연결 (Web3Forms · 무료) — ✅ 설정 완료
- 액세스 키 발급·삽입 완료 (계정: sun0873@gmail.com / 월 250건 무료).
- **현재 수신 주소는 로그인 계정(sun0873@gmail.com)** 입니다.
  회사 메일(sunpic@sunpictures.co.kr)로 받으려면 Web3Forms 대시보드 → 해당 폼 →
  **Settings → Email** 에서 변경하세요. 인증 메일이 회사 메일로 발송되므로,
  **먼저 아래 '이메일용 MX 레코드'가 카페24에 등록·연동돼 있어야** 인증을 받을 수 있습니다.
- 키를 재발급한 경우 `index.html`의 `name="access_key"` 값만 교체하면 됩니다.

### 2) (선택) 로컬에서 미리보기
브라우저로 `index.html`을 그냥 열어도 되지만, 영상·폰트까지 정확히 보려면 간이 서버를 권장합니다.
```
# 폴더에서
npx serve .        # 또는  python -m http.server 8000
```

---

## GitHub Pages 배포 (무료 호스팅)

1. **GitHub 가입** 후 새 저장소(repository) 생성 (예: `sunpictures-web`).
2. 이 폴더의 파일 전체를 저장소에 업로드(push).
3. 저장소 **Settings → Pages** →
   - *Source*: `Deploy from a branch`
   - *Branch*: `main` / `/(root)` → **Save**
4. 잠시 뒤 `https://<사용자명>.github.io/<저장소명>` 으로 접속되면 성공.
5. **커스텀 도메인 연결**: Settings → Pages → *Custom domain* 에 `www.sunpictures.co.kr` 입력.
   (저장소에 포함된 `CNAME` 파일이 이 역할을 합니다.)
6. DNS 전파 후 **Enforce HTTPS** 체크.

---

## 카페24 DNS 설정 (도메인 연결)

카페24 → **나의 서비스 관리 → 도메인 → DNS 관리(DNS 정보 변경)** 에서 아래를 설정합니다.

### 웹(홈페이지)용 — GitHub Pages 연결
| 종류 | 호스트 | 값 |
|------|--------|----|
| CNAME | `www` | `<사용자명>.github.io` |
| A | `@` (루트) | `185.199.108.153` |
| A | `@` (루트) | `185.199.109.153` |
| A | `@` (루트) | `185.199.110.153` |
| A | `@` (루트) | `185.199.111.153` |

> `sunpictures.co.kr`(www 없이) 접속도 되게 하려면 위 4개 A레코드를 등록하세요.

### 이메일용 — 네이버웍스 MX (웹과 별개, 건드리면 안 됨)
현재 네이버웍스 관리자 화면 기준 MX가 **미연동** 상태입니다. 메일 수신이 되려면 아래 MX를 등록하세요.
**이 레코드는 웹(A/CNAME)과 완전히 별개이며, 홈페이지 배포는 이메일에 영향을 주지 않습니다.**

| 종류 | 호스트 | 우선순위 | 값 | TTL |
|------|--------|----------|----|-----|
| MX | `@` | 10 | `kr1-aspmx1.worksmobile.com` | 3600 |
| MX | `@` | 20 | `kr1-aspmx2.worksmobile.com` | 3600 |

> ⚠️ 기존에 다른 메일 서비스 MX가 있다면, 네이버웍스에 구성원을 먼저 추가한 뒤 MX를 교체하세요
> (미리 바꾸면 일부 메일이 반송될 수 있습니다 — 네이버웍스 안내 참고).

---

## 회사 정보 (푸터 반영됨 · 사업자등록증 기준)
- 상호: **주식회사 썬픽처스 (SUN PICTURES)** / 대표: **이선영**
- 사업자등록번호: **560-87-02097**
- 주소: **경기도 용인시 수지구 죽전로 235, 402동 15층 1502호 (죽전동, 내대지마을푸르지오)**
- 이메일: **sunpic@sunpictures.co.kr**
- 대표전화: **0108-5124-2723**
