import ApiRestaurant from "../../api/api-restaurant"
class Helper {
    static async filterSearch(query) {
        const dt = await this.getData();
        return dt.filter((el) => {
            let restaurantName = el.name;
            return restaurantName.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }

    static async getData() {
        const response = await ApiRestaurant.getAll();
        const { restaurants } = response
        return restaurants

    }
    static removeElement() {
        document.querySelector("article-list").remove();
    }
    static openModal(param) {
        const modalElement = document.querySelector("#modal");
        modalElement.innerHTML = `
            <div class="modal" id="modal">
                <div class="modal-guts">
                    <img tabindex="0" class="img-center" src="assets/images/error-1.png" alt="caution" style=" max-width: 100%;
            height: 100px;">
                    <div class="text-center">
                        <p tabindex="0" class="title">Oops...</p>
                        <p tabindex="0" class="content">${param} not found</p>
                        <button tabindex="0" id="close-button" class="confirm">Ok</button>
                    </div>
                </div>
            </div>
            `;
        const modal = document.querySelector(".modal");
        modal.addEventListener("click", _ => {
            modal.classList.toggle("closed");
            modal.remove()
        })

    }
}
export default Helper