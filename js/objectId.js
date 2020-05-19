// get random Ids
function getId() {
    return this.hex(Date.now() / 1000) +
        ' '.repeat(16).replace(/./g, () => this.hex(Math.random() * 16))
}
// round up
function hex(value) {
    return Math.floor(value).toString(16)
}

const timeStamp = () => new Date().getTime();