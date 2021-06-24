package com.nukemars.shelterfinder.ui.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ScrollView
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.NavHostFragment.findNavController
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.google.android.material.tabs.TabLayoutMediator
import com.nukemars.shelterfinder.MainActivity
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.api.ShelterService
import com.nukemars.shelterfinder.databinding.FragmentHomeBinding
import com.nukemars.shelterfinder.models.Shelter
import com.nukemars.shelterfinder.ui.`interface`.ShelterPressedListener
import com.nukemars.shelterfinder.ui.home.ShelterSliderFragment.Companion.SHELTERS_OBJECT
import com.nukemars.shelterfinder.ui.utils.ZoomOutPageTransformer
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeFragment : Fragment(), Callback<List<Shelter>> {
    private lateinit var mainActivity: MainActivity
    private lateinit var binding: FragmentHomeBinding
    private lateinit var shelters: List<Shelter>
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainActivity = activity as MainActivity
    }

    override fun onCreateView(inf: LayoutInflater, vg: ViewGroup?, savedState: Bundle?): View {
        binding = FragmentHomeBinding.inflate(layoutInflater)
        binding.findShelter.setOnClickListener {
            findNavController(this).navigate(R.id.navigation_place)
        }
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        loadShelters()
    }

    private fun loadShelters() {
        Log.d("Home", "loadShelters()")
        val shelterService = ShelterService(mainActivity)
        val shelterApi = shelterService.getShelters()
        shelterApi.enqueue(this)
    }

    private fun navigateToDetail(shelter: Shelter) {
        val bundle = Bundle().apply {
            putParcelable(SHELTERS_OBJECT, shelter)
        }
        findNavController(this).navigate(R.id.navigation_detail, bundle)
    }

    /**
     * A simple pager adapter that represents 5 ScreenSlidePageFragment objects, in
     * sequence.
     */
    private inner class ScreenSlidePagerAdapter(context: Fragment, shelters: List<Shelter>) :
        ShelterPressedListener,
        FragmentStateAdapter(context) {
        override fun getItemCount(): Int = shelters.size
        override fun createFragment(position: Int): Fragment {
            val fragment = ShelterSliderFragment()
            Log.d("", "" + shelters.get(position))
            fragment.arguments = Bundle().apply {
                putParcelable(SHELTERS_OBJECT, shelters.get(position))
            }
            fragment.setOnShelterPressedListener(this)
            return fragment
        }

        override fun onItemClick(shelter: Shelter) {
            Log.d("shelterName", "" + shelter.shelterName)
            navigateToDetail(shelter)
        }
    }

    override fun onResponse(call: Call<List<Shelter>>, response: Response<List<Shelter>>) {
        response.body()?.let {
            shelters = it
            val pagerAdapter = ScreenSlidePagerAdapter(requireParentFragment(), shelters)
            binding.viewPager.adapter = pagerAdapter
            binding.viewPager.setPageTransformer(ZoomOutPageTransformer())
            TabLayoutMediator(binding.dots, binding.viewPager) { tab, position ->
            }.attach()
        }
    }

    override fun onFailure(call: Call<List<Shelter>>, t: Throwable) {
        Log.d("onFailure", "" + t.message)
    }
}