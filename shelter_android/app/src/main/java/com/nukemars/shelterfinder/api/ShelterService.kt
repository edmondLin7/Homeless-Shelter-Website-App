package com.nukemars.shelterfinder.api

import android.content.Context
import android.util.Log
import androidx.preference.PreferenceManager
import com.google.gson.GsonBuilder
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class ShelterService(context: Context) {
    private val shelterService: ShelterApiInterface

    init {
        val gson = GsonBuilder()
            .setLenient()
            .create()
        val retrofit = Retrofit.Builder()
            .baseUrl(getBaseUrl(context))
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
        shelterService = retrofit.create(ShelterApiInterface::class.java)

    }
    // http://10.0.2.2 -> emulator
    private fun getBaseUrl(context: Context): String {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        val baseUrl = sharedPreferences.getString("base_url", "http://192.168.1.90")
        val port = sharedPreferences.getString("port", "5000")
        val url = "$baseUrl:$port/"
        Log.d("Base Url:", "" + url)
        return url
    }

    fun getShelters() = shelterService.listShelters()

}