const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
  { id: 1, name: 'buku novel' },
  { id: 2, name: 'buku pelajaran' }
];

app.get('/items', (req, res) => {
  res.json({ success: true, message: 'Data berhasil diambil', data: items });
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Nama item wajib diisi' });
  }

  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json({ success: true, message: 'Item berhasil ditambahkan', data: newItem });
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item tidak ditemukan' });
  }

  if (!name) {
    return res.status(400).json({ success: false, message: 'Nama item wajib diisi' });
  }

  items[itemIndex].name = name;
  res.json({ success: true, message: 'Item berhasil diperbarui', data: items[itemIndex] });
});

app.patch('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ success: false, message: 'Item tidak ditemukan' });
  }

  const { name } = req.body;
  if (name) item.name = name;

  res.json({ success: true, message: 'Item berhasil diubah sebagian', data: item });
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Item tidak ditemukan' });
  }

  const deleted = items.splice(index, 1)[0];
  res.json({ success: true, message: 'Item berhasil dihapus', data: deleted });
});

app.listen(PORT, () => {
  console.log("Server berjalan di http://localhost:${PORT}");
});