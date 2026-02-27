# Build a beautiful online Kanban Task Board

## Requirements
- Single-page web app (HTML + CSS + JS, no build step)
- Kanban board with columns: To Do, In Progress, Waiting, Blocked, Done
- Each card shows: Task title, Project badge (color-coded), Assignee (Egor/Vivara with avatars/icons), Priority indicator, Notes (expandable), Created date
- Data loaded from Google Sheets CSV published URL
- Beautiful modern UI: dark mode, smooth animations, glassmorphism cards, gradient backgrounds
- Responsive (works on mobile/tablet)
- Filter by: Project, Assignee, Priority
- Search bar
- Card count per column
- Deploy-ready as static HTML (GitHub Pages)

## Google Sheet
- Published CSV URL will be: https://docs.google.com/spreadsheets/d/1cEH-AJ1v7hAq-vWgpSEaEXHL8pnCDM6pmTb_rTIJzCw/export?format=csv
- Columns: ID, Task, Project, Assignee, Status, Priority, Created, Updated, Notes, Blocked By
- Status values: 📋 To Do, 🔄 In Progress, ⏳ Waiting, 🚫 Blocked, ✅ Done
- Projects: Bali Housing, Чистый воздух, Trading, Padel, System, IronClaw
- Assignees: Egor, Vivara

## Design
- Dark gradient background (#0f0c29 → #302b63 → #24243e)
- Glassmorphism cards with subtle blur
- Project colors: Bali Housing=#00b894, Чистый воздух=#6c5ce7, Trading=#fdcb6e, Padel=#e17055, System=#74b9ff, IronClaw=#fd79a8
- Assignee icons: Egor=👤, Vivara=🌀
- Priority: 🔴 High = red glow, 🟡 Medium = yellow, 🟢 Low = green
- Smooth card hover animations
- Column headers with card counts
- Auto-refresh every 60 seconds

## Files to create
- index.html (single file with embedded CSS and JS)
- README.md

Create ONLY index.html and README.md. Everything in one file, no external dependencies except Google Fonts.
