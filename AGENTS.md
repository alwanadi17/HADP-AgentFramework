# 📘 HADP Manual Book — Hierarchical Agentic Development Pipeline

> **Kantor (`.agents/`) vs Pabrik (root project)**
> Semua urusan governance, workflow, dan laporan ada di `.agents/`. Source code production ada di root project.

---

## 🏛️ Model: Hierarchical Agentic Development Pipeline (HADP)

HADP adalah model pengembangan perangkat lunak berbasis AI agent dengan **5 tier hierarkis** yang memisahkan **thinking** dari **doing**:

| Tier | Role | Model | Fungsi |
|---|---|---|---|
| 0 | **Analyst** (on-demand) | Long-context, high-volume | Research, codebase mapping, structured briefs |
| 1 | **Decision Maker** | High-reasoning | Governance, arsitektur, keputusan |
| 2 | **Manager** | Balanced intelligence | Task decomposition, delegasi, validasi |
| 3a | **Worker Coder** | Coding-focused | Implementasi kode |
| 3b | **Worker Tester** | Token-efficient | Testing & verifikasi |

### Prinsip Utama
- **Separation of Concerns** — Setiap tier melakukan SATU hal. Tidak ada overlap.
- **Gate System** — Setiap transisi butuh handoff packet. Tidak boleh lompat.
- **Token Efficiency** — Analyst baca sekali, Decision Maker tidak perlu baca source code.
- **Fail Fast** — Coder gagal build → lapor langsung. Tester temukan issue → loop back.

---

## 🏢 Struktur Kantor (`.agents/`)

```
.agents/                           ← KANTOR — semua urusan agent
├── CONSTITUTION.md                ← Identitas & filosofi project
├── RED_LINES.md                   ← Hard constraints (baca SEBELUM setiap task)
├── ARCHITECTURE.md                ← Tech stack & data flow
├── AGENTS.md                      ← ← ANDA DISINI — Manual Book
├── roles/                         ← Definisi peran setiap agent
│   ├── analyst.md
│   ├── decision-maker.md
│   ├── manager.md
│   ├── worker-coder.md
│   └── worker-tester.md
├── handoffs/                      ← Handoff packets antar agent (aktif)
│   └── README.md
├── docs/                          ← Dokumentasi workflow & laporan
│   ├── handoff-protocol.md        ← Protokol komunikasi antar agent
│   ├── workflow/
│   │   ├── lifecycle.md           ← High-level flow diagram
│   │   ├── states.md              ← Task lifecycle states
│   │   └── triggers.md            ← Trigger setiap transisi
│   ├── workbook/                  ← LAPORAN per role (arsip)
│   │   ├── analyst/
│   │   ├── decision-maker/
│   │   ├── manager/
│   │   ├── coder/
│   │   └── tester/
│   ├── reports/                   ← Laporan agregat
│   │   ├── sprint-review.md
│   │   └── audit-trail.md
│   └── decisions/                 ← Architecture Decision Records (ADR)
│       └── _template.md
```

---

## 🔄 Alur Kerja Singkat

```
Human → [Analyst] → Decision Maker → Manager → Worker Coder → Worker Tester → Manager → Human
         (opsional)                                    ↓              ↓
                                                  build pass    test report
```

### Step by Step:
1. **Human** → memberikan feature request / task
2. **Analyst** (opsional) → riset, mapping codebase, output ke `workbook/analyst/`
3. **Decision Maker** → baca brief, buat keputusan, update governance, tulis ADR
4. **Manager** → breakdown task, buat handoff packet → `handoffs/mgr-to-coder_*.md`
5. **Worker Coder** → implementasi, build check, buat completion packet
6. **Worker Tester** → verifikasi, test, buat test report
7. **Manager** → macro validation, PASS / FAIL / ESCALATE
8. **Human** → review final, merge

> Detail lengkap: `.agents/docs/workflow/lifecycle.md`

---

## 📋 Quick Reference

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build (MUST pass before shipping)
npm run lint     # Lint check
npm run test     # Run tests
```

### Critical Files (wajib dibaca sebelum task)
| File | Path | Kapan Dibaca |
|---|---|---|
| Manual Book | `AGENTS.md` | Setiap awal chat |
| Hard Constraints | `.agents/RED_LINES.md` | Sebelum setiap task |
| Project Identity | `.agents/CONSTITUTION.md` | Sebelum task pertama |
| Tech Stack | `.agents/ARCHITECTURE.md` | Sebelum task pertama |
| Role Definition | `.agents/roles/{role}.md` | Saat diassign sebagai role tsb |
| Area Rules | `{area}/AGENTS.md` | Sebelum menyentuh area tsb |
| Task Plan | `PLAN.md` | Cek task dependencies |

### Naming Convention Handoff Packets
```
{direction}_{task-id}_{YYYYMMDD}.md
```
Prefix: `analyst-to-dm`, `dm-to-mgr`, `mgr-to-coder`, `coder-to-tester`, `tester-to-mgr`, `tester-to-coder`, `mgr-to-dm`

### Naming Convention Workbook
```
docs/workbook/{role}/YYYYMMDD_TASK-XXX_{type}.md
```
Contoh: `docs/workbook/coder/20260630_TASK-001_completion.md`

---

## 📚 Dokumen Terkait

| Dokumen | Path | Isi |
|---|---|---|
| Workflow Lifecycle | `.agents/docs/workflow/lifecycle.md` | Diagram alur lengkap |
| Task States | `.agents/docs/workflow/states.md` | State machine task |
| Triggers | `.agents/docs/workflow/triggers.md` | Trigger setiap transisi |
| Handoff Protocol | `.agents/docs/handoff-protocol.md` | Format komunikasi antar agent |
| Workbook Templates | `.agents/docs/workbook/{role}/_template.md` | Template laporan per role |
| ADR Template | `.agents/docs/decisions/_template.md` | Template keputusan arsitektur |

---

## ⚙️ Aturan untuk Semua Agent

### DO
- Baca `RED_LINES.md` sebelum memulai task apapun
- Baca area-specific `AGENTS.md` sebelum menyentuh file di area tersebut
- Ikuti acceptance criteria dari Manager
- Report honestly — jika ada masalah, katakan
- Gunakan naming convention yang sudah ditetapkan

### DON'T
- Jangan modify governance files tanpa approval Decision Maker
- Jangan skip handoff packets — setiap transisi WAJIB ada artifact
- Jangan lompat tier — urutan harus sesuai hierarki
- Jangan test own work (Coder) atau code (Tester)
- Jangan buat file di luar scope task tanpa approval

---

> **Last Updated**: 2026-06-30
> **Model**: Hierarchical Agentic Development Pipeline (HADP)