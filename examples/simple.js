var fs = require("fs")
    , read = fs.createReadStream
    , write = fs.createWriteStream
    , wrap = require("..")

var writer = wrap(write("/tmp/noise"))

writer.end("some data")
writer.on("finish", function () {
    console.log("finished")
})

var reader = wrap(read("/tmp/noise"))

consume(reader, function (chunk) {
    console.log("data", String(chunk))
})

function consume(stream, consumer) {
    flow()

    stream.on("readable", flow)

    function flow() {
        var chunk = stream.read()
        while (chunk !== null) {
            consumer(chunk)
            chunk = stream.read()
        }
    }
}
