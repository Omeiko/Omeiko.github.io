#!/usr/bin/env python3
"""Generate the verified, one-page academic CV used by the website."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Image,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "minggu-wang-cv.pdf"
CREST = ROOT / "pics" / "image.png"

INK = colors.HexColor("#1d1d1f")
MUTED = colors.HexColor("#656568")
BRAND = colors.HexColor("#941f17")
GOLD = colors.HexColor("#dcae4b")
LINE = colors.HexColor("#d9d6cf")


def paragraph(text, style):
    return Paragraph(text, style)


def build_cv():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title="Minggu Wang - Academic CV",
        author="Minggu Wang",
        subject="AI research, publications, and scholarly profiles",
    )

    base = getSampleStyleSheet()
    name = ParagraphStyle(
        "Name", parent=base["Title"], fontName="Helvetica-Bold", fontSize=24,
        leading=27, textColor=INK, spaceAfter=4,
    )
    role = ParagraphStyle(
        "Role", parent=base["Normal"], fontName="Helvetica", fontSize=10.5,
        leading=14, textColor=BRAND,
    )
    contact = ParagraphStyle(
        "Contact", parent=base["Normal"], fontName="Helvetica", fontSize=8.2,
        leading=12, textColor=MUTED,
    )
    section = ParagraphStyle(
        "Section", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=9,
        leading=12, textColor=BRAND, spaceBefore=8, spaceAfter=6, uppercase=True,
    )
    body = ParagraphStyle(
        "Body", parent=base["Normal"], fontName="Helvetica", fontSize=8.8,
        leading=12.7, textColor=INK, spaceAfter=5,
    )
    small = ParagraphStyle(
        "Small", parent=body, fontSize=7.9, leading=11.2, textColor=MUTED,
    )
    paper_title = ParagraphStyle(
        "PaperTitle", parent=body, fontName="Helvetica-Bold", fontSize=8.7,
        leading=11.8, spaceAfter=2,
    )
    paper_meta = ParagraphStyle(
        "PaperMeta", parent=small, spaceAfter=2,
    )
    footer = ParagraphStyle(
        "Footer", parent=small, alignment=TA_RIGHT, fontSize=7.4,
    )

    crest = Image(str(CREST), width=25 * mm, height=24.4 * mm)
    header_copy = [
        paragraph("Minggu Wang", name),
        paragraph("AI Researcher · Kyushu University", role),
        Spacer(1, 4),
        paragraph(
            '<link href="mailto:wangminggu@outlook.com">wangminggu@outlook.com</link>  |  '
            '<link href="https://minggu.wang">minggu.wang</link>  |  Fukuoka, Japan',
            contact,
        ),
    ]
    header = Table([[header_copy, crest]], colWidths=[doc.width - 29 * mm, 29 * mm])
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    story = [
        header,
        Spacer(1, 7),
        HRFlowable(width="100%", thickness=1.2, color=GOLD, spaceAfter=8),
        paragraph("PROFILE", section),
        paragraph(
            "I study how AI systems generate, perceive, and fail - from quantum code generation "
            "to image editing and autonomous-driving robustness. My work connects benchmark design, "
            "generative methods, and system-level testing through measurable and reproducible evaluation.",
            body,
        ),
        paragraph("RESEARCH AREAS", section),
        Table(
            [[
                paragraph("<b>AI for Software Engineering</b><br/>Executable and semantic evaluation of generated programs.", small),
                paragraph("<b>Generative Vision</b><br/>Controllable image editing with identity and structure preservation.", small),
                paragraph("<b>Robustness &amp; Evaluation</b><br/>Testing model failures and downstream system consequences.", small),
            ]],
            colWidths=[doc.width / 3] * 3,
            style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (-1, 0), (-1, 0), 0),
                ("LEFTPADDING", (1, 0), (-1, 0), 8),
                ("RIGHTPADDING", (0, 0), (-2, 0), 8),
                ("LINEBEFORE", (1, 0), (-1, 0), 0.5, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]),
        ),
        paragraph("PUBLICATIONS", section),
    ]

    publications = [
        (
            "Improving Robustness of Semantic Segmentation for Autonomous Driving: A Case Study",
            "<b>Minggu Wang</b>, Zhiyong Zhou, Fuyuan Zhang, Jianjun Zhao, and Vinh Truong Duy Truong",
            "AITest 2026, pp. 156-163",
            "https://doi.org/10.1109/AITest70988.2026.00032",
        ),
        (
            "QuanBench: Benchmarking Quantum Code Generation with Large Language Models",
            "Xiaoyu Guo, <b>Minggu Wang</b>, and Jianjun Zhao",
            "ASE 2025, pp. 2657-2669",
            "https://doi.org/10.1109/ASE63991.2025.00218",
        ),
        (
            "Zero-shot Face Editing via ID-Attribute Decoupled Inversion",
            "Yang Hou, <b>Minggu Wang</b>, and Jianjun Zhao",
            "ICME 2025, pp. 1-6",
            "https://doi.org/10.1109/ICME59968.2025.11209805",
        ),
    ]

    for title, authors, venue, doi in publications:
        story.append(KeepTogether([
            paragraph(f'<link href="{doi}">{title}</link>', paper_title),
            paragraph(authors, paper_meta),
            paragraph(f'{venue} · <link href="{doi}">{doi.replace("https://doi.org/", "doi:")}</link>', paper_meta),
            Spacer(1, 5),
        ]))

    story.extend([
        paragraph("SCHOLARLY PROFILES", section),
        Table(
            [[
                paragraph('<b>Google Scholar</b><br/><link href="https://scholar.google.com/citations?user=1xge3_oAAAAJ">scholar.google.com</link>', small),
                paragraph('<b>OpenAlex</b><br/><link href="https://openalex.org/A5068827901">A5068827901</link>', small),
                paragraph('<b>Conference profile</b><br/><link href="https://conf.researchr.org/profile/mingguwang">conf.researchr.org</link>', small),
                paragraph('<b>GitHub</b><br/><link href="https://github.com/Omeiko">github.com/Omeiko</link>', small),
            ]],
            colWidths=[doc.width / 4] * 4,
            style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (-1, 0), (-1, 0), 0),
                ("LEFTPADDING", (1, 0), (-1, 0), 7),
                ("RIGHTPADDING", (0, 0), (-2, 0), 7),
                ("LINEBEFORE", (1, 0), (-1, 0), 0.5, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]),
        ),
        Spacer(1, 8),
        HRFlowable(width="100%", thickness=0.5, color=LINE, spaceBefore=2, spaceAfter=5),
        paragraph("Verified public record · Last updated October 2026", footer),
    ])

    doc.build(story)


if __name__ == "__main__":
    build_cv()
