import { User } from "../models/User.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) {}

  // Fonction pour récupérer les informations d'un user avec son id
  /**
   * 
   * @param {number} id 
   * @returns {Promise} 
   */
  getUserById(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>('http://localhost:3000/auth/profil/' + id).subscribe(
        (response: User) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  //Function pour modifier les information du profil
  /**
   * 
   * @param {number} id 
   * @param {User} user 
   * @returns {Promise}
   */
  modifyUser(id: number, user: User) {
    return new Promise<any>((resolve, reject) => {
        this.http.put<any>('http://localhost:3000/auth/profil/' + id, user).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  //Fonction pour supprimer un user
  /**
   * 
   * @param {number} id 
   * @returns {Promise}
   */
  deleteUser(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>('http://localhost:3000/auth/profil/' + id).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
