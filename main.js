function copy(obj) {
    var copyVal = Object.assign({}, obj);
    return copyVal;
};

var app = new Vue({
    el: '#app',
    data: {
        inputText: {
            time: '', content: '', completed: false, detail: ''
        },
        todoList: [
            { time: '2020年3月16日', content: '洗衣服', completed: false, detail: '' },
            { time: '2020年3月26日', content: '学习Vue', completed: false, detail: '清单' },
            { time: '2020年3月25日', content: '买纸巾', completed: false, detail: '去教超' },
        ]
    },
    methods: {
        addToDo: function () {
            let tempContent = this.inputText.content;
            if (!tempContent && tempContent !== 0) return;
            let tempText = copy(this.inputText);
            //加入数据
            this.todoList.push(tempText);
            //清空数据
            this.inputText.time = '';
            this.inputText.content = '';
            this.inputText.completed = false;
            this.inputText.detail = '';
        },
        deleteToDo: function () {

        }
    }
})