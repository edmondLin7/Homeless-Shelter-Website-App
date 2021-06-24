package com.nukemars.shelterfinder.api

import com.nukemars.shelterfinder.models.Shelter
import retrofit2.Call
import retrofit2.http.GET


interface ShelterApiInterface {
    @GET("api/shelters")
    fun listShelters(): Call<List<Shelter>>
}