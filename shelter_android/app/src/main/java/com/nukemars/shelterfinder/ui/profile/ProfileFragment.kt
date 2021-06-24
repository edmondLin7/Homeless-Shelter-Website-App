package com.nukemars.shelterfinder.ui.profile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.nukemars.shelterfinder.MainActivity
import com.nukemars.shelterfinder.databinding.FragmentProfileBinding

class ProfileFragment : Fragment() {
    private lateinit var mainActivity: MainActivity
    private lateinit var binding: FragmentProfileBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainActivity = activity as MainActivity
    }

    override fun onCreateView(inf: LayoutInflater, vg: ViewGroup?, savedState: Bundle?): View {
        binding = FragmentProfileBinding.inflate(layoutInflater)
        return binding.root
    }
}