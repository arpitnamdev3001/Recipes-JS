const URL = "https://dummyjson.com/recipes";
fetch(URL).then(res => {
    return res.json();
}).then(data => {
    const recipes = data.recipes;
    console.log(recipes);
    const categorizedRecipes = recipes.reduce((acc, recipe) => {
      if (!acc[recipe.cuisine]) {
        acc[recipe.cuisine] = [];
      }
      acc[recipe.cuisine].push(recipe);
      return acc;
    }, {});

    const allCategories = Object.keys(categorizedRecipes);
    const specificCategories = allCategories.slice(0, 2);

    const container = document.querySelector('.first');
    const numberOfProductsToDisplay = 8;
    const productsToDisplay = recipes.slice(0, numberOfProductsToDisplay);
    productsToDisplay.forEach(recipe => {
        const addDiv = document.createElement('div');
        addDiv.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
        addDiv.innerHTML = 
       `
          <div class="box">
            <a href="#">
              <div class="img-box">
                <img src="${recipe.image}" alt="${recipe.name}">
              </div>
              <div class="detail-box">
                <h6>
                  ${recipe.name}
                </h6>
                <h6>
                  Category
                  <span>
                    ${recipe.cuisine}
                  </span>
                </h6>
              </div>
              <div class="new">
                <span>
                  New
                </span>
              </div>
            </a>
        </div>`;
    container.appendChild(addDiv);
    
    });
    // Populate specific categories
    specificCategories.forEach((category, index) => {
      const container = document.querySelector(`.category-${index + 1}`);
      const recipesToDisplay = categorizedRecipes[category].slice(0, 4); // Display up to 4 recipes per category

      recipesToDisplay.forEach(recipe => {
        const addDiv = document.createElement('div');
        addDiv.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
        addDiv.innerHTML = `
          <div class="box">
            <a href="#">
              <div class="img-box">
                <img src="${recipe.image}" alt="${recipe.name}">
              </div>
              <div class="detail-box">
                <h6>${recipe.name}</h6>
                <h6>Category <span>${recipe.cuisine}</span></h6>
              </div>
              <div class="new">
                <span>New</span>
              </div>
            </a>
          </div>
        `;
        container.appendChild(addDiv);
      });
    });
  })