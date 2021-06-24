package com.nukemars.shelterfinder.ui.adapters

import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.Marker
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.models.Shelter
import com.squareup.picasso.Callback
import com.squareup.picasso.Picasso
import java.lang.Exception


class ShelterInfoWindow(private val context: Fragment) : GoogleMap.InfoWindowAdapter {
    private lateinit var view: View
    override fun getInfoWindow(marker: Marker?): View {
        getInfoContents(marker)
        return view
    }

    override fun getInfoContents(marker: Marker?): View {
        view = context.layoutInflater.inflate(R.layout.infowindow_shelter, null)
        marker?.let {
            val imageView = view.findViewById<ImageView>(R.id.image_view)
            val textName = view.findViewById<TextView>(R.id.text_name)
            val textDescription = view.findViewById<TextView>(R.id.text_description)
            val shelter = marker.tag as Shelter
            textName.text = shelter.shelterName
            textDescription.text = shelter.descriptions
            val imageUrl = shelter.imageURL
            if (!imageUrl.isNullOrEmpty()) {
                Picasso.get().load(imageUrl).error(R.drawable.ic_baseline_error_24)
                    .placeholder(R.mipmap.ic_launcher)
                    .into(imageView, MarkerCallback(marker))
            }
        }
        return view
    }

    private class MarkerCallback(m: Marker) : Callback {
        private var marker: Marker = m
        override fun onSuccess() {
            try {
                if (!marker.isInfoWindowShown) {
                    return
                }
                marker.hideInfoWindow()
                marker.showInfoWindow()   // refresh contents
            }catch (ex:Exception){

            }
        }

        override fun onError(e: Exception?) {
        }
    }
}
