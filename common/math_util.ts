class MathUtil {
    static mag(x0: number, y0: number, x1: number, y1: number) {
        return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1))
    }

    static line(x0: number, y0: number, x1: number, y1: number, cb: (x: number, y: number) => void) {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;

        while (true) {
            cb(x0, y0);  // Do what you need to for this

            if (Math.abs(x0 - x1) < 0.0001 && Math.abs(y0 - y1) < 0.0001) break;
            var e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 < dx) { err += dx; y0 += sy; }
        }
    }

    static lerp(a: number, b: number, f: number) {
        if (a < b) {
            return a + (b - a) * f
        }
        return a - (a - b) * f
    }

    static clamp(v: number, f: number, t: number) {
        if (v < f) return f
        if (v > t) return t
        return v
    }

    static rand(items: any[]) {
        return items[Math.floor(Math.random() * (items.length - 0.1))]
    }
}