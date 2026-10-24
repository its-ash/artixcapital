import { jsPDF } from 'jspdf'

const LOGO_SRC = '/assets/logo.png'
const PAGE = { margin: 18, head: 34 }
const INK: [number, number, number] = [11, 12, 14]
const BODY: [number, number, number] = [52, 54, 60]
const MUTED: [number, number, number] = [143, 145, 152]

const readLogo = async () => {
  const blob = await (await fetch(LOGO_SRC)).blob()
  const url = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
  const img = new Image()
  img.src = url
  await img.decode()
  return { url, ratio: img.naturalHeight / img.naturalWidth }
}

export const downloadBrandPdf = async (title: string, text: string) => {
  const logo = await readLogo()
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const width = W - PAGE.margin * 2
  const logoW = 42
  const logoH = logoW * logo.ratio

  const header = () => {
    doc.setFillColor(...INK)
    doc.rect(0, 0, W, PAGE.head, 'F')
    doc.addImage(logo.url, 'PNG', PAGE.margin, (PAGE.head - logoH) / 2, logoW, logoH)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(236, 237, 238)
    doc.text('Artix Capital Ltd  ·  Reg. 2023-00122', W - PAGE.margin, PAGE.head / 2 + 1, { align: 'right' })
  }

  header()
  let y = PAGE.head + 16
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(...INK)
  const titleLines = doc.splitTextToSize(title.trim(), width)
  doc.text(titleLines, PAGE.margin, y)
  y += titleLines.length * 9 + 6

  const newPage = () => {
    doc.addPage()
    header()
    y = PAGE.head + 16
  }

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) {
      y += 3
      continue
    }
    const heading = /^\d+\.\s/.test(line) && line.length < 80
    doc.setFont('helvetica', heading ? 'bold' : 'normal')
    doc.setFontSize(heading ? 12 : 10)
    doc.setTextColor(...(heading ? INK : BODY))
    const lineHeight = heading ? 6.5 : 5
    if (heading) y += 3
    for (const part of doc.splitTextToSize(line, width) as string[]) {
      if (y > H - PAGE.margin) newPage()
      doc.text(part, PAGE.margin, y)
      y += lineHeight
    }
  }

  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setDrawColor(...MUTED)
    doc.setLineWidth(0.2)
    doc.line(PAGE.margin, H - 14, W - PAGE.margin, H - 14)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...MUTED)
    doc.text('artixcapital.com', PAGE.margin, H - 9)
    doc.text(`Page ${i} of ${pages}`, W - PAGE.margin, H - 9, { align: 'right' })
  }

  const name = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'artix-capital'
  doc.save(`${name}.pdf`)
}
