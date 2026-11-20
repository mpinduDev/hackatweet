const { checkBody } = require('../modules/checkBody');

describe('checkBody', () => {
  it('renvoie true si tous les champs sont remplis', () => {
    expect(
      checkBody({ username: 'john', password: 'azerty' }, [
        'username',
        'password',
      ]),
    ).toBe(true);
  });

  it('renvoie false si un champ manque', () => {
    expect(checkBody({ username: 'john' }, ['username', 'password'])).toBe(
      false,
    );
  });

  it('renvoie false si un champ ne contient que des espaces', () => {
    expect(
      checkBody({ username: '   ', password: 'azerty' }, [
        'username',
        'password',
      ]),
    ).toBe(false);
  });

  it("renvoie false si un champ n'est pas du texte", () => {
    expect(
      checkBody({ username: 42, password: 'azerty' }, ['username', 'password']),
    ).toBe(false);
  });
});
