// TODO agregar mock de usuario

const recipesMock = [
    {
        id: 1,
        title: "Receta 1",
        ingredients: [],
        process: "Lorem ipsum dolor sit amet. Aut placeat aspernatur qui Quis culpa quo ullam voluptatem ut nulla eveniet eos obcaecati doloribus ea quibusdam esse. Qui eaque nulla hic ducimus impedit et vero magni. Id blanditiis harum qui molestiae quia qui unde omnis est fuga rerum. Est amet rerum rem exercitationem veniam sed repudiandae enim. Est esse ullam et Quis porro ut error quia et explicabo omnis ad nostrum similique qui fugiat natus et sunt quia. Aut quisquam ipsum et eaque alias aut possimus tempore. Nam enim ratione At error unde ab distinctio nemo ut vero minus non soluta nihil. Ea voluptas explicabo aut maxime labore ab eveniet corrupti qui autem quasi sit dolor temporibus. Et alias natus ut fuga libero in vitae consequuntur eos nihil aspernatur sed internos vitae et illo sint ut quod ducimus. Ex laboriosam dolor vel accusantium culpa et alias omnis. Aut numquam iure et vitae libero sit rerum quod ex perspiciatis eligendi qui dolores architecto eos repellat dolorem.",
        difficulty: 5,
        category: "category",
        author:"author_name",
        prep_time:"30 min",
        calification: 4.5,
        images: "https://www.themealdb.com//images//media//meals//8x09hy1560460923.jpg"
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
        calification: 4,
        images: "https://www.themealdb.com//images//media//meals//q8sp3j1593349686.jpg"
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
        calification: 3.5,
        images: "https://www.themealdb.com//images//media//meals//wqurxy1511453156.jpg"
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
        calification: 5,
        images: "https://www.themealdb.com//images//media//meals//178z5o1585514569.jpg"
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
        calification: 4.5,
        images: "https://www.themealdb.com//images//media//meals//2dsltq1560461468.jpg"
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
        calification: 5,
        images: "https://www.themealdb.com//images//media//meals//ypuxtw1511297463.jpg"
    }
]
// Las recetas creadas quedaran registradas en el sistema en estado borrador hasta que el usuario
// decida publicarlas.

export default recipesMock