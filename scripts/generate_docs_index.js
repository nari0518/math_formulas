const fs = require('fs');
const path = require('path');

// folder containing markdown files
const docsDir = path.join(__dirname, '..', 'docs');
const outFile = path.join(docsDir, 'files.json');

// mapping of area codes and test numbers to human names
const areaMap = {
  A: '数A',
  B: '数B',
  I: '数Ⅰ',
  II: '数Ⅱ',
  III: '数Ⅲ',
  Ⅰ: '数Ⅰ',
  Ⅱ: '数Ⅱ',
  Ⅲ: '数Ⅲ',
  C: '数C'
};

const testMap = {
  '1': '1学期中間',
  '2': '1学期末',
  '3': '2学期中間',
  '4': '2学期末',
  '5': '学年末'
};

fs.readdir(docsDir, (err, files) => {
  if (err) {
    console.error('読み込みエラー:', err.message);
    process.exit(1);
  }

  // 3 部分 (年度-分野-テスト) という命名規則に一致するファイルのみ採用
  const mdFiles = files.filter(f => {
    const lower = f.toLowerCase();
    if (!lower.endsWith('.md')) return false;
    if (lower === 'readme.md') return false; // マニフェスト用の説明ファイルは除外
    return /^[^-]+-[^-]+-[^-]+\.md$/i.test(f);
  });
  const list = mdFiles.map(f => {
    const base = f.replace(/\.md$/i, '');
    const parts = base.split('-');
    const [year = '', area = '', test = ''] = parts;
    const displayName = `${year}_${areaMap[area] || area}_${testMap[test] || test}`;
    return { filename: f, year, area, test, displayName };
  });

  fs.writeFileSync(outFile, JSON.stringify(list, null, 2));
  console.log(`Generated ${outFile} with ${list.length} entries`);
});
