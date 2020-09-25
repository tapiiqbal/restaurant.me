import "./article-item"
class ArticleList extends HTMLElement {
    set articles(articles) {
        this._articles = articles;
        this.render();
    }

    render() {
        for (let restaurant of this._articles) {
            const articleItemElement = document.createElement("article-item");
            articleItemElement.article = restaurant
            this.appendChild(articleItemElement)

        }
    }
}
customElements.define("article-list", ArticleList)