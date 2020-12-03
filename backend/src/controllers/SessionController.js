//metodos controller: index, show, update, store, destroy
/*
index: listagem de sessões
store: criar uma nova sessão
show: lista uma única sessão
update: alterar ou atualizar seesão
destroy: deletar uma sessão  
*/
import User from '../models/User';

class SessionController{
  async store(req, res){
    const { email } = req.body;

    let user = await User.findOne({ email });

    if(!user){
      user = await User.create({ email }); 
    }
    
    return res.json(user);
  }
}

export default new SessionController();