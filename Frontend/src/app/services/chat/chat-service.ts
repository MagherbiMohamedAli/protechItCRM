import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth"; 
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FirebaseUser, User } from "src/app/Model/user";
import { Observable, map, switchMap } from "rxjs";
import { Router } from "@angular/router";

const URL = "http://localhost:8080/api/Auth";

export interface Message {
    id: Number;
    from: string;
    msg: string;
    fromName: string;
    myMsg: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    currentUser: FirebaseUser | null = null;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private http: HttpClient, private router: Router) {

        this.afAuth.onAuthStateChanged(user => {
            console.log('Changed: ', user);
            this.currentUser = user;
        });
    }
    user!: FirebaseUser;

    async signUp(username: string, email: string, birthday: Date, password: string) {

        try {
            const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
            const uid = credential.user?.uid;
            if (!uid) {
                throw new Error("User UID not available");
            }
            const FirebaseUser = {

                uid,
                username,
                email,
                birthday,
                password
            };
            await this.afs.collection('users').doc(uid).set(FirebaseUser);


            const user = { username, email, birthday, password };
            return uid;
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            throw error;
        }

    }

    sendVerifEmail(user: any) {
        user.sendEmailVerification().then((res: any) => {
            this.router.navigate(['/verifyemail']);
        }, (err: any) => {
            alert("une erreur s'est produite")
        });

    }

    async signIn({ email, password }: { email: string, password: string },) {
        try {
            const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
            const user = credential.user;

            if (!user) {
                throw new Error("User information not available");
            }

            const uid = user.uid;

            if (user && user.emailVerified) {
                this.router.navigate(['/home']);
            } else {
                this.router.navigate(['/verifyemail']);
            }
            return credential;
        }
        catch (error) {
            console.error("Erreur lors de la connexion", error);
            throw error
        }
    }

    signOut() {
        return this.afAuth.signOut();
    }

    getUsers() {
        return this.afs.collection('users').valueChanges({ idField: 'uid' }) as unknown as Observable<User[]>;
    }

    getUserForMsg(msgFromId: any, users: User[]): string {
        for (let usr of users) {
            if (usr.uid == msgFromId || usr.id === msgFromId) {
                return usr.email;
            }
        }
        return 'Deleted';
    }


    addChatMessage(msg: any) {
        return this.afs.collection('messages').add({
            msg,
            from: this.currentUser?.email,
            timestamp: new Date(),
        });
    }

    getChatMessages() {
        let users: User[] = [];

        return this.getUsers().pipe(
            switchMap(res => {
                console.log('Users retrieved: ', res);
                users = res;
                return this.afs.collection('messages', ref => ref.orderBy('timestamp')).valueChanges({ idField: 'id' }) as unknown as Observable<Message[]>
            }),
            map(messages => {
                console.log('Messages retrieved: ', messages);
                for (let m of messages) {
                    m.fromName = this.getUserForMsg(m.from, users);
                    m.myMsg = this.currentUser?.uid === m.from;
                }
                console.log('Processed messages: ', messages);
                return messages;
            })
        )
    }
}
