package com.nukemars.shelterfinder.ui.place

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.NavHostFragment
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.nukemars.shelterfinder.MainActivity
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.api.ShelterService
import com.nukemars.shelterfinder.databinding.FragmentPlaceBinding
import com.nukemars.shelterfinder.models.Shelter
import com.nukemars.shelterfinder.ui.adapters.ShelterInfoWindow
import com.nukemars.shelterfinder.ui.home.ShelterSliderFragment
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PlaceFragment : Fragment(), OnMapReadyCallback, GoogleMap.OnMarkerClickListener,
    GoogleMap.OnInfoWindowClickListener {
    private lateinit var mainActivity: MainActivity
    private lateinit var binding: FragmentPlaceBinding

    private lateinit var googleMap: GoogleMap
    private lateinit var main: MainActivity
    private lateinit var markers: MutableList<Marker>
    private val sjsu = LatLng(37.3351874, -121.8810715)
    private val zoom = 12f
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainActivity = activity as MainActivity
    }

    override fun onCreateView(inf: LayoutInflater, vg: ViewGroup?, savedState: Bundle?): View {
        binding = FragmentPlaceBinding.inflate(layoutInflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val mapFragment =
            childFragmentManager.findFragmentById(binding.mapView.id) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        this.googleMap = googleMap
        this.googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(sjsu, zoom))
        this.googleMap.setOnMarkerClickListener(this)
        this.googleMap.setOnInfoWindowClickListener(this)
        this.googleMap.uiSettings.isMyLocationButtonEnabled = true
        this.googleMap.uiSettings.isZoomControlsEnabled = true
        this.googleMap.uiSettings.isCompassEnabled = true
        this.googleMap.uiSettings.isTiltGesturesEnabled = true
        loadShelters()
        googleMap.setInfoWindowAdapter(ShelterInfoWindow(this))
    }

    private fun loadShelters() {
        val shelterService = ShelterService(this.requireContext())
        val shelterApi = shelterService.getShelters()
        shelterApi.enqueue(object : Callback<List<Shelter>> {
            override fun onResponse(
                call: Call<List<Shelter>>?,
                response: Response<List<Shelter>>?
            ) {
                response?.body()?.let { shelters ->
                    shelters.forEach { shelter ->
                        createMarker(shelter)
                    }
                }
            }

            override fun onFailure(call: Call<List<Shelter>>?, t: Throwable?) {

            }
        })
    }

    private fun createMarker(shelter: Shelter) {
        val markerOptions = MarkerOptions()
        val position = LatLng(shelter.latitude, shelter.longitude)
        markerOptions.position(position)
            .title(shelter.shelterName)
            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_CYAN))
        googleMap.addMarker(markerOptions)?.tag = shelter
    }


    override fun onMarkerClick(marker: Marker): Boolean {
        marker.showInfoWindow()
        return false
    }

    override fun onInfoWindowClick(marker: Marker) {
        val shelter = marker.tag as Shelter
        navigateToDetail(shelter)
    }

    private fun navigateToDetail(shelter: Shelter) {
        val bundle = Bundle().apply {
            putParcelable(ShelterSliderFragment.SHELTERS_OBJECT, shelter)
        }
        NavHostFragment.findNavController(this).navigate(R.id.navigation_detail, bundle)
    }
}