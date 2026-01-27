# 🌐 NextCommunity Developer Directory

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Built with Eleventy](https://img.shields.io/badge/Built%20with-Eleventy-black)](https://www.11ty.dev/)
[![Run JavaScript Everywhere](https://img.shields.io/badge/Run%20JavaScript%20Everywhere-yellow)](https://nodejs.org/en)
[![Built with Tailwind CSS](https://img.shields.io/badge/Built%20with-Tailwind-blue)](https://tailwindcss.com/)

> A vibrant community directory showcasing open-source developers and software engineers from around the world.

**🔗 Live Site:** [https://nextcommunity.github.io](https://nextcommunity.github.io)

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [How to Add Yourself](#-how-to-add-yourself)
- [YAML File Format](#-yaml-file-format)
- [Local Development](#-local-development-optional)
- [Contribution Guidelines](#-contribution-guidelines)
- [Troubleshooting](#-troubleshooting--faq)
- [License](#-license)

---

## 🎯 About the Project

NextCommunity is a static site directory built with [Eleventy (11ty)](https://www.11ty.dev/), styled with
[TailwindCSS](https://tailwindcss.com/) and made interactive with JavaScript. NextCommunity celebrates the global
developer community. Each developer gets their own profile page showcasing their skills, bio, and social links.

### 🛠️ Tech Stack

- **Static Site Generator**: Eleventy (11ty)
- **Templating**: Nunjucks
- **Styling**: TailwindCSS
- **Data Format**: YAML
- **Deployment**: GitHub Pages

### ✨ Features

- 🎲 Randomized display of developer profiles
- 🌓 Dark/Light theme support
- 📱 Fully responsive design
- 🔍 Individual profile pages for each developer
- 🎨 Modern, premium UI with smooth animations

---

## 🚀 How to Add Yourself

Adding yourself to the directory is simple! Just follow these steps:

### Step 1: Fork the Repository

1. Click the **"Fork"** button at the top-right of this repository
2. This creates a copy of the repository under your GitHub account

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/NextCommunity.github.io.git
cd NextCommunity.github.io
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Create Your Profile File

1. Navigate to the `src/users/` directory
2. Create a new file named `your-github-username.yaml`
   - **Important**: Use your actual GitHub username in lowercase
   - Example: If your GitHub username is `JohnDoe`, create `johndoe.yaml`

### Step 4: Fill In Your Details

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

### Step 5: Test Locally (Optional but Recommended)

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Visit `http://localhost:8080` to preview your profile before submitting.

### Step 6: Commit Your Changes

```bash
# Add your new file
git add src/users/your-github-username.yaml

# Commit with a descriptive message
git commit -m "Add [Your Name] to developer directory"

# Push to your fork
git push origin main
```

### Step 7: Create a Pull Request

1. Go to your forked repository on GitHub
2. Click the **"Contribute"** button, then **"Open Pull Request"**
3. Write a clear title: `Add [Your Name] to directory`
4. In the description, mention:

   ```markdown
   Fixes #213

   Adding my profile to the NextCommunity developer directory.
   ```

5. Click **"Create Pull Request"**

### Step 8: Wait for Review ⏳

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

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
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
│   ├── _data/              # Site-wide data files
│   ├── _includes/          # Reusable templates (header, footer, bio page)
│   ├── assets/
│   │   ├── css/           # Stylesheets
│   │   └── js/            # JavaScript files
│   ├── users/             # 👈 User YAML files go here
│   │   ├── jbampton.yaml
│   │   ├── ayush.yaml
│   │   └── ...
│   └── index.njk          # Homepage template
├── .eleventy.js           # Eleventy configuration
├── package.json           # Node.js dependencies
└── README.md              # This file
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
- **Maintainer**: [@jbampton](https://github.com/jbampton)
