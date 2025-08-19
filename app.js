const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 10.99,
    img:
      "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
    desc: `Spicy rice cakes, serving with fish cake.`,
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 7.99,
    img:
      "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img:
      "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
    desc: `Boiling vegetables, serving with special hot sauce`,
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img:
      "https://thewoksoflife.com/wp-content/uploads/2014/11/dan-dan-noodles-12.jpg",
    desc: `Dan dan noodle, serving with green onion `,
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img:
      "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
    desc: `Yangzhou style fried rice, serving with bean and pickles `,
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img:
      "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
    desc: `Rice Sandwich, serving with soy sauce`,
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: "Korea",
    price: 15.99,
    img:
      "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
    desc: `Black bean sauce noodle, serving with green onion `,
  },
  {
    id: 8,
    title: "Ma Yi Shang Shu",
    category: "China",
    price: 12.99,
    img:
      "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
    desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
  },
  {
    id: 9,
    title: "Doroyaki",
    category: "Japan",
    price: 3.99,
    img:
      "https://www.justonecookbook.com/wp-content/uploads/2022/08/Japanese-Dorayaki-3708-800x1200.jpg",
    desc: `Red bean paste dessert, serving with honey.`,
  },
  {
    id: 10,
    title: "Ehomaki Sushi Roll",
    category: "Japan",
    price: 6.49,
    img:
      "https://www.justonecookbook.com/wp-content/uploads/2025/01/Ehomaki-Sushi-Roll-5730-II-800x1200.jpg",
    desc: `Fresh salmon over sushi rice.`,
  },
  {
    id: 11,
    title: "California Roll",
    category: "Japan",
    price: 8.49,
    img:
      "https://www.justonecookbook.com/wp-content/uploads/2024/04/California-Roll-7082-II-800x1200.jpg",
    desc: `Crab, avocado and cucumber rolled sushi.`,
  },
  {
    id: 12,
    title: "Spicy Tuna Roll",
    category: "Japan",
    price: 9.49,
    img:
      "https://www.justonecookbook.com/wp-content/uploads/2020/12/Spicy-Tuna-Rolls-8963.jpg",
    desc: `Spicy tuna with chili mayo and nori.`,
  },
];

// DOM referansları
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// Sayfa yüklendiğinde menü ve butonları oluştur
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

// Menüyü ekrana bas
function displayMenuItems(menuItems) {
  const displayMenu = menuItems
    .map(function (item) {
      return `
      <div class="menu-items col-lg-6 col-sm-12">
        <img src="${item.img}" alt="${item.title}" class="photo" />
        <div class="menu-info">
          <div class="menu-title">
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price.toFixed(2)}</h4>
          </div>
          <div class="menu-text">${item.desc}</div>
        </div>
      </div>`;
    })
    .join("");

  sectionCenter.innerHTML = displayMenu;
}

// Kategori butonlarını oluştur ve filtrele
function displayMenuButtons() {
  // Kategorileri benzersiz olarak topla (reduce kullanımı)
  const categories = menu.reduce(
    function (accumulator, currentItem) {
      if (!accumulator.includes(currentItem.category)) {
        accumulator.push(currentItem.category);
      }
      return accumulator;
    },
    ["All"]
  );

  // Her kategori için ürün sayısı (reduce kullanımı)
  const categoryCounts = menu.reduce(function (accumulator, currentItem) {
    accumulator[currentItem.category] = (accumulator[currentItem.category] || 0) + 1;
    return accumulator;
  }, {});

  // Butonları map ile üret
  const categoryBtns = categories
    .map(function (category) {
      const count = category === "All" ? menu.length : (categoryCounts[category] || 0);
      return `<button class="btn btn-outline-dark btn-item" data-category="${category}">${category} (${count})</button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;

  // Filtreleme olayları
  const filterButtons = btnContainer.querySelectorAll(".btn-item");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const category = event.currentTarget.dataset.category;
      const filteredMenu = category === "All"
        ? menu
        : menu.filter(function (item) { return item.category === category; });
      displayMenuItems(filteredMenu);
    });
  });
}
