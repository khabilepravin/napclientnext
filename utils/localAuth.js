class localAuth {    
    static putUserId(userId){
        localStorage.setItem('USERID', userId);
    }

    static getUserId(){
        return localStorage.getItem('USERID');
    }

    static removeUserId(){
        localStorage.removeItem('USERID');
    }
}

export default localAuth;