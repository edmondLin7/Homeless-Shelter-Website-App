package com.nukemars.shelterfinder.ui.`interface`

import com.nukemars.shelterfinder.models.Shelter


interface ShelterPressedListener {
    fun onItemClick(shelter: Shelter)
}

interface OnItemClickListener<T> {
    fun onItemClick(item: T)
}
