const Query = require('./query');
const Node = require('./node');


const n = new Node("User", {
    name: "Gonzalo",
    age: 1234
})

const q = new Query();

q.match(n);
console.log(q.build());