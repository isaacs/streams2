var ReadWriteStream = require("read-write-stream")
    , reemit = require("re-emitter").reemit

module.exports = wrap

function wrap(stream) {
    var queue = ReadWriteStream(write, end)
        , result = queue.stream

    stream.on("end", queue.end)

    stream.on("data", queue.push)

    reemit(stream, result, ["error", "drain"])

    for (var key in stream) {
        if (!result[key] && typeof stream[key] === "function") {
            result[key] = stream[key].bind(stream)
        }
    }

    return result

    function write(chunk) {
        stream.write(chunk)
    }

    function end() {
        stream.end()
        process.nextTick(finish)
    }

    function finish() {
        result.emit("finish")
    }
}
