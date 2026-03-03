# Stage 9 — Export (PDF & Excel) and Import Functionality

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🟠 High

---

## Problem

The PDF, XLS, and Import buttons in `ModuleComponent.vue` were purely decorative — clicking them did nothing.

---

## Implementation

### Excel Export (`exportExcel`)

Uses the **xlsx** library (already installed in `package.json`):

```js
import * as XLSX from 'xlsx'

const exportExcel = () => {
  // Build data using column labels as headers
  const exportData = filteredData.value.map(item => {
    const row = {}
    props.columns.forEach(col => { row[col.label] = item[col.field] ?? '' })
    return row
  })
  const ws = XLSX.utils.json_to_sheet(exportData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, props.title || 'Sheet1')
  XLSX.writeFile(wb, `${props.title}_${date}.xlsx`)
}
```

**Behavior:**
- Exports **currently filtered/sorted data** (respects search filters)
- Column headers match the table column labels
- Filename: `{Title}_{YYYY-MM-DD}.xlsx`

---

### PDF Export (`exportPDF`)

Uses the browser's native **print dialog** — no additional libraries needed:

```js
const exportPDF = () => {
  const printContent = `<html>...<table>...</table></html>`
  const w = window.open('', '_blank')
  w.document.write(printContent)
  w.document.close()
  w.print()
}
```

**Behavior:**
- Opens the browser print dialog in a new tab
- Includes a clean table with current data
- User can "Save as PDF" or print physically
- No external PDF library required

---

### Import (`handleImport`)

The Import button is now a `<label>` wrapping a hidden `<input type="file">`:

```html
<label>
  Import
  <input type="file" accept=".xlsx,.xls,.csv" class="hidden" @change="handleImport" />
</label>
```

The handler:
1. Reads the file using `FileReader`
2. Parses with `XLSX.read()`
3. Converts to JSON array with `XLSX.utils.sheet_to_json()`
4. Shows a confirmation dialog: "Import N records?"
5. Loops through rows calling `props.addItem(row)` for each
6. Refreshes the table
7. Reports how many records succeeded

**Supported formats:** `.xlsx`, `.xls`, `.csv`

---

## CSV Import Column Mapping

The import expects the CSV/Excel column headers to match the **field keys** defined in `formFields`. Example:

| Column Header in File | Field Key in formFields |
|----------------------|------------------------|
| `invoiceNo` | `invoiceNo` |
| `supplierId` | `supplierId` |
| `totalAmount` | `totalAmount` |

Headers are **case-sensitive**. Provide an import template to users by exporting an empty row.

---

## No Additional Dependencies

Both features use only `xlsx` which was already in `package.json`. No new packages needed.
