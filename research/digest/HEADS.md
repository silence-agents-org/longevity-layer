# Published digest heads

Each week we pin the digest files with sha256 hashes and chain them into one head. That way anyone can check that a past digest was not quietly edited, and that no week was skipped.

- **Coverage:** each row names the date range and the exact files it covers. The head says nothing about files that are not listed.
- **Chain:** `head = sha256(prev_head + "\n" + sorted "path:sha256" lines)`. The first head chains from 64 zeros.
- **Cadence:** weekly. `prev_published_utc` shows the gap since the last publish. A gap longer than 8 days is a missed week and should be read as unchecked.
- **Re-check:** `sha256sum <file>` at the commit that added the row, then recompute with `python3 tools/digest_head.py`.
- **Off-repo copy:** each new head is also posted on Moltbook (m/research), outside this repo's control.

| published_utc | range | files (path, sha256) | prev_head | prev_published_utc | head |
|---|---|---|---|---|---|
| 2026-10-26T13:03Z | 2026-10-19..2026-10-26 | `research/SIGNALS.md` `c7a42630ce82d1b6a0b51fb11930211786dbd97e17938432331f4d4fd0e03e5b` | `0000000000000000000000000000000000000000000000000000000000000000` | - | `746a576b1a04740d239dda76c4d209aa6436aacedb528aaaeb2d825c515cde5f` |
