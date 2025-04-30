document.addEventListener("DOMContentLoaded", function () {
  // Mostrar/Ocultar barra de bÃºsqueda
  var searchBar = document.querySelector(".nav-search");
  var searchInput = document.querySelector(".search-input");

  var showSearch = document.querySelector(".show-search");
  if (showSearch) {
    showSearch.addEventListener("click", function () {
      searchBar.style.display = "block";
      searchInput.focus();
    });
  }

  var hideSearch = document.querySelector(".hide-search");
  if (hideSearch) {
    hideSearch.addEventListener("click", function () {
      searchBar.style.display = "none";
    });
  }

  // Mostrar/Ocultar menÃº mÃ³vil
  var showMobileMenu = document.querySelector(".show-mobile-menu");
  if (showMobileMenu) {
    showMobileMenu.addEventListener("click", function () {
      document.body.classList.add("nav-active");
    });
  }

  var hideMobileMenu = document.querySelector(".hide-mobile-menu");
  if (hideMobileMenu) {
    hideMobileMenu.addEventListener("click", function () {
      document.body.classList.remove("nav-active");
    });
  }

  // Ver mÃ¡s/menos en el resumen
  var overview = document.getElementById("overview");
  var toggle = document.getElementById("toggle");

  if (overview && toggle) {
    function checkOverviewLines() {
      var lineHeight = parseFloat(window.getComputedStyle(overview).lineHeight);
      var maxHeight = lineHeight * 2; // MÃ¡ximo 2 lÃ­neas
      toggle.style.display = overview.scrollHeight > maxHeight ? "inline" : "none";
    }

    toggle.addEventListener("click", function () {
      if (overview.classList.contains("expanded")) {
        overview.classList.remove("expanded");
        toggle.textContent = "Ver mÃ¡s";
      } else {
        overview.classList.add("expanded");
        toggle.textContent = "Ver menos";
      }
    });

    checkOverviewLines();
    window.addEventListener("resize", checkOverviewLines);
  }

  // Manejo de servidores y carga de videos
  var serverDropdownButton = document.getElementById("server-dropdown-button");
  var serverList = document.getElementById("server-list");
  var serverItems = document.querySelectorAll(".server-item");
  var videoContainer = document.getElementById("video-container");
  var playButton = document.getElementById("play-button");

  if (serverDropdownButton && serverList && serverItems.length > 0 && videoContainer && playButton) {
    serverDropdownButton.addEventListener("click", function () {
      serverList.classList.toggle("show");
    });

    serverItems.forEach(function (item) {
      item.addEventListener("click", function () {
        changeVideo(item.getAttribute("data-link"), false);
      });
    });

    playButton.addEventListener("click", function () {
      if (serverItems.length > 0) {
        changeVideo(serverItems[0].getAttribute("data-link"), true);
      }
    });

    function changeVideo(videoLink, isInitial) {
      videoContainer.innerHTML =
        '<iframe src="' + videoLink + '" width="530" height="315" frameborder="0" sandbox="allow-same-origin allow-scripts" allow="encrypted-media *;" allowfullscreen></iframe>';
      if (isInitial) {
        playButton.style.display = "none";
      }
    }

    window.addEventListener("click", function (event) {
      if (!serverDropdownButton.contains(event.target)) {
        serverList.classList.remove("show");
      }
    });
  }

  // Ordenar episodios
  var sortButton = document.getElementById("sortButton");
  var episodeList = document.getElementById("episode-list");

  if (sortButton && episodeList) {
    sortButton.addEventListener("click", function () {
      var isDescending = sortButton.getAttribute("data-sort-order") === "descending";
      var items = Array.prototype.slice.call(episodeList.getElementsByClassName("episode-item"));

      items.sort(function (a, b) {
        var aNumber = parseInt(a.getAttribute("data-episode-number"));
        var bNumber = parseInt(b.getAttribute("data-episode-number"));
        return isDescending ? bNumber - aNumber : aNumber - bNumber;
      });

      episodeList.innerHTML = "";
      items.forEach(function (item) {
        episodeList.appendChild(item);
      });

      sortButton.innerHTML = isDescending
        ? '<i class="fas fa-sort-amount-down"></i> Mayor a Menor'
        : '<i class="fa-solid fa-arrow-down-short-wide"></i> Menor a Mayor';

      sortButton.setAttribute("data-sort-order", isDescending ? "ascending" : "descending");
      if (isDescending) {
        sortButton.classList.remove("ascending");
        sortButton.classList.add("descending");
      } else {
        sortButton.classList.remove("descending");
        sortButton.classList.add("ascending");
      }
    });
  }

  // Disparar evento de selecciÃ³n de temporada al cargar la pÃ¡gina
  var seasonDropdown = document.getElementById("season");
  if (seasonDropdown) {
    seasonDropdown.dispatchEvent(new Event("change"));
  }
});