export function chunkMap (map, chunkSize) {
  const chunkedMaps = []
  const mapAsArray = Array.from(map)
  for (var i = 0; i < map.size; i += chunkSize) {
    let chunked = mapAsArray.slice(i, i + chunkSize)
    chunkedMaps.push(new Map(chunked))
  }
  return chunkedMaps
}

export function arrayChunk(array, size) {
  var results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
}

export function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce(function(xs, x, i) {
    return xs.concat([sep, x]);
  }, [arr[0]]);
}



export function toNumber(v) {
    if (v === undefined) {
        return v;
    }

    if (v === '') {
        return undefined;
    }
    if (typeof v === 'number') {
      return v;
    }
    if (v && v.trim() === '') {
        return NaN;
    }
    return Number(v);
}