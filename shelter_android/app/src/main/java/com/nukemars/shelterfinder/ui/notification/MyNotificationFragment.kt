package com.nukemars.shelterfinder.ui.notification

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.RecyclerView
import com.nukemars.shelterfinder.MainActivity
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.models.FriendRequest
import com.nukemars.shelterfinder.ui.adapters.NotifyAdapter

class MyNotificationFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedState: Bundle?
    ): View {
        val root = inflater.inflate(R.layout.fragment_my_notification, container, false)
        val recyclerFriendRequest = root.findViewById<RecyclerView>(R.id.rv_friend_request)
        Log.d("--NotificationFragment", "NotifyAdapter")
        val text_total_request = root.findViewById<TextView>(R.id.text_total_request)

        val adapter = NotifyAdapter()
        adapter.initRecyclerViews(recyclerFriendRequest)
        val items: MutableList<FriendRequest> = mutableListOf(
            FriendRequest("Patricia", 3),
            FriendRequest("Jennifer", 8),
            FriendRequest("Robert", 27),
            FriendRequest("Thomas", 6),
            FriendRequest("Margaret", 9),
            FriendRequest("Ashley", 5),
            FriendRequest("Kevin", 1)
        )
        text_total_request.text = items.size.toString()
        adapter.insertItems(items)
        return root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)


//        adapter.onItemClick = {
//            Log.d("",""+it.name)
//        }

    }


}