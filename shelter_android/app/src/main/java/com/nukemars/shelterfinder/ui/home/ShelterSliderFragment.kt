package com.nukemars.shelterfinder.ui.home


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.databinding.FragmentShelterSliderBinding
import com.nukemars.shelterfinder.models.Shelter
import com.nukemars.shelterfinder.ui.`interface`.ShelterPressedListener
import com.squareup.picasso.Picasso

class ShelterSliderFragment : Fragment() {
    companion object {
        const val SHELTERS_OBJECT = "object"
    }

    private lateinit var binding: FragmentShelterSliderBinding
    private var shelter: Shelter = Shelter()
    override fun onCreateView(inf: LayoutInflater, vg: ViewGroup?, savedState: Bundle?): View {
        binding = FragmentShelterSliderBinding.inflate(layoutInflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        arguments?.takeIf { it.containsKey(SHELTERS_OBJECT) }?.apply {
            getParcelable<Shelter>(SHELTERS_OBJECT)?.let {
                shelter = it
                binding.textName.text = shelter.shelterName
                binding.textDescription.text = shelter.descriptions
                binding.textUrl.text = shelter.website
                if (!shelter.imageURL.isNullOrEmpty()) {
                    Picasso.get().load(shelter.imageURL).error(R.mipmap.ic_launcher)
                        .placeholder(R.mipmap.ic_launcher)
                        .into(binding.imageView)
                }

                binding.cardSlider.setOnClickListener {
                    callBackListener?.onItemClick(shelter)
                }
            }

        }
    }
    private var callBackListener: ShelterPressedListener? = null
    fun setOnShelterPressedListener(listener: ShelterPressedListener) {
        this.callBackListener = listener
    }

}