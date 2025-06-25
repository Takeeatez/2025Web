const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // JSON 파싱 미들웨어

let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
];

// GET 전체 조회
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// POST 새 항목 추가
app.post('/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT 전체 항목 수정
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(i => i.id == id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.name = name;
  res.status(200).json(item);
});

// PATCH 일부 속성 수정
app.patch('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(i => i.id == id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  if (name) item.name = name;
  res.status(200).json(item);
});

// DELETE 항목 삭제
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id == id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  const deleted = items.splice(index, 1);
  res.status(200).json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});