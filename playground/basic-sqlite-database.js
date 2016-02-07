var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});
var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

var User = sequelize.define('User', {
    email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
    // force: true
}).then(function() {
    console.log('everything is synced');

    User.findById(1).then(function(user) {
        user.getTodos({
            where: {
                completed: true
            }
        }).then(function(todos) {
            todos.forEach(function(todo) {
                console.log(todo.toJSON());
            });
        });
    })

    // User.create({
    //     email: 'whs@example.com'
    // }).then(function() {
    //     return Todo.create({
    //         description: 'cleand yard'
    //     });
    // }).then(function(todo) {
    //     return User.findById(1).then(function(user) {
    //         user.addTodo(todo);
    //     });
    // });

});