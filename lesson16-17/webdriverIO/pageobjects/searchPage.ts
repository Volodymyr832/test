import { $, $$ } from '@wdio/globals';

class SearchPage {
    get productItems() {
        return $$('.product-item');
    }

    get categoryFilterToggle() {
        return $('//div[@class="filter-options-title" and contains(text(), "Category")]');
    }

    get firstCategoryOption() {
        return $('.filter-options-content .item a');
    }

    get filterCurrent() {
        return $('.filter-current');
    }

    async waitForResults() {
        await $('.product-items').waitForDisplayed({ timeout: 10000 });
    }

    async applyCategoryFilter() {
        await this.categoryFilterToggle.waitForDisplayed({ timeout: 10000 });
        await this.categoryFilterToggle.click();

        await this.firstCategoryOption.waitForDisplayed({ timeout: 10000 });
        await this.firstCategoryOption.scrollIntoView();
        await this.firstCategoryOption.click();
    }
}

export default new SearchPage();
