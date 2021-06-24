package com.nukemars.shelterfinder.models

import android.os.Parcel
import android.os.Parcelable

class Shelter() : Parcelable {
    var id = 0
    var shelterName: String? = ""
    var address: String? = ""
    var website: String? = ""
    var phoneNumber: String? = ""
    var imageURL: String? = ""
    var latitude = 0.0
    var longitude = 0.0
    var descriptions: String? = ""

    constructor(parcel: Parcel) : this() {
        id = parcel.readInt()
        shelterName = parcel.readString()
        address = parcel.readString()
        website = parcel.readString()
        phoneNumber = parcel.readString()
        imageURL = parcel.readString()
        latitude = parcel.readDouble()
        longitude = parcel.readDouble()
        descriptions = parcel.readString()
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeInt(id)
        parcel.writeString(shelterName)
        parcel.writeString(address)
        parcel.writeString(website)
        parcel.writeString(phoneNumber)
        parcel.writeString(imageURL)
        parcel.writeDouble(latitude)
        parcel.writeDouble(longitude)
        parcel.writeString(descriptions)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Shelter> {
        override fun createFromParcel(parcel: Parcel): Shelter {
            return Shelter(parcel)
        }

        override fun newArray(size: Int): Array<Shelter?> {
            return arrayOfNulls(size)
        }
    }
}