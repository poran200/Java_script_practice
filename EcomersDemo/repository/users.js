const fs = require('fs');
const crypto = require('crypto');
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
        const  users= await this.getAll()
        users.push(object);
        await this.writeAll(users);
    }
    async findById(id){
       let data = await this.getAll();
      return  data.find(record=>record.id===id);
    }
    async writeAll(records){
        await fs.promises.writeFile(this.fileName,JSON.stringify(records,null,2));
    }
    generateRandomId(){
       return crypto.randomBytes(4).toString('hex');
     }
}


async function test() {
    const  userRepository = new UserRepository('user.json');
     const user = await userRepository.findById('20d9c513');
    console.log(user);
}
test();
