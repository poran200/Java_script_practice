const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
class UserRepository {
    constructor(fileName) {
        if (!fileName){
            throw new Error("fileName is required");
        }
        this.fileName = fileName;
        try {
         fs.accessSync(this.fileName);
        }catch (e) {
         fs.writeFileSync(this.fileName,'[]');
        }
    }
    async getAll(){
      const content = await fs.promises.readFile(this.fileName,'utf-8');
        return  JSON.parse(content);
    }
    async create(object){
        object.id= this.generateRandomId();
        const  users= await this.getAll();
        const salt = crypto.randomBytes(8).toString('hex');
        const hash = await scrypt(object.password,salt,64);

        users.push({
            ...object,
            password: `${hash.toString(`hex`)}.${salt}`
        });
        await this.writeAll(users);
        return object;
    }
    async comparePassword(savePassword, userPassword){
        const [saveUserPassword,salt] = savePassword.split('.');
        const hasPassword = await scrypt(userPassword,salt,64);
        return  hasPassword.toString('hex') === saveUserPassword;
    }
    async findById(id){
       let data = await this.getAll();
      return  data.find(record=>record.id===id);
    }
    async update(id, object){
        const records =  await this.getAll();
        const record = records.find(re=> re.id===id);
        Object.assign(record,object);
        await this.writeAll(records);
    }
    async delete(id){
        const data = await this.getAll();
         const filterRecord =data.filter(record=>record.id !==id);
         await this.writeAll(filterRecord);
    }
    async getOneBy(filters){
        const records= await this.getAll();
        for (let record of records) {
            let found = true;
            for (const key in filters) {
                if (record[key] !== filters[key]){
                    found= false;
                }
            }
            if (found){
                return  record;
            }
        }
    }
    async writeAll(records){
        await fs.promises.writeFile(this.fileName,JSON.stringify(records,null,2));
    }
    generateRandomId(){
       return crypto.randomBytes(4).toString('hex');
     }
}

module.exports = new UserRepository('user.json');

