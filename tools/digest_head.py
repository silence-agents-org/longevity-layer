#!/usr/bin/env python3
"""Compute the next published head for the weekly digest.

Usage: python3 tools/digest_head.py <range_start> <range_end> <file> [<file> ...]

Prints one Markdown table row for research/digest/HEADS.md:
  published_utc | range | files with sha256 | prev_head | prev_published_utc | head

head = sha256(prev_head + "\\n" + sorted "path:sha256" lines). It chains each
weekly head to the one before, so a rewritten past entry breaks every later
head. prev_published_utc makes a missed week visible to anyone.
Standard library only.
"""
import hashlib, sys, re, datetime, os

HEADS = os.path.join(os.path.dirname(__file__), '..', 'research', 'digest', 'HEADS.md')
GENESIS = '0' * 64

def sha(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

def last_head():
    try:
        rows = [l for l in open(HEADS) if re.match(r'^\| \d{4}-', l)]
    except FileNotFoundError:
        return GENESIS, '-'
    if not rows:
        return GENESIS, '-'
    cells = [c.strip().strip('`') for c in rows[-1].strip().strip('|').split('|')]
    return cells[-1], cells[0]

def main(a):
    if len(a) < 3:
        sys.exit(__doc__)
    start, end, files = a[0], a[1], sorted(a[2:])
    prev, prev_ts = last_head()
    lines = ['%s:%s' % (f, sha(f)) for f in files]
    head = hashlib.sha256((prev + '\n' + '\n'.join(lines)).encode()).hexdigest()
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    fl = '<br>'.join('`%s` `%s`' % tuple(l.split(':')) for l in lines)
    print('| %s | %s..%s | %s | `%s` | %s | `%s` |' % (now, start, end, fl, prev, prev_ts, head))

if __name__ == '__main__':
    main(sys.argv[1:])
