

function copy(obj) {
    var copyVal = Object.assign({}, obj);
    return copyVal;
};

var filters = {
    all: function (todos) {
        return todos;
    },
    uncompleted: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        })
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed;
        })
    }
}


var app = new Vue({
    el: '#app',
    data: {
        inputText: {},
        todoList: [],
        lastId: 0,
        visibility: "all",
    },
    methods: {
        getId: function () {
            this.lastId += 1;
            ms.set('lastId', this.lastId);
            return this.lastId;
        },
        findById: function (id) {
            return this.todoList.findIndex(function (item) {
                return item.id == id;
            })
        },
        resetInput() {
            this.inputText = copy({});
        },
        addToDo: function () {
            let tempContent = this.inputText.content;
            if (!tempContent && tempContent !== 0) return;

            let tempText = copy(this.inputText);
            tempText.id = this.getId();
            tempText.completed = false;
            //加入数据
            this.todoList.push(tempText);
            //清空数据
            this.resetInput();
        },
        deleteToDo: function (id) {
            var index = this.findById(id);
            this.todoList.splice(index, 1);
        },
        toggleComplete: function (id) {
            var index = this.findById(id);
            Vue.set(this.todoList[index], 'completed', !this.todoList[index].completed);
        },

    },
    mounted: function () {
        this.todoList = ms.get('todoList') || this.todoList;
        this.lastId = ms.get('lastId') || this.lastId;
    },
    watch: {
        todoList: {
            deep: true,
            handler: function (newVal, oldVal) {
                ms.set('todoList', newVal);
            }
        }
    },
    computed: {

    }
});

function onHashChange() {
    var visibility = window.location.hash.replace(/#\/?/, "");//正则表达式，空字符替换#
    if (filters[visibility]) {
        app.visibility = visibility;
    } else {
        window.location.hash = "";
        app.visibility = "all";
    }
};

window.addEventListener("hashchange", onHashChange);
onHashChange();