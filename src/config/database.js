module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'loja1',
  define: {
    timestamp: true,
    underscored: true, // padrao de tabela
    underscoredAll: true,
  },
};
