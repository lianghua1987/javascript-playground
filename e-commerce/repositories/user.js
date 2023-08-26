const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require("./repository");
const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends Repository {
  async create(attrs) {
    const salt = crypto.randomBytes(8).toString("hex");
    // crypto.scrypt(attrs.password, salt, 64, (err, buff) => {
    //   const hash = buff.toString("hex");
    // });
    const buf = await scrypt(attrs.password, salt, 64);
    attrs.id = this.randomId();
    const users = await this.getAll();
    const user = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`
    };
    users.push(user);
    await this.writeAll(users);
    return user;
  }

  async validatePassword(saved, supplied) {
    const [hashedSaved, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
    return hashedSaved === hashedSuppliedBuf.toString("hex");
  }
}

module.exports = new UserRepository("users.json");

// const test = async () => {
//   const repo = new UserRepository("users.json");
//   // await repo.create({email: "hua@test.com", password: "abc123"});
//   await repo.update("4eacd43d9d843454b8d85c4a7acf3678", {email: "hua@test.com", password: "bbb"})
//   // const users = await repo.getAll();
//   // await repo.delete("33d3319846ff693c7138d1a2f9ff3849");
//   const user = await repo.getOneBy({email: "hua@test.com", password: "bbb"});
//   console.log(user);
// };
//
// test();