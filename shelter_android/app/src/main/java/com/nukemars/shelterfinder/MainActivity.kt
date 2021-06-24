package com.nukemars.shelterfinder

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.app.ActivityOptionsCompat
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.NavigationUI.setupWithNavController
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.navigation.NavigationView
import com.nukemars.shelterfinder.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        appBarConfiguration = AppBarConfiguration(
            setOf(
                
                R.id.navigation_home,
                R.id.navigation_place,
                R.id.navigation_notifications,
                R.id.navigation_profile
            ), binding.drawerLayout
        )
        binding.navView.getMenu().findItem(R.id.navigation_logout)
            .setOnMenuItemClickListener { menuItem ->
                val intent = Intent(this, WelcomeActivity::class.java)
                val bundle = ActivityOptionsCompat.makeCustomAnimation(
                    this,
                    android.R.anim.fade_in, android.R.anim.fade_out
                ).toBundle()
                startActivity(intent, bundle)
                true
            }

        setupWithNavController(binding.navView, navController())
        binding.bottomNavigationView.setupWithNavController(navController())

    }


    private fun navController(): NavController {
        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        return navHostFragment.navController
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController().navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }


}