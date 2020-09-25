class ArticleItem extends HTMLElement {
    set article(article) {
        this._article = article;
        this.render()
    }

    render() {
        this.innerHTML = `
            <article class="article-item">
                <img tabindex="0" class="article-item__thumbnail" src="${this._article.pictureId}" alt="${this._article.name}">
                <div class="article-item__content">
                    <p tabindex="0"><img src="../assets/images/logo/star.png" alt="rate" height="15px"/>${this._article.rating}</p> 
                    <p class="article-name" tabindex="0">${this._article.name}</p>
                    <p class="article-city" tabindex="0"><img src="../assets/images/logo/pin.png" alt="pin"> ${this._article.city}</p>
                    <p class="article-description" tabindex="0">${this._article.description}</p>
                </div>
            </article>`;
    }

}
customElements.define("article-item", ArticleItem);