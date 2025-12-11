(() => {
  "use strict";

  /* =========================================================
       🔧 TIỆN ÍCH CHUNG
     ========================================================= */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const safeJSON = (v, d = null) => {
    try {
      return JSON.parse(v);
    } catch {
      return d;
    }
  };

  const setLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const getLS = (k, def = []) => safeJSON(localStorage.getItem(k), def);

  const uuid = () =>
    crypto?.randomUUID?.() ||
    `id-${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

  /* =========================================================
       🌓 GIAO DIỆN (THEME)
     ========================================================= */
  (() => {
    const key = "taskapp_theme";
    const btn = $("#themeToggle");
    if (!btn) return;

    if (localStorage.getItem(key) === "dark")
      document.body.classList.add("dark");

    btn.addEventListener("click", () => {
      const dark = document.body.classList.toggle("dark");
      localStorage.setItem(key, dark ? "dark" : "light");
      if (window.__financeChart) updateChartTheme(window.__financeChart);
    });
  })();

  /* =========================================================
       🌤 WEATHER — KHÔNG CÒN LỖI CORS
       ⚡ Dùng Cloudflare Worker JSONP (không bị chặn)
     ========================================================= */

  const WEATHER_API = "https://red-voice-6236.anhhoangpk54.workers.dev";

  async function loadWeather(city = "Hanoi") {
    const box = $("#weather-info");
    if (!box) return;

    box.textContent = "Đang tải dữ liệu thời tiết…";

    try {
      const url = `${WEATHER_API}?city=${encodeURIComponent(city)}`;
      const data = await fetch(url).then((r) => r.json());

      if (!data || !data.current) throw new Error("Không có dữ liệu thời tiết");

      const cur = data.current;
      const loc = data.location;

      const map = {
        0: "Trời quang",
        1: "Ít mây",
        2: "Mây rải rác",
        3: "U ám",
        45: "Sương mù",
        61: "Mưa nhỏ",
        63: "Mưa vừa",
        65: "Mưa to",
        71: "Tuyết rơi",
        95: "Dông",
        99: "Dông mạnh",
      };

      box.innerHTML = `
        <div class="weather-header">
          <b>${loc.name}, ${loc.country}</b> — ${
        map[cur.weather_code] || "Không rõ"
      }
        </div>
        <ul class="weather-grid">
          <li>🌡 Nhiệt độ: ${cur.temperature_2m}°C</li>
          <li>💧 Ẩm độ: ${cur.relative_humidity_2m}%</li>
          <li>🌬 Gió: ${cur.wind_speed_10m} km/h</li>
          <li>🌡 Cảm giác: ${cur.apparent_temperature}°C</li>
          <li>💦 Mưa: ${cur.precipitation} mm</li>
        </ul>`;
    } catch (e) {
      box.innerHTML = `<span style="color:#ef4444">⚠️ Không lấy được dữ liệu thời tiết.</span>`;
    }
  }

  $("#weatherRefresh")?.addEventListener("click", () => {
    loadWeather($("#weatherCity")?.value || "Hanoi");
  });

  $("#weatherCity")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loadWeather($("#weatherCity")?.value || "Hanoi");
  });

  loadWeather();
  /* =========================================================
       💬 WIDGET — QUOTE
     ========================================================= */
  (() => {
    const q = $("#quote-text");
    if (!q) return;

    q.innerHTML = `
      <div class="q-text">"Kỷ luật là cây cầu nối giữa mục tiêu và thành tựu."</div>
      <div class="q-author">— Jim Rohn</div>
    `;
  })();

  /* =========================================================
       🎵 WIDGET — NHẠC
     ========================================================= */
  (() => {
    const audio = $("#audioPlayer");
    if (!audio) return;

    const src = audio.querySelector("source");

    $("#musicUpload")?.addEventListener("change", (e) => {
      const f = e.target.files?.[0];
      if (!f) return;

      src.src = URL.createObjectURL(f);
      audio.load();
      audio.play().catch(() => {});
    });
  })();

  /* =========================================================
       📈 BIỂU ĐỒ TÀI CHÍNH — Chart.js
     ========================================================= */
  function updateChartTheme(chart) {
    const dark = document.body.classList.contains("dark");

    const axisColor = dark ? "#cbd5e1" : "#334155";
    const gridColor = "rgba(148,163,184,.25)";
    const lineColor = dark ? "#93c5fd" : "#3b82f6";
    const fillColor = dark ? "rgba(147,197,253,.18)" : "rgba(59,130,246,.18)";

    const ds = chart.data.datasets[0];
    ds.borderColor = lineColor;
    ds.backgroundColor = fillColor;

    chart.options.plugins.legend.labels.color = axisColor;
    chart.options.scales.x.ticks.color = axisColor;
    chart.options.scales.y.ticks.color = axisColor;
    chart.options.scales.x.grid.color = gridColor;
    chart.options.scales.y.grid.color = gridColor;

    chart.update();
  }

  window.addEventListener("DOMContentLoaded", () => {
    const ctx = $("#financeChart")?.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
        datasets: [
          {
            label: "VNIndex",
            data: [1100, 1120, 1130, 1140, 1155, 1170],
            fill: true,
            borderWidth: 2,
            tension: 0.35,
          },
        ],
      },
      options: {
        plugins: {
          legend: { labels: { color: "#334155", font: { size: 14 } } },
        },
        scales: {
          x: {
            ticks: { color: "#334155" },
            grid: { color: "rgba(148,163,184,.25)" },
          },
          y: {
            ticks: { color: "#334155" },
            grid: { color: "rgba(148,163,184,.25)" },
          },
        },
      },
    });

    window.__financeChart = chart;
    updateChartTheme(chart); // chạy lần đầu
  });
  /* =========================================================
       📊 MINI STATS — Projects / Tasks / Overdue
     ========================================================= */
  const LS_TK = "tp_tasks",
    LS_PJ = "tp_projects",
    CURR = "currentUserId";

  const renderStats = () => {
    const tasks = Array.isArray(getLS(LS_TK)) ? getLS(LS_TK) : [];
    const projects = Array.isArray(getLS(LS_PJ)) ? getLS(LS_PJ) : [];

    const done = tasks.filter((t) => t.done).length;
    const total = tasks.length;

    const overdue = tasks.filter((t) => {
      if (!t.deadline) return false;
      const d = new Date(t.deadline);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return !t.done && d < now;
    }).length;

    $("#stProjects") && ($("#stProjects").textContent = projects.length);
    $("#stTasksOpen") && ($("#stTasksOpen").textContent = total - done);
    $("#stTasksDone") && ($("#stTasksDone").textContent = done);
    $("#stOverdue") && ($("#stOverdue").textContent = overdue);
  };

  /* =========================================================
       👤 AUTH — LOGIN / REGISTER / TOGGLE FORM / LOGOUT
     ========================================================= */
  (() => {
    const overlay = $("#authOverlay"),
      btnLogin = $("#btnLogin"),
      btnRegister = $("#btnRegister"),
      btnClose = $("#authClose"),
      tabLogin = $("#tabLogin"),
      tabRegister = $("#tabRegister"),
      formLogin = $("#formLogin"),
      formRegister = $("#formRegister"),
      btnGoTask = $("#btnGoTask");

    const USERS = "taskapp_users",
      REM = "taskapp_remember";

    const readUsers = () => getLS(USERS, []) || [];

    const saveUsers = (u) => setLS(USERS, u);

    /* ---------------- TAB LOGIN / REGISTER ---------------- */
    const switchTab = (mode) => {
      const isLogin = mode === "login";
      tabLogin.classList.toggle("is-active", isLogin);
      tabRegister.classList.toggle("is-active", !isLogin);
      formLogin.classList.toggle("is-hidden", !isLogin);
      formRegister.classList.toggle("is-hidden", isLogin);
    };

    const openAuth = (mode = "login") => {
      overlay.classList.add("show");
      overlay.setAttribute("data-mode", mode);
      document.body.style.overflow = "hidden";
      switchTab(mode);
    };

    const closeAuth = () => {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    };

    btnLogin.onclick = () => openAuth("login");
    btnRegister.onclick = () => openAuth("register");
    btnClose.onclick = closeAuth;

    /* Click ngoài để đóng */
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeAuth();
    });

    /* Chuyển tab bằng link */
    $$(".auth-switch a").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab(a.dataset.switch);
      })
    );

    tabLogin?.addEventListener("click", () => switchTab("login"));
    tabRegister?.addEventListener("click", () => switchTab("register"));

    /* ---------------- LOGIN ---------------- */
    formLogin.onsubmit = (e) => {
      e.preventDefault();

      const id = $("#loginEmail").value.trim();
      const pw = $("#loginPassword").value;

      const users = readUsers() || [];
      const u = users.find((x) => x.id === id || x.email === id);

      if (!u) return alert("Không tìm thấy tài khoản.");
      if (u.pw !== pw) return alert("Sai mật khẩu.");

      localStorage.setItem(CURR, u.id);

      if ($("#rememberMe").checked) localStorage.setItem(REM, u.id);
      else localStorage.removeItem(REM);

      alert("Đăng nhập thành công!");
      closeAuth();
      applyAuthUI();

      /* Chuyển sang trang quản lý task */
      location.href = "features/src/task/task.html";
    };

    /* ---------------- REGISTER ---------------- */
    formRegister.onsubmit = (e) => {
      e.preventDefault();

      const id = $("#regId").value.trim();
      const pw = $("#regPassword").value;
      const pw2 = $("#regPassword2").value;
      const name = $("#regName").value.trim();
      const email = $("#regEmail").value.trim();
      const phone = $("#regPhone").value.trim();

      if (!id || id.includes(" ")) return alert("ID không hợp lệ.");
      if (pw.length < 6) return alert("Mật khẩu tối thiểu 6 ký tự.");
      if (pw !== pw2) return alert("Mật khẩu nhập lại không khớp.");

      const users = readUsers() || [];

      if (users.some((u) => u.id === id)) return alert("ID đã tồn tại.");

      users.push({ id, pw, name, email, phone });
      saveUsers(users);

      localStorage.setItem(CURR, id);
      alert("Đăng ký thành công!");
      closeAuth();
      applyAuthUI();
    };

    /* ---------------- APPLY AUTH UI ---------------- */
    const current =
      localStorage.getItem(CURR) || localStorage.getItem(REM) || null;

    const applyAuthUI = () => {
      const headerRight = $(".header-right");
      let greet = $("#userGreet");

      const needAuthItems = $$(
        "#sideMenu a[href='#tasks-mini'], #sideMenu a[href='#activity'], #sideMenu a[href='#finance-chart']"
      );

      if (current) {
        const u = readUsers().find((x) => x.id === current) || {};

        if (!greet) {
          greet = document.createElement("span");
          greet.id = "userGreet";
          greet.className = "user-greet";
          const themeBtn = $("#themeToggle");
          headerRight.insertBefore(greet, themeBtn);
        }

        greet.innerHTML = `Xin chào, <strong>${u.name || u.id}</strong> 👋`;
        greet.style.display = "";

        btnLogin.style.display = "none";
        btnRegister.style.display = "none";
        btnGoTask.style.display = "";

        $("#btnLogout")?.removeAttribute("hidden");

        needAuthItems.forEach((a) => (a.style.display = ""));
      } else {
        greet && (greet.style.display = "none");

        btnLogin.style.display = "";
        btnRegister.style.display = "";
        btnGoTask.style.display = "none";

        needAuthItems.forEach((a) => (a.style.display = "none"));
      }
    };

    applyAuthUI();

    /* ---------------- LOGOUT BUTTON ---------------- */
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "btnLogout";
    logoutBtn.className = "btn ghost";
    logoutBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Đăng xuất`;
    logoutBtn.hidden = !current;

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(CURR);
      localStorage.removeItem(REM);
      alert("Đã đăng xuất!");
      applyAuthUI();
    });

    $(".header-right")?.appendChild(logoutBtn);
  })();
  /* =========================================================
       📱 SIDE MENU — MOBILE + DESKTOP (KHÔNG XUNG ĐỘT)
     ========================================================= */
  (function SideMenuModule() {
    const btn = $("#menuToggle");
    const menu = $("#sideMenu");
    const overlay = $("#menuOverlay");
    const main = $(".main-home-content-wrapper");

    if (!btn || !menu) return;

    /* ---------------- MOBILE: mở menu ---------------- */
    btn.addEventListener("click", () => {
      menu.classList.add("show");
      overlay?.classList.add("show");
    });

    /* ---------------- MOBILE: đóng menu ---------------- */
    overlay?.addEventListener("click", () => {
      menu.classList.remove("show");
      overlay.classList.remove("show");
    });

    /* ---------------- Đóng khi chọn item ---------------- */
    $$("#sideMenu a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("show");
        overlay?.classList.remove("show");
      })
    );

    /* ---------------- DESKTOP: Thu gọn menu (click) ---------------- */
    btn.addEventListener("click", () => {
      const hidden = menu.classList.toggle("hide");
      main?.classList.toggle("full", hidden);
    });
  })();

  /* =========================================================
       🚀 KHỞI TẠO — NẠP DEMO DATA NẾU CHƯA CÓ
     ========================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("tp_tasks")) {
      setLS("tp_tasks", [
        {
          id: uuid(),
          title: "Thiết kế trang chủ",
          project: "Website",
          deadline: new Date().toISOString().slice(0, 10),
          priority: "High",
          done: false,
        },
        {
          id: uuid(),
          title: "Hoàn thiện báo cáo",
          project: "Nội bộ",
          deadline: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
          priority: "Medium",
          done: true,
        },
      ]);
    }

    renderStats();
  });

  /* =========================================================
       🌤 AUTO REFRESH WEATHER — mỗi 60 phút
     ========================================================= */
  setInterval(() => {
    const city = $("#weatherCity")?.value || "Hanoi";
    if (typeof loadWeather === "function") loadWeather(city);
  }, 1000 * 60 * 60);

  /* =========================================================
       🔥 DEBUG LOG — xác nhận file chạy hoàn chỉnh
     ========================================================= */
  console.log("🌟 Dashboard Home JS Loaded — Full Optimized Version (A)");
  /* =========================================================
   👁 TOGGLE PASSWORD VISIBILITY
   ========================================================= */
  document.querySelectorAll(".pw-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      const input = document.getElementById(id);

      if (!input) return;

      const hidden = input.type === "password";
      input.type = hidden ? "text" : "password";
      btn.textContent = hidden ? "🙈" : "👁";
    });
  });
})();
