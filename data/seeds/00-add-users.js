
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'user1', password: '1234'},
        { name: 'user2', password: '1234'},
        { name: 'user3', password: '1234'}
      ]);
    });
};
