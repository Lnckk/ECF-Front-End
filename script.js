/* Global */
let scrollY = window.pageYOffset;
let firstSt = Math.random().toString(36).slice(2, 3);

function justSt() {
  let ing = firstSt
    .split("")
    .map(function (ele) {
      return isNaN(parseInt(ele)) ? ele : "a";
    })
    .join("");
  return ing;
}

/* Menu burger responsive */
const showMenu = (toggleId, NavId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(NavId);
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/* Enlevez menu lorsqu'on clique sur chaque lien Nav */
const navLink = document.querySelectorAll(".nav-link");

function linkActive() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((h) => h.addEventListener("click", linkActive));

/* Flèche retour vers le haut */
const sections = document.querySelectorAll("section[id");

function scrollActive() {
  sections.forEach((current) => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");
    if (
      this.scrollY > sectionTop &&
      this.scrollY <= sectionTop + sectionHeight
    ) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

function scrollHeader() {
  let header = document.getElementById("header");
  if (this.scrollY >= 200) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

function scrollTop() {
  let scrollTop = document.getElementById("scroll-top");
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show-scroll-top");
  } else {
    scrollTop.classList.remove("show-scroll-top");
  }
}
window.addEventListener("scroll", scrollTop);

/* Header */
/* API */
const APIURL = `https://themealdb.com/api/json/v1/1/random.php`;

let HomeInner = document.getElementById("home-inner");

async function getFood(url) {
  let resp = await fetch(url);
  let respDate = await resp.json();
  showFood(respDate.meals);
}

getFood(APIURL);

function showFood(Foods) {
  HomeInner.innerHTML = "";
  Foods.forEach((food) => {
    const { strMeal, strMealThumb } = food;
    let foodEl = document.createElement("div");
    foodEl.classList.add("swiper-slide");
    foodEl.style.cssText = `
    display: flex;
    justify-content: center; 
    align-items: center;
    padding-top: 3rem;
    height: 100%;`;
    foodEl.innerHTML = `
    <div class="home-data">
        <h1 class="home-title">${strMeal}</h1>
        <h2 class="home-subtitle">The best dishes of MealWeek</h2>
        <a href="" class="button">View More</a>
    </div>
    <img
        src="${strMealThumb}"
        alt=""
        class="home-img"
    />
    `;
    HomeInner.appendChild(foodEl);
  });
}

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*  Dark Theme */
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {

  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*  L'animation au scroll */
const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

sr.reveal(
  `.home-data, 
  .home-img,
  .about-data, 
  .about-img,
  .services-content`,

  {
    interval: 200,
  }
);

/* Menu */
/* API */
const APIURLMenu = `https://www.themealdb.com/api/json/v1/1/search.php?s=${justSt()}`;

let Menu = document.getElementById("Menu-inner");

async function getFoodMenu(url) {
  const resp = await fetch(url);
  const respDate = await resp.json();
  showFoodMenu(respDate.meals);
}
getFoodMenu(APIURLMenu);

function showFoodMenu(Foods) {
  Menu.innerHTML = "";
  function shuffle(start, end) {
    let randomNumber = Math.floor(Math.random() * 50);
    return randomNumber * start + end;
  }

  Foods.forEach((food) => {
    const { strMeal, strMealThumb, strArea } = food;
    let foodEl = document.createElement("div");
    foodEl.classList.add("menu-content");
    foodEl.innerHTML = `
    <img
    src="${strMealThumb}"
    alt=""
    class="menu-img"
  />
  <h3 class="menu-name">${strMeal}</h3> <br />
  <span class="menu-detail">Country : ${strArea}</span> <br />
  <span class="menu-preci">$${shuffle(3, 5)}</span>
  <div class="button menu-button">
  <i class="bx bx-cart-alt"></i></div> <br />
    `;
    Menu.appendChild(foodEl);

    foodEl.addEventListener('click', function () {
      modal.classList.toggle("show-modal");

      /* Ingrédient 1 */
      document.querySelector(`#recipe1`).innerHTML = `${food.strIngredient1}`;
      /* Ingrédient 2 */
      document.querySelector(`#recipe2`).innerHTML = `${food.strIngredient2}`;
      /* Ingrédient 3 */
      document.querySelector(`#recipe3`).innerHTML = `${food.strIngredient3}`;
      /* Ingrédient 4 */
      document.querySelector(`#recipe4`).innerHTML = `${food.strIngredient4}`;

      /* Ingrédient 5 */
      if (food.strIngredient5) {
        document.querySelector(`#recipe5`).innerHTML = `${food.strIngredient5}`;
      } else {
        document.querySelector(`#recipe5`).innerHTML = ``;
      }

      /* Ingrédient 6 */
      if (food.strIngredient6) {
        document.querySelector(`#recipe6`).innerHTML = `${food.strIngredient6}`;
      } else {
        document.querySelector(`#recipe6`).innerHTML = ``;
      }

      /* Ingrédient 7 */
      if (food.strIngredient7) {
        document.querySelector(`#recipe7`).innerHTML = `${food.strIngredient7}`;
      } else {
        document.querySelector(`#recipe7`).innerHTML = ``;
      }

      /* Ingrédient 8 */
      if (food.strIngredient8) {
        document.querySelector(`#recipe8`).innerHTML = `${food.strIngredient8}`;
      } else {
        document.querySelector(`#recipe8`).innerHTML = ``;
      }

      /* Ingrédient 9 */
      if (food.strIngredient9) {
        document.querySelector(`#recipe9`).innerHTML = `${food.strIngredient9}`;
      } else {
        document.querySelector(`#recipe9`).innerHTML = ``;
      }

      if (food.strIngredient10) {
        document.querySelector(`#recipe10`).innerHTML = `${food.strIngredient10}`;
      } else {
        document.querySelector(`#recipe10`).innerHTML = ``;
      }

    })
  })

}

/* Carte Modale */
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".menu-container");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);