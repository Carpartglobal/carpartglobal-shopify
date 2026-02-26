/**
 * CarPartGlobal - Custom inline scripts
 * Extracted from theme.liquid for cacheability and performance.
 */

/* ===== 1. Vehicle Modal (Year/Make/Model search) ===== */
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openVehicleModal");
  const modal = document.getElementById("vehicleModal");
  const closeBtn = document.getElementById("closeVehicleModal");

  if (!openBtn || !modal || !closeBtn) return;

  openBtn.onclick = () => modal.style.display = "block";
  closeBtn.onclick = () => modal.style.display = "none";
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = "none"; });

  const vehicles = [
    { year: "2010", make: "Dodge", model: "journey" },
    { year: "2012", make: "Jeep", model: "Compass" },
    { year: "2014", make: "Honda", model: "Accord" },
    { year: "2016", make: "Toyota", model: "Camry" },
  ];

  const yearSelect = document.getElementById("year");
  const makeSelect = document.getElementById("make");
  const modelSelect = document.getElementById("model");

  if (!yearSelect || !makeSelect || !modelSelect) return;

  const years = [...new Set(vehicles.map(v => v.year))];
  years.forEach(y => {
    yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
  });

  yearSelect.onchange = function () {
    const year = this.value;
    const makes = [...new Set(vehicles.filter(v => v.year === year).map(v => v.make))];
    makeSelect.innerHTML = '<option value="">Select Make</option>';
    makes.forEach(m => makeSelect.innerHTML += `<option value="${m}">${m}</option>`);
    modelSelect.innerHTML = '<option value="">Select Model</option>';
  };

  makeSelect.onchange = function () {
    const year = yearSelect.value;
    const make = this.value;
    const models = [...new Set(vehicles.filter(v => v.year === year && v.make === make).map(v => v.model))];
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    models.forEach(m => modelSelect.innerHTML += `<option value="${m}">${m}</option>`);
  };

  document.getElementById("vehicleSearchForm").onsubmit = function (e) {
    e.preventDefault();
    const year = yearSelect.value;
    const make = makeSelect.value;
    const model = modelSelect.value;

    if (!year || !make || !model) {
      alert("Please select all fields");
      return;
    }

    const searchQuery = `year:${year} make:${make} model:${model}`;
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };
});

/* ===== 2. Remove empty h1 elements ===== */
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("h1").forEach(function(h1) {
    if(h1.textContent.trim() === "") {
      h1.remove();
    }
  });
});

/* ===== 3. Mobile sidebar toggle ===== */
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('navigation-mobile');

  document.body.addEventListener('click', function(e) {
    const toggleBtn = e.target.closest('.mobileMenu-toggle');
    const closeBtn = e.target.closest('.halo-sidebar-close');

    if (toggleBtn) {
      e.preventDefault();
      sidebar.classList.toggle('open');
      return;
    }

    if (closeBtn) {
      e.preventDefault();
      sidebar.classList.remove('open');
      return;
    }

    if (sidebar && !sidebar.contains(e.target) && !toggleBtn) {
      sidebar.classList.remove('open');
    }
  });

  document.querySelectorAll('.mobileMenu-toggle a').forEach(a => {
    a.setAttribute('href', '#');
    a.addEventListener('click', function(ev) { ev.preventDefault(); });
  });
});

/* ===== 4. Mobile menu dropdown handling ===== */
document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth > 1024) return;

  document.body.addEventListener('click', function(e) {
    const isSubLink = e.target.closest('.header__submenu a');
    if (isSubLink) {
      return;
    }

    const li = e.target.closest('.menu-lv-item.dropdown');

    if (li) {
      const submenu = li.querySelector('ul.header__submenu');

      if (!e.target.closest('.nav-title-mobile')) {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = li.classList.contains('is-open');

        const siblings = li.parentElement.querySelectorAll(':scope > .menu-lv-item.dropdown.is-open');
        siblings.forEach(openLi => {
          if (openLi !== li) {
            openLi.classList.remove('is-open');
            const openSub = openLi.querySelector('ul.header__submenu');
            if (openSub) openSub.style.display = 'none';
          }
        });

        if (!isOpen) {
          li.classList.add('is-open');
          if (submenu) {
            submenu.style.display = 'block';
            submenu.scrollTop = 0;
          }
        } else {
          li.classList.remove('is-open');
          if (submenu) submenu.style.display = 'none';
        }
      }
    }

    const backBtn = e.target.closest('.nav-title-mobile');
    if (backBtn) {
      const parentLi = backBtn.closest('.menu-lv-item.dropdown');
      if (parentLi) {
        parentLi.classList.remove('is-open');
        const sub = parentLi.querySelector('ul.header__submenu');
        if (sub) sub.style.display = 'none';
      }
    }
  });
});

/* ===== 5. YMM (Year/Make/Model) widget toggle ===== */
(function() {
  function initYMMToggle() {
    document.addEventListener('click', function (e) {
      const header = e.target.closest('.cm_vehicle-widget_header');

      if (header) {
        const widgetContainer = header.closest('.cmTemplate_active');
        if (widgetContainer) {
          widgetContainer.classList.toggle('is-manual-open');

          const icon = header.querySelector('.cm_icon-angle');
          if (widgetContainer.classList.contains('is-manual-open')) {
            icon.style.transform = 'rotate(180deg)';
          } else {
            icon.style.transform = 'rotate(0deg)';
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initYMMToggle);
  } else {
    initYMMToggle();
  }
})();
