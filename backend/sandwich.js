// Clase para los tipos de sándwiches
class SandwichType {
    constructor(name, config) {
        this.name = name;
        this.protein = config.protein || "Turkey";
        this.cheese = config.cheese || "Cheddar";
        this.basePrice = config.price || 5.0;
    }
}

// Clase principal
class Sandwich {
    constructor(type = "regular") {
        this.bread = "White Bread";
        this.cheese = "Cheddar";
        this.vegetable = {};
        this.sauce = {};
        this.protein = "Turkey";
        this.basePrice = 5.0;

        this.applyType(type);

        this.extraPrices = {
            vegetable: {
                Tomato: 0.3,
                Spinach: 0.5,
                Onion: 0.3,
                Cucumber: 0.3,
            },
            sauce: {
                Chipotle: 0.5,
                Ranch: 0.5,
            },
        };
    }

    // Prefabricados
    applyType(typeName) {
        const types = {
            regular: new SandwichType("regular", {
                protein: "Turkey",
                cheese: "Cheddar",
                price: 5.0,
            }),
            veggie: new SandwichType("veggie", {
                protein: "None",
                cheese: "Swiss",
                price: 4.5,
            }),
            double: new SandwichType("double", {
                protein: "Double Turkey",
                cheese: "Cheddar",
                price: 6.5,
            }),
            spicy: new SandwichType("spicy", {
                protein: "Turkey",
                cheese: "Cheddar",
                price: 5.5,
            }),
        };

        if (types[typeName]) {
            const selectedType = types[typeName];
            this.protein = selectedType.protein;
            this.cheese = selectedType.cheese;
            this.basePrice = selectedType.basePrice;

            // Configuración adicional para tipos específicos
            if (typeName === "spicy") {
                this.sauce = "Chipotle";
            }
        }

        return this;
    }

    // Cambiar ingrediente
    changeIngredient(ingredient, newValue) {
        if (this.hasOwnProperty(ingredient)) {
            this[ingredient] = newValue;
        } else {
            console.log(`Ingrediente '${ingredient}' no válido`);
        }
        return this;
    }

    setMultipleIngredients(category, ingredients) {
        if (Array.isArray(ingredients)) {
            this[category] = ingredients;
        }
        return this;
    }

    setIngredientQuantities(category, quantities) {
        if (typeof quantities === "object") {
            this[category] = quantities;
        }
        return this;
    }

    // Precio final
    calculatePrice() {
        let total = this.basePrice;

        // Lógica de precios adicionales según ingredientes
        const priceModifiers = {
            cheese: {
                Gouda: 1.0,
            },
            sauce: {
                Chipotle: 0.5,
            },
            bread: {
                "Whole Wheat": 0.5,
            },
        };

        // Aplicar modificadores de precio
        for (const [ingredient, modifiers] of Object.entries(priceModifiers)) {
            if (modifiers[this[ingredient]]) {
                total += modifiers[this[ingredient]];
            }
        }

        // Calcular precio por cantidad de vegetales
        Object.entries(this.vegetable).forEach(([veg, qty]) => {
            if (this.extraPrices.vegetable[veg]) {
                total += this.extraPrices.vegetable[veg] * qty;
            }
        });

        // Calcular precio por cantidad de salsas
        Object.entries(this.sauce).forEach(([sauce, qty]) => {
            if (this.extraPrices.sauce[sauce]) {
                total += this.extraPrices.sauce[sauce] * qty;
            }
        });

        return total;
    }

    // Método para mostrar detalles del sándwich
    displayDetails() {
        return {
            bread: this.bread,
            cheese: this.cheese,
            vegetable: this.vegetable,
            sauce: this.sauce,
            protein: this.protein,
            price: this.calculatePrice(),
        };
    }

    // Para facilitar la visualización al hacer console.log
    toString() {
        return JSON.stringify(this.displayDetails(), null, 2);
    }
}

// SandwichMaker como una clase de fábrica
class SandwichMaker {
    static createSandwich(type = "regular") {
        return new Sandwich(type);
    }

    static modifyIngredient(sandwich, ingredient, newValue) {
        return sandwich.changeIngredient(ingredient, newValue);
    }

    static getPrice(sandwich) {
        return sandwich.calculatePrice();
    }
}

// Ejemplos de uso
const s1 = SandwichMaker.createSandwich("double");
console.log(s1.displayDetails());

const s2 = SandwichMaker.modifyIngredient(s1, "cheese", "Gouda");
console.log(s2.displayDetails());

console.log("Final Price: $" + SandwichMaker.getPrice(s2));

// Uso alternativo con encadenamiento de métodos
const customSandwich = new Sandwich("spicy")
    .changeIngredient("bread", "Whole Wheat")
    .changeIngredient("vegetable", "Spinach");

console.log(customSandwich.displayDetails());
console.log("Final Price: $" + customSandwich.calculatePrice());
