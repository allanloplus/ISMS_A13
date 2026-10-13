"""從角色設定圖裁切表情、去背，輸出 characters/*.png。
用法：python3 tools/extract_chars.py <Allan設定圖> <阿拉蕾設定圖>
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "characters")

# Allan 表情包（2000x1493）：row1 微笑/大笑/思考/抓頭；row2 驚訝/提醒/眨眼/說話
# 每格以臉部中心 ±175 等寬裁切，讓各表情畫格位置一致（切換時臉不會跳動）
A_COLS = [(c - 175, c + 175) for c in (890, 1200, 1503, 1812)]
A_ROWS = [(788, 1122), (1132, 1468)]
A_NAMES = ["smile", "laugh", "think", "scratch", "shock", "point", "wink", "worry"]
# 阿拉蕾表情框：row1 大笑/思考/驚訝/疑問；row2 說明/哭哭/讚/加油
R_COLS = [(432, 800), (818, 1186), (1205, 1573), (1590, 1958)]
R_ROWS = [(802, 1118), (1138, 1454)]
R_NAMES = ["laugh", "think", "shock", "ask", "talk", "cry", "wink", "cheer"]


def cutout(img, box, inset=0, keep_bottom=False):
    x0, y0, x1, y1 = box
    c = img.crop((x0 + inset, y0 + inset, x1 - inset, y1 - inset)).convert("RGB")
    a = np.asarray(c).astype(int)
    # 近白色且與邊界連通 → 背景
    white = (a.min(axis=2) > 222) & (a.max(axis=2) - a.min(axis=2) < 28)
    lab, _ = ndimage.label(white)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    fg = ~bg
    # 只保留最大連通前景（排除隔壁格的殘片、問號等）
    flab, n = ndimage.label(fg)
    if n > 1:
        sizes = ndimage.sum(fg, flab, range(1, n + 1))
        fg = flab == (1 + int(np.argmax(sizes)))
    fg = ndimage.binary_fill_holes(fg) if not keep_bottom else fg | ndimage.binary_fill_holes(fg)
    alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    out = c.convert("RGBA"); out.putalpha(alpha)
    return out


def main(a_path, r_path):
    os.makedirs(OUT, exist_ok=True)
    A, R = Image.open(a_path), Image.open(r_path)
    for i, n in enumerate(A_NAMES):
        (x0, x1), (y0, y1) = A_COLS[i % 4], A_ROWS[i // 4]
        cutout(A, (x0, y0, x1, y1)).save(f"{OUT}/allan_{n}.png")
    for i, n in enumerate(R_NAMES):
        (x0, x1), (y0, y1) = R_COLS[i % 4], R_ROWS[i // 4]
        cutout(R, (x0, y0, x1, y1), inset=9, keep_bottom=True).save(f"{OUT}/arale_{n}.png")


if __name__ == "__main__":
    main(*sys.argv[1:3])


def mouth_frames():
    """產生嘴型動畫用的額外畫格：allan_talk（張嘴）、arale_talk_c（閉嘴）。"""
    from PIL import ImageDraw
    # Allan：在微笑圖上畫出張開的嘴
    im = Image.open(f"{OUT}/allan_smile.png").convert("RGBA")
    big = im.resize((im.width * 4, im.height * 4), Image.LANCZOS)
    d = ImageDraw.Draw(big)
    S = 4
    cx, hw, y0, dep = 127 + 52, 37, 185 + 5, 18  # 嘴巴中心、半寬、上緣、張開深度
    f = lambda x, w: max(0.0, 1 - ((x - cx) / w) ** 2)
    up = [(x * S, (y0 + 7 * f(x, hw)) * S) for x in range(cx - hw, cx + hw + 1)]
    lo = [(x * S, (y0 + 7 * f(x, hw) + dep * f(x, hw) ** 0.7) * S) for x in range(cx + hw, cx - hw - 1, -1)]
    d.polygon(up + lo, fill=(110, 30, 34, 255), outline=(25, 20, 20, 255), width=3 * S)
    t1 = [(x * S, (y0 + 2 + 7 * f(x, hw - 6)) * S) for x in range(cx - hw + 7, cx + hw - 6)]
    t2 = [(x * S, (y0 + 7 + 7 * f(x, hw - 8)) * S) for x in range(cx + hw - 7, cx - hw + 6, -1)]
    d.polygon(t1 + t2, fill=(255, 255, 255, 255))
    d.ellipse(((cx - 15) * S, (y0 + 15) * S, (cx + 15) * S, (y0 + 24) * S), fill=(232, 120, 120, 255))
    big.resize(im.size, Image.LANCZOS).save(f"{OUT}/allan_talk.png")

    # 阿拉蕾：把張嘴的說明圖改為閉嘴微笑
    im = Image.open(f"{OUT}/arale_talk.png").convert("RGBA")
    a = np.asarray(im)
    skin = tuple(int(v) for v in np.median(a[189:199, 129:141, :3].reshape(-1, 3), axis=0)) + (255,)
    big = im.resize((im.width * 4, im.height * 4), Image.LANCZOS)
    d = ImageDraw.Draw(big)
    d.ellipse((146 * S, 169 * S, 177 * S, 205 * S), fill=skin)
    d.arc((147 * S, 173 * S, 177 * S, 195 * S), 25, 155, fill=(40, 22, 22, 255), width=3 * S)
    big.resize(im.size, Image.LANCZOS).save(f"{OUT}/arale_talk_c.png")


if __name__ == "__main__":
    mouth_frames()
