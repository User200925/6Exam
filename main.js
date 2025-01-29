import movies from "./movie.js";

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortBy = document.getElementById("sortBy");

function generator(movies) {
    if (!movieContainer) {
        console.error("movieContainer element not found!");
        return;
    }

    movieContainer.innerHTML = ""; // Containerni tozalash

    // Faqat 15 ta filmni ko'rsatish uchun massivni cheklash
    const limitedMovies = movies.slice(0, 15);

    limitedMovies.forEach(movie => {
        const cardd = document.createElement("div");
        cardd.classList.add("card");
        cardd.innerHTML = `
            <img src="img/1200x675mf.jpg.png" alt="${movie.Title}" class="card-image">
            <div class="card-content" data-name="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.imdb_rating} &nbsp; | &nbsp; ${movie.movie_year} &nbsp; | &nbsp; ${Math.floor(movie.runtime / 60)} hr ${movie.runtime % 60} min</p>
                <p>${movie.Categories}</p>
                <button class="card-button" onclick="alert('More info about ${movie.Title}')">More info</button>
            </div>
        `;
        movieContainer.appendChild(cardd);
    });
}

// Search funksiyasi
function searchProduct() {
    const searchValue = searchInput.value.toLowerCase().trim();
    
    const productList = Array.from(document.querySelectorAll('.card-content')); // Kartalarni olish

    const filterProducts = productList.filter(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        return productName.includes(searchValue);
    });

    // Barcha mahsulotlarni yashirish
    productList.forEach(product => product.closest('.card').style.display = 'none');

    // Filtrlangan mahsulotlarni ko'rsatish
    filterProducts.forEach(product => product.closest('.card').style.display = '');
}

// `searchInput` da harflar kiritilganida qidiruvni yangilash
searchInput.addEventListener("input", searchProduct);

// Qidiruv tugmasiga bosilganda ham qidiruvni amalga oshirish
searchButton.addEventListener("click", searchProduct);

// Dastlabki generatorni chaqirish
document.addEventListener("DOMContentLoaded", function() {
    generator(movies);
});

// Sort funksiyasini chaqirish
function sortMovies() {
    const sortValue = sortBy.value;

    // Если выбрано "all", не сортируем
    if (sortValue === "all") {
        return;
    }

    let sortedMovies = [...movies]; // Копируем массив, чтобы не изменять оригинальный массив

    // Сортировка по алфавиту (по Title)
    if (sortValue === "alphabeticalAsc") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title)); // Сортировка по алфавиту по Title
    } else if (sortValue === "alphabeticalDesc") {
        sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title)); // Сортировка по убыванию по Title
    } else if (sortValue === "weightAsc") {
        sortedMovies.sort((a, b) => a.runtime - b.runtime); // Сортировка по длительности (runtime)
    } else if (sortValue === "weightDesc") {
        sortedMovies.sort((a, b) => b.runtime - a.runtime); // Сортировка по длительности в убывании
    }
}   

// Sort funksiyasini chaqirish
sortBy.addEventListener("change", sortMovies);












const filterType = document.getElementById("filterType");

function filterByCategory() {
    const selectedCategory = filterType.value.toLowerCase().trim();  // Tanlangan kategoriya

    const filteredMovies = movies.filter(movie => {
        // Agar "All" tanlangan bo'lsa, barcha filmlarni ko'rsatish
        if (selectedCategory === "all") {
            return true;
        }
        // Tanlangan kategoriya mavjud bo'lsa, u holda filtrlash
        return movie.Categories.toLowerCase().includes(selectedCategory);
    });

    generator(filteredMovies);  // Filtrlangan filmlarni ko'rsatish
}

// `filterType` select elementiga event listener qo'shish
filterType.addEventListener("change", filterByCategory);

// Dastlabki generatorni chaqirish
document.addEventListener("DOMContentLoaded", function() {
    generator(movies);  // Boshida barcha filmlar ko'rsatiladi
});

