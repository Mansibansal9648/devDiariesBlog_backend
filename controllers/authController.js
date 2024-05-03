import { loginUser,signUpUser } from "../repository/authRepository.js";

const signUp=async(req,res)=>{
try{
signUpUser();
}catch(error){

}
}

const login=async(req,res)=>{
    try{
    loginUser();
    }catch(error){
        
    }
    }
 export {signUp,login} 