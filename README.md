# Project Synapse


### 🔐 GitHub Push & Deployment Note (Important)

This project is connected to the GitHub organization repository and deployed via Vercel.

**Important while pushing changes:**

-   Always push changes using the **VESIT-AI-DS organization account**.
-   Use a **Personal Access Token (PAT)** of the VESIT-AI-DS GitHub account while authenticating.
-   Do **not** push from your personal GitHub account to a fork and expect deployment.

#### Why?

Vercel production deployment is linked directly to the organization repository:

VESIT-AI-DS/Project_Synapse

If you push from your own fork/personal repository:

-   Vercel will not trigger deployment for the main project.
-   Adding external collaborators on Vercel may require paid/premium team features.

## 🚀 Overview

This project dynamically displays student projects across multiple academic years.

## Instructions

To update every year, follow these steps:

```
db/
 ├── data.ts        ← 🔥 ONLY file to update for new years
 ├── 2023-24.json
 ├── 2024-25.json
 ├── 2025-26.json

```

## 🛠️ How to Add a New Year

### Step 1: Create JSON File

Create a new file inside `db/`:

```

db/2026-27.json

```

---

### Step 2: Follow JSON Structure (VERY IMPORTANT ⚠️)

### ✅ If divisions exist (recommended format)

```

{
"D16ADA": [
{
"grpno": 1,
"title": "Project Title",
"member1": "Name",
"member2": "Name",
"member3": "Name",
"member4": "Name",
"guide": "Guide Name",
"coguide": "Co-guide Name",
"description": "Project description...",
"github": "https://github.com/...",
"ppt": "https://link-to-ppt",
"demo": "https://www.youtube.com/embed/<video_id>",
"domain": "AI / ML / DL",
"Fundings Received": false,
"member1 photo": "",
"member2 photo": "",
"member3 photo": "",
"member4 photo": "",
"guide photo": "",
"coguide photo": ""
}
],
"D16ADB": [],
""D16ADC" : []
}

```

---

### ✅ If NO divisions

```

[
{
"grpno": 1,
"title": "Project Title",
"member1": "Name",
"member2": "Name",
"member3": "Name",
"member4": "Name",
"guide": "Guide Name",
"coguide": "Co-guide Name",
"description": "Project description...",
"github": "https://github.com/...",
"ppt": "https://link-to-ppt",
"demo": "https://www.youtube.com/embed/<video_id>",
"domain": "AI / ML / DL"
}
]

```

---

## ⚠️ Important Rules

- `grpno` must be **unique** for a particular division
- `ppt` is **optional** (UI auto-handles it)
- `demo` must be:

  ```
  https://www.youtube.com/embed/<video_id>

  ```

- Do **NOT** change field names
- Keep structure consistent

## 🧠 Step 3: Register the Year

Update **db/data.ts**:

```
import data_27 from "./2026-27.json";

export const dbs = {
  "2023-24": data_24,
  "2024-25": data_25,
  "2025-26": data_26,
  "2026-27": data_27, // ✅ Add here
};
```

## 🔗 Routing Structure (IMPORTANT)

The application supports **two types of dynamic routes**:

### ✅ 1. Without Division (Before 2025–26)

Earlier, the department had only one division, so the URL structure was:

```
/project/:year/:projectId
```

📌 Example:

```
/project/2024-25/12
```

---

### ✅ 2. With Division (2025–26 and After)

From 2025–26 onwards, multiple divisions were introduced.
So the URL now includes division:

```
/project/:year/:projectId/:division
```

📌 Example:

```
/project/2025-26/12/D16ADA
```

## 🙌 Acknowledgement

**Courtesy:**

- **Sami Thakur** — D16ADA (Batch 2025–26)
- **Atharva Ghughe** — D16ADB (Batch 2025–26)
- **Dyotak Kachare** — D16AD (Batch 2024–25)
- **Khalid Sayyed** — D16AD (Batch 2024–25)
