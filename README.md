# Pellet Plant Maintenance OS

> **Industrial Digital Work Log & Computerized Maintenance Management System (CMMS) Progressive Web Application (PWA)**  
> Designed for Pellet Plant Operations, Mechanical Maintenance, Machinery Inspection, Lubrication Schedules, Breakdown Tracking, and Shift Reporting.  
> **Report Owner / Lead Engineer:** Abhishek Ranjan  
> **Plant Facility:** 1.2 MTPA Pellet Plant — Unit 1  

---

## 1. Architectural Highlights

- **100% Local-First & Static-Deployable**: Zero external database dependencies (No Firebase, No Supabase, No MongoDB required). Runs as a static client application that works reliably offline.
- **Persistent IndexedDB Storage**: Built with **Dexie.js**; work orders, equipment registry, spare parts, and image blobs persist across browser refreshes and device restarts.
- **Progressive Web App (PWA)**: Compliant Web App Manifest and Service Worker via `vite-plugin-pwa` with precached assets, offline connectivity detection, and in-app home-screen installation (with guided steps for iOS Safari).
- **High-Performance Image Handling**: In-browser client canvas compression and thumbnailing before saving to IndexedDB, supporting mobile camera capture and gallery uploads.
- **Safe CSV & JSON Data Management**: RFC 4180 compliant CSV export with formula injection protection (`=`, `+`, `-`, `@` neutralization) and full JSON backup/restore with schema verification and conflict resolution (merge/replace).
- **Executive Shift Reports & WhatsApp Handover**: Shift-wise and equipment-wise reporting with browser print-to-PDF layout and single-click WhatsApp text summary formatting.

---

## 2. Navigation & Feature Modules

1. **Overview Dashboard**:
   - Live KPI cards: Total Recorded, Pending, In-Progress, Completed, Overdue, and Logged Today.
   - Real-time maintenance category distribution and process downtime calculations.
   - Frequent breakdown watchlist and attention banner for high-priority items and overdue follow-ups.
   - Quick work order entry shortcuts.
2. **Daily Work Log**:
   - Comprehensive log table with multi-field search (equipment tag, name, title, observations, action taken, spare parts, technician).
   - Multi-parameter filtering (date range, shift, equipment, category, priority, status, follow-up required).
   - Column sorting, detailed view modal, duplicate into draft, edit, and deletion.
3. **Maintenance Jobs Pipeline (Kanban & Table)**:
   - Interactive 4-column pipeline: **Pending**, **In Progress**, **On Hold**, **Completed**.
   - HTML5 Drag-and-drop status transitions plus accessible select dropdowns on each card.
   - Automated timestamped audit trail (`statusHistory`) logging every state transition.
   - Overdue calculation that never flags completed jobs as overdue.
4. **Equipment Registry**:
   - Registry for pellet plant machinery (Conveyor Belts BC-01/04, Balling Discs #1/#2, Roller Press HPGR, Hot Screens, ID Process Fans, Slurry Pumps, Planetary Gearboxes, Reject Crushers).
   - Machine operational status indicators: *Running*, *Under Maintenance*, *Out of Service*.
   - Machine maintenance statistics: breakdown frequency, total downtime, last maintained date, and linked history.
   - Prevention of accidental deletion when work orders are linked.
5. **Maintenance History**:
   - Chronological audit timeline with equipment filtering and deep inspection.
6. **Reports & Analytics Workspace**:
   - Filter by date range, shift, machine, and category.
   - Formatted industrial print preview with CSS page-break rules.
   - PDF export via browser print dialog (`window.print()`).
   - One-click WhatsApp handover summary generator with clipboard fallback.
7. **Backup & Restore**:
   - Complete JSON backup export with base64 compressed photos.
   - Pre-flight backup validation with record counts preview before applying.
   - Merge (upsert) or Clean Replace restore strategies.
   - Real-time browser storage quota estimate.
8. **Settings**:
   - Configurable technician name (default: *Abhishek Ranjan*), designation, plant unit, default shift, and report disclaimers.
   - Dark mode / Light mode toggle.
   - Local privacy and offline storage governance disclosures.

---

## 3. Technology Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS
- **Database**: Dexie.js (IndexedDB) + `dexie-react-hooks`
- **PWA**: `vite-plugin-pwa` + Workbox
- **Icons**: Lucide React
- **Testing**: Vitest + `fake-indexeddb`

---
