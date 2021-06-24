package com.nukemars.shelterfinder.ui.shelter_detail

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.nukemars.shelterfinder.MainActivity
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.databinding.FragmentShelterDetailBinding
import com.nukemars.shelterfinder.models.Shelter
import com.nukemars.shelterfinder.ui.home.ShelterSliderFragment
import com.squareup.picasso.Picasso

class ShelterDetailFragment : Fragment(), OnMapReadyCallback {
    private lateinit var mainActivity: MainActivity
    private lateinit var binding: FragmentShelterDetailBinding
    private var shelter: Shelter = Shelter()
    private var shelterLocation = LatLng(37.3351874, -121.8810715)
    private val zoom = 13f
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainActivity = activity as MainActivity
    }

    override fun onCreateView(inf: LayoutInflater, vg: ViewGroup?, savedState: Bundle?): View {
        binding = FragmentShelterDetailBinding.inflate(layoutInflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        arguments?.takeIf { it.containsKey(ShelterSliderFragment.SHELTERS_OBJECT) }?.apply {
            getParcelable<Shelter>(ShelterSliderFragment.SHELTERS_OBJECT)?.let {
                shelter = it
                binding.textName.text = shelter.shelterName
                binding.textAddress.text = shelter.address
                binding.textDescription.text = shelter.descriptions
                binding.textPhone.text = shelter.phoneNumber
                binding.textUrl.text = shelter.website
                if (!shelter.imageURL.isNullOrEmpty()) {
                    Picasso.get().load(shelter.imageURL).error(R.mipmap.ic_launcher)
                        .placeholder(R.mipmap.ic_launcher)
                        .into(binding.imageView)
                }
                binding.cardUrl.setOnClickListener {
                    val intent = Intent(Intent.ACTION_VIEW)
                    intent.data = Uri.parse(shelter.website)
                    startActivity(intent)
                }
                binding.cardPhone.setOnClickListener {
                    val intent = Intent(Intent.ACTION_DIAL)
                    intent.data = Uri.parse("tel:" + shelter.phoneNumber)
                    startActivity(intent)
                }
                binding.cardAddress.setOnClickListener {
                    val intent = Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse("google.navigation:q=" + shelter.address)
                    )
                    startActivity(intent)
                }
                shelterLocation = LatLng(shelter.latitude, shelter.longitude)
                getGoogleMap()
            }
        }
    }

    fun getGoogleMap() {
        val mapFragment =
            childFragmentManager.findFragmentById(binding.mapView.id) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(shelterLocation, zoom))
        googleMap.uiSettings.isMyLocationButtonEnabled = true
        googleMap.uiSettings.isZoomControlsEnabled = true
        googleMap.uiSettings.isCompassEnabled = true
        googleMap.uiSettings.isTiltGesturesEnabled = true
        addMarker(googleMap)
    }

    private fun addMarker(googleMap: GoogleMap) {
        val markerOptions = MarkerOptions()
        markerOptions.position(shelterLocation)
            .title(shelter.shelterName)
            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_CYAN))
        googleMap.addMarker(markerOptions)
    }


}