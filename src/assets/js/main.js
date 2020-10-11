import Helper from "./helper"
import ApiRestaurant from "../../api/api-restaurant"


const menu = document.querySelector('#menu');
const bodyElement = document.querySelector('body');

menu.addEventListener('click', function(event) {
    drawer.classList.toggle('open');
    event.stopPropagation();
});
bodyElement.addEventListener('click', function() {
    drawer.classList.remove('open');
});

const inputSearch = document.querySelector("input#search-item");
const btnSearch = document.querySelector("button#btn-search")
const enterElement = document.querySelector("#text-enter");

inputSearch.addEventListener("keyup", async(e) => {
    enterElement.innerHTML = `<p><i class="fa fa-exclamation-triangle"></i> Please enter or click button search</p>`
    if (e.keyCode === 13) {
        e.preventDefault();
        if (inputSearch.value === "") {
            return
        } else {
            const dtSearch = await Helper.filterSearch(inputSearch.value)
            if (dtSearch.length === 0) {
                Helper.openModal(inputSearch.value);
            } else {
                Helper.removeElement();
                const dtElement = document.querySelector('#body-content');
                const articleElement = document.createElement("article-list");
                articleElement.articles = dtSearch;
                dtElement.appendChild(articleElement)
            }
        }
    }
})

btnSearch.addEventListener("click", async _ => {
    if (inputSearch.value === "") {
        return
    } else {
        const dtSearch = await Helper.filterSearch(inputSearch.value);
        if (dtSearch.length === 0) {
            Helper.openModal(inputSearch.value);
        } else {
            const dtElement = document.querySelector('#body-content');
            Helper.removeElement();
            const articleElement = document.createElement("article-list");
            articleElement.articles = dtSearch;
            dtElement.appendChild(articleElement)
        }
    }
})

document.addEventListener('DOMContentLoaded', async(event) => {
    const response = await ApiRestaurant.getAll();
    const { restaurants } = response
    const dtElement = document.querySelector('#body-content');
    const articleElement = document.createElement("article-list");
    articleElement.articles = restaurants;
    dtElement.appendChild(articleElement)
});