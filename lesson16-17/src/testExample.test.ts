/*
Test Case 1: Product Search for "RZTK"
Open the main page: https://rozetka.com.ua/
Find the search input field:
CSS Selector: input[name='search']
XPath Selector: //input[@name='search']
Enter "RZTK" into the search input.
Click the Search button:
CSS Selector: button.search-form__submit
XPath Selector: //button[contains(@class,'search-form__submit')]
Expect the list of products to appear:
CSS Selector: ul.catalog-grid
XPath Selector: //ul[contains(@class,'catalog-grid')]

________________________________________________________________________________

Test Case 2: Filter Products by Price
Open the search result page:
https://rozetka.com.ua/search/?text=RZTK
Find the Minimum price field:
CSS Selector: input[formcontrolname='min']
XPath Selector: //input[@formcontrolname='min']
Enter the value "1000".
Find the Maximum price field:
CSS Selector: input[formcontrolname='max']
XPath Selector: //input[@formcontrolname='max']
Enter the value "5000".
Click the OK button to apply the filter:
CSS Selector: button.slider-filter__button
XPath Selector: //button[contains(@class,'slider-filter__button')]
Expect the product list to update:
CSS Selector: ul.catalog-grid
XPath Selector: //ul[contains(@class,'catalog-grid')]

_______________________________________________________________________


*/
