# 📊 Kanban Task Board

A beautiful, modern Kanban board powered by Google Sheets data with real-time updates.

## Features

- **5 Kanban Columns**: To Do, In Progress, Waiting, Blocked, Done
- **Rich Task Cards**:
  - Task title and description
  - Color-coded project badges
  - Assignee avatars (Egor/Vivara)
  - Priority indicators with visual glow effects
  - Expandable notes
  - Creation dates
  - Blocked task indicators
- **Smart Filtering**: Filter by project, assignee, or priority
- **Search**: Full-text search across tasks, notes, and projects
- **Auto-Refresh**: Updates every 60 seconds from Google Sheets
- **Beautiful UI**:
  - Dark gradient background
  - Glassmorphism cards with blur effects
  - Smooth hover animations
  - Responsive design (mobile/tablet/desktop)
- **Zero Dependencies**: Single HTML file, no build step required

## Live Demo

Simply open `index.html` in your browser or deploy to GitHub Pages.

## Google Sheets Setup

The board loads data from this Google Sheets CSV:
```
https://docs.google.com/spreadsheets/d/1cEH-AJ1v7hAq-vWgpSEaEXHL8pnCDM6pmTb_rTIJzCw/export?format=csv
```

### Required Columns

Your Google Sheet must have these columns:

| Column | Description | Example Values |
|--------|-------------|----------------|
| ID | Unique task identifier | 1, 2, 3... |
| Task | Task title | "Design landing page" |
| Project | Project name | Bali Housing, Trading, Padel, etc. |
| Assignee | Person assigned | Egor, Vivara |
| Status | Current status | 📋 To Do, 🔄 In Progress, ⏳ Waiting, 🚫 Blocked, ✅ Done |
| Priority | Task priority | High, Medium, Low |
| Created | Creation date | 2024-01-15 |
| Updated | Last update date | 2024-01-20 |
| Notes | Additional details | Any text |
| Blocked By | What's blocking this | Task ID or description |

### Status Values

Use these exact status values in your Google Sheet:
- `📋 To Do`
- `🔄 In Progress`
- `⏳ Waiting`
- `🚫 Blocked`
- `✅ Done`

### Project Colors

Projects are automatically color-coded:
- **Bali Housing**: 🟢 Green (#00b894)
- **Чистый воздух**: 🟣 Purple (#6c5ce7)
- **Trading**: 🟡 Yellow (#fdcb6e)
- **Padel**: 🟠 Orange (#e17055)
- **System**: 🔵 Blue (#74b9ff)
- **IronClaw**: 🌸 Pink (#fd79a8)

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Upload `index.html`
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose `main` branch
5. Your board will be live at `https://yourusername.github.io/repo-name/`

### Local Development

Simply open `index.html` in your browser. No server required.

## Usage

### Filters

- **Search Bar**: Type to search across task titles, notes, and projects
- **Project Filter**: Show tasks from specific projects
- **Assignee Filter**: Filter by Egor or Vivara
- **Priority Filter**: Show only High, Medium, or Low priority tasks
- **Reset Button**: Clear all filters

### Card Interactions

- **Hover**: Cards lift up with smooth animation
- **Click Notes**: Expand/collapse task notes
- **Card Counts**: Each column header shows the number of tasks

### Auto-Refresh

The board automatically refreshes every 60 seconds to fetch the latest data from Google Sheets. The last update time is shown at the bottom.

## Customization

### Change CSV URL

Edit the `CSV_URL` constant in the `<script>` section:

```javascript
const CSV_URL = 'YOUR_GOOGLE_SHEETS_CSV_URL';
```

### Change Refresh Interval

Edit the `REFRESH_INTERVAL` constant (in milliseconds):

```javascript
const REFRESH_INTERVAL = 60000; // 60 seconds
```

### Add New Projects

Add new project colors to the `PROJECT_COLORS` object:

```javascript
const PROJECT_COLORS = {
    'Your Project': '#hexcolor',
    // ...existing projects
};
```

### Modify Columns

Edit the HTML structure in the `<div class="board">` section to add/remove columns.

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tech Stack

- Pure HTML5
- CSS3 (Flexbox, Grid, Backdrop Filters, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

## License

Free to use and modify.

## Support

For issues or questions, check the Google Sheets CSV format and ensure it matches the required column structure.
