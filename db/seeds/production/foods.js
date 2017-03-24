exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Pie", 550]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Carrots", 45]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Pizza", 950]
      )
    ]);
  });
};
