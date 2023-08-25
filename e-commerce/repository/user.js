const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);

class UserRepository {
  constructor(filename) {
    if (!filename) throw new Error("Creating a repository requires a filename");
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (e) {
      fs.writeFileSync(this.filename, JSON.stringify([]));
    }
  }

  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, {encoding: 'utf8'}));
  }

  randomId() {
    return crypto.randomBytes(16).toString("hex");
  }

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

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  async get(id) {
    const users = await this.getAll();
    return users.find(u => u.id === id);
  }

  async delete(id) {
    const users = await this.getAll();
    const filtered = users.filter(u => u.id !== id);
    await this.writeAll(filtered);
  }

  async update(id, attrs) {
    const users = await this.getAll();
    const user = users.find(u => u.id === id);
    if (!user) throw new Error(`Not able to find user with id: ${id}`);
    Object.assign(user, attrs);
    await this.writeAll(users);
  }

  async getOneBy(filters) {
    const users = await this.getAll();
    for (let user of users) {
      let found = true;
      for (let key in filters) {
        if (user[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) return user;
    }
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