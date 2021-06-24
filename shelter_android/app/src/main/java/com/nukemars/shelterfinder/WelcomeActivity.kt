package com.nukemars.shelterfinder

import android.R
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityOptionsCompat
import com.nukemars.shelterfinder.databinding.ActivityWelcomeBinding


class WelcomeActivity : AppCompatActivity() {
    private lateinit var binding: ActivityWelcomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.buttonStart.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            val bundle = ActivityOptionsCompat.makeCustomAnimation(
                this,
                R.anim.fade_in, R.anim.fade_out
            ).toBundle()
            startActivity(intent, bundle)
            this.finish()
        }
    }
}