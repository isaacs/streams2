# streams2

Wrap a 0.8 stream into a streams2 stream

## Example

```
var fs = require("fs")
    , read = fs.createReadStream
    , write = fs.createWriteStream
    , wrap = require("streams2")

var stream = wrap(write("/tmp/noise"))

stream.end("some data")
stream.on("finish", function () {
    // finished writing
})

var stream = wrap(read("/tmp/noise"))

consume(stream, function (chunk) {
    // some data
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
```

## Installation

`npm install streams2`

## Contributors

 - Raynos

## MIT Licenced
