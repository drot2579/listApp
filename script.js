const el = {
    html: document.querySelector("html"),
    body: document.querySelector("body"),
    header: document.querySelector("header"),
    main: document.querySelector("main"),
    footer: document.querySelector("footer"),
}

const list = {
    el: document.getElementById("list"),
    cont: document.getElementById("cont"),

    items: [],
    itemId: 100
}

document.body.focus()
let timeInter = null;
class Item {
    static get cont() { return document.getElementById("list"); }
    static idnum = 100;
    static list = [];
    static class = Item.name.toLowerCase();

    static delParent = function (e) {
        e.target.parentElement.remove()
    }
    static toggleReadOnly = function (e) {
        e.target.previousElementSibling.toggleAttribute("readonly")
    }
    static remReadOnly = function (e) {
        e.target.toggleAttribute("readonly")
    }

    static pressHold = function (e) {
        setTimeout(() => {
            e.target.toggleAttribute("readonly")
        }, 2000);
    }


    el = document.createElement("li")
    textBox = document.createElement("input")
    btnD = document.createElement("button")
    btnE = document.createElement("button")

    static holdTimer = 0


    constructor(text) {
        let idnum = Item.idnum++

        this.textBox.value = text;
        this.textBox.toggleAttribute("readonly")

        this.btnE.innerText = "🖋️"
        this.btnE.classList.add("btnE")

        this.btnD.innerText = "🗑️"
        this.btnD.classList.add("btnD")
        this.btnD.addEventListener("click", (e) => {
            e.target.parentElement.remove()
        })




        this.btnE.addEventListener("click", (e) => {
            let target = e.target.previousElementSibling
            console.time()

            target.focus()
            target.removeAttribute("readonly")
        })

        this.textBox.addEventListener("change", (e) => {
            console.time()

            e.target.toggleAttribute("readonly")
        })

        this.textBox.addEventListener("dblclick", (e) => {
            console.time()

            e.target.toggleAttribute("readonly")
            e.target.focus()
        })


        // HOLD
        this.textBox.addEventListener("mousedown", (e) => {
            console.time()

            timeInter = setInterval(() => {
                console.log(Item.holdTimer);
                if ((Item.holdTimer += 100) > 1000) {
                    e.target.removeAttribute("readonly")
                    clearInterval(timeInter)
                    Item.holdTimer = 0;
                }
            }, 100)
        })
        this.textBox.addEventListener("mouseup", (e) => {
            console.time()
            clearInterval(timeInter)
            Item.holdTimer = 0;
        })

        this.textBox.addEventListener("focusout", (e) => {
            console.time()
            e.target.setAttribute("readonly", "true")
        })

        this.el.append(this.btnD, this.textBox, this.btnE)
        Item.cont.append(this.el)
    }
}

const input = {
    get el() { return document.getElementById("input") },
    listeners: [
        {
            type: "change",
            fn: (e) => {
                let item = new Item(e.target.value)
                e.target.value = ""
            }
        },
    ],
    addListeners() {
        this.listeners.forEach(listener => {
            this.el.addEventListener(listener.type, listener.fn)
        })
    }
}

input.addListeners()
// Clear all button
document.getElementById("btnClear").addEventListener("click", (e) => {
    document.querySelectorAll(".cont li").forEach((li) => {
        console.log(li);
        li.remove()
    })
})


new Item(`buy pineapple`)
new Item(`prepare presantation`)
new Item(`pay the phone bill`)
new Item(`buy socks`)

