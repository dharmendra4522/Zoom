import mongoose, {Schema} from "mongoose";


const meetingSchema = (
    {
        user_id: {type: String},
        meetingCode: {type: String, required: true},
        date: {type: Data, default: Data.now, required: true}
    }
)

const Meeting = mongoose.model("Meeting", meetingSchema);
export { Meeting };