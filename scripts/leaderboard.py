"""Fetch contributor stats from all NextCommunity repos and update the org profile README."""

import base64
import json
import os
import sys
import urllib.request
import urllib.error

ORG = "NextCommunity"
TARGET_REPO = ".github"
TARGET_PATH = "profile/README.md"
LEADERBOARD_START = "<!-- LEADERBOARD:START -->"
LEADERBOARD_END = "<!-- LEADERBOARD:END -->"
API_BASE = "https://api.github.com"


def _headers():
    """Return common request headers including authentication if available."""
    token = os.environ.get("GITHUB_TOKEN", "")
    headers = {"Accept": "application/vnd.github+json", "User-Agent": ORG}
    if token:
        headers["Authorization"] = f"token {token}"
    return headers


def _api_get(url):
    """Perform a GET request against the GitHub API and return parsed JSON."""
    req = urllib.request.Request(url, headers=_headers())
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as exc:
        print(f"HTTP {exc.code} for {url}: {exc.reason}", file=sys.stderr)
        return None


def _api_get_paginated(url):
    """Paginate through all results for a GitHub API endpoint."""
    results = []
    page = 1
    while True:
        sep = "&" if "?" in url else "?"
        page_url = f"{url}{sep}page={page}&per_page=100"
        data = _api_get(page_url)
        if not data:
            break
        results.extend(data)
        if len(data) < 100:
            break
        page += 1
    return results


def get_repos():
    """Return a list of all public repos in the organization."""
    url = f"{API_BASE}/orgs/{ORG}/repos?type=public"
    repos = _api_get_paginated(url)
    return [r["full_name"] for r in repos if not r.get("fork")]


def get_contributors(repo_full_name):
    """Return contributor list for a single repo via the contributors endpoint."""
    url = f"{API_BASE}/repos/{repo_full_name}/contributors"
    data = _api_get_paginated(url)
    return data or []


def build_leaderboard():
    """Aggregate contributor commits across all org repos and return sorted list."""
    repos = get_repos()
    if not repos:
        print("No repos found.", file=sys.stderr)
        return []

    contributors = {}  # login -> {name, login, commits}
    for repo in repos:
        print(f"Fetching contributors for {repo} ...")
        for c in get_contributors(repo):
            if c.get("type") != "User":
                continue
            login = c["login"]
            if login not in contributors:
                contributors[login] = {
                    "login": login,
                    "commits": 0,
                }
            contributors[login]["commits"] += c.get("contributions", 0)

    # Fetch display names from user profiles
    for login, info in contributors.items():
        user = _api_get(f"{API_BASE}/users/{login}")
        info["name"] = (user.get("name") or login) if user else login

    # Sort by total commits descending
    leaderboard = sorted(contributors.values(), key=lambda x: x["commits"], reverse=True)
    return leaderboard


def render_table(leaderboard):
    """Render the leaderboard as a Markdown table."""
    lines = [
        "## 🏆 Organization Leaderboard",
        "",
        "| Rank | Contributor | Username | Total Commits |",
        "|------|------------|----------|---------------|",
    ]
    for rank, entry in enumerate(leaderboard, start=1):
        name = entry["name"]
        login = entry["login"]
        commits = entry["commits"]
        lines.append(f"| {rank} | {name} | [@{login}](https://github.com/{login}) | {commits} |")

    lines.append("")
    lines.append(f"_Last updated: {_now_utc()}_")
    return "\n".join(lines)


def _now_utc():
    """Return current UTC date-time as an ISO-like string (stdlib only)."""
    import datetime

    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")


def update_readme(leaderboard_md):
    """Update the profile README in the target repo with the new leaderboard."""
    url = f"{API_BASE}/repos/{ORG}/{TARGET_REPO}/contents/{TARGET_PATH}"
    data = _api_get(url)
    if data is None:
        print(f"Could not fetch {TARGET_PATH} from {ORG}/{TARGET_REPO}", file=sys.stderr)
        sys.exit(1)

    current_content = base64.b64decode(data["content"]).decode()
    sha = data["sha"]

    section = f"{LEADERBOARD_START}\n{leaderboard_md}\n{LEADERBOARD_END}"

    if LEADERBOARD_START in current_content and LEADERBOARD_END in current_content:
        start = current_content.index(LEADERBOARD_START)
        end = current_content.index(LEADERBOARD_END) + len(LEADERBOARD_END)
        new_content = current_content[:start] + section + current_content[end:]
    else:
        new_content = current_content.rstrip() + "\n\n" + section + "\n"

    if new_content == current_content:
        print("Leaderboard is already up to date.")
        return

    encoded = base64.b64encode(new_content.encode()).decode()
    payload = json.dumps(
        {
            "message": "Update organization leaderboard",
            "content": encoded,
            "sha": sha,
        }
    ).encode()

    token = os.environ.get("GITHUB_TOKEN", "")
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": ORG,
        "Content-Type": "application/json",
    }
    if token:
        headers["Authorization"] = f"token {token}"

    req = urllib.request.Request(url, data=payload, headers=headers, method="PUT")
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"README updated successfully ({resp.status}).")
    except urllib.error.HTTPError as exc:
        print(f"Failed to update README: HTTP {exc.code} {exc.reason}", file=sys.stderr)
        sys.exit(1)


def main():
    leaderboard = build_leaderboard()
    if not leaderboard:
        print("No contributors found. Skipping update.")
        return
    table = render_table(leaderboard)
    print(table)
    update_readme(table)


if __name__ == "__main__":
    main()
