<div align="center">
<h1>🌐 NextCommunity Developer Directory</h1>

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Built with Eleventy](https://img.shields.io/badge/Built%20with-Eleventy-black)](https://www.11ty.dev/)
[![Run JavaScript Everywhere](https://img.shields.io/badge/Run%20JavaScript%20Everywhere-yellow)](https://nodejs.org/en)
[![Built with Nunjucks](https://img.shields.io/badge/Built%20with-Nunjucks-darkgreen)](https://mozilla.github.io/nunjucks/)
[![Built with Tailwind CSS](https://img.shields.io/badge/Built%20with-Tailwind-blue)](https://tailwindcss.com/)

[![Super-Linter](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/super-linter.yml/badge.svg)](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/super-linter.yml)
[![Audit hooks](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/pre-commit-audit.yml/badge.svg)](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/pre-commit-audit.yml)
[![Manual hooks](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/pre-commit-manual.yml/badge.svg)](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/pre-commit-manual.yml)
[![Standard hooks](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/pre-commit.yml/badge.svg)](https://github.com/NextCommunity/NextCommunity.github.io/actions/workflows/pre-commit.yml)

[![Easter Eggs](https://img.shields.io/badge/Easter-Eggs-ff69b4?labelColor=9b59b6)](https://nextcommunity.github.io)

> A vibrant community directory showcasing open-source developers and software engineers from around the world.

**🔗 Live Site:** [https://nextcommunity.github.io](https://nextcommunity.github.io)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [How to Add Yourself](#-how-to-add-yourself)
- [YAML File Format](#-yaml-file-format)
- [Local Development](#-local-development-optional)
- [Git Workflow & Keeping in Sync](#-git-workflow--keeping-in-sync)
- [Contribution Guidelines](#-contribution-guidelines)
- [Troubleshooting](#-troubleshooting--faq)
- [License](#-license)

---

## 🎯 About the Project

NextCommunity is a static site directory built with Eleventy (11ty), JavaScript, Nunjucks and TailwindCSS.
NextCommunity celebrates the global developer community. Each developer gets their own profile page
showcasing their skills, bio, and social links.

### 🛠️ Tech Stack

- **Interactivity**: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Static Site Generator**: [Eleventy (11ty)](https://www.11ty.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Templating**: [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Data Format**: [JSON](https://www.json.org/json-en.html) / [YAML](https://yaml.org/)
- **Deployment**: [GitHub Pages](https://docs.github.com/en/pages)

### ✨ Features

- 🎲 Randomized display of developer profiles on build
- 🌓 Dark/Light/Random theme support
- 📱 Fully responsive design
- 🔍 Individual profile pages for each developer
- 🎨 Modern, premium UI with smooth animations

---

## 🚀 How to Add Yourself

Adding yourself to the directory is simple! Just follow these steps:

### Step 1: Fork the Repository

1. Click the **"Fork"** button at the top-right of this repository
2. This creates a copy of the repository under your GitHub account

### Step 2: Clone Your Fork and Set Up Upstream

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/NextCommunity.github.io.git
cd NextCommunity.github.io

# Add the original repo as "upstream" so you can sync future changes
git remote add upstream https://github.com/NextCommunity/NextCommunity.github.io.git

# Verify your remotes (you should see both origin and upstream)
git remote -v
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Create a Feature Branch

**Never commit directly to `main`.** Always work on a dedicated feature branch:

```bash
# Make sure your local main is up to date first
git checkout main
git pull upstream main

# Create and switch to a new feature branch
git checkout -b add-your-github-username
```

Use a descriptive branch name that reflects your change, e.g. `add-jbampton` or `fix-yaml-typo`.
Replace `your-github-username` in every example below with the actual branch name you chose here.

### Step 4: Create Your Profile File

1. Navigate to the `src/users/` directory
2. Create a new file named `your-github-username.yaml`
   - **Important**: Use your actual GitHub username in lowercase
   - Example: If your GitHub username is `JohnDoe`, create `johndoe.yaml`

### Step 5: Fill In Your Details

Copy the template below and customize it with your information:

```yaml
name: Your Full Name
github: your-github-username
website: https://yourwebsite.com
email: your.email@example.com
instagram: https://instagram.com/yourusername
twitter: https://twitter.com/yourhandle
linkedin: https://linkedin.com/in/yourprofile
country: Your Country
location: Your City
role: Your Professional Title
languages: JavaScript Python Go Rust
bio: |
  Write your professional bio here.
  You can use multiple lines.
  Share your experience, interests, and what you're passionate about.

  Add your skills, projects, or anything else you'd like to highlight!
```

> 💡 **Tip**: Check out existing files in `src/users/` for real examples!

### Step 6: Test Locally (Optional but Recommended)

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Visit `http://localhost:8080` to preview your profile before submitting.

### Step 7: Commit Your Changes

```bash
# Add your new file
git add src/users/your-github-username.yaml

# Commit with a descriptive message
git commit -m "Add [Your Name] to developer directory"

# Push your feature branch to your fork (NOT main!)
# Replace 'add-your-github-username' with the branch name you created in Step 3
git push origin add-your-github-username
```

### Step 8: Create a Pull Request

1. Go to your forked repository on GitHub
2. Click the **"Contribute"** button, then **"Open Pull Request"**
3. Make sure the **base** branch is `main` on `NextCommunity/NextCommunity.github.io` and the **compare** branch is your feature branch
4. Write a clear title: `Add [Your Name] to directory`
5. In the description, mention:

   ```markdown
   Fixes #213

   Adding my profile to the NextCommunity developer directory.
   ```

6. Click **"Create Pull Request"**

### Step 9: Wait for Review ⏳

- The maintainers will review your PR
- Automated checks will verify your YAML file
- You may receive feedback or requested changes
- Once approved, your profile will be merged and live! 🎉

---

## 📝 YAML File Format

### Required Fields

| Field       | Description                          | Example                    |
| ----------- | ------------------------------------ | -------------------------- |
| `name`      | Your full name                       | `John Bampton`             |
| `github`    | Your GitHub username (without @)     | `jbampton`                 |
| `country`   | Your country                         | `Australia`                |
| `location`  | Your city                            | `Brisbane`                 |
| `role`      | Your professional title              | `Scrum Master`             |
| `languages` | Space-separated list of technologies | `JavaScript, Python, Ruby` |
| `bio`       | Multi-line biography                 | See template above         |

### Optional Fields

| Field       | Description                | Example                            |
| ----------- | -------------------------- | ---------------------------------- |
| `email`     | Your email address         | `you@example.com`                  |
| `instagram` | Full Instagram profile URL | `https://instagram.com/username`   |
| `linkedin`  | Full LinkedIn profile URL  | `https://linkedin.com/in/username` |
| `twitter`   | Full Twitter/X profile URL | `https://twitter.com/username`     |
| `website`   | Your personal website URL  | `https://yoursite.com`             |

### Field Guidelines

- **`name`**: Use your real name or preferred professional name
- **`github`**: Must match your actual GitHub username for links to work
- **`languages`**: Separate with spaces, not commas (e.g., `Python Java Go`)
- **`bio`**: Use the `|` syntax for multi-line text. Be professional and concise
- **`role`**: Keep it short and clear (e.g., "Full Stack Developer", "DevOps Engineer")

### 📚 Real Examples

**Example 1: Minimal Profile**

```yaml
name: Jane Smith
github: janesmith
country: USA
location: San Francisco
role: Backend Developer
languages: Python Django PostgreSQL
bio: |
  Passionate backend developer with 3 years of experience.
  Love working with Python and building scalable APIs.
```

**Example 2: Complete Profile**

```yaml
name: Carlos Rodriguez
github: carlosr
website: https://carlos.dev
email: carlos@example.com
twitter: https://twitter.com/carlos_codes
linkedin: https://linkedin.com/in/carlosrodriguez
country: Spain
location: Barcelona
role: Full Stack Engineer
languages: TypeScript React Node.js AWS
bio: |
  Full-stack engineer specializing in modern web technologies.

  Currently building cloud-native applications and contributing to open source.
  Passionate about clean code, testing, and developer experience.
```

---

## 💻 Local Development (Optional)

Want to contribute to the project code or test your profile locally? Here's how to set up the development environment.

### Prerequisites

- **Node.js**: Version 20.x or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: For version control

### Installation

```bash
# Clone the repository
git clone https://github.com/NextCommunity/NextCommunity.github.io.git
cd NextCommunity.github.io

# Install dependencies
npm install

# Start the development server
npm start
```

The site will be available at `http://localhost:8080` with live reload enabled.

### Build Commands

```bash
# Start development server with live reload
npm start

# Build for production
npm run build
```

### Project Structure

```text
NextCommunity.github.io/
├── src/
│   ├── _data/                      # Site-wide data files
│   │   ├── build.js                # Build metadata injected into templates
│   │   └── levels.json             # XP level definitions for the gamification system
│   ├── _includes/                  # Reusable Nunjucks templates
│   │   ├── bio.njk                 # Individual developer profile page layout
│   │   ├── footer.njk              # Site footer wrapper
│   │   ├── footer-details.njk      # Footer content (links, credits)
│   │   ├── game-modal.njk          # Modal overlay for mini-games
│   │   ├── game-stats.njk          # In-game XP / stats display
│   │   ├── header.njk              # Site header wrapper
│   │   ├── header-details.njk      # Header content (nav, theme toggle)
│   │   ├── matrix-overlay.njk      # Matrix rain easter egg overlay
│   │   ├── scripts.njk             # JS <script> tags included by footer
│   │   ├── skills-list.njk         # Renders a developer's skills/languages
│   │   ├── system-log.njk          # Scrolling system-log UI element
│   │   └── system-override.njk     # "System override" easter egg UI
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css           # Compiled / custom CSS
│   │   │   └── tailwind-input.css  # Tailwind CSS entry point
│   │   ├── img/
│   │   │   └── next.jpeg           # Site logo / avatar image
│   │   └── js/
│   │       ├── eggs.js             # Easter egg interactions (Konami code, etc.)
│   │       ├── phaser-init.js      # Phaser game engine bootstrap
│   │       ├── script.js           # Core interactivity & XP system
│   │       └── games/              # Mini-game modules (lazy-loaded via Phaser)
│   │           ├── config.js       # Shared game constants & CDN URL
│   │           ├── game-manager.js # Game lifecycle (load, create, destroy)
│   │           ├── space-invaders.js
│   │           ├── code-breaker.js
│   │           └── dev-duel.js
│   ├── users/                      # 👈 Developer profile YAML files go here
│   │   ├── users.json              # Eleventy data file that aggregates all YAMLs
│   │   ├── jbampton.yaml
│   │   └── ...                     # One <github-username>.yaml per developer
│   ├── games.njk                   # Games page template
│   └── index.njk                   # Homepage template
├── .eleventy.js                    # Eleventy configuration
├── biome.json                      # Biome formatter / linter config
├── postcss.config.js               # PostCSS / Tailwind build config
├── package.json                    # Node.js dependencies & scripts
└── README.md                       # This file
```

---

## 🔀 Git Workflow & Keeping in Sync

Working with a forked repository means your copy can fall behind the upstream (the original NextCommunity repo) over time. This section explains the complete feature-branch workflow and the essential git commands every contributor should know.

### The Golden Rules

> 🚫 **Never push directly to `main`** in your fork.
> ✅ **Always work on a feature branch** and open a Pull Request.

---

### 🛠️ Essential Git Commands for Contributors

---

#### 1. `git remote` — Manage your remote connections

Your fork is connected to your own GitHub account (`origin`). To stay in sync with the original project, you also need a connection to the upstream repo.

```bash
# View all configured remotes
git remote -v

# Add the upstream remote (do this once, right after cloning)
git remote add upstream https://github.com/NextCommunity/NextCommunity.github.io.git

# After running the above, git remote -v should output:
# origin    https://github.com/YOUR-USERNAME/NextCommunity.github.io.git (fetch)
# origin    https://github.com/YOUR-USERNAME/NextCommunity.github.io.git (push)
# upstream  https://github.com/NextCommunity/NextCommunity.github.io.git (fetch)
# upstream  https://github.com/NextCommunity/NextCommunity.github.io.git (push)
```

---

#### 2. `git fetch` — Download changes without merging

`git fetch` downloads new commits and branches from a remote but does **not** touch your working files. It's a safe way to inspect what's changed upstream before deciding what to do.

```bash
# Fetch everything from the upstream repo
git fetch upstream

# Now you can inspect what changed without affecting your local branches
git log HEAD..upstream/main --oneline
```

---

#### 3. `git pull` — Fetch and integrate in one step

`git pull` is shorthand for `git fetch` followed by `git merge` (or `git rebase`, depending on your config). Use it to bring your local branch up to date.

```bash
# Sync your local main with upstream/main
git checkout main
git pull upstream main

# Keep your fork's main in sync too (pushes updated main to your fork on GitHub)
git push origin main
```

> 💡 **Tip**: Run this before creating every new feature branch so you always start from the latest code.

---

#### 4. `git checkout -b` — Create and switch to a feature branch

A feature branch isolates your work so that `main` stays clean and ready to sync. The `-b` flag creates the branch and switches to it in one command.

```bash
# Create a new branch and switch to it
git checkout -b add-your-github-username

# List all local branches (the active branch is marked with *)
git branch

# Switch between existing branches
git checkout main
git checkout add-your-github-username
```

Branch naming conventions used in this project:

| Prefix | When to use | Example |
|---|---|---|
| `add-` | Adding a new profile | `add-jbampton` |
| `fix-` | Fixing a bug or typo | `fix-yaml-typo` |
| `feat-` | Adding a new site feature | `feat-dark-mode` |
| `docs-` | Documentation changes | `docs-contributing-guide` |

---

#### 5. `git rebase` — Replay your commits on top of the latest upstream

When `main` has moved forward since you created your branch, `git rebase` re-applies your commits on top of the latest changes instead of creating a messy merge commit. This keeps the project history clean and linear.

```bash
# First, fetch the latest upstream changes
git fetch upstream

# Rebase your feature branch on top of upstream/main
git checkout add-your-github-username
git rebase upstream/main
```

If conflicts arise during a rebase:

```bash
# 1. Open the conflicting file(s), resolve the conflict markers (<<<<, ====, >>>>)
# 2. Stage the resolved file(s)
git add src/users/your-github-username.yaml

# 3. Continue the rebase
git rebase --continue

# If you want to abort and go back to before the rebase started
git rebase --abort
```

After rebasing, you'll need to force-push your feature branch because the commit history was rewritten:

```bash
# Force push — only safe on your own feature branch, NEVER on main
git push origin add-your-github-username --force-with-lease
```

> ⚠️ `--force-with-lease` is safer than `--force`: it fails if someone else has pushed to your branch since you last fetched, preventing accidental data loss.

---

#### 6. `git stash` — Save work-in-progress without committing

If you need to switch branches but aren't ready to commit your changes, `git stash` temporarily shelves them.

```bash
# Save all uncommitted changes
git stash

# Switch to another branch, do some work, then come back
git checkout main
git pull upstream main
git checkout add-your-github-username

# Restore your stashed changes
git stash pop

# View all stashes
git stash list

# Apply a specific stash without removing it from the stash list
git stash apply stash@{0}
```

---

#### 7. `git log` — Explore commit history

`git log` lets you understand what has changed and when. It's invaluable for debugging and understanding the project timeline.

```bash
# View the last 10 commits in a compact format
git log --oneline -10

# See a visual branch graph
git log --oneline --graph --decorate --all

# See all commits by a specific author
git log --author="Your Name" --oneline

# See what changed in the last commit
git log -1 --stat
```

---

### 🔄 Full Day-to-Day Sync Workflow

Here's the complete workflow to follow every time you start a new contribution:

```bash
# 1. Switch to main and pull the latest upstream changes
git checkout main
git fetch upstream
git merge upstream/main   # or: git pull upstream main

# 2. Push the updated main to your fork so GitHub is also up to date
git push origin main

# 3. Create a new feature branch from the freshly synced main
git checkout -b add-your-github-username

# 4. Make your changes, then stage and commit them
git add src/users/your-github-username.yaml
git commit -m "Add [Your Name] to developer directory"

# 5. Push your feature branch to your fork on GitHub
git push origin add-your-github-username

# 6. Open a Pull Request on GitHub from your feature branch → NextCommunity/main
```

If your feature branch gets out of date while you're working on it (because `main` received new commits), sync it with rebase:

```bash
git fetch upstream
git rebase upstream/main
git push origin add-your-github-username --force-with-lease
```

---

## 🤝 Contribution Guidelines

### Code of Conduct

We're committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

### PR Review Process

1. **Automated Checks**: Your PR will automatically run linting checks
2. **Manual Review**: A maintainer will review your submission
3. **Feedback**: You may be asked to make changes
4. **Merge**: Once approved, your PR will be merged!

### What Gets Approved?

✅ **Yes:**

- Complete, valid YAML files
- Professional bios and appropriate content
- Real GitHub profiles
- Accurate information

❌ **No:**

- Spam or promotional content
- Offensive or inappropriate material
- Fake or duplicate profiles
- Invalid YAML syntax

### CI/CD Checks

Every pull request runs automated checks:

- **Linting**: Ensures YAML syntax is correct
- **Build Test**: Verifies the site builds successfully
- **Pre-commit Hooks**: Checks code quality

If checks fail, you'll see error messages in the PR. Fix the issues and push again.

---

## 🔧 Troubleshooting & FAQ

### Common Issues

#### ❌ Build Fails: "Invalid YAML"

**Problem**: Your YAML file has syntax errors.

**Solution**:

- Check for proper indentation (use spaces, not tabs)
- Ensure colons have a space after them (`name: John`, not `name:John`)
- Use `|` for multi-line bio text
- Validate your YAML at [yamllint.com](http://www.yamllint.com/)

#### ❌ "GitHub username not found"

**Problem**: The `github` field doesn't match a real GitHub profile.

**Solution**:

- Ensure you're using your exact GitHub username
- Check for typos
- Username is case-sensitive in this field

#### ❌ My profile doesn't show up

**Problem**: File naming or format issue.

**Solution**:

- File must be in `src/users/` directory
- File must be named `username.yaml` (lowercase, with `.yaml` extension)
- All required fields must be filled in

#### ❌ Pre-commit hooks fail

**Problem**: Code quality checks didn't pass.

**Solution**:

```bash
# Install pre-commit
pip install pre-commit

# Run checks manually
pre-commit run --all-files
```

### FAQ

**Q: Can I update my profile after it's merged?**
A: Yes! Just create a new PR with updates to your YAML file.

**Q: How long does review take?**
A: Usually within 24-48 hours, depending on maintainer availability.

**Q: Can I add multiple social links?**
A: Yes, all social fields (twitter, linkedin, instagram) are optional and independent.

**Q: What if I don't have a personal website?**
A: No problem! Just omit the `website` field or set it to your GitHub profile.

**Q: Can I use emojis in my profile?**
A: Yes, emojis are supported in the `name` and `bio` fields! 🎉

**Q: Is there a character limit for the bio?**
A: No hard limit, but keep it concise (2-4 paragraphs recommended).

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

### What this means

- ✅ You can freely use, modify, and distribute this code
- ✅ You must disclose source code when distributing
- ✅ Changes must also be GPL-3.0 licensed
- ✅ Include copyright and license notices

---

## 🙏 Acknowledgments

- Built with [Eleventy](https://www.11ty.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Maintained by [@jbampton](https://github.com/jbampton) and the community

---

## 📞 Contact & Support

- **Report bugs**: [Open an issue](https://github.com/NextCommunity/NextCommunity.github.io/issues)
- **Ask questions**: [Start a discussion](https://github.com/NextCommunity/NextCommunity.github.io/discussions)
