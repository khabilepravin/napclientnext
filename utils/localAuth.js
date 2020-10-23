class localAuth {    
    static putUserId(userId){
        localStorage.setItem('USERID', userId);
    }

    static getUserId(){
        localStorage.getItem('USERID');
    }

    static removeUserId(){
        localStorage.removeItem('USERID');
    }
}

export default localAuth;