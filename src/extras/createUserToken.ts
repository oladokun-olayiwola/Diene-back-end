interface user {
  name: string,
  _id: Object,
}

const createTokenUser = (user: user) => {
  return { name: user.name, _id: user._id};
};

export default createTokenUser;