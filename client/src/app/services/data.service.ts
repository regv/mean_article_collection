import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  authToken: any;
  user: any;

  constructor(
    private http: Http
  ) { }

  getDashBoard() {
    const headers = new Headers();
    this.onLoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/api/dashboard', { headers: headers }).pipe(map(res => res.json()));
  }

  getPosts() {
    const headers = new Headers();
    this.onLoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/api/posts', { headers: headers }).pipe(map(res => res.json()))
  }

  addPosts(newPost) {
    const headers = new Headers();
    this.onLoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/post/add', newPost, { headers: headers }).pipe(map(res => res.json()));
  }

  deletePosts(id) {
    const headers = new Headers();
    this.onLoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:4000/api/post/${id}`, { headers: headers }).pipe(map(res => res.json()));
  }

  editPost(id) {
    const headers = new Headers();
    this.onLoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:4000/api/post/${id}`, { headers: headers}).pipe(map(res => res.json()));
  }

  patchPost(id, newPost) {
    const headers = new Headers();
    this.onLoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.patch(`http://localhost:4000/api/post/${id}`, newPost, { headers: headers }).pipe(map(res => res.json()));
  }

  onRegister(newUser) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/user/register', newUser, { headers: headers }) .pipe(map(res => res.json()));
  }

  onAuthenticate(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/user/authenticate', user, { headers: headers })
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logoutUser() {
    this.authToken = null,
    this.user = null,
    localStorage.clear();
  }

  onLoadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('id_token') !== null);
  }
}
