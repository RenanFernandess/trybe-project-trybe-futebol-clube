const userMock = {
  dataValues: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}
export default userMock;

export const noPassword = {
  "email": "test@gmail.com",
  "password": ""
};

export const noEmail = {
  "email": "",
  "password": "password"
};

export const invalidEmail = {
  "email": "incorrect@admin.com",
  "password": "secret_admin"
};

export const invalidPassword = {
  "email": "admin@admin.com",
  "password": "incorrect"
};

export const login = {
  "email": "admin@admin.com",
  "password": "secret_admin"
};
