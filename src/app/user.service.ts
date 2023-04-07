import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as bcrypt from 'bcryptjs';

type LoginInfo = {
  email: string;
  password: string;
}

type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  favorites?: Array<string>;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  signedInUser: User = {
    _id: '',
    name: '',
    email: '',
    password: '',
    favorites: ['']
  }

  showConfirmationModal = false;


  createUser(user: User): Observable<string> {
    return this.http.get('https://crudcrud.com/api/66e43759ff764b07adbdf81e8072b76b/users').pipe(
      map((response: any) => {
        const existingAccount = response.filter((account: any) => account.email === user.email);
        if(existingAccount.length > 1) {
          return 'Email address has already been used';
        } else {
          user.password = this.encryptPassword(user.password);
          this.http.post('https://crudcrud.com/api/66e43759ff764b07adbdf81e8072b76b/users', user)
          .subscribe((Response: any) => {
            this.signedInUser = Response;
          })
          return 'Success';
        }
      }))
    }

  encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  passwordsMatch(enteredPassword: string, storedPassword: string) {
    const isMatch = bcrypt.compareSync(enteredPassword, storedPassword);
    return isMatch;
  }

  userSignIn(loginInfo: LoginInfo): Observable<string> {
    return this.http.get('https://crudcrud.com/api/66e43759ff764b07adbdf81e8072b76b/users').pipe(
      map((Response: any) => {
        const userInfo = Response.filter((user: User) => {
          return user.email === loginInfo.email;
        })
        if (userInfo.length < 1) {
          return 'Account does not exist';
        } else if (this.passwordsMatch(loginInfo.password, userInfo[0].password)) {
          this.signedInUser = {
            _id: userInfo[0]._id,
            name: userInfo[0].name,
            email: userInfo[0].email,
            password: userInfo[0].password,
            favorites: userInfo[0].favorites
          }
          return 'success';
        } else {
          return 'Incorrect password';
        }
      })
    );
  }


  addRecipeToFavorites(id: string) {
    if(!this.signedInUser.favorites) {
      this.signedInUser.favorites = [id];
    } else {
      this.signedInUser.favorites.push(id);
    }
    this.updateUserInfo();
  }

  removeRecipeFromFavorites(id: string) {
    this.signedInUser.favorites = this.signedInUser.favorites?.filter(favorite => favorite !== id)
    this.updateUserInfo();
  }

  updateUserInfo() {
    let updatedUser = {
      name: this.signedInUser.name,
      email: this.signedInUser.email,
      password: this.signedInUser.password,
      favorites: this.signedInUser.favorites
    }
    this.http.put(`https://crudcrud.com/api/66e43759ff764b07adbdf81e8072b76b/users/${this.signedInUser._id}`, updatedUser)
       .subscribe((response: any) => {
         console.log(response);
       })
  }

  signOut() {
    this.signedInUser = {
      _id: '',
      name: '',
      email: '',
      password: '',
      favorites: ['']
    }
  }

  updateEmailAddress(email: string) {
    return this.http.get('https://crudcrud.com/api/66e43759ff764b07adbdf81e8072b76b/users').pipe(
      map((response: any) => {
        const existingAccount = response.filter((account: any) => account.email === email);
        if(existingAccount.length < 1) {
          this.updateUserInfo();
          return 'success';
        } else if(existingAccount[0]._id === this.signedInUser._id) {
          return 'success';
        } else {
          return 'Email address already exists.';
        }
      })
    )
  }

  reloadSavedUserData() {
    this.http.get(`https://crudcrud.com/api/66e43759ff764b07adbdf81e8072b76b/users/${this.signedInUser._id}`)
      .subscribe((response: any) => {
        this.signedInUser = response;
      })
  }

  deleteSignedInAccount() {
    this.http.delete(`https://crudcrud.com/api/66e43759ff764b07adbdf81e8072b76b/users/${this.signedInUser._id}`)
      .subscribe((response: any) => {
        this.signOut();
      })
  }

  toggleConfirmationModal() {
    this.showConfirmationModal = !this.showConfirmationModal;
  }

}


