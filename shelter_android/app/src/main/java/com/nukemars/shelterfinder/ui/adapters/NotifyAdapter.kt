package com.nukemars.shelterfinder.ui.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.models.FriendRequest


class NotifyAdapter : RecyclerView.Adapter<NotifyAdapter.ViewHolder>() {

    var items = mutableListOf<FriendRequest>()
    override fun getItemCount(): Int = items.size

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.item_notification, viewGroup, false)
        return ViewHolder(v)
    }

    fun insertItem(item: FriendRequest) {
        this.items.add(item)
        notifyDataSetChanged()
    }

    fun insertItem(item: FriendRequest, position: Int) {
        this.items.add(item)
        notifyItemInserted(position)
    }

    fun insertItems(items: MutableList<FriendRequest>) {
        this.items = items
        this.notifyDataSetChanged()
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(items[position])
        holder.itemView.setOnClickListener { v ->
            listener?.onItemClickListener(v, items.get(holder.layoutPosition))
        }
    }

    /**
     * The interface that receives onItemClick messages.
     */
    interface OnItemClickListener {
        fun onItemClickListener(view: View, item: FriendRequest)
    }

    private var listener: OnItemClickListener? = null
//    fun setOnItemClickListener(listener: HomeFragment) {
//        this.listener = listener
//    }


    fun initRecyclerViews(recyclerView: RecyclerView) {
//        recyclerView.setHasFixedSize(true)
//        recyclerView.isNestedScrollingEnabled = false
        recyclerView.layoutManager =
            LinearLayoutManager(recyclerView.context, LinearLayoutManager.VERTICAL, false)
        recyclerView.itemAnimator = DefaultItemAnimator()
        recyclerView.adapter = this
//        StartSnapHelper().attachToRecyclerView(recyclerView)
    }

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        private val imageView: ImageView = view.findViewById(R.id.notification_image_view)
        private val textTitle: TextView = view.findViewById(R.id.notification_text_name)
        private val textMutual: TextView = view.findViewById(R.id.notification_text_mutual)
        fun bind(item: FriendRequest) {
            val mutual = "${item.mutualFriend} mutual friends"
            textTitle.text = item.name
            textMutual.text = mutual

//            val url = item.thumbnailUrl
//            if (!url.isNullOrEmpty()) {
//                Picasso.get().load(url).error(R.drawable.maps_sv_error_icon)
//                    .placeholder(R.drawable.ic_app_icon)
//                    .into(imagePoster)
        }
//            imagePoster.setImageResource(getResource(item._id))
    }
}


