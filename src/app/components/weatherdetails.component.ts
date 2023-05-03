import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from '../model/weather';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy{
  
  openWeatherApiKey:string = environment.openWeatherApiKey
  private city: string = 'London'
  // private country?:string
  // private imageUrl?:string
  model = new Weather(this.city,0,0,0,'','',0,0)

  params$!: Subscription

  constructor(private weatherSvc: WeatherService, private router: Router, 
      private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.params$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.city = params['city']
      }
    )
    this.getWeatherDetailsFromApi(this.city)
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe()
  }

  getWeatherDetailsFromApi(city:string){
    this.weatherSvc.getWeather(city, this.openWeatherApiKey)
      .then((result)=>{
        console.log(result)
        const cityObcj = this.weatherSvc.getCityUrl(city)
        this.model = new Weather(city,
          result.main.temp,
          result.main.pressure,
          result.main.humidity,
          result.weather[0].description,
          cityObcj!.imageUrl,
          result.wind.speed,
          result.wind.deg)
        })
      .catch(
        (err)=>{
          console.error(err)
          this.router.navigate([''])
        })
  }



}
