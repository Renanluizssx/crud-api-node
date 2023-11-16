const express = require("express");
//abrir a instância
const app = express();
//Express para usar o json
app.use(express.json());
//Queryparams = ?nome=Nodejs
//Route Params = /curso/2
//Request Body = {nome: "Node.js", tipo: "Baxk-end"}

//Crud Create, Read, Update, Delete
//Array de cursos
const cursos = ["Node Js", "JavaScript", "React Native"];
//localhost?3000/curso/2
//Pegar todas as informações do json

//MiddleWare Global
app.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}`);
  return next();
});

function checkCurso(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: "Nome do cuso é obrigatório" });
  }
  return next();
}
function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return res.status(400).json({ error: "O curso não existe" });
  }

  return next();
}

app.get("/cursos", (req, res) => {
  return res.json(cursos);
});
//Pegar as aplicações com um id
app.get("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
});
//Criando um novo curso
app.post("/cursos", checkCurso, (req, res) => {
  const { nome } = req.body;
  cursos.push(nome);

  return res.json(cursos);
});

//Atualizando um novo curso
app.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;

  cursos[index] = nome;
  return res.json(cursos);
});
//Excluindo algum curso

app.delete("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;
  cursos.splice(index, 1);
  return res.json(cursos);
});

//Startar a aplicação
app.listen(3000, () => {
  console.log("Porta aberta");
});
