const fs = require("fs");
const crypto = require("crypto");

module.exports = class Repository {
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

  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
    return attrs;
  }
}