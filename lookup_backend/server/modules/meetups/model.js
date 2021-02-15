import mongoose, { Schema } from 'mongoose'

const MeetupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})

export default mongoose.model('Meetup', MeetupSchema)