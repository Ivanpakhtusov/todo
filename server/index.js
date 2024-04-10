const { User } = require("./db/models");

const run = async () => {
  try {
    const managerLogin = "manager@manager.com";
    const users = await User.findAll({
      where: {
        manager_id: managerLogin,
      },
      raw: true,
    });
    console.log(users);
  } catch (error) {
    console.log(error.message);
  }
};

run();
