class GraphicsUtil {
    static drawRoundRect(g: laya.display.Graphics, x: number, y: number, width: number, height: number, corner: number, color: string) {
        let path = [
            ["moveTo", corner, 0], //画笔的起始点，
            ["arcTo", width, 0, width, corner, corner], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", width, height, width - corner, height, corner],//p1（500,300）为夹角C，（470,300）为端点p2
            ["arcTo", 0, height, 0, height - corner, corner], //p1(0,300)为夹角D，（0,270）为端点p2
            ["arcTo", 0, 0, corner, 0, corner],//p1(0,0)为夹角A，（30,0）为端点p2
        ]
        g.drawPath(x, y, path, { fillStyle: color })
        // g.drawCircle(width * 0.5, height * 0.5, corner, "#000000")
    }

    static drawWiredRect(g: laya.display.Graphics, x: number, y: number, width: number, height: number, color: string) {
        g.drawLine(x, y, x + width, y, "#ffffff")
        g.drawLine(x + width, y, x + width, y + height, "#ffffff")
        g.drawLine(x, y + height, x + width, y + height, "#ffffff")
        g.drawLine(x, y, x, y + height, "#ffffff")
    }

    static drawRect(g: laya.display.Graphics, x: number, y: number, width: number, height: number, color: string) {
        g.drawRect(x, y, width, height, color)
    }

    static drawCircle(g: laya.display.Graphics, x: number, y: number, radius: number, color: string) {
        g.drawCircle(x, y, radius, color)
    }

    static drawWiredRoundRect(g: laya.display.Graphics, x: number, y: number, width: number, height: number, corner: number, color: string, lineWidth: number = 1) {
        g.drawCurves(x, y, [width - corner, 0, width, 0, width, corner], color, lineWidth) // right up 
        g.drawCurves(x, y, [width, height - corner, width, height, width - corner, height], color, lineWidth) // right bottom
        g.drawCurves(x, y, [0, height - corner, 0, height, corner, height], color, lineWidth) // left bottom
        g.drawCurves(x, y, [0, corner, 0, 0, corner, 0], color, lineWidth) // left up
    }
}