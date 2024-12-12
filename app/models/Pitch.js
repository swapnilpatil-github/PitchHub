import mongoose from "mongoose";

const StartupSchema = new mongoose.Schema(
  {
    author : {
      type:String
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    pitchArticle: {
      type: String,
      required: true,
    },
    
    imgURL: {
      type: String,
      validate: {
        validator: function (value) {
          // Updated regex to allow Unsplash URLs and other image formats
          const regex = /^(https?):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?(\?[\w&=]*)?$/i;
          return regex.test(value);
        },
        message: "Please provide a valid image URL.",
      },
    },
    
    
    userEmail: {
      type: String,
      required: true, // To link the pitch to a specific user
    },
    views: {
      type: Number,
      default: 0,  // Initialize views to 0 for new documents
      min: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const StartupModel = mongoose.models.StartupModel || mongoose.model("StartupModel", StartupSchema);

export default StartupModel;
