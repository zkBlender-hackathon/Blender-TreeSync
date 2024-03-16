export function utf8ToHex(s: string) {
    const utf8encoder = new TextEncoder()
    const rb = utf8encoder.encode(s)
    let r = ""
    for (const b of rb) {
      r += ("0" + b.toString(16)).slice(-2)
    }
    return r
  }