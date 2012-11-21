# streams2

Turn a node 0.8 stream into a node 0.10 stream
  
Its useful because streams2 buffer internally, so you no longer need pause-stream

## Example

```js
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
