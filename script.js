// Sandwich Maker
function makeSandwich(type) {
    let bread = "White Bread";
    let cheese = "Cheddar";
    let vegetable = "Lettuce";
    let sauce = "Mayo";
    let protein = "Turkey";
    let price = 5.0;

    if (type === "veggie") {
        protein = "None";
        cheese = "Swiss";
        price = 4.5;
    }
    if (type === "double") {
        protein = "Double Turkey";
        price = 6.5;
    }
    if (type === "spicy") {
        sauce = "Chipotle";
        price = 5.5;
    }

    return { bread, cheese, vegetable, sauce, protein, price };
}

const s1 = makeSandwich("double");
console.log(s1);

// Ingredient Changer
function changeIngredient(sandwich, oldIng, newIng) {
    if (oldIng === "bread") {
        sandwich.bread = newIng;
    }
    if (oldIng === "cheese") {
        sandwich.cheese = newIng;
    }
    if (oldIng === "vegetable") {
        sandwich.vegetable = newIng;
    }
    if (oldIng === "sauce") {
        sandwich.sauce = newIng;
    }
    if (oldIng === "protein") {
        sandwich.protein = newIng;
    }
    return sandwich;
}

const s2 = changeIngredient(s1, "cheese", "Gouda");
console.log(s2);

// Pricing (bad structure)
function getPrice(sandwich) {
    let total = sandwich.price;
    if (sandwich.cheese === "Gouda") {
        total += 1;
    }
    if (sandwich.sauce === "Chipotle") {
        total += 0.5;
    }
    if (sandwich.bread === "Whole Wheat") {
        total += 0.5;
    }
    return total;
}

console.log("Final Price: $" + getPrice(s2));
