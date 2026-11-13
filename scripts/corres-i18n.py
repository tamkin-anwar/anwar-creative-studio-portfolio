#!/usr/bin/env python3
"""corres.app in every language Corres speaks.

public/corres/index.html is the one page anyone edits, in English. This
script turns it into one page per language, so that someone searching in
Japanese or Arabic finds Corres in their own language:

  python3 scripts/corres-i18n.py extract   # English text -> i18n/corres/en.json
  python3 scripts/corres-i18n.py build     # i18n/corres/<lang>.json -> public/corres/<slug>/index.html

`extract` lists every piece of visible text (and alt text, labels, the
title and the descriptions search engines and link previews read) as a
numbered unit. A translation is the same file with each unit's text in
another language. `build` writes each language's page, links every page to
all the others (hreflang, the way Google asks), adds the language list to
the footer and rewrites the sitemap.

After changing the English page, run `extract`; units whose English
changed are listed as stale until their translations are updated.
"""
import hashlib
import html
import json
import os
import re
import sys

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'public', 'corres', 'index.html')
I18N = os.path.join(ROOT, 'i18n', 'corres')
OUT = os.path.join(ROOT, 'public', 'corres')
SITE = 'https://corres.app/'

# Every language the Corres app speaks, with English as one page (its
# regional variants share it). slug: the folder; tag: hreflang and
# <html lang>; og: Open Graph locale; name: what the language calls itself.
LANGS = [
    dict(code='en', slug='', tag='en', og='en_US', name='English'),
    dict(code='ja', slug='ja', tag='ja', og='ja_JP', name='日本語'),
    dict(code='zh-Hans', slug='zh-hans', tag='zh-Hans', og='zh_CN', name='简体中文'),
    dict(code='zh-Hant', slug='zh-hant', tag='zh-Hant', og='zh_TW', name='繁體中文'),
    dict(code='ko', slug='ko', tag='ko', og='ko_KR', name='한국어'),
    dict(code='de', slug='de', tag='de', og='de_DE', name='Deutsch'),
    dict(code='fr', slug='fr', tag='fr', og='fr_FR', name='Français'),
    dict(code='fr-CA', slug='fr-ca', tag='fr-CA', og='fr_CA', name='Français (Canada)'),
    dict(code='es', slug='es', tag='es', og='es_ES', name='Español'),
    dict(code='pt-BR', slug='pt-br', tag='pt-BR', og='pt_BR', name='Português (Brasil)'),
    dict(code='pt-PT', slug='pt-pt', tag='pt-PT', og='pt_PT', name='Português (Portugal)'),
    dict(code='it', slug='it', tag='it', og='it_IT', name='Italiano'),
    dict(code='nl', slug='nl', tag='nl', og='nl_NL', name='Nederlands'),
    dict(code='sv', slug='sv', tag='sv', og='sv_SE', name='Svenska'),
    dict(code='da', slug='da', tag='da', og='da_DK', name='Dansk'),
    dict(code='nb', slug='nb', tag='nb', og='nb_NO', name='Norsk bokmål'),
    dict(code='pl', slug='pl', tag='pl', og='pl_PL', name='Polski'),
    dict(code='cs', slug='cs', tag='cs', og='cs_CZ', name='Čeština'),
    dict(code='ro', slug='ro', tag='ro', og='ro_RO', name='Română'),
    dict(code='uk', slug='uk', tag='uk', og='uk_UA', name='Українська'),
    dict(code='tr', slug='tr', tag='tr', og='tr_TR', name='Türkçe'),
    dict(code='ar', slug='ar', tag='ar', og='ar_AR', name='العربية', rtl=True),
    dict(code='he', slug='he', tag='he', og='he_IL', name='עברית', rtl=True),
    dict(code='vi', slug='vi', tag='vi', og='vi_VN', name='Tiếng Việt'),
    dict(code='id', slug='id', tag='id', og='id_ID', name='Bahasa Indonesia'),
    dict(code='bn', slug='bn', tag='bn', og='bn_BD', name='বাংলা'),
]

INLINE = {'a', 'strong', 'em', 'b', 'br', 'small', 'abbr', 'code'}
SKIP = {'script', 'style', 'svg'}
TEXT_ATTRS = ('alt', 'aria-label', 'title', 'placeholder')
META_KEYS = {'description', 'og:title', 'og:description', 'og:image:alt',
             'twitter:title', 'twitter:description', 'twitter:image:alt'}
TOKEN = re.compile(r'(<!--.*?-->|<[^>]+>)', re.S)
LETTERS = re.compile(r'[A-Za-z]')


def tag_name(tok):
    m = re.match(r'</?\s*([a-zA-Z0-9-]+)', tok)
    return m.group(1).lower() if m else ''


def walk(src):
    """Split the page into tokens and find the translatable units.

    Returns (tokens, units). A unit is either a run of text and inline tags
    between block tags (kind 'html') or one attribute's value (kind 'attr').
    """
    tokens = TOKEN.split(src)
    units = []
    skip_depth = []
    run = []  # indexes of tokens in the current run

    def flush():
        nonlocal run
        if run:
            parts = [tokens[i] for i in run]
            text = re.sub(r'<[^>]+>', '', ''.join(parts))
            if LETTERS.search(html.unescape(text)):
                # leave surrounding whitespace outside the unit
                first, last = run[0], run[-1]
                units.append(dict(kind='html', start=first, end=last))
        run = []

    for i, tok in enumerate(tokens):
        if not tok:
            continue
        if tok.startswith('<!--'):
            continue
        if tok.startswith('<'):
            name = tag_name(tok)
            closing = tok.startswith('</')
            if skip_depth:
                if name == skip_depth[-1] and closing:
                    skip_depth.pop()
                elif name == skip_depth[-1] and not tok.endswith('/>'):
                    skip_depth.append(name)
                continue
            if (name in SKIP or tok.startswith('<nav class="langs"')) and not closing:
                flush()
                skip_depth.append(name)
                continue
            if not closing:
                for attr in TEXT_ATTRS:
                    m = re.search(r'\s%s="([^"]*)"' % attr, tok)
                    if m and LETTERS.search(m.group(1)):
                        units.append(dict(kind='attr', tok=i, attr=attr))
                if name == 'meta':
                    key = re.search(r'(?:name|property)="([^"]+)"', tok)
                    if key and key.group(1) in META_KEYS:
                        units.append(dict(kind='attr', tok=i, attr='content'))
            if name in INLINE:
                run.append(i)
            else:
                flush()
        else:
            if skip_depth:
                continue
            run.append(i)
    flush()
    return tokens, units


def unit_text(tokens, u):
    if u['kind'] == 'html':
        s = ''.join(tokens[u['start']:u['end'] + 1])
        lead = len(s) - len(s.lstrip())
        trail = len(s) - len(s.rstrip())
        u['lead'], u['trail'] = s[:lead], s[len(s) - trail:] if trail else ''
        return s.strip()
    m = re.search(r'\s%s="([^"]*)"' % u['attr'], tokens[u['tok']])
    return m.group(1)


def ld_block(src):
    m = re.search(r'(<script type="application/ld\+json">\n)(.*?)(\n</script>)', src, re.S)
    return m


def extract():
    src = open(SRC, encoding='utf-8').read()
    tokens, units = walk(src)
    ld = json.loads(ld_block(src).group(2))
    app = next(x for x in ld['@graph'] if x['@type'] == 'SoftwareApplication')
    out = []
    for n, u in enumerate(units, 1):
        text = unit_text(tokens, u)
        prev = next((tokens[j] for j in range(u['start'] - 1, -1, -1) if tokens[j].startswith('<')), '') if u['kind'] == 'html' else ''
        ctx = prev[:60] if u['kind'] == 'html' else '%s@%s' % (u['attr'], tag_name(tokens[u['tok']]))
        out.append({'id': 'u%03d' % n, 'where': ctx, 'en': text})
    out.append({'id': 'ld-description', 'where': 'search engine description of the app', 'en': app['description']})
    for k, f in enumerate(app['featureList'], 1):
        out.append({'id': 'ld-feature-%d' % k, 'where': 'search engine feature list', 'en': f})
    out.append({'id': 'langs-label', 'where': 'aria-label of the footer list of languages', 'en': 'Languages'})
    os.makedirs(I18N, exist_ok=True)
    path = os.path.join(I18N, 'en.json')
    json.dump({'units': out}, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    # report units whose English changed since each translation was made
    for lang in LANGS[1:]:
        p = os.path.join(I18N, lang['code'] + '.json')
        if not os.path.exists(p):
            continue
        t = json.load(open(p, encoding='utf-8'))
        src_hash = t.get('source', {})
        stale = [u['id'] for u in out if src_hash.get(u['id']) != digest(u['en'])]
        if stale:
            print('%s: %d stale or missing units: %s' % (lang['code'], len(stale), ' '.join(stale[:12])))
    print('%d units -> %s' % (len(out), os.path.relpath(path, ROOT)))


def digest(s):
    return hashlib.sha1(s.encode('utf-8')).hexdigest()[:10]


def tags_of(s):
    return sorted(re.findall(r'<[^>]+>', s))


def href_for(from_slug, to_slug):
    up = '../' if from_slug else ''
    if not to_slug:
        return up or './'
    return up + to_slug + '/'


def lang_nav(slug, label):
    links = []
    for L in LANGS:
        cur = ' aria-current="page"' if L['slug'] == slug else ''
        links.append('<a href="%s" hreflang="%s" lang="%s"%s>%s</a>' % (
            href_for(slug, L['slug']), L['tag'], L['tag'], cur, L['name']))
    return '<nav class="langs" aria-label="%s">\n      %s\n    </nav>' % (html.escape(label, quote=True), '\n      '.join(links))


def alternates():
    rows = ['<link rel="alternate" hreflang="%s" href="%s%s">' % (L['tag'], SITE, L['slug'] + '/' if L['slug'] else '') for L in LANGS]
    rows.append('<link rel="alternate" hreflang="x-default" href="%s">' % SITE)
    return '\n'.join(rows)


LANG_CSS = """
  /* The footer's list of languages: every page links to every other. */
  .langs { display: flex; flex-wrap: wrap; gap: 4px 14px; margin: 18px 0 6px; font-size: 13px; }
  .langs a { color: var(--sec); text-decoration: none; padding: 6px 0; }
  .langs a:hover, .langs a[aria-current] { color: var(--ink); }
  @media (hover: none) and (pointer: coarse) { .langs a { padding: 10px 0; } }
"""


def rel_fix(s):
    """Point relative links and images one folder up, for a page in /<slug>/."""
    def fix(m):
        attr, val = m.group(1), m.group(2)
        if attr == 'srcset':
            parts = [p.strip() for p in val.split(',')]
            return '%s="%s"' % (attr, ', '.join(fix_one(p) for p in parts))
        return '%s="%s"' % (attr, fix_one(val))

    def fix_one(v):
        if re.match(r'(https?:|mailto:|tel:|#|/|data:|\.\./)', v) or v == './':
            return v
        return '../' + v
    return re.sub(r'\b(href|src|srcset)="([^"]*)"', fix, s)


def page(lang, tr):
    src = open(SRC, encoding='utf-8').read()
    tokens, units = walk(src)
    en = json.load(open(os.path.join(I18N, 'en.json'), encoding='utf-8'))['units']
    by_id = {u['id']: u['en'] for u in en}
    t = (tr or {}).get('units', {})

    def T(uid):
        if not tr:
            return by_id[uid]
        val = t.get(uid)
        if val is None:
            raise SystemExit('%s: missing %s' % (lang['code'], uid))
        return val

    if tr:
        for n, u in enumerate(units, 1):
            uid = 'u%03d' % n
            english = unit_text(tokens, u)
            val = T(uid)
            if u['kind'] == 'html':
                if tags_of(val) != tags_of(english):
                    raise SystemExit('%s %s: the tags changed\n  en: %s\n  %s: %s' % (lang['code'], uid, english, lang['code'], val))
                tokens[u['start']] = u['lead'] + val + u['trail']
                for i in range(u['start'] + 1, u['end'] + 1):
                    tokens[i] = ''
            else:
                if '"' in val:
                    val = val.replace('"', '&quot;')
                tokens[u['tok']] = re.sub(r'(\s%s=")[^"]*(")' % u['attr'], lambda m: m.group(1) + val + m.group(2), tokens[u['tok']], count=1)
    s = ''.join(tokens)

    url = SITE + (lang['slug'] + '/' if lang['slug'] else '')
    dir_attr = ' dir="rtl"' if lang.get('rtl') else ''
    s = re.sub(r'<html[^>]*>', '<html lang="%s"%s>' % (lang['tag'], dir_attr), s, count=1)
    s = re.sub(r'<link rel="canonical" href="[^"]*">', '<link rel="canonical" href="%s">' % url, s, count=1)
    s = re.sub(r'(<meta property="og:url" content=")[^"]*(">)', r'\g<1>%s\g<2>' % url, s, count=1)
    s = re.sub(r'(<meta property="og:locale" content=")[^"]*(">)', r'\g<1>%s\g<2>' % lang['og'], s, count=1)
    # hreflang, right after the canonical link (replacing any from a previous build)
    s = re.sub(r'\n<link rel="alternate" hreflang="[^"]*" href="[^"]*">', '', s)
    s = s.replace('<link rel="canonical" href="%s">' % url, '<link rel="canonical" href="%s">\n%s' % (url, alternates()), 1)
    # the language list, last in the footer's wrap
    s = re.sub(r'\n    <nav class="langs".*?</nav>', '', s, flags=re.S)
    s = s.replace('\n    <p class="legal">', '\n    %s\n    <p class="legal">' % lang_nav(lang['slug'], T('langs-label')), 1)
    if '.langs {' not in s:
        s = s.replace('</style>', LANG_CSS + '</style>', 1)

    # structured data: the site name lives on the English home page only
    m = ld_block(s)
    ld = json.loads(m.group(2))
    if lang['slug']:
        ld['@graph'] = [x for x in ld['@graph'] if x['@type'] != 'WebSite']
        app = ld['@graph'][0]
        app['url'] = url
        app['inLanguage'] = lang['tag']
        app['description'] = T('ld-description')
        app['featureList'] = [T('ld-feature-%d' % k) for k in range(1, len(app['featureList']) + 1)]
    s = s[:m.start(2)] + json.dumps(ld, ensure_ascii=False, indent=2) + s[m.end(2):]

    if lang['slug']:
        s = rel_fix(s)
    return s


def sitemap():
    stamp = os.environ.get('LASTMOD') or __import__('datetime').date.today().isoformat()
    path = os.path.join(OUT, 'sitemap.xml')
    old = open(path, encoding='utf-8').read()
    keep = re.findall(r'<url>\s*<loc>(https://corres\.app/(?:privacy|terms|support)/)</loc>\s*<lastmod>([^<]+)</lastmod>\s*</url>', old)
    alt = ''.join('\n    <xhtml:link rel="alternate" hreflang="%s" href="%s%s"/>' % (L['tag'], SITE, L['slug'] + '/' if L['slug'] else '') for L in LANGS)
    alt += '\n    <xhtml:link rel="alternate" hreflang="x-default" href="%s"/>' % SITE
    rows = []
    for L in LANGS:
        rows.append('  <url>\n    <loc>%s%s</loc>\n    <lastmod>%s</lastmod>%s\n  </url>' % (SITE, L['slug'] + '/' if L['slug'] else '', stamp, alt))
    for loc, mod in keep:
        rows.append('  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>\n  </url>' % (loc, mod))
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
           '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + '\n'.join(rows) + '\n</urlset>\n')
    open(path, 'w', encoding='utf-8').write(xml)


def build():
    en = json.load(open(os.path.join(I18N, 'en.json'), encoding='utf-8'))['units']
    built = []
    for lang in LANGS[1:]:
        p = os.path.join(I18N, lang['code'] + '.json')
        if not os.path.exists(p):
            raise SystemExit('missing translation: %s' % os.path.relpath(p, ROOT))
        tr = json.load(open(p, encoding='utf-8'))
        tr.setdefault('units', {})
        missing = [u['id'] for u in en if u['id'] not in tr['units']]
        if missing:
            raise SystemExit('%s: missing %s' % (lang['code'], ' '.join(missing)))
        out = page(lang, tr)
        d = os.path.join(OUT, lang['slug'])
        os.makedirs(d, exist_ok=True)
        open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(out)
        built.append(lang['code'])
    # the English page last: it gains the same hreflang links and language list
    english = page(LANGS[0], None)
    open(SRC, 'w', encoding='utf-8').write(english)
    sitemap()
    print('built', len(built), 'languages:', ' '.join(built))


def stamp_sources():
    """Record which English each translation was made from (for `extract`)."""
    en = json.load(open(os.path.join(I18N, 'en.json'), encoding='utf-8'))['units']
    for lang in LANGS[1:]:
        p = os.path.join(I18N, lang['code'] + '.json')
        if os.path.exists(p):
            tr = json.load(open(p, encoding='utf-8'))
            tr['source'] = {u['id']: digest(u['en']) for u in en if u['id'] in tr.get('units', {})}
            json.dump(tr, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else ''
    if cmd == 'extract':
        extract()
    elif cmd == 'build':
        build()
    elif cmd == 'check':
        # python3 scripts/corres-i18n.py check ja de ...: every unit there, every tag kept
        en = json.load(open(os.path.join(I18N, 'en.json'), encoding='utf-8'))['units']
        for code in sys.argv[2:]:
            lang = next(L for L in LANGS if L['code'] == code)
            tr = json.load(open(os.path.join(I18N, code + '.json'), encoding='utf-8'))
            missing = [u['id'] for u in en if u['id'] not in tr.get('units', {})]
            if missing:
                raise SystemExit('%s: missing %s' % (code, ' '.join(missing)))
            page(lang, tr)
            print(code, 'ok')
    elif cmd == 'stamp':
        stamp_sources()
    else:
        print(__doc__)
