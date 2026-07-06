/* ===================================================================
   SUN PICTURES – main.js
   · 풀페이지 휠 스크롤(한 번에 한 섹션)
   · 헤더/도트 활성화 및 밝은 섹션 대응
   · 모바일 메뉴 토글
   · 클라이언트 마퀴 자동 복제(끊김 없는 루프)
   · 문의 폼(Web3Forms) 제출 처리
   =================================================================== */
(function () {
  "use strict";

  const scroller = document.getElementById("scroller");
  const sections = Array.from(document.querySelectorAll("[data-section]"));
  const header   = document.getElementById("siteHeader");
  const dotNav   = document.getElementById("dotNav");
  const gnbLinks = Array.from(document.querySelectorAll(".gnb a"));
  const dotLinks = Array.from(document.querySelectorAll(".dot-nav a"));

  const isDesktop = () => window.matchMedia("(min-width: 901px)").matches;

  /* -------- 클라이언트 마퀴: 트랙 복제로 무한 루프 -------- */
  const track = document.querySelector(".marquee-track");
  if (track) {
    track.innerHTML += track.innerHTML; // 2벌 → CSS translateX(-50%)로 자연 순환
  }

  /* -------- 섹션 인덱스 계산 -------- */
  function currentIndex() {
    const y = scroller.scrollTop;
    let idx = 0, best = Infinity;
    sections.forEach((sec, i) => {
      const d = Math.abs(sec.offsetTop - y);
      if (d < best) { best = d; idx = i; }
    });
    return idx;
  }

  function goTo(i) {
    i = Math.max(0, Math.min(sections.length - 1, i));
    scroller.scrollTo({ top: sections[i].offsetTop, behavior: "smooth" });
  }

  /* -------- 휠: 데스크톱에서 한 번에 한 섹션 -------- */
  let locked = false;
  scroller.addEventListener("wheel", function (e) {
    if (!isDesktop()) return;            // 모바일/좁은 화면은 기본 스크롤
    e.preventDefault();
    if (locked) return;
    if (Math.abs(e.deltaY) < 8) return;
    locked = true;
    goTo(currentIndex() + (e.deltaY > 0 ? 1 : -1));
    setTimeout(() => { locked = false; }, 850);
  }, { passive: false });

  /* -------- 키보드 접근성 -------- */
  window.addEventListener("keydown", function (e) {
    if (!isDesktop()) return;
    if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); goTo(currentIndex() + 1); }
    else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); goTo(currentIndex() - 1); }
  });

  /* -------- 네비 링크(헤더/도트) 클릭 이동 -------- */
  document.querySelectorAll("[data-nav]").forEach((a) => {
    a.addEventListener("click", function (e) {
      const id = a.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      scroller.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    });
  });

  /* -------- 스크롤 상태: 헤더/도트/활성 메뉴 갱신 -------- */
  const lightSections = new Set(["about", "client"]); // 밝은 배경 섹션 id
  function onScroll() {
    const idx = currentIndex();
    const id = sections[idx].id;

    header.classList.toggle("solid", scroller.scrollTop > 40);

    // 활성 메뉴 (PORTFOLIO는 portfolio*가 활성일 때)
    gnbLinks.forEach((a) => {
      const href = a.getAttribute("href").slice(1);
      const on = href === id || (href === "portfolio1" && id.startsWith("portfolio"));
      a.classList.toggle("active", on);
    });
    dotLinks.forEach((a, i) => a.classList.toggle("active", i === idx));

    // 밝은 섹션 위에서는 도트를 어둡게
    dotNav.classList.toggle("on-light", lightSections.has(id));
  }
  let ticking = false;
  scroller.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  });
  onScroll();

  /* -------- 모바일 메뉴 토글 -------- */
  const menuBtn = document.getElementById("menuToggle");
  const gnb = document.querySelector(".gnb");
  function closeMenu() {
    gnb.classList.remove("open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = gnb.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* -------- 문의 폼(Web3Forms) 제출 -------- */
  const form = document.getElementById("contactForm");
  const result = document.getElementById("formResult");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const btn = form.querySelector(".submit-btn");
      const key = form.querySelector('input[name="access_key"]').value;

      // 액세스 키 미설정 안내
      if (!key || key === "YOUR_WEB3FORMS_ACCESS_KEY") {
        setResult("⚠ 관리자 설정 필요: Web3Forms 액세스 키가 아직 등록되지 않았습니다. (README 참고)", "err");
        return;
      }

      setResult("전송 중입니다…", "");
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const data = await res.json();
        if (data.success) {
          form.reset();
          setResult("✓ 문의가 정상적으로 전송되었습니다. 빠르게 회신드리겠습니다.", "ok");
        } else {
          setResult("전송에 실패했습니다. 잠시 후 다시 시도하시거나 sunpic@sunpictures.co.kr 로 메일 주세요.", "err");
        }
      } catch (err) {
        setResult("네트워크 오류로 전송하지 못했습니다. sunpic@sunpictures.co.kr 로 메일 주세요.", "err");
      } finally {
        btn.disabled = false;
      }
    });
  }
  function setResult(msg, cls) {
    if (!result) return;
    result.textContent = msg;
    result.className = "form-result" + (cls ? " " + cls : "");
  }
})();
