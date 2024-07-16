import{Injectable} from'@angular/core'
import {Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, signInWithPopup , GoogleAuthProvider,FacebookAuthProvider,TwitterAuthProvider,getAuth, sendEmailVerification, User} from '@angular/fire/auth'
@Injectable({
    providedIn:'root'
})
/*
This class creates a user authentication service using methods of angular fire
*/
export class AuthService{
    constructor(public auth:Auth){

    }
  
    createUserWithEmailAndPassword({ email, password }: { email: string, password: string }){
        return createUserWithEmailAndPassword(this.auth,email, password);

    }
    signInWithEmailAndPassword({email, password}:any){
        return signInWithEmailAndPassword(this.auth,email, password)
    }
    sign_out(){
        return signOut(this.auth)
    }
    signInWithGoogle(){
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }
    signInWithFacebook(){
        return signInWithPopup(this.auth, new FacebookAuthProvider());
    }
    signInWithTwitter(){
        return signInWithPopup(this.auth, new TwitterAuthProvider());
    }
    async sendEmailVerification(){
        const authUser = getAuth();
        if (authUser !== null) {
            sendEmailVerification(authUser.currentUser as User)
        }
}
    
}