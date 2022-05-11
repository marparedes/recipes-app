const recipesMock = [
    {
        id: 1,
        title: "Albóndigas con salsa de soja, puré de papas, y zanahoria asada",
        ingredients: "5 papas, 350 gramos de zanahoria, 1 cebollino, 1 diente de ajo, 1 rodaja de pan, 1 frasco de polvo de ajo, 2 botellas de salsa de soja, 1/2 kilo de carne picada, 1 botella de aceite de oliva, 2 cucharadas de azúcar, 2 cucharadas de manteca.",
        process: "1.\n" +
          "Preheat oven to 425 degrees.\n" +
          "Wash and dry all produce.\n" +
          "Dice potatoes into 1/2-inch pieces.\n" +
          "Trim, peel, and cut carrots on a diagonal into 1/2-inch-thick pieces.\n" +
          "Trim and thinly slice scallions, separating whites from greens; finely chop whites.\n" +
          "Peel and finely chop garlic.\n" +
          "2.\n" +
          "In a medium bowl, soak bread with 2 TBSP water (4 TBSP for 4 servings); break up with your hands until pasty.\n" +
          "Stir in beef, sriracha, scallion whites, half the garlic, salt (we used 3/4 tsp kosher salt; 11/2 tsp for 4), and pepper.\n" +
          "Form into two 1-inch-tall loaves (four loaves for 4).\n" +
          "Place on one side of a baking sheet.\n" +
          "Toss carrots on empty side of same sheet with a drizzle of oil, salt, and pepper.\n" +
          "(For 4, spread meatloaves out across whole sheet and add carrots to a second sheet.\n" +
          ") Bake for 20 minutes (we'll glaze the meatloaves then).\n" +
          "3.\n" +
          "Meanwhile, place potatoes in a medium pot with enough salted water to cover by 2 inches.\n" +
          "Bring to a boil and cook until very tender, 12-15 minutes.\n" +
          "Reserve 1/2 cup potato cooking liquid, then drain.\n" +
          "While potatoes cook, in a small bowl, combine soy sauce, garlic powder, 1/4 cup ketchup (1/2 cup for 4 servings), and 2 tsp sugar (4 tsp for 4).\n" +
          "4.\n" +
          "Once meatloaves and carrots have baked 20 minutes, remove from oven.\n" +
          "Spoon half the ketchup glaze over meatloaves (save the rest for serving); return to oven until carrots are browned and tender, meatloaves are cooked through, and glaze is tacky, 4-5 minutes more.\n" +
          "5.\n" +
          "Meanwhile, melt 2 TBSP butter (4 TBSP for 4 servings) in pot used for potatoes over medium heat.\n" +
          "Add remaining garlic and cook until fragrant, 30 seconds.\n" +
          "Add potatoes and 1/4 tsp wasabi.\n" +
          "Mash, adding splashes of reserved potato cooking liquid as necessary until smooth.\n" +
          "Season with salt and pepper.\n" +
          "(If you like things spicy, stir in more wasabi!)\n" +
          "6.\n" +
          "Divide meatloaves, mashed potatoes, and roasted carrots between plates.\n" +
          "Sprinkle with scallion greens and serve with remaining ketchup glaze on the side for dipping.",
        difficulty: 4,
        category: "Carne",
        author: "hsimpson",
        score: 4.5,
        images: ["https://www.themealdb.com/images/media/meals/o2wb6p1581005243.jpg", "https://www.themealdb.com//images//media//meals//8x09hy1560460923.jpg"]
    },
    {
        id: 2,
        title: "Receta 2",
        ingredients: [],
        process: "Lorem ipsum dolor sit amet. Aut placeat aspernatur qui Quis culpa quo ullam voluptatem ut nulla eveniet eos obcaecati doloribus ea quibusdam esse. Qui eaque nulla hic ducimus impedit et vero magni. Id blanditiis harum qui molestiae quia qui unde omnis est fuga rerum. Est amet rerum rem exercitationem veniam sed repudiandae enim. Est esse ullam et Quis porro ut error quia et explicabo omnis ad nostrum similique qui fugiat natus et sunt quia. Aut quisquam ipsum et eaque alias aut possimus tempore. Nam enim ratione At error unde ab distinctio nemo ut vero minus non soluta nihil. Ea voluptas explicabo aut maxime labore ab eveniet corrupti qui autem quasi sit dolor temporibus. Et alias natus ut fuga libero in vitae consequuntur eos nihil aspernatur sed internos vitae et illo sint ut quod ducimus. Ex laboriosam dolor vel accusantium culpa et alias omnis. Aut numquam iure et vitae libero sit rerum quod ex perspiciatis eligendi qui dolores architecto eos repellat dolorem.",
        difficulty: 5,
        category: "category",
        author:"author_name",
        prep_time:"30 min",
        score: 4,
        images: ["https://www.themealdb.com//images//media//meals//q8sp3j1593349686.jpg"]
    },
    {
        id: 3,
        title: "Receta 3",
        ingredients: [],
        process: "Lorem ipsum dolor sit amet. Aut placeat aspernatur qui Quis culpa quo ullam voluptatem ut nulla eveniet eos obcaecati doloribus ea quibusdam esse. Qui eaque nulla hic ducimus impedit et vero magni. Id blanditiis harum qui molestiae quia qui unde omnis est fuga rerum. Est amet rerum rem exercitationem veniam sed repudiandae enim. Est esse ullam et Quis porro ut error quia et explicabo omnis ad nostrum similique qui fugiat natus et sunt quia. Aut quisquam ipsum et eaque alias aut possimus tempore. Nam enim ratione At error unde ab distinctio nemo ut vero minus non soluta nihil. Ea voluptas explicabo aut maxime labore ab eveniet corrupti qui autem quasi sit dolor temporibus. Et alias natus ut fuga libero in vitae consequuntur eos nihil aspernatur sed internos vitae et illo sint ut quod ducimus. Ex laboriosam dolor vel accusantium culpa et alias omnis. Aut numquam iure et vitae libero sit rerum quod ex perspiciatis eligendi qui dolores architecto eos repellat dolorem.",
        difficulty: 5,
        category: "category",
        author:"author_name",
        prep_time:"30 min",
        score: 3.5,
        images: ["https://www.themealdb.com//images//media//meals//wqurxy1511453156.jpg"]
    },
    {
        id: 4,
        title: "Receta 4",
        ingredients: [],
        process: "Lorem ipsum dolor sit amet. Aut placeat aspernatur qui Quis culpa quo ullam voluptatem ut nulla eveniet eos obcaecati doloribus ea quibusdam esse. Qui eaque nulla hic ducimus impedit et vero magni. Id blanditiis harum qui molestiae quia qui unde omnis est fuga rerum. Est amet rerum rem exercitationem veniam sed repudiandae enim. Est esse ullam et Quis porro ut error quia et explicabo omnis ad nostrum similique qui fugiat natus et sunt quia. Aut quisquam ipsum et eaque alias aut possimus tempore. Nam enim ratione At error unde ab distinctio nemo ut vero minus non soluta nihil. Ea voluptas explicabo aut maxime labore ab eveniet corrupti qui autem quasi sit dolor temporibus. Et alias natus ut fuga libero in vitae consequuntur eos nihil aspernatur sed internos vitae et illo sint ut quod ducimus. Ex laboriosam dolor vel accusantium culpa et alias omnis. Aut numquam iure et vitae libero sit rerum quod ex perspiciatis eligendi qui dolores architecto eos repellat dolorem.",
        difficulty: 5,
        category: "category",
        author:"author_name",
        prep_time:"30 min",
        score: 5,
        images: ["https://www.themealdb.com//images//media//meals//178z5o1585514569.jpg"]
    },
    {
        id: 5,
        title: "Receta 5",
        ingredients: [],
        process: "Lorem ipsum dolor sit amet. Aut placeat aspernatur qui Quis culpa quo ullam voluptatem ut nulla eveniet eos obcaecati doloribus ea quibusdam esse. Qui eaque nulla hic ducimus impedit et vero magni. Id blanditiis harum qui molestiae quia qui unde omnis est fuga rerum. Est amet rerum rem exercitationem veniam sed repudiandae enim. Est esse ullam et Quis porro ut error quia et explicabo omnis ad nostrum similique qui fugiat natus et sunt quia. Aut quisquam ipsum et eaque alias aut possimus tempore. Nam enim ratione At error unde ab distinctio nemo ut vero minus non soluta nihil. Ea voluptas explicabo aut maxime labore ab eveniet corrupti qui autem quasi sit dolor temporibus. Et alias natus ut fuga libero in vitae consequuntur eos nihil aspernatur sed internos vitae et illo sint ut quod ducimus. Ex laboriosam dolor vel accusantium culpa et alias omnis. Aut numquam iure et vitae libero sit rerum quod ex perspiciatis eligendi qui dolores architecto eos repellat dolorem.",
        difficulty: 5,
        category: "category",
        author:"author_name",
        prep_time:"30 min",
        score: 4.5,
        images: ["https://www.themealdb.com//images//media//meals//2dsltq1560461468.jpg"]
    },
    {
        id: 6,
        title: "Receta 6",
        ingredients: [],
        process: "Lorem ipsum dolor sit amet. Aut placeat aspernatur qui Quis culpa quo ullam voluptatem ut nulla eveniet eos obcaecati doloribus ea quibusdam esse. Qui eaque nulla hic ducimus impedit et vero magni. Id blanditiis harum qui molestiae quia qui unde omnis est fuga rerum. Est amet rerum rem exercitationem veniam sed repudiandae enim. Est esse ullam et Quis porro ut error quia et explicabo omnis ad nostrum similique qui fugiat natus et sunt quia. Aut quisquam ipsum et eaque alias aut possimus tempore. Nam enim ratione At error unde ab distinctio nemo ut vero minus non soluta nihil. Ea voluptas explicabo aut maxime labore ab eveniet corrupti qui autem quasi sit dolor temporibus. Et alias natus ut fuga libero in vitae consequuntur eos nihil aspernatur sed internos vitae et illo sint ut quod ducimus. Ex laboriosam dolor vel accusantium culpa et alias omnis. Aut numquam iure et vitae libero sit rerum quod ex perspiciatis eligendi qui dolores architecto eos repellat dolorem.",
        difficulty: 5,
        category: "category",
        author:"author_name",
        prep_time:"30 min",
        score: 5,
        images: ["https://www.themealdb.com//images//media//meals//ypuxtw1511297463.jpg"]
    }
]
// Las recetas creadas quedaran registradas en el sistema en estado borrador hasta que el usuario
// decida publicarlas.

export default recipesMock