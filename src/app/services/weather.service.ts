import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../model/city';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  countries = [
    { country: 'Singapore', city: 'Singapore'},
    { country: 'United Kingdom', city: 'London'},
    { country: 'Malaysia', city: 'Kuala Lumpur'},
    { country: 'Indonesia', city: 'Jakarta'},
    { country: 'China', city: 'Beijing'},
    { country: 'India', city: 'New Delhi'},
    { country: 'Thailand', city: 'Bangkok'}
  ]

  imageUrlCities = [
    { country: 'Singapore', imageUrl: ''},
    { city: 'London', imageUrl: ''},
    { city: 'Kuala Lumpur', imageUrl: ''},
    { city: 'Jakarta', imageUrl: ''},
    { city: 'Beijing', imageUrl: ''},
    { city: 'New Delhi', imageUrl: ''},
    { city: 'Bangkok', imageUrl: ''}

  ]

  constructor(private httpClient: HttpClient) { }

  getWeather(city:string, apiKey:string) : Promise<any>{

    const params = new HttpParams().set("q", city).set("appid",apiKey)

    return lastValueFrom(
      this.httpClient.get("https://api.openweather.org/data/2.5/weather", {params})
    )
  }

  getCityUrl(city:string){
    const w = this.imageUrlCities.find(v => v.city == city)
    console.log(w)
    return w
  }

  addCity(city:City){
    this.countries.push({city:city.city, country: city.country})
    this.countries.sort((a,b) => b.country > a.country ? 1: -1)
    this.imageUrlCities.push({city:city.city, imageUrl: city.imageUrl})
  }

}
