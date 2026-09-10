"""Build a public resume and a typography-based Open Graph card from public data.

Requires reportlab + Pillow. Use --font to select an installed Chinese TTF/TTC.
The source resume is deliberately not read or copied into the website.
"""
from pathlib import Path
import argparse
import json
from xml.sax.saxutils import escape

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--font', default='C:/Windows/Fonts/msyh.ttc')
args = parser.parse_args()
data = json.loads((ROOT / 'src/data/resume.json').read_text(encoding='utf-8'))
public = ROOT / 'public'
public.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Chinese', args.font))

INK = colors.HexColor('#182823')
GREEN = colors.HexColor('#28634d')
MUTED = colors.HexColor('#5b6a60')
base = ParagraphStyle('body', fontName='Chinese', fontSize=9, leading=15, textColor=INK, wordWrap='CJK', spaceAfter=4)
styles = {
    'name': ParagraphStyle('name', parent=base, fontSize=25, leading=32, textColor=GREEN, spaceAfter=5),
    'subtitle': ParagraphStyle('subtitle', parent=base, fontSize=10, leading=17, textColor=MUTED, spaceAfter=9),
    'section': ParagraphStyle('section', parent=base, fontSize=11, leading=18, textColor=GREEN, spaceBefore=12, spaceAfter=6),
    'project': ParagraphStyle('project', parent=base, fontSize=10, leading=17, spaceBefore=5, spaceAfter=3),
    'meta': ParagraphStyle('meta', parent=base, fontSize=8, leading=13, textColor=MUTED, spaceAfter=4),
    'body': base,
    'bullet': ParagraphStyle('bullet', parent=base, leftIndent=9, firstLineIndent=-9, fontSize=8.5, leading=14),
}

def para(text, style='body'):
    return Paragraph(escape(text), styles[style])

story = [para(data['name'], 'name'), para(f"{data['role']}  /  {data['email']}", 'subtitle')]
story.append(para('教育背景', 'section'))
story.extend(para(line) for line in data['education'])
story.append(para('技术能力', 'section'))
story.extend(para('• ' + line, 'bullet') for line in data['skills'])
story.append(para('项目经历', 'section'))
for project in data['projects']:
    block = [para(project['name'], 'project'), para(project['meta'], 'meta'), para(project['stack'], 'meta'), para(project['summary'])]
    block.extend(para('• ' + line, 'bullet') for line in project['work'])
    block.append(Spacer(1, 5))
    story.append(KeepTogether(block))

def decorate(canvas, doc):
    canvas.setTitle('严加恩 - 后端开发工程师 - 公开版简历')
    canvas.setAuthor('严加恩')
    canvas.setSubject('教育背景、技术能力与真实项目经历')
    canvas.setStrokeColor(colors.HexColor('#dbe2d4'))
    canvas.line(42, 39, A4[0] - 42, 39)
    canvas.setFont('Chinese', 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(42, 25, '公开版简历 · 联系方式仅保留邮箱')
    canvas.drawRightString(A4[0] - 42, 25, str(doc.page))

doc = SimpleDocTemplate(str(public / 'resume-jiaen-yan.pdf'), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=34, bottomMargin=50)
doc.build(story, onFirstPage=decorate, onLaterPages=decorate)

# This is a code-drawn sharing card, consistent with the website's native graphics.
card = Image.new('RGB', (1200, 630), '#f7f7f2')
draw = ImageDraw.Draw(card)
font = lambda size: ImageFont.truetype(args.font, size)
draw.rectangle((0, 0, 1200, 9), fill='#28634d')
draw.text((75, 65), '严加恩 / JIAEN YAN', font=font(25), fill='#28634d')
draw.text((75, 155), '把复杂业务，', font=font(64), fill='#182823')
draw.text((75, 245), '做成清晰可靠的系统。', font=font(64), fill='#28634d')
draw.line((75, 421, 1125, 421), fill='#d6dccf', width=2)
draw.text((75, 455), 'Java 后端开发者 · 工程实践 · AI 探索', font=font(24), fill='#63725f')
draw.text((75, 520), 'PORTFOLIO / SELECTED WORK', font=font(17), fill='#63725f')
draw.rounded_rectangle((955, 70, 1125, 145), radius=6, fill='#e5ecdd')
draw.text((980, 91), '认真构建', font=font(25), fill='#28634d')
card.save(public / 'og-cover.png', optimize=True)
print('Generated public/resume-jiaen-yan.pdf and public/og-cover.png')
