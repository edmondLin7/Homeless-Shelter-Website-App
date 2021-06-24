package com.nukemars.shelterfinder.ui.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.nukemars.shelterfinder.R
import com.nukemars.shelterfinder.models.FriendRequest

//class NotificationAdapter : RecyclerView.Adapter<NotificationAdapter.ViewHolder>() {


//    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
//        val textView: TextView = view.findViewById(R.id.text_name)
//
//    }
//
//    // Create new views (invoked by the layout manager)
//    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
//        // Create a new view, which defines the UI of the list item
//        val view = LayoutInflater.from(viewGroup.context)
//            .inflate(R.layout.item_notification, viewGroup, false)
//
//        return ViewHolder(view)
//    }
//
//    // Replace the contents of a view (invoked by the layout manager)
//    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
//        // Get element from your dataset at this position and replace the
//        // contents of the view with that element
//        viewHolder.textView.text = items.get(position).name
//    }
//
//    // Return the size of your dataset (invoked by the layout manager)
//    override fun getItemCount() = items.size
//}

//
//class NotificationAdapter : RecyclerView.Adapter<NotificationAdapter.ViewHolder>() {

//    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
//        Log.d("-> Name: ",""+items.first().name)
//        val inflater = LayoutInflater.from(parent.context)
//        val binding = ItemNotificationBinding.inflate((R.layout.item_notification, parent, false))
//
//        return ViewHolder(binding)
//    }
//
//    override fun getItemCount(): Int = items.size
//
//    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(items[position])
//
//
//    inner class ViewHolder(val binding: ItemNotificationBinding) : RecyclerView.ViewHolder(binding.root) {
//        fun bind(item: FriendRequest) {
//            with(binding) {
//                textNameNoti.text = item.name
//                Log.d("-> Name: ",""+item.name)
//                textMutual.text =item.mutualFriend.toString()
////                promotionItemDescription.text = item.description
////                promotionItemSpecialLabel.visibility = if (item.isSpecial) View.VISIBLE else View.GONE
//            }
//        }
//
////        private fun textForDiscount(discount: Discount): String {
////            return when (discount) {
////                is Discount.Percentage -> "discount ${discount.value}%"
////                is Discount.Cash -> "discount ${discount.value}$"
////                Discount.Free -> "free item"
////            }
////        }
//    }
//}

//class NotificationAdapter(
//    private val data: MutableList<FriendRequest>
//) : RecyclerView.Adapter<NotificationAdapter.NotificationViewHolder>() {
//    init {
//        Log.d("NotificationAdapter", "" + data.first().name)
//    }
//
//    var onItemClick: ((FriendRequest) -> Unit)? = null
//
//    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NotificationViewHolder {
//        val itemBinding =
//            ItemNotificationBinding.inflate(LayoutInflater.from(parent.context), parent, false)
//        return NotificationViewHolder(itemBinding)
//    }
//
//
//    override fun onBindViewHolder(holder: NotificationViewHolder, position: Int) {
//        holder.bind(data[position])
//    }
//
//
//    override fun getItemCount(): Int = data.size
//
//    inner class NotificationViewHolder(private val binding: ItemNotificationBinding) :
//        RecyclerView.ViewHolder(binding.root), View.OnClickListener {
//        fun bind(friendRequest: FriendRequest) {
//            binding.textName.text = friendRequest.name
//            binding.textMutual.text = friendRequest.mutualFriend.toString()
//        }
//
//        override fun onClick(view: View) {
//            onItemClick?.invoke(data[adapterPosition])
//        }
//    }
//}