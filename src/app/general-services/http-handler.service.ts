import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { LoaderBarService } from '../ui-components/loader-bar/loader-bar.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  private songsUrl: string = "https://fullstack-test-server.herokuapp.com/api/songs";
  private favoritseUrl: string = environment.backEndUrl +'/api/favorite/';
  private songDetailsUrl: string = environment.backEndUrl +'/api/songInDetail/';

  constructor(private http: HttpClient,
    private loaderBar: LoaderBarService) { }


  public getSongs(): Observable<any[]> {
    this.showLoader();
    const headers = new HttpHeaders().set("Authorization", "Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2aXZAY3ljdXJpdHkuY29tIiwibmFtZSI6ImF2aXYiLCJpYXQiOjE1NTQ4ODIyOTl9._cLVE40a47NXHENdLCd8L4AGaORzJs8vkIMFIt4WyWU");
    return this.http.get(this.songsUrl, { headers }).pipe(
      map((res) => { return Object.values(res["chart"]) }),
      finalize(() => {
        this.hideLoader();
      }),
    )
  }

  public getFavorites(): Observable<any> {
    return this.http.get(this.favoritseUrl);
  }

  public addToFavrites(songItem: any): Observable<any> {
    const favoriteObj = {
      songKey: songItem.key, songName: songItem.heading.title
    };
    return this.http.post<any>(this.favoritseUrl, favoriteObj)
  }

  public removeFavorite(song){
    return this.http.delete(this.favoritseUrl.concat(song.key));
  }

  public getSongDetails(songKey:string, alias:string){
    this.showLoader();
    return this.http.get(this.songDetailsUrl+`${songKey}/${alias}`).pipe(
      map((res) => { return res}),
      finalize(() => {
        this.hideLoader();
      }),
    )
  }


  private showLoader(): void {
    this.loaderBar.show();
  }
  private hideLoader(): void {
    this.loaderBar.hide();
  }




}
